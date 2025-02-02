# CodeConnect 🚀

## Overview
CodeConnect is a social networking platform designed for developers and tech enthusiasts to connect based on their skills. 👨‍💻👩‍💻 Users can create an account, browse through a feed of other users' profiles, express interest, and establish connections. Once connected, users can engage in real-time chat using a chat system powered by Socket.io. Additionally, users can update and preview their profile cards live before saving the changes.

## Features ✨
- **User Authentication**: 🔐 Sign up and sign in functionality.
- **Feed System**: 📰 View other users' profiles and their skills.
- **Interest & Connection System**: ❤️ Mark users as "Interested" or ❌ "Ignore" based on skills.
- **Connection Requests**: ✅ Accept or ❌ Reject incoming connection requests.
- **Real-time Chat**: 💬 Chat functionality for connected users using Socket.io.
- **Profile Card Management**: 📝 Users can update and preview their profile cards live.

## Technologies Used 🛠️

### Frontend 🎨
- **React.js**: Used for building the user interface and managing the state of the application.
- **Tailwind CSS**: For styling and responsive design.
- **React Router**: For navigation between different pages.

### Backend ⚙️
- **Node.js**: JavaScript runtime environment to run the server-side logic.
- **Express.js**: A lightweight web framework for handling API requests.
- **Socket.io**: Real-time bidirectional event-based communication for the chat feature.

### Database 📂
- **MongoDB**: A NoSQL database to store user information, connections, and messages.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB.

### Authentication & Security 🔒
- **JWT (JSON Web Token)**: Used for secure authentication and authorization.
- **bcrypt.js**: For password hashing and security.

### Deployment 🚀
- **Frontend**: Deployed using platforms like Vercel or Netlify.
- **Backend**: Hosted on services like Heroku, DigitalOcean, or AWS.
- **Database**: MongoDB Atlas for cloud database storage.

## Installation & Setup ⚡

### Prerequisites 📌
Ensure you have the following installed on your system:
- **Node.js** (latest LTS version recommended)
- **MongoDB** (or use MongoDB Atlas)

### Steps to Run Locally 🏡

#### 1. Clone the Repository 📥
```sh
git clone https://github.com/chitransh100/CodeConnect.git
cd CodeConnect
```

#### 2. Install Dependencies 📦
##### Backend
```sh
npm install
```
##### Frontend
```sh
npm install
```

#### 3. Set Up Environment Variables ⚙️
Create a `.env` file in the `backend` folder and add:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

#### 4. Start the Backend Server 🚀
```sh
npm start
```

#### 5. Start the Frontend 🌐
```sh
npm start
```

#### 6. Access the Application 🔗
Open `http://localhost:5173` in your browser.

## API Endpoints 🔄
| Endpoint          | Method | Description |
|------------------|--------|-------------|
| /api/auth/signup | POST   | 📝 User signup |
| /api/auth/login  | POST   | 🔑 User login  |
| /api/users/feed  | GET    | 📰 Get user feed |
| /api/users/request | POST  | 📩 Send a connection request |
| /api/users/accept | POST  | ✅ Accept a connection request |
| /api/chat/send   | POST   | 💬 Send a message |
| /api/chat/get    | GET    | 📜 Get chat messages |

## Future Enhancements 🔮
- **Video Call Feature** 📹: Enable video communication between connected users.
- **Profile Recommendations** 🤖: Suggest connections based on mutual skills and interests.
- **Advanced Search** 🔍: Filter users based on specific skills or experience levels.
- **Notifications** 🔔: Implement real-time notifications for connection requests and messages.

## Contributors 👥
- **Chitransh kumar** - Developer & Maintainer
- Contributions are welcome! 🎉 Feel free to open issues and pull requests.

---
Enjoy connecting with like-minded developers on **CodeConnect!** 🚀

