import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'

// Flat config (ESLint 9). Replaces the legacy .eslintrc.json + `next lint`,
// both removed in Next 16. Run with `npm run lint`.
const eslintConfig = [
  ...nextCoreWebVitals,
  {
    ignores: ['.next/**', 'out/**', 'public/**', 'node_modules/**'],
  },
]

export default eslintConfig
