# 🚀 Next Steps - Complete Your Setup

You've already set up Firebase frontend! Now let's complete the backend setup.

## ✅ What You've Done:
- ✅ Firebase project created: `tcet-capture`
- ✅ Frontend Firebase config obtained
- ✅ Frontend `.env` file created

## 📋 What You Need to Do Next:

### Step 1: Get Firebase Backend Credentials (5 minutes)

Your backend needs Firebase Admin SDK credentials to access Firestore and Authentication.

1. **Go to Firebase Console**: https://console.firebase.google.com/
2. **Select your project**: `tcet-capture`
3. **Click the gear icon (⚙️)** → **Project settings**
4. **Go to "Service accounts" tab**
5. **Click "Generate new private key"**
6. **Click "Generate key"** in the dialog
7. **A JSON file will download** - save it safely!

The JSON file contains:
- `project_id`: `tcet-capture`
- `client_email`: something like `firebase-adminsdk-xxxxx@tcet-capture.iam.gserviceaccount.com`
- `private_key`: a long string starting with `-----BEGIN PRIVATE KEY-----`

### Step 2: Set Up Cloudinary (FREE Image Hosting) - 5 minutes

Since we're not using Firebase Storage, we need Cloudinary for images.

1. **Go to https://cloudinary.com/**
2. **Click "Sign Up"** (FREE, no credit card needed)
3. **Sign up** with email or Google account
4. **Verify your email** if needed
5. **In the Dashboard**, you'll see:
   - **Cloud Name**
   - **API Key**
   - **API Secret**
6. **Copy these 3 values** - you'll need them!

### Step 3: Create Backend .env File

Create a file named `.env` in the `backend` folder with this content:

```env
# Firebase (for database and authentication)
FIREBASE_PROJECT_ID=tcet-capture
FIREBASE_CLIENT_EMAIL=your-client-email-from-service-account-json
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key from JSON\n-----END PRIVATE KEY-----\n"
FIREBASE_STORAGE_BUCKET=tcet-capture.firebasestorage.app
PORT=5000

# Cloudinary (for image storage - FREE!)
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```

**How to fill it:**

1. **FIREBASE_PROJECT_ID**: `tcet-capture` (you already have this)

2. **FIREBASE_CLIENT_EMAIL**: 
   - Open the service account JSON file you downloaded
   - Copy the `client_email` value
   - Example: `firebase-adminsdk-xxxxx@tcet-capture.iam.gserviceaccount.com`

3. **FIREBASE_PRIVATE_KEY**:
   - Open the service account JSON file
   - Copy the `private_key` value (it's a long string)
   - Keep the quotes and include `\n` for newlines
   - Example: `"-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQ...\n-----END PRIVATE KEY-----\n"`

4. **FIREBASE_STORAGE_BUCKET**: `tcet-capture.firebasestorage.app` (you already have this)

5. **CLOUDINARY_CLOUD_NAME**: From Cloudinary dashboard

6. **CLOUDINARY_API_KEY**: From Cloudinary dashboard

7. **CLOUDINARY_API_SECRET**: From Cloudinary dashboard

### Step 4: Enable Firebase Services

Make sure these are enabled in Firebase Console:

#### A. Authentication
1. Go to **Authentication** → **Get started**
2. Enable **Email/Password** sign-in method
3. (Optional) Enable **Google** sign-in

#### B. Firestore Database
1. Go to **Firestore Database**
2. Click **"Create database"** if not created
3. Choose **Production mode**
4. Select location (e.g., `us-central1`)
5. Enable database

#### C. Set Firestore Rules
1. Go to **Firestore Database** → **Rules** tab
2. Replace with:

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

### Step 5: Create Admin User

1. Go to **Authentication** → **Users** tab
2. Click **"Add user"**
3. Enter email: `admin@tcet.com` (or your email)
4. Enter password: (save this securely!)
5. Click **"Add user"**
6. **Copy the User UID** (you'll see it in the user list)

### Step 6: Set Admin Role in Firestore

1. Go to **Firestore Database** → **Data** tab
2. Click **"Start collection"**
3. Collection ID: `users`
4. Document ID: **Paste the User UID** from Step 5
5. Add fields:
   - `email` (string): `admin@tcet.com`
   - `role` (string): `admin`
   - `createdAt` (timestamp): Click and select current time
6. Click **"Save"**

### Step 7: Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 8: Run the Project! 🎉

From the project root directory:

```bash
npm run dev
```

This will start:
- Backend server on http://localhost:5000
- Frontend app on http://localhost:3000

### Step 9: Test It!

1. Open http://localhost:3000
2. Check Home page loads
3. Navigate to Gallery
4. Click Login icon → Admin Login
5. Login with your admin credentials
6. Access Admin Dashboard
7. Create a test event with an image!

## 🆘 Troubleshooting

### "Invalid private key" error
- Make sure the private key in `.env` has quotes
- Keep the `\n` characters for newlines
- Copy the entire key including `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`

### "Cloudinary upload failed"
- Check Cloudinary credentials in backend/.env
- Verify Cloudinary account is active
- Check image size (must be under 10MB)

### "Permission denied" in Firestore
- Check Firestore rules are published
- Verify admin user has `role: 'admin'` in Firestore

### Backend won't start
- Check backend/.env file exists
- Verify all environment variables are set
- Check port 5000 is not in use

## 📝 Quick Checklist

- [ ] Firebase Service Account JSON downloaded
- [ ] Cloudinary account created
- [ ] Cloudinary credentials obtained
- [ ] Backend `.env` file created with all values
- [ ] Firebase Authentication enabled
- [ ] Firestore Database created
- [ ] Firestore rules set
- [ ] Admin user created in Authentication
- [ ] Admin role set in Firestore
- [ ] Backend dependencies installed
- [ ] Project runs successfully

## 🎉 You're Almost There!

Once you complete these steps, your project will be fully set up and ready to use!

---

**Need help?** See:
- `CLOUDINARY_SETUP.md` for detailed Cloudinary setup
- `GETTING_STARTED.md` for complete setup guide
- `FREE_SETUP_COMPLETE.md` for free tier information


