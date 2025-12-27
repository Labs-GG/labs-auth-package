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
  
  // Email/Password Authentication
  loginUser: (credentials: { email: string; password: string }) => Promise<string | null>;
  registerUser: (credentials: { email: string; password: string }) => Promise<any>;
  signout: () => Promise<void>;
  
  // Social Authentication
  signinWithGoogle: (skipRedirect?: boolean) => Promise<string | null>;
  signinWithApple: (skipRedirect?: boolean) => Promise<string | null>;
  signinWithFacebook: (skipRedirect?: boolean) => Promise<string | null>;
  signinWithTwitter: (skipRedirect?: boolean) => Promise<string | null>;
  signinWithGitHub: () => Promise<any>;
  
  // Password Management
  forgotPassword: (values: { email: string }) => Promise<string>;
  
  // Email Verification
  sendVerificationEmail: () => Promise<string>;
  refreshUser: () => Promise<void>;
  
  // Subscription & User Status
  isPremiumUser: (handleRedirect?: boolean) => boolean;
  isAdminUser: () => boolean;
  getSubfromApi: () => Promise<any>;
  cancel: () => Promise<any>;
  
  // Chargebee Integration
  chargebeeSuccessful: () => void;
  
  // Error Formatting
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
