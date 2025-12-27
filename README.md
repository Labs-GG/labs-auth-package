# @labs-gg/auth

Unified authentication package for Labs.GG projects (CFB Labs & NBA2KLab).

## Features

- 🔐 **Multiple Auth Methods**: Email/Password, Google, Apple, Twitter/X, Facebook, GitHub
- 🔥 **Firebase Integration**: Built on Firebase Auth v10 with modular SDK
- ⚛️ **React/Next.js Ready**: Hooks and context providers for easy integration
- 📝 **Form Validation**: Built-in Yup schemas for common auth forms
- 🎨 **Customizable UI**: Pre-built components with styling flexibility
- 💳 **Subscription Support**: Premium user status and Chargebee integration
- 🌐 **SSR Compatible**: Works with Next.js server-side rendering
- 📦 **TypeScript**: Full type definitions included

## Installation

```bash
npm install @labs-gg/auth
# or
yarn add @labs-gg/auth
```

### Peer Dependencies

Make sure you have these installed:

```bash
npm install react react-dom next firebase axios formik yup
```

## Quick Start

### 1. Initialize Firebase

In your `_app.tsx` or root component:

```tsx
import { initializeFirebase, AuthProvider } from '@labs-gg/auth';

// Initialize Firebase (do this once at app startup)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

initializeFirebase(firebaseConfig);

// Wrap your app with AuthProvider
const authConfig = {
  firebaseConfig,
  apiEndpoints: {
    login: '/.netlify/functions/login',
    subscription: '/.netlify/functions/sub',
  },
  redirects: {
    afterLogin: '/',
    afterLogout: '/',
    loginPage: '/login',
    registerPage: '/register',
  },
};

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider config={authConfig}>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
```

### 2. Use Auth in Components

```tsx
import { useAuth } from '@labs-gg/auth';

function LoginPage() {
  const { loginUser, signinWithGoogle, user, loading } = useAuth();
  
  const handleEmailLogin = async (values) => {
    const error = await loginUser(values);
    if (error) {
      console.error(error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (user) return <div>Welcome, {user.email}</div>;

  return (
    <div>
      {/* Your login form */}
      <button onClick={signinWithGoogle}>Sign in with Google</button>
    </div>
  );
}
```

### 3. Use Pre-built Components

```tsx
import { SocialAuthButtons } from '@labs-gg/auth';
import { useAuth } from '@labs-gg/auth';

function SocialLogin() {
  const { 
    signinWithGoogle, 
    signinWithApple, 
    signinWithTwitter 
  } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSocialAuth = async (authFn) => {
    setLoading(true);
    const error = await authFn();
    if (error) alert(error);
    setLoading(false);
  };

  return (
    <SocialAuthButtons
      onGoogleClick={() => handleSocialAuth(signinWithGoogle)}
      onAppleClick={() => handleSocialAuth(signinWithApple)}
      onTwitterClick={() => handleSocialAuth(signinWithTwitter)}
      loading={loading}
      providers={['google', 'apple', 'twitter']}
    />
  );
}
```

## API Reference

### `useAuth()` Hook

Returns an object with authentication methods and state:

#### State
- `user: User | null` - Current authenticated user
- `loading: boolean` - Auth initialization state

#### Email/Password Methods
- `loginUser(credentials)` - Sign in with email/password
- `registerUser(credentials)` - Create new account
- `signout()` - Sign out current user
- `forgotPassword(values)` - Send password reset email

#### Social Authentication Methods
- `signinWithGoogle(skipRedirect?)` - Sign in with Google
- `signinWithApple(skipRedirect?)` - Sign in with Apple
- `signinWithFacebook(skipRedirect?)` - Sign in with Facebook
- `signinWithTwitter(skipRedirect?)` - Sign in with Twitter/X
- `signinWithGitHub()` - Sign in with GitHub

#### User Management
- `sendVerificationEmail()` - Send email verification
- `refreshUser()` - Refresh user data
- `isPremiumUser(handleRedirect?)` - Check premium status
- `isAdminUser()` - Check admin status
- `getSubfromApi()` - Get subscription details
- `cancel()` - Cancel subscription
- `chargebeeSuccessful()` - Refresh after Chargebee checkout

#### Utilities
- `formatError(error)` - Format error messages

### Social Auth Components

