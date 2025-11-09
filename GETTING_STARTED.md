# 🚀 Getting Started with TCET Capture

## 🆓 FREE TIER COMPATIBLE!

✅ This project works **100% FREE** with Firebase's free Spark plan!
- No credit card required
- No premium features needed
- All features work on free tier

### Free Tier Limits (more than enough for this project):
- **Firestore**: 1GB storage, 50K reads/day, 20K writes/day
- **Storage**: 5GB storage, 1GB downloads/day
- **Authentication**: Unlimited users
- **Hosting**: 10GB storage, 360MB/day transfers

## ✅ What's Already Done

- ✅ Project structure created
- ✅ All dependencies installed
- ✅ Code is ready to run
- ✅ Configured for FREE Firebase tier

## 📋 What You Need to Do

Follow these steps in order:

### Step 1: Create Firebase Project (5 minutes) - FREE!

1. Go to https://console.firebase.google.com/
2. **Sign in with your Google account** (free)
3. Click **"Add project"**
4. Enter project name: `tcet-capture`
5. **Continue through setup** (you can disable Google Analytics to save resources)
6. **DO NOT enable billing** - free tier is enough!
7. Wait for project creation

### Step 2: Enable Firebase Services (10 minutes)

#### A. Authentication
- Go to **Authentication** → **Get started**
- Enable **Email/Password** sign-in
- (Optional) Enable **Google** and **Phone** sign-in

