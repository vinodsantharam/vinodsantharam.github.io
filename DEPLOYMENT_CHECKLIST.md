# Deployment Checklist

Use this checklist to ensure your Next.js site is ready for GitHub Pages deployment.

## ✅ Pre-Deployment Checklist

### 1. Configuration Files
- [ ] `next.config.js` has `output: 'export'`
- [ ] `next.config.js` has `images: { unoptimized: true }`
- [ ] `next.config.js` has correct `basePath` (empty for username.github.io)
- [ ] `.nojekyll` file exists in `public/` directory
- [ ] `.github/workflows/deploy.yml` is present

### 2. Content Review
- [ ] All markdown files have proper frontmatter
- [ ] About page content is updated
- [ ] Blog posts are ready and dated correctly
- [ ] Images are in `public/` directory
- [ ] Resume/assets are in `public/` directory

### 3. Code Quality
- [ ] Run `npm run lint` - no errors
- [ ] All TypeScript files compile without errors
- [ ] Pages load correctly in development mode

### 4. Local Testing
- [ ] Development server works (`npm run dev`)
- [ ] Production build succeeds (`npm run build`)
- [ ] Built site works locally (`npx serve@latest out`)
- [ ] All routes are accessible
- [ ] Navigation works correctly
- [ ] Markdown renders properly

### 5. Git Repository
- [ ] All changes are committed
- [ ] `.gitignore` excludes `node_modules`, `.next`, `out`
- [ ] Repository is on GitHub
- [ ] Branch is `main` or `nextjs`

### 6. GitHub Settings
- [ ] Repository → Settings → Pages
- [ ] Source is set to "GitHub Actions"
- [ ] Repository is public (for free GitHub Pages)

## 🚀 Deployment Steps

### Initial Deployment

1. **Verify Configuration**
   ```bash
   # Check Node version
   node -v  # Should be 18+
   
   # Install dependencies
   npm install
   
   # Test build
   npm run build
   ```

2. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial Next.js deployment"
   git push origin nextjs
   ```

3. **Monitor Deployment**
   - Go to repository on GitHub
   - Click "Actions" tab
   - Watch "Deploy Next.js to GitHub Pages" workflow
   - Wait for green checkmark (usually 2-5 minutes)

4. **Verify Site**
   - Visit `https://your-username.github.io`
   - Check all pages load
   - Test navigation
   - Verify markdown rendering

### Subsequent Deployments

1. **Make Changes**
   - Edit content or code
   - Test locally with `npm run dev`

2. **Build & Test**
   ```bash
   npm run build
   npx serve@latest out
   ```

3. **Deploy**
   ```bash
   git add .
   git commit -m "Update: description of changes"
   git push origin nextjs
   ```

4. **Monitor**
   - Check Actions tab for deployment status
   - Verify changes on live site (may take 1-2 minutes)

## 🔍 Verification Tests

After deployment, test these:

### Homepage
- [ ] Homepage loads at root URL
- [ ] Navigation links work
- [ ] Styling is correct
- [ ] Resume link works

### Blog
- [ ] Blog listing page loads
- [ ] All blog posts are listed
- [ ] Posts are sorted by date (newest first)
- [ ] Tags display correctly

### Blog Posts
- [ ] Individual post pages load
- [ ] Markdown renders correctly
- [ ] Code blocks have syntax highlighting
- [ ] Images display (if any)
- [ ] Back to blog link works

### About Page
- [ ] About page loads
- [ ] Markdown content renders
- [ ] Styling matches other pages

### Navigation
- [ ] All header links work
- [ ] Footer displays correctly
- [ ] 404 page works for invalid URLs

### Mobile/Responsive
- [ ] Site works on mobile devices
- [ ] Navigation is usable on small screens
- [ ] Content is readable on all devices

## 🐛 Troubleshooting

### Build Fails on GitHub Actions

**Check:**
1. Actions tab for error logs
2. Ensure `package.json` has all dependencies
3. Node version is 20.x in workflow
4. No TypeScript errors locally

**Fix:**
```bash
# Test locally first
rm -rf node_modules .next
npm install
npm run build
```

