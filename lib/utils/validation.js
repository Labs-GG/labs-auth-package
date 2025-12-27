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
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgotPasswordValidationSchema = exports.registrationValidationSchema = exports.loginValidationSchema = exports.passwordSchema = exports.emailSchema = void 0;
const Yup = __importStar(require("yup"));
/**
 * Email validation schema
 */
exports.emailSchema = Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required');
/**
 * Password validation schema
 */
exports.passwordSchema = Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required');
/**
 * Login form validation schema
 */
exports.loginValidationSchema = Yup.object({
    email: exports.emailSchema,
    password: Yup.string().required('Password is required'),
});
/**
 * Registration form validation schema
 */
exports.registrationValidationSchema = Yup.object({
    email: exports.emailSchema,
    password: exports.passwordSchema,
});
/**
 * Forgot password validation schema
 */
exports.forgotPasswordValidationSchema = Yup.object({
    email: exports.emailSchema,
});
