# 🚀 Start Backend Server - FIX YOUR ISSUE!

Your Firestore is set up correctly with `role: "admin"`, but the backend needs to be running to verify it!

## Quick Fix (2 steps):

### Step 1: Start Backend Server

Open a **NEW terminal window** and run:

```bash
cd "A:\Hacker\Code\TCET CAPTURE\backend"
npm run dev
```

You should see:
```
Firebase Admin initialized successfully
Server is running on port 5000
```

**Keep this terminal open!** The backend needs to keep running.

### Step 2: Refresh Dashboard

1. Go to: http://localhost:3000/admin
2. Click the **"Refresh Page"** button
3. The dashboard should now work! 🎉

## What You Should See:

After refreshing, you should see:
- ✅ **"Add New Event"** button (big orange button)
- ✅ Empty list or list of events
- ✅ No more error message!

## Check Backend Logs:

When you refresh the dashboard, check the backend terminal. You should see:
```
Verifying user: FgZb64U1WBRDVr7612pTpOpoNvZ2 adityamishra1337@gmail.com
User role found: admin for user: FgZb64U1WBRDVr7612pTpOpoNvZ2
```

If you see errors instead, that's the problem!

## Common Issues:

### "Port 5000 already in use"
**Solution**: 
- Kill the process using port 5000
- Or change PORT in `backend/.env` to another port (e.g., 5001)
- Update `REACT_APP_API_URL` in `frontend/.env` to match

### "Firebase Admin initialization error"
**Solution**: 
- Check `backend/.env` file has correct Firebase credentials
- Make sure private key is formatted correctly

### "Cannot connect to backend"
**Solution**: 
- Make sure backend is running
- Check if port 5000 is accessible
- Check firewall settings

## To Add Events:

Once the dashboard loads:

1. Click **"Add New Event"** button
2. Fill in:
   - Event Name: `Test Event`
   - Organizing Club: `TCET Capture`
   - View Photos Link: `https://example.com/photos` (optional)
   - Works Link: `https://example.com/works` (optional)
   - Event Image: Click to upload a photo
3. Click **"Create Event"**
4. Done! Event appears in Gallery

## 🎯 Summary:

1. ✅ Your Firestore is correct (role: "admin")
2. ⚠️ Backend server must be running
3. ⚠️ Refresh dashboard after backend starts
4. ✅ Dashboard should work!

---

**The backend MUST be running for the dashboard to work!** Start it now and refresh! 🚀


