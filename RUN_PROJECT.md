# 🚀 How to Run Your Project

## Quick Start (Both Frontend + Backend)

From the project root directory:

```bash
npm run dev
```

This will start:
- **Backend** on http://localhost:5000
- **Frontend** on http://localhost:3000

## Or Run Separately:

### Start Backend Only:
```bash
cd backend
npm run dev
```

### Start Frontend Only:
```bash
cd frontend
npm start
```

## What You Should See:

### Backend Terminal:
```
Cloudinary not configured - image uploads will require Cloudinary credentials
Firebase Admin initialized successfully
Server is running on port 5000
```

### Frontend Terminal:
```
Compiled successfully!

You can now view tcet-capture in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000
```

## Open Your Website:

1. **Open browser**
2. **Go to**: http://localhost:3000
3. **You should see**: The TCET Capture homepage!

## Troubleshooting:

### "Port 3000 already in use"
**Solution**: 
- Kill the process using port 3000
- Or change port in `frontend/.env`: `PORT=3001`

### "Port 5000 already in use"
**Solution**: 
- Kill the process using port 5000
- Or change port in `backend/.env`: `PORT=5001`
- Update `frontend/.env`: `REACT_APP_API_URL=http://localhost:5001`

### "Cannot GET /"
**Solution**: 
- Make sure frontend is running
- Check http://localhost:3000 (not 5000)

### "Network Error" or "Cannot connect to backend"
**Solution**: 
- Make sure backend is running on port 5000
- Check backend terminal for errors
- Verify `backend/.env` file exists

### Website shows blank page
**Solution**: 
- Check browser console (F12) for errors
- Check frontend terminal for compilation errors
- Make sure all dependencies are installed

## Check if Everything is Running:

### Check Backend:
Open: http://localhost:5000/api/health
Should see: `{"status":"ok","message":"TCET Capture API is running"}`

### Check Frontend:
Open: http://localhost:3000
Should see: TCET Capture homepage

## Quick Checklist:

- [ ] Backend server running (port 5000)
- [ ] Frontend server running (port 3000)
- [ ] Browser open to http://localhost:3000
- [ ] No errors in terminal
- [ ] No errors in browser console (F12)

## Need Help?

1. **Check terminal output** for errors
2. **Check browser console** (F12 → Console tab)
3. **Verify ports are free**: `netstat -ano | findstr ":3000 :5000"`
4. **Restart everything**: Stop all processes, then run `npm run dev` again

---

**Your website should be at: http://localhost:3000** 🎉


