# 📝 Create Backend .env File

Since `.env` files are protected, here's how to create it manually:

## Step 1: Create the File

1. Go to the `backend` folder
2. Create a new file named `.env` (make sure it starts with a dot!)
3. Copy the contents from `backend/.env.template`

## Step 2: Copy This Content

Open `backend/.env.template` and copy all the content, OR copy this:

```env
# Firebase Configuration (for database and authentication)
FIREBASE_PROJECT_ID=tcet-capture
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-fbsvc@tcet-capture.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDKEVVLF2BG8rVc\nL12SYxLkkbZhstEntdp0EFItK3gb8gCNrHS/uWaB4PLZi1Cr1O1tLCIYLo7yEJn3\nuE5HYOae5287CAUHrdYeRQdATXmN4/zaNE5kqPJn0WqpUU5FHJefJcz5ZOCtQFpz\nInQFDprYYjFEVhAYb2duXBFXt7XqwKud2r/Ud8k48GrQtry0ZwPsnZAa5+3nTcsx\nKNVTCl0EA+sZ/gDOpW8FDlBPTX3/3ba9uQ1OENz49Ff7Wj9DJEM6C8+KAFXQGwZW\nzUsZc8T29290pxOUasJ6F1rOCmGX58CcIqu7/MW2yDUXlHqDJcqzpwjZ78YAKWdP\nhltbSWBVAgMBAAECggEAMSC/NcNQcVdzoB7U93EWiBNkPgMhhm/YlbTdIeXKbTLs\njwVhmjaLlWK5cIpGWgyqEAu1m18AeppuMLPy9jg5QeOfX8EOpgQOBax/O5NKjSSj\n1nJ2p9MKopKgBdwCdVujAnrIh88OsBiwFQOIpS0cmSTgeQ6ambJGOabxQXwlItZ3\nYPIM9/wvbFbH+txbP6Si4shuisKE4Y/z6kp/pvCaOPoxNmU7IjH6mRdrkKqVyDdq\n+3i666QFG9BS+QI3ZRtP+p82XYU5nA9TO1SyNmlmDTD8euicnoz1cAp03oHU3H1I\nD88FQI+phX2LO0V4zaUFO08QHhdM5UMZO1t47fBtCQKBgQD/CPR/NAeWBvL97rxj\nqgBUhAuPgLS0yLh0poWVjsR+JTJpftRnJMmI91fXKSNSCxKUCaR0hjllpuNyZlrS\nV+nmdDV3bLUJxNQS6j76+VGtwG4DzsayF2MM5sVgzUPrp4KiDM8BRaUoycStDZdI\nszB6VcQILWtY7mMQBhQD4wjyaQKBgQDK1RH8pg8gpF5G+boUd/0ckNT6fW6XNz13\ncR8VLvBC8o629SXjbyRdsylbwgw7iTFY/GiWF3CxS5efP93Bbn8GfAx26QQnApkn\nks+8NRL3+Wg2Vj7LmN9FIDipQ+sEpyAVr4js6HjgnZyqegBoHH51tD5bqw+BksXj\nHlxpCChpDQKBgCUk3787C7PNFUzonWWCmAO3K5vd6fO+nCbZLfGHVpTsw/fbcgIH\nuJaLN67tnehQFoebE+motulYMh4yTB4Akd9vo23eVkuy8BRFK6EP+NZuhVdmoUfE\n4jc50Rt1KeRDhGInrWqJAzH6mPt/VD5RYskefquWOeE87w6hY/7g7SepAoGATx/7\nmlG1iQhV9t4opx9/0Ar36pfP8pGMGvI4K+1ZsOQqpFjR5P1QdHUV50O1vevxIkOl\nERgn0CIrDea+PV07lG4D9sdD5WvwDy4Id+VEdxQGgVv3tzj1sGO3duCV6ATCUXNe\nuPyfWxBhM2fQjMzA0G31/ZCnxeZZ6BXJ+vdBvGkCgYAROpFuIUX14cDjYYpzydzk\nI/LoB3o+y9o9cwoJY9F7Uhh7H+TSfo2f4vb7UuG0SrtKs9AzMzojowFF5SxpZz4F\n+sYpyWIJIU6wQKYPcGqhlMLBubu8gh0WhacNeji8+Q4n8JpO5g/IMfnWPA1Zp65S\nJ76AzTlMbSeWOiiBZ6N6EA==\n-----END PRIVATE KEY-----\n"
FIREBASE_STORAGE_BUCKET=tcet-capture.firebasestorage.app
PORT=5000

# Cloudinary Configuration (for image storage - FREE!)
# TODO: Add your Cloudinary credentials after signing up at https://cloudinary.com/
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```

## Step 3: Add Cloudinary Credentials

After you sign up for Cloudinary (see `CLOUDINARY_QUICK_SETUP.md`), replace these lines:

```env
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```

With your actual Cloudinary credentials.

## Step 4: Verify

Make sure:
- ✅ File is named `.env` (with a dot at the start)
- ✅ File is in the `backend` folder
- ✅ All Firebase values are filled in
- ✅ Cloudinary values will be added after signup

## ✅ Done!

Your backend `.env` file is ready! Once you add Cloudinary credentials, you can start the server.


