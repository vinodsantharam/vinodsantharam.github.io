/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Configure the base path for GitHub Pages
  // If deploying to username.github.io, leave basePath empty
  // If deploying to username.github.io/repo-name, set basePath: '/repo-name'
  basePath: '',
  trailingSlash: true,
}

module.exports = nextConfig

