# Getting Started Guide

This guide will help you get your Next.js static site up and running quickly.

## Step 1: Install Dependencies

First, install all the required dependencies:

```bash
npm install
```

This will install:
- Next.js 15
- React 18
- TypeScript
- Tailwind CSS
- Markdown processing libraries (gray-matter, react-markdown)
- And all other required packages

## Step 2: Run the Development Server

Start the development server:

```bash
npm run dev
```

Open your browser and navigate to [http://localhost:3000](http://localhost:3000). You should see your site running locally.

## Step 3: Explore the Site

The default setup includes:

- **Home Page** (`/`) - Landing page with links to other sections
- **Blog** (`/blog`) - List of all blog posts
- **Blog Posts** (`/blog/[slug]`) - Individual blog post pages
- **About** (`/about`) - About page with markdown content

## Step 4: Add Your Content

### Adding a Blog Post

1. Create a new markdown file in `content/blog/`:

```bash
touch content/blog/my-first-post.md
```

2. Add frontmatter and content:

```markdown
---
title: My First Blog Post
date: 2024-11-22
author: Your Name
description: This is my first blog post
tags: [hello, world]
---

# Welcome

This is my first blog post content!

## Features

- Easy to write
- Supports markdown
- Looks great!
```

3. The post will automatically appear at `/blog/my-first-post`

### Updating the About Page

Edit `content/about.md` to customize your about page content.

### Adding Images

Place images in the `public` folder and reference them in markdown:

```markdown
![My Image](/image.jpg)
```

## Step 5: Customize Styling

### Colors and Branding

Edit `tailwind.config.ts` to customize colors:

```typescript
theme: {
  extend: {
    colors: {
      primary: '#your-color',
      // ... more colors
    },
  },
}
```

### Layout

Edit `src/app/layout.tsx` to customize:
- Site title
- Navigation links
- Header/footer content

### Markdown Styles

Edit the `.markdown-content` class in `src/app/globals.css` to customize how markdown renders.

## Step 6: Build for Production

When you're ready to deploy:

```bash
npm run build
```

This generates static files in the `out` directory.

### Test the Build Locally

```bash
npx serve@latest out
```

Visit [http://localhost:3000](http://localhost:3000) to see the production build.

## Step 7: Deploy to GitHub Pages

### Prerequisites

1. Your repository must be named `username.github.io` (for user site) or any name (for project site)
2. The repository must be public (for free GitHub Pages)

### Configure Base Path

In `next.config.js`:

- For `username.github.io`: Keep `basePath: ''`
- For `username.github.io/repo-name`: Set `basePath: '/repo-name'`

### Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. Save

### Deploy

Simply push to the `main` or `nextjs` branch:

```bash
git add .
git commit -m "Initial Next.js setup"
git push origin nextjs
```

GitHub Actions will automatically:
1. Install dependencies
2. Build your site
3. Deploy to GitHub Pages

Monitor progress in the **Actions** tab of your repository.

## Common Commands

```bash
# Development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint

# Install new dependency
npm install package-name

# Install new dev dependency
npm install -D package-name
```

## Project Structure Overview

```
├── content/              # Your markdown content
│   ├── about.md
│   └── blog/
│       └── *.md
├── public/              # Static files (images, PDFs, etc.)
├── src/
│   ├── app/            # Next.js pages (routes)
│   │   ├── layout.tsx  # Main layout
│   │   ├── page.tsx    # Home page
│   │   ├── about/
│   │   ├── blog/
│   │   └── not-found.tsx
│   ├── components/     # React components
│   └── lib/           # Utility functions
├── .github/
│   └── workflows/     # GitHub Actions
└── [config files]
```

## Next Steps

1. **Customize Content**: Update the about page and add blog posts
2. **Personalize Design**: Modify colors, fonts, and layouts
3. **Add Features**: Consider adding:
   - Search functionality
   - Categories/tags pages
   - RSS feed
   - Sitemap
   - Analytics
4. **SEO Optimization**: Add metadata, Open Graph tags, and structured data
5. **Performance**: Optimize images and add lazy loading

## Troubleshooting

### Port Already in Use

If port 3000 is already in use:

```bash
# Use a different port
npm run dev -- -p 3001
```

### Build Errors

If you encounter build errors:

1. Delete `node_modules` and `.next`:
   ```bash
   rm -rf node_modules .next
   npm install
   ```

2. Check for TypeScript errors:
   ```bash
   npm run lint
   ```

### Styling Not Working

If Tailwind styles aren't applying:

1. Ensure `globals.css` is imported in `layout.tsx`
2. Check `tailwind.config.ts` content paths
3. Restart the dev server

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Markdown Guide](https://www.markdownguide.org/)
- [GitHub Pages Documentation](https://docs.github.com/pages)

## Need Help?

- Check [SETUP.md](SETUP.md) for detailed documentation
- Review the example blog posts in `content/blog/`
- Consult the official Next.js documentation

Happy coding! 🚀

