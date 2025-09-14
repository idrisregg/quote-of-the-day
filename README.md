![Capture](https://github.com/user-attachments/assets/259c5bec-c2b2-4cec-991a-3a0396d575d3)
![register](https://github.com/user-attachments/assets/5185f9ff-b531-4a99-a6d2-b85794634f7e)
![login](https://github.com/user-attachments/assets/e6ff0fbb-afd6-4e92-8a0d-5333bdb3e8cf)
![logged](https://github.com/user-attachments/assets/5f1206f7-fd49-493e-97ea-5de70722bb67)

🌟 Daily Quote App - MERN Stack Implementation

A beautifully designed MERN stack application that delivers inspirational quotes every 24 hours with user authentication and interaction features.
🚀 Key Features

    🔐 Secure Authentication System - User registration and login with MongoDB and Express

    📜 Curated Daily Quotes - inspirational quotes that rotate automatically

    💖 Interactive Experience - Like/dislike functionality with user-specific tracking

    ⏰ Automatic Updates - New quote delivered every 24 hours

    🎨 Modern UI/UX - Clean, responsive design with intuitive navigation

🛠️ Technology Stack

    Frontend: React, React Router DOM, modern CSS

    Backend: Node.js, Express.js

    Database: MongoDB

    Authentication: JWT, bcrypt for password hashing

    Data Storage: Local JSON file for quotes

📦 Installation & Setup
Prerequisites

    Node.js (v14 or higher)

    MongoDB Atlas account or local MongoDB installation

    Git

1. Clone the Repository
bash
cd daily-quote-app

2. Install Dependencies

>npm init

>npm creat vite@latest

>npm install express

>npm install mongoose

>npm install react-router

>npm install bcryptjs

>npm install cors

4. Environment Configuration

PORT=5000

MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/appName?retryWrites=true&w=majority

JWT_SECRET=your_super_secret_jwt_key_here

🎨 UI Components

    Landing Page: Welcome screen with app overview

    Registration/Login: Clean forms with validation

    Dashboard: Display current quote with like/dislike buttons


⚙️ Configuration Notes

    Replace the MongoDB URI with your actual connection string

    Set a strong JWT secret for production environments

    The quotes.json file contains 24 inspirational quotes that cycle daily

    User passwords are securely hashed using bcrypt before storage

🚦 Development Scripts

> npm start

> #Runs both frontend and backend concurrently

🔒 Security Features

    Password hashing with bcrypt

    JWT authentication tokens

    Protected API routes

    Input validation and sanitization

    CORS configuration

🤝 Contributing

    Fork the repository

    Create a feature branch (git checkout -b feature/amazing-feature)

    Commit your changes (git commit -m 'Add amazing feature')

    Push to the branch (git push origin feature/amazing-feature)

    Open a Pull Request

🆘 Support

If you encounter any issues or have questions:

    Check the console for error messages

    Verify your MongoDB connection string

    Verify the Server Port Matches the Front-end

    Ensure all environment variables are properly set
