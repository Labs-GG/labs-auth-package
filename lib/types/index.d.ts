export interface User {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
    emailVerified: boolean;
    providerId: string;
}
export interface AuthState {
    user: User | null;
    loading: boolean;
}
export interface Claims {
    activeSub?: boolean;
    admin?: boolean;
    [key: string]: any;
}
export interface AuthContextValue {
    user: User | null;
    loading: boolean;
    loginUser: (credentials: {
        email: string;
        password: string;
    }) => Promise<string | null>;
    registerUser: (credentials: {
        email: string;
        password: string;
    }) => Promise<any>;
    signout: () => Promise<void>;
    signinWithGoogle: (skipRedirect?: boolean) => Promise<string | null>;
    signinWithApple: (skipRedirect?: boolean) => Promise<string | null>;
    signinWithFacebook: (skipRedirect?: boolean) => Promise<string | null>;
    signinWithTwitter: (skipRedirect?: boolean) => Promise<string | null>;
    signinWithGitHub: () => Promise<any>;
    forgotPassword: (values: {
        email: string;
    }) => Promise<string>;
    sendVerificationEmail: () => Promise<string>;
    refreshUser: () => Promise<void>;
    isPremiumUser: (handleRedirect?: boolean) => boolean;
    isAdminUser: () => boolean;
    getSubfromApi: () => Promise<any>;
    cancel: () => Promise<any>;
    chargebeeSuccessful: () => void;
    formatError?: (error: any) => string;
}
export interface AuthProviderConfig {
    firebaseConfig: any;
    apiEndpoints: {
        login: string;
        subscription: string;
    };
    redirects?: {
        afterLogin?: string;
        afterLogout?: string;
        loginPage?: string;
        registerPage?: string;
    };
}
//# sourceMappingURL=index.d.ts.map