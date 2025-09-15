
# SocialMedia-MERN

A modern, full-featured social media web app built with the MERN stack (MongoDB, Express.js, React, Node.js). This project is designed for learning and real-world use, with features like authentication, posts, stories, messaging, connections, profile management, and image uploads. It is beginner-friendly and well-structured for easy understanding and extension.

## 🚀 Features

- **User Authentication:** Secure login/signup using Clerk.
- **Posts:** Create, edit, delete, and view posts with images.
- **Stories:** Share temporary stories (text, image, video).
- **Messaging:** Chat with other users in real time.
- **Connections:** Follow/unfollow users, view followers and following.
- **Profile Management:** Edit profile, update cover photo, bio, and profile picture.
- **Image Uploads:** Fast and reliable uploads using ImageKit.
- **Responsive UI:** Modern design with Tailwind CSS, works on all devices.
- **Notifications:** Real-time updates for new messages, posts, and connections.
- **Discover:** Find and connect with new users.
- **Webhooks & Events:** Clerk and Inngest integration for advanced workflows.

## 🛠️ Tech Stack

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** Clerk
- **Image Uploads:** ImageKit
- **Events/Webhooks:** Inngest
- **Other:** Moment.js, Lucide React Icons, React Hot Toast

## 🏗️ Project Structure

```
SocialMedia-MERN/
├── backend/
│   ├── config/         # Configuration files (db, imagekit, clerk)
│   ├── controller/     # Route controllers (user, post, story, etc.)
│   ├── models/         # Mongoose models
│   ├── routes/         # Express routes
│   ├── index.js        # Main server file
│   └── .env            # Backend environment variables
├── frontend/
│   ├── public/         # Static assets
│   ├── src/
│   │   ├── assets/     # Images, icons, dummy data
│   │   ├── components/ # Reusable React components
│   │   ├── pages/      # Main pages (Feed, Profile, Messages, etc.)
│   │   ├── App.jsx     # App entry point
│   │   └── main.jsx    # React root
│   ├── package.json
│   └── .env            # Frontend environment variables
├── README.md
```

## ⚡ Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- MongoDB Atlas account
- ImageKit account
- Clerk account

### Installation & Local Development
1. **Clone the repository:**
   ```bash
   git clone https://github.com/sahil25123/squadup-mern.git
   cd squadup-mern
   ```
2. **Install dependencies:**
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```
3. **Set up environment variables:**
   - In `backend/.env`:
     ```env
     PORT=9000
     MONGO_URI=your_mongodb_connection_string
     IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
     IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
     IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
     CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
     CLERK_SECRET_KEY=your_clerk_secret_key
     INNGEST_EVENT_KEY=your_inngest_event_key
     ```
   - In `frontend/.env`:
     ```env
     VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
     VITE_API_URL=http://localhost:9000
     ```
4. **Start the backend server:**
   ```bash
   cd backend
   npm start
   ```
5. **Start the frontend development server:**
   ```bash
   cd frontend
   npm run dev
   ```
6. **Open the app:**
   Visit [http://localhost:5173](http://localhost:5173) in your browser.

## 🌐 Deployment

### Backend
- Deploy to [Render](https://render.com/) or similar platforms.
- Set all environment variables in the Render dashboard.
- Use `npm install` as build command and `npm start` as start command.
- Update Clerk and Inngest webhooks to point to your Render backend URL.

### Frontend
- Deploy to [Vercel](https://vercel.com/) or Netlify.
- Set environment variables in the Vercel dashboard.
- Vercel auto-detects Vite: build command is `npm run build`, output is `dist`.
- Update API URLs in frontend `.env` to use your backend’s deployed URL.

## 🔗 API Endpoints (Examples)

### User
- `POST /api/register` - Register a new user
- `POST /api/login` - Login
- `GET /api/user/:id` - Get user profile
- `POST /api/updateUser` - Update user profile (with image upload)

### Posts
- `GET /api/posts` - Get all posts
- `POST /api/createPost` - Create a new post
- `DELETE /api/deletePost/:id` - Delete a post

### Stories
- `GET /api/stories` - Get all stories
- `POST /api/createStory` - Create a new story

### Messaging
- `GET /api/messages` - Get messages
- `POST /api/sendMessage` - Send a message

## 🔒 Environment Variables

- `PORT`: Server port
- `MONGO_URI`: MongoDB connection string
- `IMAGEKIT_PUBLIC_KEY`: ImageKit public key
- `IMAGEKIT_PRIVATE_KEY`: ImageKit private key
- `IMAGEKIT_URL_ENDPOINT`: ImageKit URL endpoint
- `CLERK_PUBLISHABLE_KEY`: Clerk publishable key
- `CLERK_SECRET_KEY`: Clerk secret key
- `INNGEST_EVENT_KEY`: Inngest event key

## 📝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

- Sahil Gupta ([GitHub](https://github.com/sahil25123))

---

**Short Description:**
A modern social media web app built with the MERN stack, featuring posts, stories, messaging, user profiles, image uploads, and real-time connections. Perfect for learning and real-world use.
