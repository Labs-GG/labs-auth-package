import { initializeApp, getApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';

let firebaseApp: FirebaseApp | null = null;
let firebaseAuth: Auth | null = null;

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string;
}

/**
 * Initialize Firebase with the provided configuration
 * @param config Firebase configuration object
 * @returns Firebase Auth instance
 */
export function initializeFirebase(config: FirebaseConfig): Auth {
  if (!firebaseApp) {
    firebaseApp = getApps().length === 0 ? initializeApp(config) : getApp();
  }
  
  if (!firebaseAuth) {
    firebaseAuth = getAuth(firebaseApp);
  }
  
  return firebaseAuth;
}

/**
 * Get the current Firebase Auth instance
 * @returns Firebase Auth instance or null if not initialized
 */
export function getFirebaseAuth(): Auth | null {
  return firebaseAuth;
}

/**
 * Get the current Firebase App instance
 * @returns Firebase App instance or null if not initialized
 */
export function getFirebaseApp(): FirebaseApp | null {
  return firebaseApp;
}
