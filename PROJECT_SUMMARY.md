# TCET Capture - Project Summary

## Overview

TCET Capture is a full-stack photography club website built with React, Node.js, and Firebase. The website features smooth animations, a public gallery, and a secure admin dashboard for managing events.

## Features Implemented

### Home Page
- ✅ Fade-in welcome animation with hover effects
- ✅ Smooth scroll animations and navbar transitions
- ✅ Image slider with 4 photos
- ✅ Tagline section
- ✅ Power Behind Us section (Faculty cards)
- ✅ Team section with year-based navigation
- ✅ Testimonials carousel
- ✅ Footer with social links

### Gallery Page
- ✅ Welcome animation on page load
- ✅ Grid layout of event cards
- ✅ Each card displays:
  - Event image
  - Event name
  - Organizing club name
  - View Photos button
  - Works button
- ✅ Smooth fade animations

### Admin Dashboard
- ✅ Secure admin authentication
- ✅ CRUD operations for events:
  - Create new events
  - Edit existing events
  - Delete events
  - Upload event images
- ✅ Live preview of events
- ✅ Navigation to Home and Gallery

### Authentication
- ✅ Admin login (Email/Password)
- ✅ Client login (Email/Password, Google, OTP)
- ✅ Role-based access control
- ✅ Protected routes

## Technology Stack

### Frontend
- React 18.2.0
- Tailwind CSS 3.3.6
- Framer Motion 10.16.16
- React Router DOM 6.20.0
- Firebase SDK 10.7.1
- Axios 1.6.2
- React Icons 4.12.0

### Backend
- Node.js
- Express 4.18.2
- Firebase Admin SDK 12.0.0
- Multer 1.4.5 (for file uploads)
- UUID 9.0.1

### Database & Storage
- Firebase Firestore
- Firebase Storage
- Firebase Authentication

## Project Structure

```
tcet-capture/
├── backend/
│   ├── routes/
│   │   ├── events.js      # Event CRUD endpoints
│   │   └── auth.js        # Authentication endpoints
│   ├── server.js          # Express server
│   └── package.json
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── LoginModal.js
│   │   │   ├── ImageSlider.js
│   │   │   ├── FacultySection.js
│   │   │   ├── TeamSection.js
│   │   │   ├── Testimonials.js
│   │   │   ├── EventCard.js
│   │   │   └── Footer.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Gallery.js
│   │   │   └── AdminDashboard.js
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── config/
│   │   │   └── firebase.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
├── package.json
├── README.md
├── SETUP.md
└── .gitignore
```

## Key Components

### Navbar
- Fixed navbar with scroll effects
- Logo and "TCET Capture" text transition
- Login/Logout functionality
- Mobile responsive menu

### Home Page
- Welcome text with fade-in and hover animations
- Image slider with auto-rotate
- Faculty section with slide-in animations
- Team section with year navigation
- Testimonials carousel

### Gallery Page
- Event cards grid
- Smooth animations
- Links to external photo galleries

### Admin Dashboard
- Event management interface
- Image upload functionality
- Edit/Delete operations
- Form validation

## API Endpoints

### Events
- `GET /api/events` - Get all events (public)
- `GET /api/events/:id` - Get single event (public)
- `POST /api/events` - Create event (admin only)
- `PUT /api/events/:id` - Update event (admin only)
- `DELETE /api/events/:id` - Delete event (admin only)

### Authentication
- `POST /api/auth/verify` - Verify user token
- `POST /api/auth/set-admin` - Set admin role (setup only)

## Firebase Configuration

### Firestore Collections
- `events` - Event data
- `users` - User data with roles

### Storage
- `events/` - Event images

### Authentication
- Email/Password
- Google Sign-In
- Phone (OTP)

## Animation Features

1. **Welcome Text Animation**
   - Fade-in on page load
   - Hover tilt and lift effect
   - Fade out on scroll

2. **Navbar Transitions**
   - Fixed positioning on scroll
   - Logo appearance
   - Text size transitions

3. **Scroll Animations**
   - Faculty cards slide in from left
   - Team cards fade up
   - Smooth transitions throughout

4. **Image Slider**
   - Fade transitions between images
   - Auto-rotate every 4 seconds
   - Dot indicators

## Security Features

- Admin role verification
- Protected API endpoints
- Token-based authentication
- Secure file uploads
- Input validation

## Responsive Design

- Mobile-first approach
- Breakpoints for tablet and desktop
- Touch-friendly navigation
- Responsive grid layouts

## Future Enhancements

- [ ] Photo album viewer
- [ ] Event filtering and search
- [ ] User favorites
- [ ] Social media integration
- [ ] Email notifications
- [ ] Analytics dashboard
- [ ] Multi-language support

## Deployment

### Frontend
- Build: `npm run build`
- Deploy to: Vercel, Netlify, or Firebase Hosting

### Backend
- Deploy to: Heroku, Railway, or Google Cloud Run
- Set environment variables
- Configure CORS for production domain

## License

This project is created for TCET Capture Photography Club.

## Contact

For issues or questions, please contact the development team.