### Site Shows 404

**Check:**
1. `.nojekyll` exists in `public/`
2. `basePath` in `next.config.js` matches your URL
3. GitHub Pages is enabled in settings
4. Wait 2-3 minutes after deployment

**Fix:**
```javascript
// next.config.js
basePath: '',  // For username.github.io
// OR
basePath: '/repo-name',  // For username.github.io/repo-name
```

### Styles Not Loading

**Check:**
1. Tailwind CSS is installed
2. `globals.css` is imported in `layout.tsx`
3. Build completed successfully

**Fix:**
```bash
npm install tailwindcss @tailwindcss/typography autoprefixer postcss
npm run build
```

### Images Not Displaying

**Check:**
1. Images are in `public/` directory
2. Paths start with `/` (e.g., `/image.jpg`)
3. Image files are committed to git

**Fix:**
```markdown
<!-- Correct -->
![Alt text](/images/photo.jpg)

<!-- Wrong -->
![Alt text](images/photo.jpg)
```

### Workflow Not Triggering

**Check:**
1. Workflow file is in `.github/workflows/`
2. Pushing to correct branch (`main` or `nextjs`)
3. GitHub Actions is enabled for repository

**Fix:**
- Push again or trigger manually from Actions tab

## 📊 Deployment Timeline

| Step | Expected Time |
|------|---------------|
| Push to GitHub | < 1 second |
| Workflow Start | 5-10 seconds |
| Install Dependencies | 30-60 seconds |
| Build Site | 20-40 seconds |
| Deploy to Pages | 10-20 seconds |
| DNS Propagation | 1-2 minutes |
| **Total** | **2-5 minutes** |

## 🎯 Performance Checklist

After deployment, verify performance:

- [ ] Lighthouse score > 90
- [ ] First Contentful Paint < 2s
- [ ] Time to Interactive < 3s
- [ ] Page size is reasonable
- [ ] No console errors

## 🔐 Security Checklist

- [ ] No API keys in code
- [ ] No sensitive information in markdown
- [ ] Dependencies are up to date
- [ ] HTTPS is enabled (automatic with GitHub Pages)

## 📱 Browser Testing

Test in these browsers:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

## 🎉 Post-Deployment

### Share Your Site
- [ ] Update GitHub repository description
- [ ] Add link to repository README
- [ ] Share on social media
- [ ] Update resume/portfolio with link

### Ongoing Maintenance
- [ ] Set up regular content updates
- [ ] Monitor GitHub Actions for failures
- [ ] Keep dependencies updated
- [ ] Check analytics (if added)

## 📝 Quick Commands Reference

```bash
# Development
npm run dev

# Production build
npm run build

# Test production build
npx serve@latest out

# Deploy
git add .
git commit -m "message"
git push origin nextjs

# Update dependencies
npm update
npm audit fix

# Check for outdated packages
npm outdated
```

## ✨ Success Criteria

Your deployment is successful when:

1. ✅ Site loads at your GitHub Pages URL
2. ✅ All pages are accessible
3. ✅ Navigation works correctly
4. ✅ Markdown renders beautifully
5. ✅ Mobile responsive
6. ✅ Fast load times
7. ✅ No console errors
8. ✅ GitHub Actions shows green checkmark

## 🆘 Getting Help

If you encounter issues:

1. **Check Documentation**
   - Read `SETUP.md` for detailed configuration
   - Review `GETTING_STARTED.md` for basics
   - Consult `QUICK_REFERENCE.md` for quick fixes

2. **Review Logs**
   - GitHub Actions logs (Actions tab)
   - Browser console (F12 → Console)
   - npm build output

3. **External Resources**
   - [Next.js Documentation](https://nextjs.org/docs)
   - [GitHub Pages Docs](https://docs.github.com/pages)
   - [Next.js Discord](https://nextjs.org/discord)

4. **Common Solutions**
   - Clear cache and rebuild
   - Check all paths are relative
   - Verify configuration matches docs
   - Try manual workflow trigger

---

**Remember:** Most deployment issues are configuration-related. Double-check `next.config.js` and GitHub Pages settings first!

Good luck with your deployment! 🚀