#### `<SocialAuthButtons />`

Pre-styled social authentication buttons.

**Props:**
```tsx
{
  onGoogleClick?: () => void;
  onAppleClick?: () => void;
  onTwitterClick?: () => void;
  onFacebookClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  providers?: ('google' | 'apple' | 'twitter' | 'facebook')[];
  orientation?: 'vertical' | 'horizontal';
  className?: string;
  style?: CSSProperties;
}
```

#### Individual Button Components

- `<GoogleButton />` - Google sign-in button
- `<AppleButton />` - Apple sign-in button  
- `<TwitterButton />` - Twitter/X sign-in button
- `<FacebookButton />` - Facebook sign-in button

All accept: `onClick`, `disabled`, `loading`, `style`, `className`

### Validation Schemas

Pre-built Yup schemas for Formik:

```tsx
import { 
  loginValidationSchema, 
  registrationValidationSchema,
  forgotPasswordValidationSchema 
} from '@labs-gg/auth';
```

## Configuration

### AuthProviderConfig

```tsx
{
  firebaseConfig: FirebaseConfig;
  apiEndpoints: {
    login: string;          // Backend endpoint to set custom claims
    subscription: string;   // Backend endpoint for subscription management
  };
  redirects?: {
    afterLogin?: string;    // Default: '/'
    afterLogout?: string;   // Default: '/'
    loginPage?: string;     // Default: '/login'
    registerPage?: string;  // Default: '/register'
  };
}
```

## Examples

### Complete Login Form with Formik

```tsx
import { useFormik } from 'formik';
import { useAuth, loginValidationSchema, SocialAuthButtons } from '@labs-gg/auth';

function LoginPage() {
  const { loginUser, signinWithGoogle, signinWithApple } = useAuth();
  const [error, setError] = useState('');

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
      const error = await loginUser(values);
      if (error) setError(error);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      {error && <div className="alert alert-danger">{error}</div>}
      
      <input
        name="email"
        type="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.email && formik.errors.email && (
        <div>{formik.errors.email}</div>
      )}
      
      <input
        name="password"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.password && formik.errors.password && (
        <div>{formik.errors.password}</div>
      )}
      
      <button type="submit">Log In</button>
      
      <div className="divider">Or continue with</div>
      
      <SocialAuthButtons
        onGoogleClick={signinWithGoogle}
        onAppleClick={signinWithApple}
        providers={['google', 'apple']}
      />
    </form>
  );
}
```

### Protected Route

```tsx
import { useAuth } from '@labs-gg/auth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function ProtectedPage() {
  const { user, loading, isPremiumUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading]);

  if (loading) return <div>Loading...</div>;
  if (!user) return null;

  return (
    <div>
      <h1>Protected Content</h1>
      {isPremiumUser() ? (
        <PremiumContent />
      ) : (
        <div>Upgrade to premium!</div>
      )}
    </div>
  );
}
```

### Custom Styled Social Buttons

```tsx
import { GoogleButton, AppleButton } from '@labs-gg/auth';

function CustomSocialAuth() {
  return (
    <div>
      <GoogleButton
        onClick={handleGoogleLogin}
        style={{ width: '100%', marginBottom: '16px' }}
        className="my-custom-class"
      />
      <AppleButton
        onClick={handleAppleLogin}
        style={{ width: '100%' }}
      />
    </div>
  );
}
```

## Environment Variables

Required environment variables for your Next.js projects:

```env
# Firebase Config
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

## TypeScript Support

Full TypeScript support with exported types:

```tsx
import type {
  User,
  AuthState,
  Claims,
  AuthContextValue,
  AuthProviderConfig,
  FirebaseConfig,
  SocialButtonProps,
  SocialAuthGroupProps,
} from '@labs-gg/auth';
```

## Backend Requirements

Your backend should have these endpoints:

### POST `/login` (or your configured endpoint)
- Accepts: `{ token: string }`
- Sets custom claims on the user's Firebase token
- Returns: Success response

### POST `/subscription` (or your configured endpoint)
- Accepts: `{ token: string, cancel?: boolean }`
- Returns: `{ sub: SubscriptionDetails }`

## Publishing

To publish updates:

```bash
npm run build
npm publish --access public
```

## License

MIT

## Support

For issues or questions, contact Labs.GG team.
