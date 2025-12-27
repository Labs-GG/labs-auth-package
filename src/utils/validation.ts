import * as Yup from 'yup';

/**
 * Email validation schema
 */
export const emailSchema = Yup.string()
  .email('Please enter a valid email address')
  .required('Email is required');

/**
 * Password validation schema
 */
export const passwordSchema = Yup.string()
  .min(6, 'Password must be at least 6 characters')
  .required('Password is required');

/**
 * Login form validation schema
 */
export const loginValidationSchema = Yup.object({
  email: emailSchema,
  password: Yup.string().required('Password is required'),
});

/**
 * Registration form validation schema
 */
export const registrationValidationSchema = Yup.object({
  email: emailSchema,
  password: passwordSchema,
});

/**
 * Forgot password validation schema
 */
export const forgotPasswordValidationSchema = Yup.object({
  email: emailSchema,
});