#### B. Firestore Database (FREE!)
- Go to **Firestore Database** → **Create database**
- Choose **Production mode** (this is free, don't worry!)
- Select location (e.g., `us-central1` - choose closest to you)
- **Click "Enable"** - it's FREE!
- If asked about billing, you can skip - free tier is enough

#### C. Storage - SKIP THIS! 🚫
- **We DON'T need Firebase Storage!**
- We'll use **Cloudinary** instead (FREE, better limits)
- See Step 5 below for Cloudinary setup
- **You can skip Firebase Storage completely**

### Step 3: Set Up Rules (5 minutes) - Skip Storage Rules

#### Firestore Rules
1. Go to **Firestore Database** → **Rules** tab
2. Copy and paste this:

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

3. Click **Publish**

#### Storage Rules
1. Go to **Storage** → **Rules** tab
2. Copy and paste this:

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

3. Click **Publish**

### Step 4: Set Up Cloudinary (FREE Image Hosting) - 5 minutes

**Important**: Since Firebase Storage requires billing, we use **Cloudinary** which is FREE!

1. **Go to https://cloudinary.com/**
2. **Click "Sign Up"** (FREE, no credit card)
3. **Sign up** with email or Google
4. **Get credentials** from dashboard:
   - Cloud Name
   - API Key
   - API Secret
5. **Save these** - you'll need them for backend .env

See `CLOUDINARY_SETUP.md` for detailed instructions.

### Step 5: Get Frontend Credentials (5 minutes)

1. Click **gear icon (⚙️)** → **Project settings**
2. Scroll to **"Your apps"** section
3. Click **Web icon (`</>`)** 
4. Register app: `tcet-capture-web`
5. **Copy these values** (you'll see them in the config):

```
apiKey: "AIza..."
authDomain: "your-project.firebaseapp.com"
projectId: "your-project-id"
storageBucket: "your-project.appspot.com"
messagingSenderId: "123456789"
appId: "1:123456789:web:abc123"
```

### Step 6: Get Backend Credentials (5 minutes)

1. In **Project settings**, go to **"Service accounts"** tab
2. Click **"Generate new private key"**
3. Click **"Generate key"**
4. **Download the JSON file** - save it somewhere safe!
5. **Open the JSON file** - you'll need:
   - `project_id`
   - `client_email`
   - `private_key`

### Step 7: Create .env Files (10 minutes)

#### Create `backend/.env`:

In the `backend` folder, create a file named `.env`:

```env
FIREBASE_PROJECT_ID=your-project-id-from-json
FIREBASE_CLIENT_EMAIL=your-client-email-from-json
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key from json\n-----END PRIVATE KEY-----\n"
FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
PORT=5000

# Cloudinary (for images - FREE!)
CLOUDINARY_CLOUD_NAME=your-cloud-name-from-step-4
CLOUDINARY_API_KEY=your-api-key-from-step-4
CLOUDINARY_API_SECRET=your-api-secret-from-step-4
```

**Note**: `FIREBASE_STORAGE_BUCKET` is optional - you can leave it if you only use Cloudinary.

**💡 Tip**: You can use the helper script:
```bash
node extract-firebase-credentials.js path/to/your-serviceAccountKey.json
```

#### Create `frontend/.env`:

In the `frontend` folder, create a file named `.env`:

```env
REACT_APP_FIREBASE_API_KEY=your-api-key-from-step-4
REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain-from-step-4
REACT_APP_FIREBASE_PROJECT_ID=your-project-id-from-step-4
REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket-from-step-4
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id-from-step-4
REACT_APP_FIREBASE_APP_ID=your-app-id-from-step-4
REACT_APP_API_URL=http://localhost:5000
```

### Step 8: Create Admin User (5 minutes)

1. Go to **Authentication** → **Users** tab
2. Click **"Add user"**
3. Enter email: `admin@tcet.com` (or your email)
4. Enter password: (save this!)
5. Click **"Add user"**
6. **Copy the User UID** (you'll see it in the user list)

### Step 9: Set Admin Role (5 minutes)

1. Go to **Firestore Database** → **Data** tab
2. Click **"Start collection"**
3. Collection ID: `users`
4. Document ID: **Paste the User UID** from Step 7
5. Add these fields:
   - Field: `email` (string) = `admin@tcet.com`
   - Field: `role` (string) = `admin`
   - Field: `createdAt` (timestamp) = current time
6. Click **"Save"**

### Step 10: Run the Project! 🎉

From the project root:

```bash
npm run dev
```

This starts:
- Backend: http://localhost:5000
- Frontend: http://localhost:3000

### Step 11: Test It

1. Open http://localhost:3000
2. Check Home page works
3. Go to Gallery
4. Click Login → Admin Login
5. Login with your admin credentials
6. Access Admin Dashboard
7. Create a test event!

## 💡 Important Notes About Free Tier

### ✅ What Works on Free Tier:
- All authentication methods (Email, Google, Phone)
- Firestore database (1GB is plenty for events)
- **Cloudinary** for images (25GB is plenty - FREE!)
- All CRUD operations
- Admin dashboard
- Gallery page

### 📊 Free Tier is Enough Because:
- Events are small (text + 1 image each)
- Typical usage: 10-50 events = < 100MB database
- **Cloudinary**: 25GB storage = thousands of images
- **Cloudinary**: 25GB bandwidth = thousands of views
- Images are optimized automatically
- You'll stay well under free limits

### ⚠️ If You Hit Limits (unlikely):
- Firebase will warn you before charges
- You can optimize images or delete old events
- Free tier resets monthly

## 🆘 Need Help?

### Common Issues:

**"Permission denied"**
- Check Firestore rules are published
- Verify admin user has `role: 'admin'` in Firestore

**"Invalid API key"**
- Double-check .env files
- Make sure no extra spaces
- Restart server

**Backend won't start**
- Check backend/.env exists
- Verify all variables are set
- Check port 5000 is free

**Frontend won't start**
- Check frontend/.env exists
- Verify all REACT_APP_ variables
- Clear cache: `npm start -- --reset-cache`

**"Billing required" message**
- You can ignore this for now
- Free tier should be enough
- Firebase won't charge without your permission

## 📚 More Help

- See `FREE_SETUP_COMPLETE.md` for complete FREE setup
- See `CLOUDINARY_SETUP.md` for Cloudinary setup
- See `SETUP_INSTRUCTIONS.md` for detailed steps
- See `FIREBASE_SETUP_GUIDE.md` for Firebase details
- See `QUICK_START.md` for quick reference

## 🎯 Important: Firebase Storage Not Needed!

- ❌ **Firebase Storage requires billing** for new projects
- ✅ **Cloudinary is FREE** and better (25GB vs 5GB)
- ✅ **Cloudinary includes CDN** and auto-optimization
- ✅ **No billing required** for Cloudinary
- ✅ **Setup is easier** with Cloudinary

## 🎉 You're Done!

Once everything works, you can:
- ✅ Manage events from Admin Dashboard
- ✅ View events in Gallery
- ✅ Customize the content
- ✅ Deploy to production

Happy coding! 🚀

