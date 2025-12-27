# Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    @labs-gg/auth Package                     │
│                         (NPM/GitHub)                         │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ npm install
                            │
            ┌───────────────┴───────────────┐
            │                               │
            ▼                               ▼
┌───────────────────────┐       ┌───────────────────────┐
│     CFB Labs Site     │       │    NBA2KLab Site      │
│   (cfblabs.com)       │       │   (nba2klab.com)      │
└───────────────────────┘       └───────────────────────┘
            │                               │
            │                               │
            └───────────────┬───────────────┘
                            │
                            ▼
                  ┌─────────────────┐
                  │  Firebase Auth  │
                  │   (Shared)      │
                  └─────────────────┘
                            │
            ┌───────────────┼───────────────┐
            │               │               │
            ▼               ▼               ▼
    ┌──────────┐    ┌──────────┐   ┌──────────┐
    │  Google  │    │  Apple   │   │ Twitter  │
    │  OAuth   │    │  OAuth   │   │  OAuth   │
    └──────────┘    └──────────┘   └──────────┘
```

## Package Structure

```
@labs-gg/auth
│
├── Firebase Integration
│   ├── initializeFirebase()
│   ├── getFirebaseAuth()
│   └── getFirebaseApp()
│
├── Auth Hook (useAuth)
│   ├── State
│   │   ├── user
│   │   └── loading
│   │
│   ├── Email/Password
│   │   ├── loginUser()
│   │   ├── registerUser()
│   │   ├── forgotPassword()
│   │   └── sendVerificationEmail()
│   │
│   ├── Social Auth
│   │   ├── signinWithGoogle()
│   │   ├── signinWithApple()
│   │   ├── signinWithTwitter()
│   │   ├── signinWithFacebook()
│   │   └── signinWithGitHub()
│   │
│   ├── User Management
│   │   ├── isPremiumUser()
│   │   ├── isAdminUser()
│   │   ├── refreshUser()
│   │   └── signout()
│   │
│   └── Subscription
│       ├── getSubfromApi()
│       ├── cancel()
│       └── chargebeeSuccessful()
│
├── Components
│   ├── SocialAuthButtons
│   ├── GoogleButton
│   ├── AppleButton
│   ├── TwitterButton
│   └── FacebookButton
│
├── Utilities
│   ├── Error Formatting
│   │   ├── formatAuthError()
│   │   └── handleAuthError()
│   │
│   └── Validation
│       ├── loginValidationSchema
│       ├── registrationValidationSchema
│       └── forgotPasswordValidationSchema
│
└── TypeScript Types
    ├── User
    ├── AuthState
    ├── AuthContextValue
    └── AuthProviderConfig
```

## Authentication Flow

### Login Flow

```
┌──────────┐
│   User   │
└────┬─────┘
     │
     │ 1. Enter email/password
     │    or click social button
     ▼
┌─────────────────┐
│  Login Page     │
│  (Your Site)    │
└────┬────────────┘
     │
     │ 2. Call loginUser() or
     │    signinWithGoogle()
     ▼
┌─────────────────┐
│  @labs-gg/auth  │
│  useAuth hook   │
└────┬────────────┘
     │
     │ 3. Authenticate with Firebase
     ▼
┌─────────────────┐
│  Firebase Auth  │
└────┬────────────┘
     │
     │ 4. Get ID token
     ▼
┌─────────────────┐
│  Backend API    │
│  /login         │
└────┬────────────┘
     │
     │ 5. Set custom claims
     │    (premium, admin)
     ▼
┌─────────────────┐
│  Firebase       │
│  (claims set)   │
└────┬────────────┘
     │
     │ 6. Store in localStorage
     │    - authUser
     │    - claims
     ▼
┌─────────────────┐
│  User logged in │
│  Redirect home  │
└─────────────────┘
```

### Registration Flow

```
┌──────────┐
│   User   │
└────┬─────┘
     │
     │ 1. Fill registration form
     │    or use social auth
     ▼
┌─────────────────┐
│ Register Page   │
└────┬────────────┘
     │
     │ 2. Call registerUser()
     ▼
┌─────────────────┐
│  @labs-gg/auth  │
└────┬────────────┘
     │
     │ 3. Create Firebase account
     ▼
