---
title: Deploying Static Sites to GitHub Pages
date: 2024-11-20
author: Vinod Santharam
description: Learn how to deploy your static Next.js site to GitHub Pages using GitHub Actions
tags: [deployment, github-pages, devops, ci-cd]
---

## Introduction

GitHub Pages is a free hosting service provided by GitHub that's perfect for static websites, documentation, and personal portfolios. In this guide, we'll walk through deploying a Next.js static site to GitHub Pages.

## Prerequisites

Before we begin, make sure you have:

- A GitHub account
- A Next.js project configured for static export
- Basic knowledge of Git and GitHub

## Configuring Next.js for Static Export

First, ensure your `next.config.js` is set up for static export:

```javascript
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: "",
  trailingSlash: true,
};

module.exports = nextConfig;
```

### Important Notes

- **basePath**: Leave empty for `username.github.io`, or set to `/repo-name` for project sites
- **images.unoptimized**: Required because GitHub Pages doesn't support Next.js Image Optimization API
- **trailingSlash**: Recommended for better compatibility with static hosting

## GitHub Actions Workflow

Create a workflow file at `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: ./out

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v3
```

## Repository Settings

1. Go to your repository settings
2. Navigate to **Pages** section
3. Under **Source**, select **GitHub Actions**
4. Save your changes

## Deployment Process

Once configured, the deployment happens automatically:

1. Push changes to the `main` branch
2. GitHub Actions builds your site
3. The static files are deployed to GitHub Pages
4. Your site is live at `https://username.github.io`

## Custom Domain (Optional)

To use a custom domain:

1. Add a `CNAME` file to the `public` directory with your domain
2. Configure DNS records with your domain provider
3. Enable HTTPS in repository settings

```text
example.com
```

## Troubleshooting

### 404 Errors

If you get 404 errors, check:

- `basePath` configuration in `next.config.js`
- Ensure `trailingSlash: true` is set
- Verify links use the correct base path

### Build Failures

Common issues:

- Missing dependencies: Run `npm install` locally to verify
- Environment variables: Add them to GitHub repository secrets
- Build errors: Check the Actions log for details

## Best Practices

1. **Test Locally**: Always test the build locally with `npm run build`
2. **Use Environment Variables**: Store secrets in GitHub repository secrets
3. **Monitor Deployments**: Check GitHub Actions logs regularly
4. **Cache Dependencies**: The workflow above caches npm dependencies for faster builds
5. **Version Control**: Don't commit the `out` directory

## Conclusion

Deploying to GitHub Pages with GitHub Actions provides a seamless CI/CD pipeline for your static Next.js sites. It's free, reliable, and integrates perfectly with your development workflow.

### Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/pages)
- [GitHub Actions Documentation](https://docs.github.com/actions)
- [Next.js Static Exports](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)

Happy deploying! 🚀
