import React, { CSSProperties } from 'react';
export interface SocialButtonProps {
    onClick: () => void;
    disabled?: boolean;
    loading?: boolean;
    style?: CSSProperties;
    className?: string;
}
export declare const GoogleButton: React.FC<SocialButtonProps>;
export declare const AppleButton: React.FC<SocialButtonProps>;
export declare const TwitterButton: React.FC<SocialButtonProps>;
export declare const FacebookButton: React.FC<SocialButtonProps>;
export interface SocialAuthGroupProps {
    onGoogleClick?: () => void;
    onAppleClick?: () => void;
    onTwitterClick?: () => void;
    onFacebookClick?: () => void;
    disabled?: boolean;
    loading?: boolean;
    providers?: ('google' | 'apple' | 'twitter' | 'facebook')[];
    orientation?: 'vertical' | 'horizontal';
    className?: string;
    style?: CSSProperties;
}
export declare const SocialAuthButtons: React.FC<SocialAuthGroupProps>;
//# sourceMappingURL=SocialAuthButtons.d.ts.map