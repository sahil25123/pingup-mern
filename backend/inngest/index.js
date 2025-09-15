import { Inngest } from "inngest";
import User from "../models/user.js";
import Connection from "../models/connection.js";
import sendEmail from "../config/nodeMailer.js";
import Story from "../models/Story.js";



// Create a client to send and receive events
export const inngest = new Inngest({ id: "my-app" });

const syncUserCreation= inngest.createFunction(
    { id:"sync-user-from-clerk"},
    {event :"clerk/user.created"},
    async({event})=>{
        const {id , first_name , last_name , email_addresses , image_url} =event.data;
        let username = email_addresses[0].email_address.split("@")[0]

        const user = await User.findOne({username})
        if(user){
            username= username+ Math.floor(Math.random()*10000)
        }
        const userData = {
            _id :id ,
            email : email_addresses[0].email_address,
            full_name :first_name + " " + last_name,
            prfile_picture : image_url,
            username
        }

        await User.create(userData);
    }
)

const updateClerkUser  = inngest.createFunction(
    {id:"update-user-from-clerk"},
    {event:"clerk/user.update"},
    async ({event})=>{
        const {id , first_name , last_name , email_addresses ,image_url} = event.data;

        const updatedUserData = {
            email : email_addresses[0],email_address,
            full_name : first_name  + " " + last_name,
            profile_picture : image_url

        }
        await User.findByIdAndUpdate(id , updatedUserData )
    }
)

const deleteclerkUser  = inngest.createFunction(
    {id:"delete-user-from-clerk"},
    {event:"clerk/user.delete"},
    async ({event})=>{
        const {id } = event.data;

        
        await User.findByIdAndDelete(id )
    }
)

//Immgest  function to send Remainder when a new Connection Request is added 
const sendNewConnectionReq = inngest.createFunction(

    {id : "send-new-connection-request-reminder"},
    {event: "app/connection-request"},

    async({ event , step}) =>{
        const {connectionId} = event.data;

        await step.run("send-connection-request-mail" , async ()=>{
            const connection = await Connection.findById(connectionId).populate(" from_user_id to_user_id");
            const subject = " New Connection Request"

            const body= `<div style="font-family: Arial, sans-serif; padding: 20px;">
                                <h2>Hi ${connection.to_user_id.full_name},</h2>
                                <p>You have a new connection request from ${connection.from_user_id.full_name} . @${connection.from_user_id.username}</p>
                                <p>Click <a href={"${process.env.FRONTEND_URL}/connections"} style="color: #10b981;">here</a> to accept or reject the request</p>
                                <br />
                                <p>Thanks,<br />Pingup . Stay Connected</p>
                            </div>`;


             await sendEmail({
                to: connection.to_user_id.email,
                subject,
                body
            });
        })

        const in24Hours = new Date(Date.now() + 24 * 60 * 60 * 1000);
        await step.sleepUntil("wait-for-24-hours", in24Hours);
        await step.run('send-connection-request-reminder', async () => {
            const connection = await Connection.findById(connectionId).populate('from_user_id to_user_id');

            if(connection.status === 'accepted'){
                return {message: "Already accepted"}
            }

            const subject = `New Connection Request`;
            const body = `<div style="font-family: Arial, sans-serif; padding: 20px;">
                                <h2>Hi ${connection.to_user_id.full_name},</h2>
                                <p>You have a new connection request from ${connection.from_user_id.full_name} . @${connection.from_user_id.username}</p>
                                <p>Click <a href={"${process.env.FRONTEND_URL}/connections"} style="color: #10b981;">here</a> to accept or reject the request</p>
                                <br />
                                <p>Thanks,<br />PingUp - Stay Connected</p>
                            </div>`;

            await sendEmail({
                to: connection.to_user_id.email,
                subject,
                body
            });

            return { message: "Reminder sent."}
        })
    }


)

// delete the story after 24 hours 
// Inngest function to delete story after 24 hours
const deleteStory = inngest.createFunction(
    {id: 'story-delete'},
    {event: 'app/story.delete'},
    async ({event, step}) => {
        const { storyId } = event.data;
        const in24Hours = new Date(Date.now() + 24 * 60 * 60 * 1000);
        await step.sleepUntil('wait-for-24-hours', in24Hours);
        await step.run('delete-story', async () => {
            await Story.findByIdAndDelete(storyId);
            return { message: "Story deleted."}
        })
    }
)

const sendNotificationOfUnseenMessages = inngest.createFunction(
    {id: "send-unseen-messages-notification"},
    {cron: "TZ=America/New_York 0 9 * * *"}, // Every day 9 AM
    async ({step}) => {
        const message = await Message.find({seen: false}).populate('to_user_id');
        const unseenCount = {};

        message.map(message => {
            unseenCount[message.to_user_id._id] = (unseenCount[message.to_user_id._id] || 0) + 1;
        })

        for(const userId in Object){
            const user = await User.findById(userId);

            const subject = `You have ${unseenCount[userId]} unseen messages`;

            const body = `<div style="font-family: Arial, sans-serif; padding: 20px;">
                            <h2>Hi ${user.full_name},</h2>
                            <p>You have ${unseenCount[userId]} unseen messages</p>
                            <p>Click <a href={"${process.env.FRONTEND_URL}/messages"} style="color: #10b981;">here</a> to view them</p>
                            <br />
                            <p>Thanks,<br />PingUp - Stay Connected</p>
                        </div>`;

            await sendEmail({
                to: user.email,
                subject,
                body
            })
        }
        return { message: "Notification sent."}
    }
)


// Create an empty array where we'll export future Inngest functions
export const functions = [  sendNewConnectionReq , deleteStory,
    syncUserCreation , updateClerkUser , deleteclerkUser , sendNotificationOfUnseenMessages
];


