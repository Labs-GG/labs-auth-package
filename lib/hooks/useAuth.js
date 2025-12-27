"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAuth = void 0;
exports.AuthProvider = AuthProvider;
const react_1 = __importStar(require("react"));
const router_1 = require("next/router");
const axios_1 = __importDefault(require("axios"));
const auth_1 = require("firebase/auth");
const config_1 = require("../firebase/config");
const errors_1 = require("../utils/errors");
const AuthContext = (0, react_1.createContext)(undefined);
const useAuth = () => {
    const context = (0, react_1.useContext)(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
exports.useAuth = useAuth;
function AuthProvider({ children, config }) {
    const auth = useProvideAuth(config);
    return react_1.default.createElement(AuthContext.Provider, { value: auth }, children);
}
function useProvideAuth(config) {
    const router = (0, router_1.useRouter)();
    const [user, setUser] = (0, react_1.useState)(null);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const firebaseAuth = (0, config_1.getFirebaseAuth)();
    if (!firebaseAuth) {
        throw new Error('Firebase Auth not initialized. Call initializeFirebase first.');
    }
    const formatUser = (firebaseUser) => {
        return {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            emailVerified: firebaseUser.emailVerified,
            providerId: firebaseUser.providerData[0]?.providerId || 'email',
        };
    };
    const handleUser = (rawUser) => {
        if (rawUser) {
            const formattedUser = formatUser(rawUser);
            setLoading(false);
            setUser(formattedUser);
            if (typeof window !== 'undefined') {
                localStorage.setItem('authUser', JSON.stringify(rawUser));
            }
            return formattedUser;
        }
        else {
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
    const loginUser = async (values) => {
        try {
            const userCredential = await (0, auth_1.signInWithEmailAndPassword)(firebaseAuth, values.email, values.password);
            const idToken = await userCredential.user.getIdToken(true);
            // Call backend to set custom claims
            await axios_1.default.post(config.apiEndpoints.login, { token: idToken });
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
        }
        catch (error) {
            console.error('Login error:', error);
            return (0, errors_1.formatAuthError)(error);
        }
    };
    const registerUser = async (values) => {
        try {
            const userCredential = await (0, auth_1.createUserWithEmailAndPassword)(firebaseAuth, values.email, values.password);
            return userCredential.user;
        }
        catch (error) {
            console.error('Registration error:', error);
            throw new Error((0, errors_1.formatAuthError)(error));
        }
    };
    const signout = async () => {
        await (0, auth_1.signOut)(firebaseAuth);
        handleUser(null);
        router.push(config.redirects?.afterLogout || '/');
    };
    // Social Authentication
    const signinWithGoogle = async (skipRedirect = false) => {
        setLoading(true);
        try {
            const provider = new auth_1.GoogleAuthProvider();
            const result = await (0, auth_1.signInWithPopup)(firebaseAuth, provider);
            const idToken = await result.user.getIdToken(true);
            await axios_1.default.post(config.apiEndpoints.login, { token: idToken });
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
        }
        catch (error) {
            console.error('Google sign-in error:', error);
            setLoading(false);
            return (0, errors_1.formatAuthError)(error);
        }
    };
    const signinWithApple = async (skipRedirect = false) => {
        setLoading(true);
        try {
            const provider = new auth_1.OAuthProvider('apple.com');
            provider.addScope('email');
            provider.addScope('name');
            const result = await (0, auth_1.signInWithPopup)(firebaseAuth, provider);
            const idToken = await result.user.getIdToken(true);
            await axios_1.default.post(config.apiEndpoints.login, { token: idToken });
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
        }
        catch (error) {
            console.error('Apple sign-in error:', error);
            setLoading(false);
            return (0, errors_1.formatAuthError)(error);
        }
    };
    const signinWithFacebook = async (skipRedirect = false) => {
        setLoading(true);
        try {
            const provider = new auth_1.FacebookAuthProvider();
            const result = await (0, auth_1.signInWithPopup)(firebaseAuth, provider);
            const idToken = await result.user.getIdToken(true);
            await axios_1.default.post(config.apiEndpoints.login, { token: idToken });
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
        }
        catch (error) {
            console.error('Facebook sign-in error:', error);
            setLoading(false);
            return (0, errors_1.formatAuthError)(error);
        }
    };
    const signinWithTwitter = async (skipRedirect = false) => {
        setLoading(true);
        try {
            const provider = new auth_1.TwitterAuthProvider();
            const result = await (0, auth_1.signInWithPopup)(firebaseAuth, provider);
            const idToken = await result.user.getIdToken(true);
            await axios_1.default.post(config.apiEndpoints.login, { token: idToken });
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
        }
        catch (error) {
            console.error('Twitter sign-in error:', error);
            setLoading(false);
            return (0, errors_1.formatAuthError)(error);
        }
    };
    const signinWithGitHub = async () => {
        setLoading(true);
        try {
            const provider = new auth_1.GithubAuthProvider();
            const result = await (0, auth_1.signInWithPopup)(firebaseAuth, provider);
            return handleUser(result.user);
        }
        catch (error) {
            console.error('GitHub sign-in error:', error);
            setLoading(false);
            throw error;
        }
    };
    // Password Management
    const forgotPassword = async (values) => {
        try {
            const actionUrl = typeof window !== 'undefined'
                ? window.location.origin + (config.redirects?.loginPage || '/login')
                : config.redirects?.loginPage || '/login';
            await (0, auth_1.sendPasswordResetEmail)(firebaseAuth, values.email, { url: actionUrl });
            return 'Reset link has been sent to your email.';
        }
        catch (error) {
            throw new Error((0, errors_1.formatAuthError)(error));
        }
    };
    // Email Verification
    const sendVerificationEmail = async () => {
        try {
            if (!firebaseAuth.currentUser)
                throw new Error('No authenticated user');
            const actionUrl = typeof window !== 'undefined'
                ? window.location.origin + (config.redirects?.registerPage || '/register')
                : config.redirects?.registerPage || '/register';
            await (0, auth_1.sendEmailVerification)(firebaseAuth.currentUser, { url: actionUrl });
            return 'Verification email sent';
        }
        catch (error) {
            console.error('sendVerificationEmail error', error);
            throw error;
        }
    };
    const refreshUser = async () => {
        if (firebaseAuth.currentUser) {
            await (0, auth_1.reload)(firebaseAuth.currentUser);
            handleUser(firebaseAuth.currentUser);
        }
    };
    // Subscription & User Status
    const getSubfromApi = async () => {
        try {
            const authUser = typeof window !== 'undefined'
                ? JSON.parse(localStorage.getItem('authUser') || 'null')
                : null;
            const token = authUser?.stsTokenManager?.accessToken || null;
            const response = await axios_1.default.post(config.apiEndpoints.subscription, { token });
            return response.data.sub;
        }
        catch (error) {
            console.error('getSubfromApi error:', error);
            return null;
        }
    };
    const cancel = async () => {
        try {
            const authUser = typeof window !== 'undefined'
                ? JSON.parse(localStorage.getItem('authUser') || 'null')
                : null;
            const token = authUser?.stsTokenManager?.accessToken || null;
            const response = await axios_1.default.post(config.apiEndpoints.subscription, {
                token,
                cancel: true,
            });
            return response.data.sub;
        }
        catch (error) {
            return { error: true, msg: error };
        }
    };
    const isPremiumUser = (handleRedirect = false) => {
        if (typeof localStorage === 'undefined')
            return false;
        if (!localStorage.getItem('authUser')) {
            if (handleRedirect) {
                router.replace(config.redirects?.loginPage || '/login');
            }
            return false;
        }
        const claims = JSON.parse(localStorage.getItem('claims') || 'null');
        const activeSub = claims?.activeSub || false;
        if (!activeSub && handleRedirect) {
            router.replace(config.redirects?.registerPage || '/register');
            return false;
        }
        return activeSub;
    };
    const isAdminUser = () => {
        if (typeof localStorage === 'undefined')
            return false;
        const claims = JSON.parse(localStorage.getItem('claims') || 'null');
        return claims?.admin || false;
    };
    const chargebeeSuccessful = async () => {
        if (!firebaseAuth.currentUser)
            return;
        try {
            const idToken = await firebaseAuth.currentUser.getIdToken(true);
            await axios_1.default.post(config.apiEndpoints.login, { token: idToken });
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
        }
        catch (error) {
            console.error('chargebeeSuccessful error:', error);
        }
    };
    // Listen to auth state changes
    (0, react_1.useEffect)(() => {
        const unsubscribe = (0, auth_1.onAuthStateChanged)(firebaseAuth, handleUser);
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
        formatError: errors_1.formatAuthError,
    };
}
