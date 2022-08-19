import { defineNuxtConfig } from "nuxt";

const baseURL = process.env.baseURL;

export default defineNuxtConfig({
  css: ["vuetify/lib/styles/main.sass"],
  build: {
    transpile: ["vuetify"],
  },
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
  },
  app: {
    baseURL: baseURL,
  },
});
