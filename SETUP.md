# Next.js Static Site Setup for GitHub Pages

This is a Next.js 15 project configured for static site generation and deployment to GitHub Pages. It includes full support for markdown content rendering and nested routes.

## Features

- ✅ **Next.js 15** with App Router
- ✅ **TypeScript** for type safety
- ✅ **Tailwind CSS** for styling
- ✅ **Markdown Support** with gray-matter and react-markdown
- ✅ **Static Site Generation** (no SSR)
- ✅ **Nested Routes** for blog posts and pages
- ✅ **GitHub Actions** for automatic deployment
- ✅ **GitHub Pages** ready

## Project Structure

```
.
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment workflow
├── content/                     # Markdown content
│   ├── about.md                # About page content
│   └── blog/                   # Blog posts
│       ├── getting-started-with-nextjs.md
│       └── static-site-deployment.md
├── public/                     # Static assets
│   ├── .nojekyll              # Required for GitHub Pages
│   └── vinod_santharam_resume.pdf
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── about/
│   │   │   └── page.tsx       # About page
│   │   ├── blog/
│   │   │   ├── [slug]/
│   │   │   │   └── page.tsx   # Dynamic blog post page
│   │   │   └── page.tsx       # Blog listing page
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   ├── not-found.tsx      # 404 page
│   │   └── page.tsx           # Home page
│   ├── components/
│   │   └── MarkdownRenderer.tsx # Markdown rendering component
│   └── lib/
│       └── markdown.ts        # Markdown utilities
├── next.config.js             # Next.js configuration
├── tailwind.config.ts         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

Build the static site:

```bash
npm run build
```

This will generate static files in the `out` directory.

### Testing the Build Locally

You can test the production build locally:

```bash
npx serve@latest out
```

## Content Management

### Adding Blog Posts

1. Create a new markdown file in `content/blog/`:

```markdown
---
title: Your Blog Post Title
date: 2024-11-22
author: Your Name
description: A brief description of your post
tags: [tag1, tag2, tag3]
---

Your markdown content here...
```

2. The file name (without `.md`) will be the URL slug
3. Blog posts are automatically sorted by date (newest first)

### Adding Pages

1. Create a markdown file in `content/`:

```markdown
---
title: Page Title
description: Page description
---

Your content here...
```

2. Create a corresponding page component in `src/app/` that uses `getMarkdownContent()`

### Markdown Features

The following markdown features are supported:

- **Headers**: `#`, `##`, `###`, etc.
- **Bold** and _italic_ text
- [Links](https://example.com)
- `Inline code`
- Code blocks with syntax highlighting
- Lists (ordered and unordered)
- Blockquotes
- Tables
- Images
- GitHub Flavored Markdown (GFM)

## Deployment to GitHub Pages

### Initial Setup

1. **Enable GitHub Pages**:

   - Go to your repository settings
   - Navigate to "Pages"
   - Under "Source", select "GitHub Actions"

2. **Configure Base Path** (if needed):

   If deploying to `username.github.io`, leave `basePath` empty in `next.config.js`:

   ```javascript
   basePath: '',
   ```

   If deploying to `username.github.io/repo-name`, set:

   ```javascript
   basePath: '/repo-name',
   ```

### Automatic Deployment

The site automatically deploys when you push to the `main` or `nextjs` branch:

1. Make your changes
2. Commit and push:
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin nextjs
   ```
3. GitHub Actions will automatically build and deploy
4. Check the "Actions" tab to monitor deployment

### Manual Deployment

You can also trigger a manual deployment:

1. Go to the "Actions" tab in your repository
2. Select "Deploy Next.js to GitHub Pages"
3. Click "Run workflow"

## Configuration

### Next.js Configuration

Key settings in `next.config.js`:

```javascript
{
  output: 'export',           // Static export
  images: {
    unoptimized: true,        // Required for static hosting
  },
  basePath: '',               // Set based on deployment URL
  trailingSlash: true,        // Better compatibility
}
```

### TypeScript

TypeScript is configured with strict mode enabled. The project uses path aliases:

```typescript
import { Component } from "@/components/Component";
import { utility } from "@/lib/utility";
```

### Tailwind CSS

Tailwind is configured with the `@tailwindcss/typography` plugin for beautiful markdown styling.

## Customization

### Styling

- Modify `src/app/globals.css` for global styles
- Update `tailwind.config.ts` for Tailwind customization
- Markdown styles are in the `.markdown-content` class

### Layout

- Edit `src/app/layout.tsx` to change the site header/footer
- Modify navigation links and branding

### Home Page

- Edit `src/app/page.tsx` to customize the landing page

## Troubleshooting

### 404 Errors

If you get 404 errors on GitHub Pages:

1. Ensure `.nojekyll` exists in the `public` folder
2. Check `basePath` in `next.config.js`
3. Verify `trailingSlash: true` is set

### Build Failures

Common issues:

- **Missing dependencies**: Run `npm install`
- **TypeScript errors**: Check `tsconfig.json` and fix type issues
- **Environment variables**: Add to GitHub repository secrets

### Styling Issues

If styles don't load:

1. Check that Tailwind CSS is properly configured
2. Ensure `globals.css` is imported in `layout.tsx`
3. Verify PostCSS configuration

## Best Practices

1. **Content Organization**: Keep all markdown files in the `content` directory
2. **Images**: Store images in `public/` and reference them in markdown
3. **SEO**: Add proper metadata to each page
4. **Performance**: Use Next.js Image component when possible (though limited in static export)
5. **Accessibility**: Follow WCAG guidelines for accessible content
6. **Version Control**: Don't commit `node_modules`, `.next`, or `out` directories

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js Static Exports](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [GitHub Pages Documentation](https://docs.github.com/pages)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Markdown Guide](https://www.markdownguide.org/)

## Support

For issues or questions:

1. Check the [Next.js GitHub Issues](https://github.com/vercel/next.js/issues)
2. Review [GitHub Pages troubleshooting](https://docs.github.com/pages/getting-started-with-github-pages/troubleshooting-jekyll-build-errors-for-github-pages-sites)
3. Consult the documentation links above

## License

This project structure is open for personal use. Modify as needed for your requirements.
