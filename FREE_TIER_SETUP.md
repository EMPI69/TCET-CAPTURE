# 🆓 FREE Tier Setup Guide - No Credit Card Required!

This project is **100% compatible with Firebase's FREE Spark plan**. No premium features needed!

## ✅ Everything Works on FREE Tier

### What's Included in Firebase FREE Tier:
- ✅ **Authentication**: Unlimited users
- ✅ **Firestore**: 1GB storage, 50K reads/day, 20K writes/day
- ✅ **Storage**: 5GB storage, 1GB downloads/day
- ✅ **Hosting**: 10GB storage, 360MB/day transfers

### Is FREE Tier Enough?
**YES!** For a photography club website:
- Events are small (text + 1 image)
- 50 events = ~50-100MB (well under 1GB)
- Images are optimized
- Typical usage: 100-500 reads/day (well under 50K)
- You'll never hit free tier limits!

## 🚀 Setup Steps (All FREE!)

### Step 1: Create Firebase Project (FREE)

1. Go to https://console.firebase.google.com/
2. Sign in with Google account
3. Click **"Add project"**
4. Name: `tcet-capture`
5. **Disable Google Analytics** (optional, saves resources)
6. **DO NOT enable billing** - not needed!
7. Create project

### Step 2: Enable Services (All FREE)

#### Authentication (FREE)
- Go to **Authentication** → **Get started**
- Enable **Email/Password** (FREE)
- Enable **Google** (FREE, optional)
- Enable **Phone** (FREE, optional)

#### Firestore (FREE)
- Go to **Firestore Database** → **Create database**
- Choose **Production mode** (this is FREE, don't worry!)
- Location: `us-central1` (or closest to you)
- **Enable** - it's FREE!
- If you see "billing" mentioned, you can skip it

#### Storage (FREE)
- Go to **Storage** → **Get started**
- Choose **Production mode** (FREE!)
- Same location as Firestore
- **Done** - it's FREE!

### Step 3: Set Rules (FREE)

#### Firestore Rules:
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

#### Storage Rules:
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

### Step 4: Get Credentials (FREE)

Follow the same steps as in `GETTING_STARTED.md`:
1. Get Web App config (frontend)
2. Get Service Account key (backend)
3. Create .env files

## 💰 Cost Breakdown

### FREE Tier Includes:
- **Firestore**: 1GB storage, 50K reads/day, 20K writes/day
- **Storage**: 5GB storage, 1GB downloads/day
- **Authentication**: Unlimited
- **Bandwidth**: Generous free limits

### Your Project Will Use:
- **Storage**: ~50-100MB (50 events × 1-2MB each)
- **Reads**: ~100-500/day (well under 50K)
- **Writes**: ~10-50/day (well under 20K)
- **Bandwidth**: ~100-500MB/month (well under limits)

### Result: **$0.00/month** 💰

## ⚠️ Important Notes

### Billing Alerts:
- Firebase will **warn you** if you approach limits
- You can **set up budget alerts** (free)
- You **won't be charged** without explicit approval

### If You Hit Limits (Very Unlikely):
1. Firebase will send email warnings
2. You can optimize (compress images, delete old events)
3. Free tier resets monthly
4. You can upgrade only if needed (unlikely)

### Staying Within Free Tier:
- Compress images before uploading (recommended)
- Delete old/unused events periodically
- Monitor usage in Firebase Console
- Set up budget alerts (free)

## 🎯 Optimizations for Free Tier

### Image Optimization:
- Compress images before uploading (use online tools)
- Recommended size: < 2MB per image
- Use JPEG for photos (smaller than PNG)

### Database Optimization:
- Delete old events you don't need
- Use efficient queries
- Index only what you need

## ✅ Verification

After setup, verify everything works:
1. Create a test event (small image)
2. Check Firebase Console → Usage
3. Verify you're using free tier
4. Check no billing is enabled

## 🆘 Troubleshooting

### "Billing required" message:
- **Ignore it** for now
- Free tier should be enough
- Firebase won't charge without approval

### "Quota exceeded" error:
- Very unlikely on free tier
- Check if you're actually on free plan
- Contact Firebase support (free)

### Want to check usage:
- Go to Firebase Console → Usage and billing
- See real-time usage
- Set up alerts (free)

## 🎉 You're All Set!

Everything works on **FREE tier**! No credit card needed, no charges, no worries!

Follow `GETTING_STARTED.md` for the complete setup process.

---

**Remember**: Firebase FREE tier is generous and perfect for this project. You won't need to pay anything! 🆓