┌─────────────────┐
│  Firebase Auth  │
└────┬────────────┘
     │
     │ 4. Send verification email
     │    (optional)
     ▼
┌─────────────────┐
│  User's Email   │
└────┬────────────┘
     │
     │ 5. Verify email
     ▼
┌─────────────────┐
│  Choose plan    │
└────┬────────────┘
     │
     │ 6. Chargebee checkout
     ▼
┌─────────────────┐
│  Payment        │
└────┬────────────┘
     │
     │ 7. chargebeeSuccessful()
     │    refreshes claims
     ▼
┌─────────────────┐
│  Premium User   │
│  Full Access    │
└─────────────────┘
```

## Data Flow

### Local Storage

```javascript
{
  authUser: {
    uid: "user123",
    email: "user@example.com",
    displayName: "John Doe",
    photoURL: "...",
    emailVerified: true,
    stsTokenManager: {
      accessToken: "eyJ...",
      refreshToken: "...",
      expirationTime: 1234567890
    }
  },
  claims: {
    claims: {
      activeSub: true,
      admin: false
    },
    token: "eyJ..."
  }
}
```

### Context State

```javascript
{
  user: {
    uid: "user123",
    email: "user@example.com",
    displayName: "John Doe",
    photoURL: "...",
    emailVerified: true,
    providerId: "google.com"
  },
  loading: false
}
```

## Integration Points

### Both Sites Need

1. **Environment Variables**
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=...
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
   NEXT_PUBLIC_FIREBASE_APP_ID=...
   ```

2. **Backend Endpoints**
   - `POST /.netlify/functions/login` - Set custom claims
   - `POST /.netlify/functions/sub` - Subscription management

3. **Firebase Console**
   - OAuth providers enabled
   - Authorized domains configured
   - Email templates customized

## Deployment Strategy

```
1. Develop Package
   ├── Write code
   ├── Test locally
   └── Build TypeScript

2. Publish Package
   ├── Create GitHub repo
   ├── Push code
   └── Publish to NPM (optional)

3. Integrate CFB Labs
   ├── Install package
   ├── Update _app.tsx
   ├── Update login/register
   ├── Test thoroughly
   └── Deploy

4. Integrate NBA2KLab
   ├── Install package
   ├── Update _app.tsx
   ├── Update login/register
   ├── Test thoroughly
   └── Deploy

5. Monitor & Iterate
   ├── Watch error logs
   ├── Gather user feedback
   └── Update package as needed
```

## Benefits Visualization

### Before (Separate Auth Systems)

```
CFB Labs                    NBA2KLab
   │                           │
   ├── lib/auth.js            ├── lib/auth.js
   │   (old Firebase)         │   (new Firebase)
   │   Email only             │   Email + Social
   │                          │
   ├── /login                 ├── /login
   │   Basic form             │   Advanced form
   │                          │   Social buttons
   │                          │
   └── Different UX           └── Different UX

❌ Code duplication
❌ Inconsistent experience
❌ Hard to maintain
❌ Different error handling
```

### After (Shared Package)

```
            @labs-gg/auth
                  │
    ┌─────────────┼─────────────┐
    │                           │
CFB Labs                   NBA2KLab
    │                           │
    ├── useAuth()              ├── useAuth()
    ├── SocialAuthButtons      ├── SocialAuthButtons
    │                          │
    └── Same UX ────────────── └── Same UX

✅ Single source of truth
✅ Consistent experience
✅ Easy updates
✅ Unified error handling
```

## Version Control

```
Package Updates:
  v1.0.0 → v1.0.1 → v1.1.0 → v2.0.0
    │        │        │        │
    │        │        │        └─ Breaking changes
    │        │        └────────── New features
    │        └─────────────────── Bug fixes
    └──────────────────────────── Initial release

Both Sites Update Automatically:
  npm update @labs-gg/auth
```

## Security Model

```
Frontend (Public)
  ├── User enters credentials
  ├── Firebase handles auth
  └── Gets ID token

Backend (Secure)
  ├── Validates ID token
  ├── Sets custom claims
  │   ├── activeSub (premium status)
  │   └── admin (admin access)
  └── Returns to frontend

Storage
  ├── ID token (short-lived)
  ├── Refresh token (long-lived)
  └── Claims (cached locally)
```
