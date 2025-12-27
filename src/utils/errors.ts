/**
 * Format Firebase authentication errors into user-friendly messages
 * @param error Error from Firebase or other source
 * @returns User-friendly error message
 */
export function formatAuthError(error: any): string {
  if (typeof error === 'string') return error;
  
  const errorCode = error?.code || error?.errorCode;
  const errorMessage = error?.message || '';

  // Firebase Auth errors
  const errorMap: Record<string, string> = {
    'auth/wrong-password': 'The email or password you entered is incorrect.',
    'auth/user-not-found': 'The email or password you entered is incorrect.',
    'auth/invalid-email': 'Please enter a valid email address.',
    'auth/user-disabled': 'This account has been disabled. Please contact support.',
    'auth/email-already-in-use': 'An account with this email already exists.',
    'auth/weak-password': 'Please choose a stronger password (at least 6 characters).',
    'auth/operation-not-allowed': 'This sign-in method is not enabled. Please contact support.',
    'auth/account-exists-with-different-credential': 'An account already exists with this email. Please sign in using your original method.',
    'auth/invalid-credential': 'The credentials provided are invalid or have expired.',
    'auth/invalid-verification-code': 'The verification code is invalid.',
    'auth/invalid-verification-id': 'The verification ID is invalid.',
    'auth/missing-verification-code': 'Please enter the verification code.',
    'auth/missing-verification-id': 'Verification ID is missing.',
    'auth/requires-recent-login': 'For security reasons, please log in again to complete this action.',
    'auth/too-many-requests': 'Too many failed attempts. Please try again later.',
    'auth/popup-blocked': 'Sign-in popup was blocked by your browser. Please allow popups and try again.',
    'auth/popup-closed-by-user': 'Sign-in was cancelled. Please try again.',
    'auth/cancelled-popup-request': 'Sign-in was cancelled. Please try again.',
    'auth/network-request-failed': 'Network error. Please check your connection and try again.',
    'auth/timeout': 'The operation timed out. Please try again.',
    'auth/app-deleted': 'Authentication service error. Please refresh and try again.',
    'auth/invalid-api-key': 'Configuration error. Please contact support.',
    'auth/unauthorized-domain': 'This domain is not authorized for authentication.',
    'auth/user-token-expired': 'Your session has expired. Please sign in again.',
    'auth/invalid-user-token': 'Your session is invalid. Please sign in again.',
    'auth/email-not-verified': 'Please verify your email address before continuing.',
  };

  if (errorCode && errorMap[errorCode]) {
    return errorMap[errorCode];
  }

  // Network errors
  if (error?.code === 'ERR_NETWORK' || errorMessage.includes('network')) {
    return 'Network error. Please check your connection and try again.';
  }

  // Clean up Firebase error messages
  if (errorMessage.includes('Firebase:')) {
    return errorMessage.replace('Firebase: ', '').replace(/\(auth\/.*\)\.?/, '').trim();
  }

  return errorMessage || 'An unexpected error occurred. Please try again.';
}

/**
 * Handle Firebase Auth errors and return formatted message
 * @param error Error object
 * @returns Formatted error message
 */
export function handleAuthError(error: any): string {
  console.error('Auth Error:', error);
  return formatAuthError(error);
}
