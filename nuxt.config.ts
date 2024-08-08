// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  app: {
    head: {
      title: "Suitmedia Assignment",
      meta: [
        {
          name: "description",
          property: "description",
          content:
            "This website, created by Muhammad Sopian, serve as a task assignment for internship as a Frontend Developer at Suitmedia.",
        },
      ],
      link: [{ rel: "icon", type: "image/png", href: "/favicon.png" }],
    },
  },
});
