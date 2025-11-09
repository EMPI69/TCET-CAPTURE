# Firebase Setup Guide - Step by Step

Follow these steps to set up Firebase for TCET Capture.

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or **"Create a project"**
3. Enter project name: `tcet-capture` (or any name you prefer)
4. Click **Continue**
5. **Disable Google Analytics** (optional, you can enable later) or keep it enabled
6. Click **Create project**
7. Wait for project creation to complete
8. Click **Continue**

## Step 2: Enable Authentication

1. In the left sidebar, click **"Authentication"**
2. Click **"Get started"**
3. Click on **"Sign-in method"** tab
4. Enable the following sign-in methods:

   **Email/Password:**
   - Click on **Email/Password**
   - Toggle **Enable** to ON
   - Click **Save**

   **Google:**
   - Click on **Google**
   - Toggle **Enable** to ON
   - Enter project support email (your email)
   - Click **Save**

   **Phone:**
   - Click on **Phone**
   - Toggle **Enable** to ON
   - Click **Save**

## Step 3: Create Firestore Database

1. In the left sidebar, click **"Firestore Database"**
2. Click **"Create database"**
3. Select **"Start in production mode"** (we'll set rules later)
4. Choose a location (select the closest to your users, e.g., `us-central1`)
5. Click **Enable**
6. Wait for database creation

## Step 4: Set Firestore Rules

1. In Firestore Database, click on **"Rules"** tab
2. Replace the default rules with:

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

3. Click **"Publish"**

## Step 5: Enable Firebase Storage

1. In the left sidebar, click **"Storage"**
2. Click **"Get started"**
3. Start in **"Production mode"** (we'll set rules later)
4. Use the same location as Firestore
5. Click **Done**

## Step 6: Set Storage Rules

1. In Storage, click on **"Rules"** tab
2. Replace the default rules with:

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

3. Click **"Publish"**

## Step 7: Get Firebase Web App Config (for Frontend)

1. Click on the **gear icon** (⚙️) next to "Project Overview"
2. Click **"Project settings"**
3. Scroll down to **"Your apps"** section
4. Click on the **Web icon** (`</>`)
5. Register app name: `tcet-capture-web`
6. **DO NOT** check "Also set up Firebase Hosting"
7. Click **"Register app"**
8. **Copy the Firebase configuration object** - you'll need this for frontend .env

It will look like this:
```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

## Step 8: Get Service Account Credentials (for Backend)

1. Still in **Project settings**
2. Go to **"Service accounts"** tab
3. Click **"Generate new private key"**
4. A dialog will appear - click **"Generate key"**
5. A JSON file will download - **SAVE THIS FILE SAFELY**
6. **DO NOT commit this file to Git!**

The JSON file contains:
- `project_id`
- `private_key`
- `client_email`

## Step 9: Create Admin User

1. Go to **Authentication** > **Users** tab
2. Click **"Add user"**
3. Enter an email (e.g., `admin@tcet.com`)
4. Enter a password (save this securely)
5. Click **"Add user"**
6. **Copy the User UID** (you'll need this)

## Step 10: Set Admin Role in Firestore

1. Go to **Firestore Database** > **Data** tab
2. Click **"Start collection"**
3. Collection ID: `users`
4. Document ID: **Paste the User UID** from Step 9
5. Add fields:
   - Field: `email`, Type: `string`, Value: `admin@tcet.com`
   - Field: `role`, Type: `string`, Value: `admin`
   - Field: `createdAt`, Type: `timestamp`, Value: Click and select current time
6. Click **"Save"**

## Step 11: Create .env Files

Now you'll create the environment variable files.

### Backend .env

Create file: `backend/.env`

```env
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-client-email@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
PORT=5000
```

**How to fill:**
- `FIREBASE_PROJECT_ID`: From the service account JSON file (project_id)
- `FIREBASE_CLIENT_EMAIL`: From the service account JSON file (client_email)
- `FIREBASE_PRIVATE_KEY`: From the service account JSON file (private_key) - keep the quotes and \n
- `FIREBASE_STORAGE_BUCKET`: Usually `your-project-id.appspot.com`

### Frontend .env

Create file: `frontend/.env`

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
- Use the values from Step 7 (Firebase Web App Config)

## Step 12: Create Index (if needed)

1. Go to **Firestore Database** > **Indexes** tab
2. If you see an error about missing index for `createdAt`, click **"Create index"**
3. Click **"Create"** (Firebase will auto-populate the fields)

## That's it! 🎉

Your Firebase is now set up. You can now:
1. Run the backend: `cd backend && npm run dev`
2. Run the frontend: `cd frontend && npm start`
3. Or run both: `npm run dev` (from root)

## Troubleshooting

### "Permission denied" error
- Check Firestore rules are published
- Verify admin user has `role: 'admin'` in Firestore

### "Storage permission denied"
- Check Storage rules are published
- Verify user is authenticated

### "Invalid API key"
- Double-check .env files
- Make sure no extra spaces or quotes
- Restart the server after changing .env

### "Firebase Admin SDK error"
- Check private key format in backend/.env
- Make sure \n is in the private key string
- Verify client_email is correct


