# Quick Reference Card - @labs-gg/auth

## 🚀 Installation

```bash
npm install @labs-gg/auth
# or
npm install github:Labs-GG/labs-auth-package#main
```

## ⚙️ Setup (in _app.tsx)

```tsx
import { initializeFirebase, AuthProvider } from '@labs-gg/auth';

const firebaseConfig = { /* your config */ };
initializeFirebase(firebaseConfig);

const authConfig = {
  firebaseConfig,
  apiEndpoints: {
    login: '/.netlify/functions/login',
    subscription: '/.netlify/functions/sub',
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

## 🪝 useAuth() Hook

```tsx
import { useAuth } from '@labs-gg/auth';

const {
  // State
  user,                    // Current user or null
  loading,                 // Auth loading state
  
  // Email/Password
  loginUser,               // (credentials) => Promise<error|null>
  registerUser,            // (credentials) => Promise<user>
  signout,                 // () => Promise<void>
  forgotPassword,          // (email) => Promise<string>
  
  // Social Auth
  signinWithGoogle,        // () => Promise<error|null>
  signinWithApple,         // () => Promise<error|null>
  signinWithTwitter,       // () => Promise<error|null>
  signinWithFacebook,      // () => Promise<error|null>
  
  // User Status
  isPremiumUser,           // (redirect?) => boolean
  isAdminUser,             // () => boolean
  
  // Utilities
  sendVerificationEmail,   // () => Promise<string>
  refreshUser,             // () => Promise<void>
  formatError,             // (error) => string
} = useAuth();
```

## 🎨 Components

### Social Auth Buttons

```tsx
import { SocialAuthButtons } from '@labs-gg/auth';

<SocialAuthButtons
  onGoogleClick={signinWithGoogle}
  onAppleClick={signinWithApple}
  onTwitterClick={signinWithTwitter}
  providers={['google', 'apple', 'twitter']}
  orientation="vertical"
  loading={loading}
/>
```

### Individual Buttons

```tsx
import { GoogleButton, AppleButton, TwitterButton } from '@labs-gg/auth';

<GoogleButton onClick={handleGoogle} disabled={loading} />
<AppleButton onClick={handleApple} />
<TwitterButton onClick={handleTwitter} />
```

## 📝 Validation Schemas

```tsx
import { 
  loginValidationSchema,
  registrationValidationSchema,
  forgotPasswordValidationSchema 
} from '@labs-gg/auth';

const validation = useFormik({
  validationSchema: loginValidationSchema,
  // ...
});
```

## 🔐 Common Patterns

### Login Form

```tsx
const { loginUser } = useAuth();
const [error, setError] = useState('');

const handleSubmit = async (values) => {
  const err = await loginUser(values);
  if (err) setError(err);
};
```

### Social Login

```tsx
const { signinWithGoogle } = useAuth();

const handleGoogleLogin = async () => {
  const error = await signinWithGoogle();
  if (error) alert(error);
};
```

### Protected Route

```tsx
const { user, loading } = useAuth();

if (loading) return <Loading />;
if (!user) return <Redirect to="/login" />;

return <ProtectedContent />;
```

### Premium Check

```tsx
const { isPremiumUser } = useAuth();

if (!isPremiumUser()) {
  return <UpgradePrompt />;
}

return <PremiumContent />;
```

### Logout

```tsx
const { signout } = useAuth();

<button onClick={signout}>Logout</button>
```

## 🌐 Environment Variables

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
```

## 🎯 TypeScript Types

```tsx
import type { 
  User,
  AuthContextValue,
  AuthProviderConfig,
  FirebaseConfig 
} from '@labs-gg/auth';
```

## 🔄 Update Package

```bash
# In package directory
npm run build
git commit -am "Update: description"
git push

# In your projects
npm update @labs-gg/auth
```

## 📚 Documentation Files

- **README.md** - Full API reference
- **INTEGRATION.md** - Step-by-step migration guide
- **ARCHITECTURE.md** - System design and diagrams
- **SUMMARY.md** - Implementation overview
- **CHANGELOG.md** - Version history

## 🐛 Debugging

### Check Auth State
```tsx
console.log('User:', user);
console.log('Loading:', loading);
console.log('LocalStorage:', localStorage.getItem('authUser'));
```

### Check Firebase
```tsx
import { getFirebaseAuth } from '@labs-gg/auth';
console.log('Firebase Auth:', getFirebaseAuth());
```

### Check Claims
```tsx
const claims = JSON.parse(localStorage.getItem('claims') || '{}');
console.log('Premium:', claims?.claims?.activeSub);
console.log('Admin:', claims?.claims?.admin);
```

## ⚡ Quick Commands

```bash
# Setup package
cd labs-auth-package
./setup.sh

# Build
npm run build

# Watch (development)
npm run watch

# Link locally
npm link

# In project
npm link @labs-gg/auth

# Publish
npm publish --access public
```

## 🎨 Custom Styling

```css
/* Override default styles */
.labs-auth-social-btn {
  border-radius: 8px;
  padding: 12px 16px;
}

.labs-auth-google { /* Google button */ }
.labs-auth-apple { /* Apple button */ }
.labs-auth-twitter { /* Twitter button */ }
.labs-auth-facebook { /* Facebook button */ }
```

## 🔒 Security Notes

- ✅ Tokens stored in localStorage
- ✅ Auto-refresh on expiration
- ✅ Custom claims for roles
- ✅ Backend validates all tokens
- ✅ HTTPS required in production
- ✅ OAuth domains must be whitelisted

## 📞 Support

- Package Location: `/Users/tylerdrone/Documents/projects/labs-auth-package`
- GitHub: `Labs-GG/labs-auth-package`
- Contact: Labs.GG Dev Team

---

**Version**: 1.0.0 | **Last Updated**: December 26, 2025
