# Complete Setup Instructions for TCET Capture

## ✅ Step 1: Dependencies Installed
All dependencies have been installed successfully!

## 🔥 Step 2: Firebase Setup

### A. Create Firebase Project

1. **Go to Firebase Console**: https://console.firebase.google.com/
2. **Click "Add project"** or "Create a project"
3. **Project name**: Enter `tcet-capture` (or any name)
4. **Continue** through the setup
5. **Google Analytics**: You can disable it (optional)
6. **Click "Create project"** and wait

### B. Enable Authentication

1. **Click "Authentication"** in left sidebar
2. **Click "Get started"**
3. **Click "Sign-in method"** tab
4. **Enable Email/Password**:
   - Click "Email/Password"
   - Toggle "Enable" ON
   - Click "Save"
5. **Enable Google** (optional):
   - Click "Google"
   - Toggle "Enable" ON
   - Enter support email
   - Click "Save"
6. **Enable Phone** (optional):
   - Click "Phone"
   - Toggle "Enable" ON
   - Click "Save"

### C. Create Firestore Database

1. **Click "Firestore Database"** in left sidebar
2. **Click "Create database"**
3. **Select "Start in production mode"**
4. **Choose location** (e.g., `us-central1`)
5. **Click "Enable"**

### D. Set Firestore Rules

1. In Firestore, click **"Rules"** tab
2. **Replace** with this code:

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

3. **Click "Publish"**

### E. Enable Firebase Storage

1. **Click "Storage"** in left sidebar
2. **Click "Get started"**
3. **Select "Production mode"**
4. **Use same location** as Firestore
5. **Click "Done"**

### F. Set Storage Rules

1. In Storage, click **"Rules"** tab
2. **Replace** with this code:

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

3. **Click "Publish"**

## 📋 Step 3: Get Firebase Credentials

### For Frontend (.env file):

1. **Click gear icon (⚙️)** next to "Project Overview"
2. **Click "Project settings"**
3. **Scroll to "Your apps"** section
4. **Click Web icon (`</>`)** 
5. **Register app**: Name it `tcet-capture-web`
6. **DO NOT** check "Also set up Firebase Hosting"
7. **Click "Register app"**
8. **Copy the config values** - you'll see something like:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

### For Backend (.env file):

1. Still in **"Project settings"**
2. **Click "Service accounts"** tab
3. **Click "Generate new private key"**
4. **Click "Generate key"** in dialog
5. **JSON file downloads** - open it and save the values

The JSON contains:
- `project_id`
- `private_key`
- `client_email`

## 📝 Step 4: Create .env Files

### Create `backend/.env`:

Create a file named `.env` in the `backend` folder with:

```env
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-service-account-email@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
PORT=5000
```

**How to fill:**
- `FIREBASE_PROJECT_ID`: From service account JSON (`project_id`)
- `FIREBASE_CLIENT_EMAIL`: From service account JSON (`client_email`)
- `FIREBASE_PRIVATE_KEY`: From service account JSON (`private_key`) - keep quotes and \n
- `FIREBASE_STORAGE_BUCKET`: Usually `your-project-id.appspot.com`

### Create `frontend/.env`:

Create a file named `.env` in the `frontend` folder with:

```env
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id
REACT_APP_API_URL=http://localhost:5000
```

**How to fill:**
- Use values from Firebase Web App config (Step 3)

## 👤 Step 5: Create Admin User

1. **Go to Authentication > Users**
2. **Click "Add user"**
3. **Enter email**: e.g., `admin@tcet.com`
4. **Enter password**: (save this!)
5. **Click "Add user"**
6. **Copy the User UID** (you'll need this)

## 🔐 Step 6: Set Admin Role

1. **Go to Firestore Database > Data**
2. **Click "Start collection"**
3. **Collection ID**: `users`
4. **Document ID**: Paste the User UID from Step 5
5. **Add fields**:
   - `email` (string): `admin@tcet.com`
   - `role` (string): `admin`
   - `createdAt` (timestamp): Click and select current time
6. **Click "Save"**

## 🚀 Step 7: Run the Project

From the project root directory:

```bash
npm run dev
```

This will start:
- Backend server on http://localhost:5000
- Frontend app on http://localhost:3000

## ✅ Step 8: Test the Application

1. **Open** http://localhost:3000
2. **Check** Home page loads
3. **Navigate** to Gallery
4. **Click Login** icon
5. **Select "Admin Login"**
6. **Login** with your admin credentials
7. **Access Admin Dashboard**
8. **Create a test event**

## 🐛 Troubleshooting

### "Permission denied" error
- Check Firestore rules are published
- Verify admin user has `role: 'admin'` in Firestore

### "Storage permission denied"
- Check Storage rules are published
- Verify user is authenticated

### "Invalid API key"
- Double-check .env files
- Make sure no extra spaces
- Restart server after changing .env

### "Firebase Admin SDK error"
- Check private key format in backend/.env
- Make sure \n is in the private key string
- Verify client_email is correct

### Backend won't start
- Check backend/.env file exists
- Verify all environment variables are set
- Check port 5000 is not in use

### Frontend won't start
- Check frontend/.env file exists
- Verify all REACT_APP_ variables are set
- Clear cache: `npm start -- --reset-cache`

## 📚 Additional Resources

- See `FIREBASE_SETUP_GUIDE.md` for detailed Firebase setup
- See `SETUP.md` for technical details
- See `QUICK_START.md` for quick reference

## 🎉 You're All Set!

Once everything is set up, you can:
- Manage events from Admin Dashboard
- View events in Gallery
- Customize content in components
- Deploy to production

Happy coding! 🚀


