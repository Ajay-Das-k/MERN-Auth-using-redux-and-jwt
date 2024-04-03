# MERN Auth using Redux and JWT

This project is a full-stack authentication system built using the MERN stack (MongoDB, Express, React, Node.js) along with Redux for state management and JSON Web Tokens (JWT) for authentication.

## Features

- User registration and login functionality
- JWT-based authentication system
- Secure password hashing with bcrypt
- Redux for global state management
- MongoDB for database storage
- Express.js for API endpoints
- React Vite for frontend development and bundling
- Scalable and modular codebase

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/mern-auth-redux-jwt.git

   ```
2. Navigate to the project directory:

   ```bash

   cd mern-auth-redux-jwt
   ```
3. Install dependencies for both the client and server:

   ```bash

   cd client && npm install
   cd ../server && npm install
   ```
4. Set up environment variables:

Create a .env file in the server directory and add necessary environment variables such as MongoDB URI, JWT secret, etc.
5. Start the development server:

```bash

cd ../client && npm run dev
cd ../server && npm run dev

```
## else

```bash

npm run dev

```

Open your browser and navigate to http://localhost:3000 to view the application.

## Usage

Register a new user with a unique email and password.
Log in using the registered credentials.
Access protected routes by providing the JWT token in the request headers.


