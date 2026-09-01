# Firebase Authentication Demo

A small React Native and Expo learning project created to explore Firebase Authentication and understand common user-access flows.

## Demonstrated Functionality

- Email and password registration
- Email and password login
- Google sign-in
- Password-reset emails
- Displaying the authenticated user
- Signing out

## Tech Stack

React Native, Expo, JavaScript, Expo Router, and Firebase Authentication.

## Purpose

This project was built during my mobile app development internship as a focused practice application. It helped me learn how a mobile interface communicates with Firebase Authentication, handles authentication errors, and manages basic user sessions.

## Run Locally

```bash
git clone https://github.com/amalamir608-dev/firebase-auth-demo.git
cd firebase-auth-demo
npm install
npx expo start
```

Copy `.env.example` to `.env.local`, add your Firebase web-app configuration values, and enable the required authentication providers in Firebase. Google sign-in also requires `google-services.json`, the correct OAuth client configuration, and a compatible development build.

## Note

This is an educational authentication demo rather than a production application. Production use would require stronger validation, protected-route handling, secure Firebase configuration restrictions, and comprehensive testing.

## Author

Developed by [Amal Amir Rashid](https://github.com/amalamir608-dev).
