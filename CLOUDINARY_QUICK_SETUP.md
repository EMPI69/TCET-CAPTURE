# 🚀 Quick Cloudinary Setup (2 minutes)

You need Cloudinary credentials to complete the setup. Here's how to get them:

## Step 1: Sign Up (FREE, no credit card)

1. Go to https://cloudinary.com/
2. Click **"Sign Up"** button
3. Sign up with:
   - Email (or use Google sign-in)
   - Choose a password
4. Verify your email if needed

## Step 2: Get Your Credentials

Once logged in, you'll see the Dashboard with:

1. **Cloud Name** - Usually something like `dxxxxx`
2. **API Key** - A long number like `123456789012345`
3. **API Secret** - A long string (click "Reveal" to see it)

## Step 3: Add to Backend .env

Open `backend/.env` and replace these lines:

```env
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```

With your actual values:

```env
CLOUDINARY_CLOUD_NAME=dxxxxx
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=your-actual-secret-here
```

## Step 4: Save and Restart

1. Save the `backend/.env` file
2. Restart your backend server

## ✅ That's It!

Your Cloudinary setup is complete! Images will now be stored for FREE on Cloudinary.

## 💡 Why Cloudinary?

- **FREE tier**: 25 GB storage (vs Firebase's 5 GB)
- **FREE bandwidth**: 25 GB/month
- **Automatic optimization**: Images are compressed automatically
- **CDN delivery**: Fast image loading worldwide
- **No billing required**: Completely free!

## 🆘 Need Help?

- Cloudinary Dashboard: https://cloudinary.com/console
- See `CLOUDINARY_SETUP.md` for detailed instructions

---

**Important**: Don't share your API Secret with anyone! Keep it safe in your `.env` file.


