import React, { useState, useEffect, useContext, createContext } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GithubAuthProvider,
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  OAuthProvider,
  sendPasswordResetEmail,
  sendEmailVerification,
  reload,
  User as FirebaseUser,
} from 'firebase/auth';
import { getFirebaseAuth } from '../firebase/config';
import { formatAuthError } from '../utils/errors';
import { AuthContextValue, User, Claims, AuthProviderConfig } from '../types';

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
  config: AuthProviderConfig;
}

export function AuthProvider({ children, config }: AuthProviderProps) {
  const auth = useProvideAuth(config);
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

function useProvideAuth(config: AuthProviderConfig): AuthContextValue {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const firebaseAuth = getFirebaseAuth();

  if (!firebaseAuth) {
    throw new Error('Firebase Auth not initialized. Call initializeFirebase first.');
  }

  const formatUser = (firebaseUser: FirebaseUser): User => {
    return {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      displayName: firebaseUser.displayName,
      photoURL: firebaseUser.photoURL,
      emailVerified: firebaseUser.emailVerified,
      providerId: firebaseUser.providerData[0]?.providerId || 'email',
    };
  };

  const handleUser = (rawUser: FirebaseUser | null) => {
    if (rawUser) {
      const formattedUser = formatUser(rawUser);
      setLoading(false);
      setUser(formattedUser);
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('authUser', JSON.stringify(rawUser));
      }
      
      return formattedUser;
    } else {
      setLoading(false);
      setUser(null);
      
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authUser');
        localStorage.removeItem('claims');
      }
      
      return null;
    }
  };

  // Email/Password Authentication
  const loginUser = async (values: { email: string; password: string }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        firebaseAuth,
        values.email,
        values.password
      );

      const idToken = await userCredential.user.getIdToken(true);
      
      // Call backend to set custom claims
      await axios.post(config.apiEndpoints.login, { token: idToken });
      
      // Wait a bit for claims to propagate
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get updated token with claims
      const idTokenResult = await userCredential.user.getIdTokenResult(true);
      
      if (typeof window !== 'undefined') {
        const authUser = JSON.parse(localStorage.getItem('authUser') || '{}');
        if (authUser.stsTokenManager) {
          authUser.stsTokenManager.accessToken = idTokenResult.token;
        }
        localStorage.setItem('authUser', JSON.stringify(authUser));
        localStorage.setItem('claims', JSON.stringify(idTokenResult));
      }

      router.push(config.redirects?.afterLogin || '/');
      return null;
    } catch (error: any) {
      console.error('Login error:', error);
      return formatAuthError(error);
    }
  };

  const registerUser = async (values: { email: string; password: string }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth,
        values.email,
        values.password
      );
      return userCredential.user;
    } catch (error: any) {
      console.error('Registration error:', error);
      throw new Error(formatAuthError(error));
    }
  };

  const signout = async () => {
    await signOut(firebaseAuth);
    handleUser(null);
    router.push(config.redirects?.afterLogout || '/');
  };

  // Social Authentication
  const signinWithGoogle = async (skipRedirect = false) => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(firebaseAuth, provider);
      
      const idToken = await result.user.getIdToken(true);
      await axios.post(config.apiEndpoints.login, { token: idToken });
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const idTokenResult = await result.user.getIdTokenResult(true);
      
      if (typeof window !== 'undefined') {
        const authUser = JSON.parse(localStorage.getItem('authUser') || '{}');
        if (authUser.stsTokenManager) {
          authUser.stsTokenManager.accessToken = idTokenResult.token;
        }
        localStorage.setItem('authUser', JSON.stringify(authUser));
        localStorage.setItem('claims', JSON.stringify(idTokenResult));
      }

      handleUser(result.user);
      
      if (!skipRedirect) {
        router.push(config.redirects?.afterLogin || '/');
      }
      
      return null;
    } catch (error: any) {
      console.error('Google sign-in error:', error);
      setLoading(false);
      return formatAuthError(error);
    }
  };

  const signinWithApple = async (skipRedirect = false) => {
    setLoading(true);
    try {
      const provider = new OAuthProvider('apple.com');
      provider.addScope('email');
      provider.addScope('name');
      
      const result = await signInWithPopup(firebaseAuth, provider);
      
      const idToken = await result.user.getIdToken(true);
      await axios.post(config.apiEndpoints.login, { token: idToken });
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const idTokenResult = await result.user.getIdTokenResult(true);
      
      if (typeof window !== 'undefined') {
        const authUser = JSON.parse(localStorage.getItem('authUser') || '{}');
        if (authUser.stsTokenManager) {
          authUser.stsTokenManager.accessToken = idTokenResult.token;
        }
        localStorage.setItem('authUser', JSON.stringify(authUser));
        localStorage.setItem('claims', JSON.stringify(idTokenResult));
      }

      handleUser(result.user);
      
      if (!skipRedirect) {
        router.push(config.redirects?.afterLogin || '/');
      }
      
      return null;
    } catch (error: any) {
      console.error('Apple sign-in error:', error);
      setLoading(false);
      return formatAuthError(error);
    }
  };

  const signinWithFacebook = async (skipRedirect = false) => {
    setLoading(true);
    try {
      const provider = new FacebookAuthProvider();
      const result = await signInWithPopup(firebaseAuth, provider);
      
      const idToken = await result.user.getIdToken(true);
      await axios.post(config.apiEndpoints.login, { token: idToken });
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const idTokenResult = await result.user.getIdTokenResult(true);
      
      if (typeof window !== 'undefined') {
        const authUser = JSON.parse(localStorage.getItem('authUser') || '{}');
        if (authUser.stsTokenManager) {
          authUser.stsTokenManager.accessToken = idTokenResult.token;
        }
        localStorage.setItem('authUser', JSON.stringify(authUser));
        localStorage.setItem('claims', JSON.stringify(idTokenResult));
      }

      handleUser(result.user);
      
      if (!skipRedirect) {
        router.push(config.redirects?.afterLogin || '/');
      }
      
      return null;
    } catch (error: any) {
      console.error('Facebook sign-in error:', error);
      setLoading(false);
      return formatAuthError(error);
    }
  };

  const signinWithTwitter = async (skipRedirect = false) => {
    setLoading(true);
    try {
      const provider = new TwitterAuthProvider();
      const result = await signInWithPopup(firebaseAuth, provider);
      
      const idToken = await result.user.getIdToken(true);
      await axios.post(config.apiEndpoints.login, { token: idToken });
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const idTokenResult = await result.user.getIdTokenResult(true);
      
      if (typeof window !== 'undefined') {
        const authUser = JSON.parse(localStorage.getItem('authUser') || '{}');
        if (authUser.stsTokenManager) {
          authUser.stsTokenManager.accessToken = idTokenResult.token;
        }
        localStorage.setItem('authUser', JSON.stringify(authUser));
        localStorage.setItem('claims', JSON.stringify(idTokenResult));
      }

      handleUser(result.user);
      
      if (!skipRedirect) {
        router.push(config.redirects?.afterLogin || '/');
      }
      
      return null;
    } catch (error: any) {
      console.error('Twitter sign-in error:', error);
      setLoading(false);
      return formatAuthError(error);
    }
  };

  const signinWithGitHub = async () => {
    setLoading(true);
    try {
      const provider = new GithubAuthProvider();
      const result = await signInWithPopup(firebaseAuth, provider);
      return handleUser(result.user);
    } catch (error: any) {
      console.error('GitHub sign-in error:', error);
      setLoading(false);
      throw error;
    }
  };

  // Password Management
  const forgotPassword = async (values: { email: string }) => {
    try {
      const actionUrl =
        typeof window !== 'undefined'
          ? window.location.origin + (config.redirects?.loginPage || '/login')
          : config.redirects?.loginPage || '/login';
      
      await sendPasswordResetEmail(firebaseAuth, values.email, { url: actionUrl });
      return 'Reset link has been sent to your email.';
    } catch (error: any) {
      throw new Error(formatAuthError(error));
    }
  };

  // Email Verification
  const sendVerificationEmail = async () => {
    try {
      if (!firebaseAuth.currentUser) throw new Error('No authenticated user');
      
      const actionUrl =
        typeof window !== 'undefined'
          ? window.location.origin + (config.redirects?.registerPage || '/register')
          : config.redirects?.registerPage || '/register';
      
      await sendEmailVerification(firebaseAuth.currentUser, { url: actionUrl });
      return 'Verification email sent';
    } catch (error: any) {
      console.error('sendVerificationEmail error', error);
      throw error;
    }
  };

  const refreshUser = async () => {
    if (firebaseAuth.currentUser) {
      await reload(firebaseAuth.currentUser);
      handleUser(firebaseAuth.currentUser);
    }
  };

  // Subscription & User Status
  const getSubfromApi = async () => {
    try {
      const authUser =
        typeof window !== 'undefined'
          ? JSON.parse(localStorage.getItem('authUser') || 'null')
          : null;
      const token = authUser?.stsTokenManager?.accessToken || null;
      const response = await axios.post(config.apiEndpoints.subscription, { token });
      return response.data.sub;
    } catch (error) {
      console.error('getSubfromApi error:', error);
      return null;
    }
  };

  const cancel = async () => {
    try {
      const authUser =
        typeof window !== 'undefined'
          ? JSON.parse(localStorage.getItem('authUser') || 'null')
          : null;
      const token = authUser?.stsTokenManager?.accessToken || null;
      const response = await axios.post(config.apiEndpoints.subscription, {
        token,
        cancel: true,
      });
      return response.data.sub;
    } catch (error) {
      return { error: true, msg: error };
    }
  };

  const isPremiumUser = (handleRedirect = false): boolean => {
    if (typeof localStorage === 'undefined') return false;

    if (!localStorage.getItem('authUser')) {
      if (handleRedirect) {
        router.replace(config.redirects?.loginPage || '/login');
      }
      return false;
    }

    const claims: Claims | null = JSON.parse(localStorage.getItem('claims') || 'null');
    const activeSub = claims?.activeSub || false;

    if (!activeSub && handleRedirect) {
      router.replace(config.redirects?.registerPage || '/register');
      return false;
    }

    return activeSub;
  };

  const isAdminUser = (): boolean => {
    if (typeof localStorage === 'undefined') return false;
    const claims: Claims | null = JSON.parse(localStorage.getItem('claims') || 'null');
    return claims?.admin || false;
  };

  const chargebeeSuccessful = async () => {
    if (!firebaseAuth.currentUser) return;

    try {
      const idToken = await firebaseAuth.currentUser.getIdToken(true);
      await axios.post(config.apiEndpoints.login, { token: idToken });
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const idTokenResult = await firebaseAuth.currentUser.getIdTokenResult(true);
      
      if (typeof window !== 'undefined') {
        const authUser = JSON.parse(localStorage.getItem('authUser') || '{}');
        if (authUser.stsTokenManager) {
          authUser.stsTokenManager.accessToken = idTokenResult.token;
        }
        localStorage.setItem('authUser', JSON.stringify(authUser));
        localStorage.setItem('claims', JSON.stringify(idTokenResult));
      }
    } catch (error) {
      console.error('chargebeeSuccessful error:', error);
    }
  };

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, handleUser);
    return () => unsubscribe();
  }, []);

  return {
    user,
    loading,
    loginUser,
    registerUser,
    signout,
    signinWithGoogle,
    signinWithApple,
    signinWithFacebook,
    signinWithTwitter,
    signinWithGitHub,
    forgotPassword,
    sendVerificationEmail,
    refreshUser,
    isPremiumUser,
    isAdminUser,
    getSubfromApi,
    cancel,
    chargebeeSuccessful,
    formatError: formatAuthError,
  };
}
