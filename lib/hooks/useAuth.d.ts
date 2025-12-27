import React from 'react';
import { AuthContextValue, AuthProviderConfig } from '../types';
export declare const useAuth: () => AuthContextValue;
interface AuthProviderProps {
    children: React.ReactNode;
    config: AuthProviderConfig;
}
export declare function AuthProvider({ children, config }: AuthProviderProps): React.JSX.Element;
export {};
//# sourceMappingURL=useAuth.d.ts.map