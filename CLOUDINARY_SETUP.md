# 🆓 Cloudinary Setup Guide - FREE Image Hosting

Since Firebase Storage requires billing for new projects, we're using **Cloudinary** which has a **generous FREE tier**!

## ✅ Cloudinary FREE Tier

- **25 GB storage** (vs Firebase's 5 GB)
- **25 GB/month bandwidth** (vs Firebase's 1 GB/day)
- **25,000 transformations/month**
- **Unlimited uploads**
- **Automatic image optimization**
- **CDN delivery**

## 🚀 Setup Steps

### Step 1: Create Cloudinary Account (FREE)

1. Go to https://cloudinary.com/
2. Click **"Sign Up"** (FREE)
3. Sign up with email or Google account
4. Verify your email
5. You'll be taken to the Dashboard

### Step 2: Get Your Cloudinary Credentials

1. In Cloudinary Dashboard, you'll see your credentials:
   - **Cloud Name**
   - **API Key**
   - **API Secret**

2. **Copy these values** - you'll need them for the backend `.env` file

### Step 3: Add to Backend .env

Add these to your `backend/.env` file:

```env
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### Step 4: That's It! 🎉

Cloudinary is now configured! Images will automatically upload to Cloudinary when you create events.

## 📝 Example .env File

```env
# Firebase (for database and auth)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-client-email
FIREBASE_PRIVATE_KEY="your-private-key"
FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
PORT=5000

# Cloudinary (for image storage - FREE!)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

## 💡 Why Cloudinary?

1. **FREE tier is generous** - 25GB storage
2. **Automatic image optimization** - images are compressed automatically
3. **CDN delivery** - fast image loading worldwide
4. **Image transformations** - resize, crop, optimize on the fly
5. **No billing required** - free tier is enough for most projects

## ⚠️ Important Notes

### Firebase Storage is Optional
- Firebase Storage is **NOT required**
- If you don't configure Firebase Storage, the app will use Cloudinary only
- This is perfectly fine and recommended for free tier users!

### Image Limits
- Max file size: **10 MB** per image
- Images are automatically optimized to max 1200x800px
- Quality is auto-optimized for web

### Staying Within Free Tier
- 25 GB storage = ~2,500 images (at 10MB each, but optimized to ~1-2MB)
- 25 GB bandwidth/month = ~12,500 image views (at 2MB each)
- You'll likely never hit these limits!

## 🆘 Troubleshooting

### "Invalid cloud name" error
- Check CLOUDINARY_CLOUD_NAME in .env
- Make sure no extra spaces

### "Invalid API key" error
- Check CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET
- Verify credentials in Cloudinary Dashboard

### Images not uploading
- Check Cloudinary credentials in .env
- Restart backend server after changing .env
- Check file size (must be under 10MB)

## 📚 More Information

- Cloudinary Dashboard: https://cloudinary.com/console
- Cloudinary Documentation: https://cloudinary.com/documentation
- Free Tier Details: https://cloudinary.com/pricing

## 🎉 You're All Set!

Cloudinary is now set up and ready to use! Your images will be stored for FREE with automatic optimization and CDN delivery.

---

**Note**: Firebase Storage is completely optional. You only need Cloudinary for image storage!


