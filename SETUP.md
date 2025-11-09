# TCET Capture - Setup Guide

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase account
- Firebase project created

## Firebase Setup

1. **Create a Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Authentication (Email/Password, Google, Phone)
   - Enable Firestore Database
   - Enable Firebase Storage

2. **Get Firebase Credentials**
   - Go to Project Settings > Service Accounts
   - Generate a new private key (for backend)
   - Go to Project Settings > General
   - Copy your Firebase config (for frontend)

3. **Set Up Firestore Rules**
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /events/{eventId} {
         allow read: if true;
         allow write: if request.auth != null && 
           get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
       }
       match /users/{userId} {
         allow read: if request.auth != null;
         allow write: if request.auth != null && request.auth.uid == userId;
       }
     }
   }
   ```

4. **Set Up Storage Rules**
   ```javascript
   rules_version = '2';
   service firebase.storage {
     match /b/{bucket}/o {
       match /events/{allPaths=**} {
         allow read: if true;
         allow write: if request.auth != null;
       }
     }
   }
   ```

## Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create .env file**
   ```env
   FIREBASE_PROJECT_ID=your-project-id
   FIREBASE_CLIENT_EMAIL=your-client-email@project-id.iam.gserviceaccount.com
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
   FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
   PORT=5000
   ```

4. **Start the server**
   ```bash
   npm run dev
   ```

## Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create .env file**
   ```env
   REACT_APP_FIREBASE_API_KEY=your-api-key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
   REACT_APP_FIREBASE_PROJECT_ID=your-project-id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   REACT_APP_FIREBASE_APP_ID=your-app-id
   REACT_APP_API_URL=http://localhost:5000
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

## Setting Up Admin User

1. **Create a user in Firebase Authentication**
   - Go to Firebase Console > Authentication
   - Add a user with email and password

2. **Set admin role**
   - Make a POST request to `/api/auth/set-admin` with the user's UID and email
   - Or manually add a document in Firestore `users` collection with:
     ```json
     {
       "email": "admin@example.com",
       "role": "admin",
       "createdAt": "timestamp"
     }
     ```

## Running the Application

From the root directory:
```bash
npm run dev
```

This will start both the backend server (port 5000) and frontend development server (port 3000).

## Project Structure

```
tcet-capture/
├── backend/
│   ├── routes/
│   │   ├── events.js
│   │   └── auth.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── config/
│   │   └── App.js
│   └── package.json
└── package.json
```

## Features

- ✅ Home page with smooth animations
- ✅ Gallery page with event cards
- ✅ Admin dashboard with CRUD operations
- ✅ Authentication (Admin and Client login)
- ✅ Image upload and storage
- ✅ Responsive design
- ✅ Smooth scroll animations

## Troubleshooting

1. **Firebase Admin SDK Error**
   - Make sure your private key in .env is properly escaped with `\n` for newlines
   - Check that your service account has the correct permissions

2. **CORS Error**
   - Make sure the backend CORS is configured to allow requests from your frontend URL

3. **Authentication Issues**
   - Verify Firebase Authentication is enabled
   - Check that your Firebase config is correct in the frontend .env file

4. **Image Upload Issues**
   - Verify Firebase Storage is enabled
   - Check storage rules allow writes for authenticated users
   - Ensure the storage bucket name is correct


