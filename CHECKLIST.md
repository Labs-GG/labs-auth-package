# Integration Checklist

Use this checklist when integrating @labs-gg/auth into a project.

## 📦 Package Setup

- [ ] Package built successfully (`npm run build`)
- [ ] Git repository created
- [ ] Initial commit made
- [ ] GitHub repository created (optional)
- [ ] Published to NPM (optional)

## 🔧 Project Setup

### CFB Labs

- [ ] Package installed (`npm install @labs-gg/auth`)
- [ ] Firebase environment variables added
- [ ] `_app.tsx` updated with AuthProvider
- [ ] `initializeFirebase()` called before AuthProvider
- [ ] Auth config properly set with endpoints
- [ ] Old `lib/auth.js` backed up (renamed to `.backup`)
- [ ] Login page updated to use new package
- [ ] Register page created/updated
- [ ] Social auth buttons added
- [ ] Old auth files removed after testing
- [ ] TypeScript errors resolved
- [ ] Build successful (`npm run build`)
- [ ] Local testing completed

### NBA2KLab

- [ ] Package installed
- [ ] Firebase environment variables verified
- [ ] `_app.tsx` updated with new imports
- [ ] Old auth imports removed
- [ ] Login page updated
- [ ] Register page updated
- [ ] Social auth working
- [ ] Old `lib/auth.js` backed up
- [ ] Old auth files removed after testing
- [ ] TypeScript errors resolved
- [ ] Build successful
- [ ] Local testing completed

## 🔐 Firebase Console Setup

### Authentication

- [ ] Email/Password provider enabled
- [ ] Google OAuth configured
- [ ] Apple OAuth configured
- [ ] Twitter OAuth configured
- [ ] Facebook OAuth configured (if needed)
- [ ] GitHub OAuth configured (if needed)
- [ ] Authorized domains added:
  - [ ] localhost
  - [ ] cfblabs.com
  - [ ] www.cfblabs.com
  - [ ] nba2klab.com
  - [ ] www.nba2klab.com
  - [ ] Netlify preview domains

### Email Templates

- [ ] Email verification template customized
- [ ] Password reset template customized
- [ ] Action URL configured correctly
- [ ] Sender name set
- [ ] Reply-to email set

## 🔌 Backend Integration

### Netlify Functions

- [ ] `/login` endpoint exists
- [ ] `/login` validates Firebase tokens
- [ ] `/login` sets custom claims (activeSub, admin)
- [ ] `/sub` endpoint exists
- [ ] `/sub` handles subscription queries
- [ ] `/sub` handles cancellation
- [ ] Both endpoints return proper error responses
- [ ] Rate limiting configured (if applicable)
- [ ] CORS configured properly

## 🧪 Testing - CFB Labs

### Authentication

- [ ] Email/password registration works
- [ ] Email/password login works
- [ ] Error messages display correctly
- [ ] Google sign-in works
- [ ] Apple sign-in works
- [ ] Twitter sign-in works
- [ ] Facebook sign-in works (if enabled)
- [ ] Logout works
- [ ] Session persists on page refresh
- [ ] Session clears after logout

### User Management

- [ ] Password reset email sends
- [ ] Password reset link works
- [ ] Email verification sends
- [ ] Email verification works
- [ ] User profile displays correctly
- [ ] Premium status check works
- [ ] Admin status check works (if applicable)

### UI/UX

- [ ] Loading states show properly
- [ ] Error messages are user-friendly
- [ ] Social buttons styled correctly
- [ ] Mobile responsive
- [ ] Forms validate properly
- [ ] Success messages show
- [ ] Redirects work correctly

### Integration

- [ ] Protected routes redirect to login
- [ ] Premium content checks work
- [ ] Chargebee integration works
- [ ] After payment, claims refresh
- [ ] Navigation shows correct state
- [ ] Profile menu updates

## 🧪 Testing - NBA2KLab

(Same checklist as CFB Labs above)

- [ ] All authentication tests passing
- [ ] All user management tests passing
- [ ] All UI/UX tests passing
- [ ] All integration tests passing

## 🌐 Cross-Site Testing

