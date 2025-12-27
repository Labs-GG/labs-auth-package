"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeFirebase = initializeFirebase;
exports.getFirebaseAuth = getFirebaseAuth;
exports.getFirebaseApp = getFirebaseApp;
const app_1 = require("firebase/app");
const auth_1 = require("firebase/auth");
let firebaseApp = null;
let firebaseAuth = null;
/**
 * Initialize Firebase with the provided configuration
 * @param config Firebase configuration object
 * @returns Firebase Auth instance
 */
function initializeFirebase(config) {
    if (!firebaseApp) {
        firebaseApp = (0, app_1.getApps)().length === 0 ? (0, app_1.initializeApp)(config) : (0, app_1.getApp)();
    }
    if (!firebaseAuth) {
        firebaseAuth = (0, auth_1.getAuth)(firebaseApp);
    }
    return firebaseAuth;
}
/**
 * Get the current Firebase Auth instance
 * @returns Firebase Auth instance or null if not initialized
 */
function getFirebaseAuth() {
    return firebaseAuth;
}
/**
 * Get the current Firebase App instance
 * @returns Firebase App instance or null if not initialized
 */
function getFirebaseApp() {
    return firebaseApp;
}
