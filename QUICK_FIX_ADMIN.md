# 🚨 QUICK FIX: Can't Access Admin Dashboard?

## The Problem:
You logged in but can't see the dashboard or add events.

## The Solution (2 minutes):

### Step 1: Get Your User UID

1. Go to **Firebase Console**: https://console.firebase.google.com/
2. Select project: **tcet-capture**
3. Go to **Authentication** → **Users**
4. Find your user (the one you logged in with)
5. **Copy the UID** (it's a long string like `abc123xyz456...`)

### Step 2: Set Admin Role in Firestore

1. Go to **Firestore Database** → **Data** tab
2. Click **"Start collection"** (if `users` collection doesn't exist)
   - Collection ID: `users`
   - Click **Next**
3. **Document ID**: Paste your User UID (from Step 1)
4. **Add Fields**:
   - Field 1: `email` → Type: `string` → Value: `your-email@example.com`
   - Field 2: `role` → Type: `string` → Value: `admin` ⚠️ **MUST be exactly "admin"**
   - Field 3: `createdAt` → Type: `timestamp` → Value: Click and select current time
5. Click **"Save"**

### Step 3: Refresh the Dashboard

1. Go to: http://localhost:3000/admin
2. **Refresh the page** (F5)
3. You should now see the dashboard! 🎉

## ✅ What You Should See:

- **"Add New Event"** button (big orange button)
- Empty list or list of events
- Ability to upload images and create events

## 🎯 To Add Events:

1. Click **"Add New Event"** button
2. Fill in:
   - Event Name (required)
   - Organizing Club (required)
   - View Photos Link (optional)
   - Works Link (optional)
   - Event Image (click to upload)
3. Click **"Create Event"**
4. Done! Event is created and visible in Gallery

## 🆘 Still Not Working?

### Check These:

1. **Backend Server Running?**
   - Open terminal
   - Go to `backend` folder
   - Run: `npm run dev`
   - Should see: "Server is running on port 5000"

2. **Cloudinary Setup?**
   - If you want to upload images, you need Cloudinary credentials in `backend/.env`
   - See `CLOUDINARY_QUICK_SETUP.md`

3. **Browser Console Errors?**
   - Press F12
   - Check "Console" tab
   - Look for red errors

### Common Issues:

**"Permission denied"**
- Check Firestore rules are published
- Verify `role: "admin"` is set correctly (no typos!)

**"Network Error"**
- Backend is not running
- Start backend: `cd backend && npm run dev`

**Dashboard redirects to home**
- Your user role is not set to "admin"
- Follow Step 2 above

## 📸 Screenshot Guide:

### Firestore Document Should Look Like:
```
Collection: users
Document: [Your User UID]
Fields:
  email: "admin@tcet.com"
  role: "admin"  ← This is the important one!
  createdAt: [timestamp]
```

---

**That's it!** Once you set `role: "admin"` in Firestore, refresh the page and you'll see the dashboard! 🚀


