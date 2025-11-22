# Quick Reference Card

## 🚀 Essential Commands

```bash
# Development
npm install              # Install dependencies (first time)
npm run dev             # Start development server
npm run build           # Build for production
npm run lint            # Check code quality

# Testing Build Locally
npx serve@latest out    # Serve the built site

# Deployment
git add .
git commit -m "message"
git push origin nextjs  # Triggers auto-deployment
```

## 📝 Adding Content

### New Blog Post
1. Create: `content/blog/my-post.md`
2. Add frontmatter:
```markdown
---
title: My Post Title
date: 2024-11-22
author: Your Name
description: Post description
tags: [tag1, tag2]
---

Content here...
```
3. Access at: `/blog/my-post`

### Update About Page
Edit: `content/about.md`

### Add Images
1. Place in: `public/images/`
2. Reference: `![Alt text](/images/photo.jpg)`

## 🎨 Customization Quick Links

| What to Change | File Location |
|----------------|---------------|
| Site Title | `src/app/layout.tsx` |
| Navigation Links | `src/app/layout.tsx` |
| Home Page | `src/app/page.tsx` |
| Colors | `tailwind.config.ts` |
| Markdown Styles | `src/app/globals.css` |
| Base Path | `next.config.js` |

## 📂 Key Directories

```
content/          → Your markdown files
public/           → Static assets (images, PDFs)
src/app/          → Pages and routes
src/components/   → React components
src/lib/          → Utility functions
.github/workflows → Deployment configuration
```

## 🔧 Configuration Files

- `next.config.js` - Next.js settings (basePath, output)
- `tailwind.config.ts` - Styling configuration
- `tsconfig.json` - TypeScript settings
- `package.json` - Dependencies and scripts

## 🌐 URLs After Deployment

- **Main Site**: `https://vinodsantharam.github.io`
- **Blog**: `https://vinodsantharam.github.io/blog/`
- **About**: `https://vinodsantharam.github.io/about/`
- **Blog Post**: `https://vinodsantharam.github.io/blog/post-slug/`

## 🐛 Quick Troubleshooting

### Dev server not starting?
```bash
rm -rf node_modules .next
npm install
npm run dev
```

### Styles not loading?
1. Check `globals.css` import in `layout.tsx`
2. Restart dev server

### Build failing?
```bash
npm run lint        # Check for errors
npm run build      # See detailed error
```

### 404 on GitHub Pages?
1. Check `.nojekyll` exists in `public/`
2. Verify `basePath` in `next.config.js`
3. Ensure `trailingSlash: true`

## 📚 Documentation

- **Getting Started**: `GETTING_STARTED.md`
- **Detailed Setup**: `SETUP.md`
- **Full Overview**: `PROJECT_SUMMARY.md`
- **This File**: `QUICK_REFERENCE.md`

## 🔗 External Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind Docs](https://tailwindcss.com/docs)
- [Markdown Guide](https://www.markdownguide.org/)
- [GitHub Pages](https://docs.github.com/pages)

## ⚡ Tips

1. **Hot Reload**: Dev server auto-refreshes on file changes
2. **TypeScript**: Get instant type checking in VS Code
3. **Git**: Commit often, push to deploy
4. **Actions Tab**: Monitor deployment status
5. **Local Build**: Always test `npm run build` before pushing

## 🎯 Common Tasks

### Change Site Name
1. Edit `src/app/layout.tsx` → metadata.title
2. Edit `src/app/layout.tsx` → header link text

### Add New Page
1. Create `src/app/newpage/page.tsx`
2. Add navigation link in `layout.tsx`

### Change Color Scheme
Edit `tailwind.config.ts` theme colors

### Add Social Links
Edit footer in `src/app/layout.tsx`

## 📦 Package Versions

- Next.js: 15.0.3
- React: 18.3.1
- TypeScript: 5.6.3
- Tailwind: 3.4.14
- Node: 20.x

---

**Need help?** Check the detailed documentation files or search the issue in Next.js GitHub!

