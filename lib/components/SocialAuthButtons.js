"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocialAuthButtons = exports.FacebookButton = exports.TwitterButton = exports.AppleButton = exports.GoogleButton = void 0;
const react_1 = __importDefault(require("react"));
const GoogleButton = ({ onClick, disabled = false, loading = false, style, className = '', }) => {
    return (react_1.default.createElement("button", { type: "button", onClick: onClick, disabled: disabled || loading, className: `labs-auth-social-btn labs-auth-google ${className}`, style: {
            backgroundColor: '#fff',
            borderColor: '#dadce0',
            color: '#3c4043',
            fontWeight: '500',
            fontSize: '14px',
            padding: '10px 12px',
            borderRadius: '4px',
            border: '1px solid #dadce0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: disabled || loading ? 'not-allowed' : 'pointer',
            opacity: disabled || loading ? 0.6 : 1,
            ...style,
        } },
        react_1.default.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", className: "me-2", style: { marginRight: '8px' } },
            react_1.default.createElement("path", { fill: "#4285F4", d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" }),
            react_1.default.createElement("path", { fill: "#34A853", d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" }),
            react_1.default.createElement("path", { fill: "#FBBC05", d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" }),
            react_1.default.createElement("path", { fill: "#EA4335", d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" })),
        loading ? 'Signing in...' : 'Sign in with Google'));
};
exports.GoogleButton = GoogleButton;
const AppleButton = ({ onClick, disabled = false, loading = false, style, className = '', }) => {
    return (react_1.default.createElement("button", { type: "button", onClick: onClick, disabled: disabled || loading, className: `labs-auth-social-btn labs-auth-apple ${className}`, style: {
            backgroundColor: '#000',
            borderColor: '#000',
            color: '#fff',
            fontWeight: '500',
            fontSize: '14px',
            padding: '10px 12px',
            borderRadius: '4px',
            border: '1px solid #000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: disabled || loading ? 'not-allowed' : 'pointer',
            opacity: disabled || loading ? 0.6 : 1,
            ...style,
        } },
        react_1.default.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", className: "me-2", fill: "currentColor", style: { marginRight: '8px' } },
            react_1.default.createElement("path", { d: "M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" })),
        loading ? 'Signing in...' : 'Sign in with Apple'));
};
exports.AppleButton = AppleButton;
const TwitterButton = ({ onClick, disabled = false, loading = false, style, className = '', }) => {
    return (react_1.default.createElement("button", { type: "button", onClick: onClick, disabled: disabled || loading, className: `labs-auth-social-btn labs-auth-twitter ${className}`, style: {
            backgroundColor: '#000',
            borderColor: '#000',
            color: '#fff',
            fontWeight: '500',
            fontSize: '14px',
            padding: '10px 12px',
            borderRadius: '4px',
            border: '1px solid #000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: disabled || loading ? 'not-allowed' : 'pointer',
            opacity: disabled || loading ? 0.6 : 1,
            ...style,
        } },
        react_1.default.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", className: "me-2", fill: "currentColor", style: { marginRight: '8px' } },
            react_1.default.createElement("path", { d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" })),
        loading ? 'Signing in...' : 'Sign in with X'));
};
exports.TwitterButton = TwitterButton;
const FacebookButton = ({ onClick, disabled = false, loading = false, style, className = '', }) => {
    return (react_1.default.createElement("button", { type: "button", onClick: onClick, disabled: disabled || loading, className: `labs-auth-social-btn labs-auth-facebook ${className}`, style: {
            backgroundColor: '#1877F2',
            borderColor: '#1877F2',
            color: '#fff',
            fontWeight: '500',
            fontSize: '14px',
            padding: '10px 12px',
            borderRadius: '4px',
            border: '1px solid #1877F2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: disabled || loading ? 'not-allowed' : 'pointer',
            opacity: disabled || loading ? 0.6 : 1,
            ...style,
        } },
        react_1.default.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", className: "me-2", fill: "currentColor", style: { marginRight: '8px' } },
            react_1.default.createElement("path", { d: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" })),
        loading ? 'Signing in...' : 'Sign in with Facebook'));
};
exports.FacebookButton = FacebookButton;
const SocialAuthButtons = ({ onGoogleClick, onAppleClick, onTwitterClick, onFacebookClick, disabled = false, loading = false, providers = ['google', 'apple', 'twitter'], orientation = 'vertical', className = '', style, }) => {
    const containerStyle = {
        display: 'flex',
        flexDirection: orientation === 'vertical' ? 'column' : 'row',
        gap: '12px',
        width: '100%',
        ...style,
    };
    return (react_1.default.createElement("div", { className: `labs-auth-social-group ${className}`, style: containerStyle },
        providers.includes('google') && onGoogleClick && (react_1.default.createElement(exports.GoogleButton, { onClick: onGoogleClick, disabled: disabled, loading: loading })),
        providers.includes('apple') && onAppleClick && (react_1.default.createElement(exports.AppleButton, { onClick: onAppleClick, disabled: disabled, loading: loading })),
        providers.includes('twitter') && onTwitterClick && (react_1.default.createElement(exports.TwitterButton, { onClick: onTwitterClick, disabled: disabled, loading: loading })),
        providers.includes('facebook') && onFacebookClick && (react_1.default.createElement(exports.FacebookButton, { onClick: onFacebookClick, disabled: disabled, loading: loading }))));
};
exports.SocialAuthButtons = SocialAuthButtons;
