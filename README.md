# SocialMedia-MERN

A full-featured social media web application built with the MERN stack (MongoDB, Express.js, React, Node.js). This project includes user authentication, posts, stories, messaging, connections, profile management, and image uploads using ImageKit.

## Features

- User authentication (Clerk)
- Create, edit, and delete posts
- Upload images for posts and profiles (ImageKit integration)
- Stories (text, image, video)
- Messaging between users
- Discover and connect with other users
- Responsive UI with modern design (Tailwind CSS)
- Profile management (edit profile, cover photo, bio, etc.)
- Real-time updates and notifications

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** Clerk
- **Image Uploads:** ImageKit
- **Other:** Moment.js, Lucide React Icons, React Hot Toast

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- MongoDB Atlas account
- ImageKit account
- Clerk account

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sahil25123/squadup-mern.git
   cd squadup-mern
   ```

2. **Install dependencies:**
   ```bash
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

3. **Environment Variables:**
   - Create a `.env` file in the `backend/` directory with the following:
     ```env
     PORT=9000
     MONGO_URI=your_mongodb_connection_string
     IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
     IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
     IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
     CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
     CLERK_SECRET_KEY=your_clerk_secret_key
     ```
   - For Clerk, add your publishable key to `frontend/.env`:
     ```env
     VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
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

## Folder Structure

```
SocialMedia-MERN/
├── backend/
│   ├── config/
│   ├── controller/
│   ├── models/
│   ├── routes/
│   ├── index.js
│   └── .env
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── .env
├── README.md
```

## API Endpoints

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

## Environment Variables

- `PORT`: Server port
- `MONGO_URI`: MongoDB connection string
- `IMAGEKIT_PUBLIC_KEY`: ImageKit public key
- `IMAGEKIT_PRIVATE_KEY`: ImageKit private key
- `IMAGEKIT_URL_ENDPOINT`: ImageKit URL endpoint
- `CLERK_PUBLISHABLE_KEY`: Clerk publishable key
- `CLERK_SECRET_KEY`: Clerk secret key

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License.

## Author

- Sahil Gupta ([GitHub](https://github.com/sahil25123))
