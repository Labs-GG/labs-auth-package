import * as Yup from 'yup';
/**
 * Email validation schema
 */
export declare const emailSchema: Yup.StringSchema<string, Yup.AnyObject, undefined, "">;
/**
 * Password validation schema
 */
export declare const passwordSchema: Yup.StringSchema<string, Yup.AnyObject, undefined, "">;
/**
 * Login form validation schema
 */
export declare const loginValidationSchema: Yup.ObjectSchema<{
    email: string;
    password: string;
}, Yup.AnyObject, {
    email: undefined;
    password: undefined;
}, "">;
/**
 * Registration form validation schema
 */
export declare const registrationValidationSchema: Yup.ObjectSchema<{
    email: string;
    password: string;
}, Yup.AnyObject, {
    email: undefined;
    password: undefined;
}, "">;
/**
 * Forgot password validation schema
 */
export declare const forgotPasswordValidationSchema: Yup.ObjectSchema<{
    email: string;
}, Yup.AnyObject, {
    email: undefined;
}, "">;
//# sourceMappingURL=validation.d.ts.map