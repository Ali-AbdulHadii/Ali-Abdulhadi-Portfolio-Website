import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1] || ''
const isUserOrOrgSite = repositoryName.endsWith('.github.io')
const githubPagesBase = repositoryName && !isUserOrOrgSite ? `/${repositoryName}/` : '/'

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? githubPagesBase : '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
