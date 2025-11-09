# 🚀 Quick Reference - FREE Setup

## 🆓 FREE Firebase Setup (No Credit Card!)

### 1. Create Firebase Project
- Go to https://console.firebase.google.com/
- Click "Add project"
- Name: `tcet-capture`
- **Skip billing** - free tier is enough!

### 2. Enable Services (All FREE!)
- **Authentication**: Enable Email/Password
- **Firestore**: Create database (Production mode is FREE!)
- **Storage**: Enable storage (Production mode is FREE!)

### 3. Set Rules

**Firestore Rules:**
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

**Storage Rules:**
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

### 4. Get Credentials

**Frontend (.env):**
- Project Settings → Your apps → Web app
- Copy firebaseConfig values

**Backend (.env):**
- Project Settings → Service accounts
- Generate new private key
- Use JSON file values

### 5. Create Admin User
- Authentication → Add user
- Firestore → Create `users` collection
- Document ID: User UID
- Fields: `email`, `role: "admin"`, `createdAt`

### 6. Run Project
```bash
npm run dev
```

## 💡 Free Tier Limits (More Than Enough!)

- **Firestore**: 1GB storage, 50K reads/day
- **Storage**: 5GB storage, 1GB downloads/day
- **Authentication**: Unlimited users

## ✅ That's It!

Everything works on FREE tier! No credit card needed!

For detailed steps, see `GETTING_STARTED.md`