- [ ] Auth experience identical on both sites
- [ ] Social buttons look the same
- [ ] Error messages consistent
- [ ] Login flow feels the same
- [ ] Registration flow feels the same
- [ ] Can log in to CFB Labs after registering on NBA2KLab
- [ ] Can log in to NBA2KLab after registering on CFB Labs
- [ ] Premium status syncs correctly

## 🚀 Deployment

### Pre-Deployment

- [ ] All tests passing locally
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] Build successful
- [ ] Environment variables set in Netlify
- [ ] Firebase config verified
- [ ] Backend functions tested
- [ ] Rollback plan documented

### CFB Labs Deployment

- [ ] Deploy to preview environment
- [ ] Test all auth flows on preview
- [ ] Monitor error logs
- [ ] Deploy to production
- [ ] Verify production auth works
- [ ] Monitor error rates
- [ ] Check analytics

### NBA2KLab Deployment

- [ ] Deploy to preview environment
- [ ] Test all auth flows on preview
- [ ] Monitor error logs
- [ ] Deploy to production
- [ ] Verify production auth works
- [ ] Monitor error rates
- [ ] Check analytics

## 📊 Post-Deployment

### Monitoring (First 24 Hours)

- [ ] No increase in auth errors
- [ ] Login success rate normal
- [ ] Registration success rate normal
- [ ] No user complaints
- [ ] Social auth working
- [ ] Email delivery working
- [ ] Chargebee integration working

### Monitoring (First Week)

- [ ] Auth metrics stable
- [ ] No regressions detected
- [ ] User feedback positive
- [ ] Performance acceptable
- [ ] No security issues

## 🐛 Rollback Checklist

If issues occur:

- [ ] Identify the issue
- [ ] Check if it's package-related
- [ ] Review error logs
- [ ] Attempt quick fix if possible
- [ ] If not fixable quickly:
  - [ ] Revert `_app.tsx` to use old auth
  - [ ] Restore `lib/auth.backup.js` to `lib/auth.js`
  - [ ] Deploy rollback
  - [ ] Verify old auth working
  - [ ] Debug package integration offline
  - [ ] Fix and redeploy

## 📝 Documentation

- [ ] Internal docs updated
- [ ] Team notified of changes
- [ ] Support team briefed
- [ ] Known issues documented
- [ ] Future enhancements noted

## 🎓 Team Training

- [ ] Dev team knows how to use package
- [ ] Dev team knows how to update package
- [ ] Support team knows new auth flow
- [ ] Support team knows common issues
- [ ] Documentation accessible to all

## 🔄 Maintenance

### Regular Tasks

- [ ] Monitor Firebase quota usage
- [ ] Review auth error logs weekly
- [ ] Update package dependencies monthly
- [ ] Test auth flows after major updates
- [ ] Review and improve error messages
- [ ] Update documentation as needed

### When to Update Package

- [ ] Security vulnerability found
- [ ] New feature needed by both sites
- [ ] Bug affects multiple sites
- [ ] Firebase SDK update required
- [ ] Performance improvement available

## ✅ Sign-Off

### CFB Labs Integration

- [ ] Developer tested: _______________
- [ ] QA tested: _______________
- [ ] Product owner approved: _______________
- [ ] Deployed by: _______________
- [ ] Date: _______________

### NBA2KLab Integration

- [ ] Developer tested: _______________
- [ ] QA tested: _______________
- [ ] Product owner approved: _______________
- [ ] Deployed by: _______________
- [ ] Date: _______________

## 📞 Emergency Contacts

- Firebase Support: [Link to Firebase console]
- Netlify Support: [Link to Netlify dashboard]
- Package Repository: `Labs-GG/labs-auth-package`
- Dev Team: [Contact info]

## 🎉 Success Criteria

Integration is successful when:

- ✅ Both sites use the same auth package
- ✅ All auth methods work on both sites
- ✅ User experience is identical
- ✅ No increase in errors
- ✅ No user complaints
- ✅ Code is easier to maintain
- ✅ Updates can be deployed to both sites easily

---

**Package Version**: 1.0.0  
**Checklist Version**: 1.0  
**Last Updated**: December 26, 2025
