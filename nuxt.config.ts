// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    '@nuxt/image',
    'shadcn-nuxt',
    '@pinia/nuxt',
    [
      '@vee-validate/nuxt',
      {
        autoImports: true,
      },
    ],
    [
      '@nuxtjs/google-fonts',
      {
        families: {
          Lato: {
            wght: [300, 400, 700],
            ital: [300],
          },
        },
      },
    ],
  ],
  shadcn: {
    prefix: 'Ui',
    componentDir: './components/ui',
  },
  pinia: {
    storesDirs: ['./store/**']
  }
});
