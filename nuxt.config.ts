// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    siteUrl: (globalThis as any).process?.env?.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true }
})
