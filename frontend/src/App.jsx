import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Feed from "./pages/Feed";
import Messages from "./pages/Messages";
import Discover from "./pages/Discover";
import Connections from "./pages/Connections";
import { useUser  , useAuth} from "@clerk/clerk-react";
import Layout from "./pages/Layout";
import { Toaster } from "react-hot-toast";
import Profile from "./pages/Profile";
import CreatePost from "./pages/CreatePost";
import ChatBox from "./pages/ChatBox";
import { useEffect } from "react";

function App() {
  const { user } = useUser();
  const {getToken} = useAuth();

  useEffect(()=>{

    if(user){
      getToken().then((token)=>console.log(token))
    }
    else{
      console.log("No user")
    }
    

  }, [user])

  return (
    <>
      <Toaster />
      <Routes>
        <Route path='/' element={!user ? <Login /> : <Layout />}>
          <Route index element={<Feed />}/>
          <Route path='messages' element={<Messages />}/>
          <Route path='messages/:userId' element={<ChatBox />}/>
          <Route path='connections' element={<Connections />}/>
          <Route path='discover' element={<Discover />}/>
          <Route path='profile' element={<Profile />}/>
          <Route path='create-post' element={<CreatePost />}/>
          {/* <Route path="" */}
        </Route>
      
      </Routes>
    </>
  );
}

export default App;
