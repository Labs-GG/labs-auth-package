// Export all components and utilities
export { AuthProvider, useAuth } from './hooks/useAuth';
export { initializeFirebase, getFirebaseAuth, getFirebaseApp } from './firebase/config';
export { formatAuthError, handleAuthError } from './utils/errors';
export {
  emailSchema,
  passwordSchema,
  loginValidationSchema,
  registrationValidationSchema,
  forgotPasswordValidationSchema,
} from './utils/validation';
export {
  GoogleButton,
  AppleButton,
  TwitterButton,
  FacebookButton,
  SocialAuthButtons,
} from './components/SocialAuthButtons';
export type {
  User,
  AuthState,
  Claims,
  AuthContextValue,
  AuthProviderConfig,
} from './types';
export type { FirebaseConfig } from './firebase/config';
export type {
  SocialButtonProps,
  SocialAuthGroupProps,
} from './components/SocialAuthButtons';
