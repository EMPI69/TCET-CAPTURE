# 🚨 Admin Dashboard Setup - FIX THIS!

If you can't access the admin dashboard after logging in, follow these steps:

## ✅ Step 1: Check if You're Logged In

1. After logging in, check the navbar
2. You should see "Logout" button (not "Login")
3. If you see "Login", you're not logged in - try logging in again

## ✅ Step 2: Set Admin Role in Firestore

**This is the most important step!** Your user needs to have `role: 'admin'` in Firestore.

### How to Set Admin Role:

1. **Go to Firebase Console**: https://console.firebase.google.com/
2. **Select your project**: `tcet-capture`
3. **Go to Firestore Database** → **Data** tab
4. **Check if `users` collection exists**:
   - If it exists, find your user document
   - If it doesn't exist, create it (see below)

### Create/Update User Document:

1. **Click "Start collection"** (if collection doesn't exist)
   - Collection ID: `users`
   - Document ID: **Your User UID** (see below how to get it)

2. **Or click on existing `users` collection**
   - Find document with your User UID
   - Or create new document with your User UID

3. **Add/Update Fields**:
   - `email` (string): Your email (e.g., `admin@tcet.com`)
   - `role` (string): `admin` (MUST be exactly "admin")
   - `createdAt` (timestamp): Current time

### How to Get Your User UID:

**Option 1: From Firebase Console**
1. Go to **Authentication** → **Users**
2. Find your user (by email)
3. Click on it - you'll see the **UID** (copy it)

**Option 2: From Browser Console**
1. Open browser console (F12)
2. After logging in, type: `firebase.auth().currentUser.uid`
3. Copy the UID

**Option 3: From the Error Message**
- If you see an error on the dashboard, it will show your UID

## ✅ Step 3: Verify Backend is Running

The dashboard needs the backend server to be running.

1. **Open terminal**
2. **Go to backend folder**: `cd backend`
3. **Start server**: `npm run dev` (or `npm start`)
4. **Check if it's running**: You should see "Server is running on port 5000"

## ✅ Step 4: Check Backend .env File

Make sure `backend/.env` has:
- Firebase credentials
- Cloudinary credentials (if you want to upload images)

## ✅ Step 5: Refresh the Page

After setting the admin role:
1. Go back to the dashboard: http://localhost:3000/admin
2. **Refresh the page** (F5 or Ctrl+R)
3. You should now see the dashboard!

## 🎯 Quick Checklist

- [ ] User is logged in (see "Logout" button in navbar)
- [ ] `users` collection exists in Firestore
- [ ] User document exists with your User UID
- [ ] User document has `role: "admin"` field
- [ ] Backend server is running on port 5000
- [ ] Backend .env file is configured
- [ ] Page is refreshed after setting admin role

## 🆘 Still Not Working?

### Check Browser Console:
1. Open browser console (F12)
2. Look for errors
3. Check if there are any red error messages

### Check Backend Logs:
1. Look at the backend terminal
2. Check for any error messages
3. Make sure Firebase Admin is initialized

### Common Issues:

**"Permission denied"**
- Check Firestore rules are published
- Verify admin user has `role: 'admin'` in Firestore

**"Network Error"**
- Backend server is not running
- Check if backend is on port 5000
- Check if CORS is enabled

**"Invalid token"**
- User might not be logged in
- Try logging out and logging in again

## 🎉 Once It Works:

You should see:
- **"Add New Event"** button
- List of events (if any)
- Ability to create, edit, and delete events
- Image upload functionality

## 📝 Example Firestore Document:

```
Collection: users
Document ID: [Your User UID]
Fields:
  - email: "admin@tcet.com" (string)
  - role: "admin" (string)
  - createdAt: [timestamp]
```

---

**Need more help?** Check the browser console and backend logs for specific error messages!


