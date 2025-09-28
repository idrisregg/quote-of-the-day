![cap1](https://github.com/user-attachments/assets/c4798d0a-9c73-4140-ade3-faf72a81abf4)
![main](https://github.com/user-attachments/assets/795fb5c1-de2f-4d85-990b-2fc5e8c97a22)
![register](https://github.com/user-attachments/assets/e8d233eb-4f50-43af-b3ba-020a31f324bd)
![login](https://github.com/user-attachments/assets/e93ba8d1-6723-4ca1-b113-a64a2ec3bd47)
![profile](https://github.com/user-attachments/assets/243f50ae-e44c-4234-8b76-bc0aaafdabdf)


🌟 Daily Quote App - MERN Stack Implementation

A beautifully designed MERN stack application that delivers inspirational quotes every 24 hours with user authentication and interaction features.
🚀 Key Features

    🔐 Secure Authentication System - User registration and login with MongoDB and Express

    📜 Curated Daily Quotes - inspirational quotes that rotate automatically

    💖 Saving Experience - Save functionality with Quote-specific tracking

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

    MongoDB Atlas account

    Git

1. Clone the Repository
bash
cd daily-quote-app

2. Install Dependencies


>npm install

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

    Dashboard: Display current quote with Save button

    Profile Page : Displayes the Saved Quotes

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
