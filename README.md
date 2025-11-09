# TCET Capture - Photography Club Website

A full-stack website for TCET Capture, the photography club of TCET.

## 🆓 100% FREE!

✅ **Works completely FREE** with Firebase's free Spark plan!
- No credit card required
- No premium features needed
- All features work on free tier
- See `FREE_TIER_SETUP.md` for details

## Features

- **Home Page** with smooth animations and scroll effects
- **Gallery Page** displaying event cards with photos
- **Admin Dashboard** for managing events (CRUD operations)
- **Authentication** with Admin and Client login options
- **Responsive Design** with modern UI/UX

## Tech Stack

- **Frontend**: React, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express
- **Database**: Firebase Firestore (FREE tier)
- **Storage**: Firebase Storage (FREE tier)
- **Authentication**: Firebase Auth (FREE tier)

## Quick Start

🆓 **Free Setup**: See [FREE_TIER_SETUP.md](./FREE_TIER_SETUP.md) for free tier setup guide

For detailed setup instructions, see [GETTING_STARTED.md](./GETTING_STARTED.md) or [QUICK_START.md](./QUICK_START.md)

1. Install dependencies:
```bash
npm run install-all
```

2. Set up environment variables (see [SETUP.md](./SETUP.md) for details)

3. Run the development server:
```bash
npm run dev
```

## Documentation

- **[QUICK_START.md](./QUICK_START.md)** - Quick setup guide
- **[SETUP.md](./SETUP.md)** - Detailed setup instructions
- **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)** - Project overview and features

## Project Structure

```
tcet-capture/
├── frontend/          # React frontend application
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── context/     # React context
│   │   └── config/      # Configuration files
│   └── public/          # Public assets
├── backend/           # Express backend server
│   ├── routes/         # API routes
│   └── server.js       # Server entry point
└── package.json       # Root package.json
```

## Environment Variables

### Backend (.env)
See [SETUP.md](./SETUP.md) for detailed instructions.

```
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-client-email
FIREBASE_PRIVATE_KEY=your-private-key
FIREBASE_STORAGE_BUCKET=your-storage-bucket
PORT=5000
```

### Frontend (.env)
```
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id
REACT_APP_API_URL=http://localhost:5000
```

## Logo Setup

Add your logo image to `frontend/public/logo.png` for it to appear in the navbar.

## License

This project is created for TCET Capture Photography Club.

