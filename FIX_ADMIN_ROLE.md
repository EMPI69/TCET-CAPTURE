# 🔧 Fix: Admin Role Not Working

I can see from your screenshots that:
1. ✅ You HAVE set `role: "admin"` in Firestore correctly
2. ❌ But the dashboard still says "Admin Access Required"

## The Problem:
The backend server needs to verify your role from Firestore, but either:
- Backend server is not running
- Backend can't connect to Firestore
- There's a caching/timing issue

## Quick Fix (3 steps):

### Step 1: Make Sure Backend is Running

Open a terminal and run:

```bash
cd backend
npm run dev
```

You should see:
```
Firebase Admin initialized successfully
Server is running on port 5000
```

**If you see errors**, check:
- Is `backend/.env` file configured correctly?
- Are Firebase credentials correct?

### Step 2: Refresh Your Browser

1. Go to: http://localhost:3000/admin
2. Open browser console (F12)
3. Click "Refresh Page" button on the dashboard
4. Check console for any errors

### Step 3: Check Backend Logs

Look at the backend terminal. When you refresh the dashboard, you should see:
```
Verifying user: FgZb64U1WBRDVr7612pTpOpoNvZ2 adityamishra1337@gmail.com
User role found: admin for user: FgZb64U1WBRDVr7612pTpOpoNvZ2
```

If you see errors instead, that's the problem!

## Common Issues:

### Issue 1: Backend Not Running
**Solution**: Start the backend server
```bash
cd backend
npm run dev
```

### Issue 2: Backend Can't Connect to Firestore
**Solution**: Check `backend/.env` file has correct Firebase credentials

### Issue 3: CORS Error
**Solution**: Make sure backend CORS is enabled (it should be)

### Issue 4: Port 5000 Already in Use
**Solution**: Kill the process using port 5000 or change PORT in `.env`

## Verify It's Working:

1. **Backend running**: Check terminal shows "Server is running on port 5000"
2. **Frontend running**: Check browser shows http://localhost:3000
3. **Refresh dashboard**: Click "Refresh Page" button
4. **Check backend logs**: Should show "User role found: admin"
5. **Dashboard should load**: Should see "Add New Event" button

## Still Not Working?

### Debug Steps:

1. **Check browser console** (F12 → Console tab):
   - Look for errors
   - Check network requests to `/api/auth/verify`

2. **Check backend terminal**:
   - Look for error messages
   - Check if Firebase Admin initialized

3. **Test backend directly**:
   - Open: http://localhost:5000/api/health
   - Should see: `{"status":"ok","message":"TCET Capture API is running"}`

4. **Check Firestore rules**:
   - Make sure rules allow reads for authenticated users
   - Rules should allow reading from `users` collection

## Quick Test:

1. Start backend: `cd backend && npm run dev`
2. Refresh dashboard page
3. Check backend terminal for logs
4. Check browser console for errors

If backend shows "User role found: admin" but dashboard still shows error, there might be a caching issue - try:
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Clear browser cache
- Logout and login again

---

**Your Firestore setup is correct!** The issue is likely just that the backend needs to be running to verify your role. Once the backend is running and can read from Firestore, the dashboard should work! 🚀


