import { FirebaseApp } from 'firebase/app';
import { Auth } from 'firebase/auth';
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
export declare function initializeFirebase(config: FirebaseConfig): Auth;
/**
 * Get the current Firebase Auth instance
 * @returns Firebase Auth instance or null if not initialized
 */
export declare function getFirebaseAuth(): Auth | null;
/**
 * Get the current Firebase App instance
 * @returns Firebase App instance or null if not initialized
 */
export declare function getFirebaseApp(): FirebaseApp | null;
//# sourceMappingURL=config.d.ts.map