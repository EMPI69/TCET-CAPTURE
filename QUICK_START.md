# Quick Start Guide

## Prerequisites Check

Before starting, make sure you have:
- ✅ Node.js (v14+) installed
- ✅ npm or yarn installed
- ✅ Firebase account created
- ✅ Firebase project set up

## Step 1: Clone and Install

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

## Step 2: Firebase Setup

1. **Create Firebase Project**
   - Go to https://console.firebase.google.com/
   - Click "Add project"
   - Follow the setup wizard

2. **Enable Services**
   - Authentication: Enable Email/Password, Google, and Phone
   - Firestore: Create database in production mode
   - Storage: Enable Firebase Storage

3. **Get Credentials**

   **For Backend (.env in backend/):**
   - Go to Project Settings > Service Accounts
   - Click "Generate new private key"
   - Save the credentials

   **For Frontend (.env in frontend/):**
   - Go to Project Settings > General
   - Scroll to "Your apps"
   - Click Web icon (</>)
   - Copy the Firebase config

## Step 3: Configure Environment Variables

### Backend Configuration

Create `backend/.env`:
```env
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-client-email@project-id.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key\n-----END PRIVATE KEY-----\n"
FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
PORT=5000
```

**Important:** Replace `\n` with actual newlines in the private key, or keep the `\n` as-is (the code handles it).

### Frontend Configuration

Create `frontend/.env`:
```env
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id
REACT_APP_API_URL=http://localhost:5000
```

## Step 4: Set Up Firestore Rules

Go to Firestore Database > Rules and paste:

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

## Step 5: Set Up Storage Rules

Go to Storage > Rules and paste:

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

## Step 6: Create Admin User

1. **Create User in Firebase Auth**
   - Go to Authentication > Users
   - Click "Add user"
   - Enter email and password
   - Copy the User UID

2. **Set Admin Role**
   - Go to Firestore Database
   - Create collection `users`
   - Create document with User UID as document ID
   - Add fields:
     ```json
     {
       "email": "admin@example.com",
       "role": "admin",
       "createdAt": "2024-01-01T00:00:00Z"
     }
     ```

## Step 7: Add Logo (Optional)

1. Add your logo image to `frontend/public/logo.png`
2. The navbar will automatically use it

## Step 8: Run the Application

From the root directory:

```bash
npm run dev
```

This will start:
- Backend server on http://localhost:5000
- Frontend app on http://localhost:3000

## Step 9: Test the Application

1. **Test Public Pages**
   - Open http://localhost:3000
   - Check Home page animations
   - Navigate to Gallery page

2. **Test Admin Login**
   - Click Login icon
   - Select "Admin Login"
   - Use your admin credentials
   - You should be redirected to the Admin Dashboard

3. **Test Event Management**
   - Create a new event
   - Upload an image
   - Edit the event
   - Delete the event
   - Check Gallery page to see the event

## Troubleshooting

### Firebase Admin SDK Error
- Check that your private key is correctly formatted in .env
- Ensure the service account email has the correct permissions

### CORS Error
- Make sure the backend is running on port 5000
- Check that REACT_APP_API_URL matches your backend URL

### Authentication Issues
- Verify Firebase Authentication is enabled
- Check that your Firebase config is correct
- Ensure the user exists in Firestore with the correct role

### Image Upload Issues
- Verify Firebase Storage is enabled
- Check storage rules allow writes
- Ensure the storage bucket name is correct

### Events Not Showing
- Check Firestore rules allow reads
- Verify events collection exists
- Check browser console for errors

## Next Steps

- Customize the content (faculty, team, testimonials)
- Add your own images
- Configure social media links in Footer
- Deploy to production

## Support

For issues or questions:
1. Check the SETUP.md for detailed setup instructions
2. Review PROJECT_SUMMARY.md for feature overview
3. Check Firebase console for errors
4. Review browser console for frontend errors
5. Check backend terminal for server errors


