# Integration Guide: @labs-gg/auth

This guide shows how to integrate the shared auth package into CFB Labs and NBA2KLab.

## Step 1: Install the Package

### Option A: From NPM (After Publishing)

```bash
npm install @labs-gg/auth
```

### Option B: Local Development (Before Publishing)

In the auth package directory:
```bash
npm link
```

In each project (CFB Labs & NBA2KLab):
```bash
npm link @labs-gg/auth
```

### Option C: Direct from GitHub (Recommended for testing)

Add to `package.json`:
```json
{
  "dependencies": {
    "@labs-gg/auth": "github:Labs-GG/labs-auth-package#main"
  }
}
```

## Step 2: CFB Labs Integration

### 2.1 Update `_app.tsx`

Replace the existing auth setup:

```tsx
// pages/_app.tsx
import { AuthProvider, initializeFirebase } from '@labs-gg/auth';

// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

initializeFirebase(firebaseConfig);

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

export default MyApp;
```

### 2.2 Update Login Page

Replace `pages/login/index.js`:

```jsx
import { useAuth, SocialAuthButtons, loginValidationSchema } from '@labs-gg/auth';
import { useFormik } from 'formik';
import { useState } from 'react';

export default function Login() {
  const { loginUser, signinWithGoogle, signinWithApple, signinWithTwitter } = useAuth();
  const [error, setError] = useState('');

  const validation = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
      const error = await loginUser(values);
      if (error) setError(error);
    },
  });

  const handleSocialAuth = async (authFn) => {
    const error = await authFn();
    if (error) setError(error);
  };

  return (
    <div>
      <form onSubmit={validation.handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}
        
        <input
          name="email"
          type="email"
          value={validation.values.email}
          onChange={validation.handleChange}
          onBlur={validation.handleBlur}
        />
        
        <input
          name="password"
          type="password"
          value={validation.values.password}
          onChange={validation.handleChange}
          onBlur={validation.handleBlur}
        />
        
        <button type="submit">Log In</button>
      </form>

      <SocialAuthButtons
        onGoogleClick={() => handleSocialAuth(signinWithGoogle)}
        onAppleClick={() => handleSocialAuth(signinWithApple)}
        onTwitterClick={() => handleSocialAuth(signinWithTwitter)}
        providers={['google', 'apple', 'twitter']}
      />
    </div>
  );
}
```

### 2.3 Remove Old Auth Files

After confirming everything works, you can remove:
- `lib/auth.js`
- `lib/firebase.js` (if it exists)

## Step 3: NBA2KLab Integration

### 3.1 Update `_app.tsx`

Replace the existing auth import:

```tsx
// pages/_app.tsx
import { AuthProvider, initializeFirebase } from '@labs-gg/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

initializeFirebase(firebaseConfig);

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

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider config={authConfig}>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
```

### 3.2 Update Login Page

The login page in NBA2KLab is already more advanced. Update imports:

```tsx
import { 
  useAuth, 
  SocialAuthButtons,
  loginValidationSchema 
} from '@labs-gg/auth';
```

Replace the auth hooks usage:
```tsx
const { 
  loginUser,
  signinWithGoogle,
  signinWithApple,
  signinWithTwitter,
  signinWithFacebook,
  formatError
} = useAuth();
```

### 3.3 Update Register Page

Similar to login, update the imports and hooks.

### 3.4 Remove Old Auth Files

After confirming everything works:
- `lib/auth.js`
- `lib/firebase.js`

## Step 4: Styling Integration

### For Both Projects

The package provides minimal styling. To match your existing design:

#### Option A: Use CSS Variables

Create `styles/auth.css`:

```css
.labs-auth-social-btn {
  transition: all 0.2s ease;
}

.labs-auth-social-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.labs-auth-social-btn:active {
  transform: translateY(0);
}
```

Import in `_app.tsx`:
```tsx
import '../styles/auth.css';
```

#### Option B: Custom Classes

Pass your existing classes to the components:

```tsx
<SocialAuthButtons
  className="your-existing-class"
  onGoogleClick={handleGoogle}
/>
```

## Step 5: Environment Variables

Ensure both projects have these variables:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
```

## Step 6: Testing Checklist

Test these scenarios in both projects:

- [ ] Email/password login
- [ ] Email/password registration
- [ ] Google OAuth
- [ ] Apple OAuth
- [ ] Twitter OAuth
- [ ] Facebook OAuth (if enabled)
- [ ] Password reset
- [ ] Email verification
- [ ] Premium user check
- [ ] Admin user check
- [ ] Logout
- [ ] Session persistence (refresh page)
- [ ] Protected routes
- [ ] Chargebee integration

## Step 7: Deployment

### Before Deploying

1. Build the auth package:
   ```bash
   cd labs-auth-package
   npm run build
   ```

2. Publish to NPM (or use GitHub):
   ```bash
   npm publish --access public
   ```

3. Update both projects to use the published version

### Deploy Order

1. Deploy backend functions (if changed)
2. Deploy CFB Labs
3. Deploy NBA2KLab
4. Test both sites

## Troubleshooting

### Issue: "Firebase not initialized"
**Solution:** Ensure `initializeFirebase()` is called before `<AuthProvider>`

### Issue: Social auth popup blocked
**Solution:** Check browser popup settings and Firebase console OAuth settings

### Issue: "Module not found"
**Solution:** Run `npm install` or check the package is properly linked

### Issue: Types not working
**Solution:** Ensure TypeScript is configured correctly and restart your IDE

### Issue: Redirect loop
**Solution:** Check the `redirects` configuration in `authConfig`

## Rollback Plan

If issues occur:

1. Keep old `lib/auth.js` as `lib/auth.backup.js`
2. Revert the import in `_app.tsx`
3. Deploy with old auth system
4. Debug the package integration locally

## Future Enhancements

Consider adding to the package:

1. **Rate Limiting**: Client-side rate limiting for auth attempts
2. **Session Management**: Advanced session handling
3. **Multi-factor Auth**: MFA support
4. **Account Linking**: Link multiple auth providers
5. **Analytics**: Auth event tracking
6. **Localization**: Multi-language support
7. **Custom UI Kit**: More pre-built components
8. **Testing Utils**: Mock auth for testing

## Support

For issues with integration:
- Check the package README.md
- Review example implementations
- Contact the Labs.GG dev team
