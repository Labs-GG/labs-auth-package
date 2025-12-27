# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2025-12-26

### Added
- Initial release of @labs-gg/auth
- Firebase Authentication integration (v10)
- Email/password authentication
- Social authentication (Google, Apple, Twitter/X, Facebook, GitHub)
- Password reset functionality
- Email verification
- Premium user status checking
- Admin user checking
- Chargebee subscription integration
- Pre-built social auth button components
- Form validation schemas (Yup)
- TypeScript support with full type definitions
- User-friendly error formatting
- SSR-compatible (Next.js)
- Comprehensive documentation

### Features
- `useAuth()` hook for accessing auth state and methods
- `AuthProvider` context provider
- `SocialAuthButtons` component with customizable styling
- Individual button components (GoogleButton, AppleButton, etc.)
- Automatic token refresh and claims management
- Local storage session persistence
- Configurable redirects
- Backend API integration support

### Documentation
- README.md with complete API reference
- INTEGRATION.md with step-by-step migration guide
- TypeScript type exports
- Code examples for common scenarios
