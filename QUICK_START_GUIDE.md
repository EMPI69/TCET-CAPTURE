# 🚀 Quick Start Guide - Run Your Website

## ✅ Current Status:

- ✅ Backend is running on port 5000
- ⚠️ Frontend needs to be started

## 🎯 To See Your Website:

### Option 1: Start Frontend Only (Recommended)

Open a **NEW terminal window** and run**:

```bash
cd "A:\Hacker\Code\TCET CAPTURE\frontend"
npm start
```

Wait for it to compile (30-60 seconds), then:
- **Browser will open automatically** to http://localhost:3000
- **OR** manually open: http://localhost:3000

### Option 2: Start Both (If Backend Stops)

From project root:

```bash
cd "A:\Hacker\Code\TCET CAPTURE"
npm run dev
```

This starts both frontend and backend.

## 🌐 Your Website URLs:

- **Homepage**: http://localhost:3000
- **Gallery**: http://localhost:3000/gallery
- **Admin Dashboard**: http://localhost:3000/admin (after login)
- **Backend API**: http://localhost:5000/api/health

## 📋 What You Should See:

### When Frontend Starts:
```
Compiled successfully!

You can now view tcet-capture in the browser.

  Local:            http://localhost:3000
```

### In Your Browser:
- **TCET Capture** homepage
- Welcome animation
- Navigation bar
- Image slider
- All sections working

## 🆘 Troubleshooting:

### Frontend Won't Start:
1. **Check if port 3000 is in use**:
   ```bash
   netstat -ano | findstr ":3000"
   ```
2. **Kill the process** if needed
3. **Or change port** in `frontend/.env`: `PORT=3001`

### "Cannot GET /" Error:
- Make sure you're going to **http://localhost:3000** (not 5000)
- Frontend runs on port 3000
- Backend runs on port 5000

### Blank Page:
1. **Open browser console** (F12)
2. **Check for errors** in Console tab
3. **Check Network tab** for failed requests
4. **Check frontend terminal** for compilation errors

### "Module not found" Errors:
```bash
cd frontend
npm install
```

### Backend Not Running:
```bash
cd backend
npm run dev
```

## ✅ Quick Checklist:

- [ ] Backend running (port 5000) ✅
- [ ] Frontend running (port 3000) ⚠️ Start it!
- [ ] Browser open to http://localhost:3000
- [ ] No errors in terminal
- [ ] No errors in browser console

## 🎉 Once It's Running:

1. **Homepage**: http://localhost:3000
2. **Gallery**: http://localhost:3000/gallery
3. **Login**: Click login icon → Admin Login
4. **Dashboard**: http://localhost:3000/admin (after login)

---

**Start the frontend now and your website will be visible!** 🚀


