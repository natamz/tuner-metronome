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
    head: {
      title: "tuner-metronome",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=1" },
        { name: "description", content: "tuner and metronome web app" },
      ],
    },
  },
  storybook: {
    addons: [],
    port: 4000,
    parameters: {
      backgrounds: {
        default: "light",
      },
      controls: {
        expanded: true,
      },
      layout: "centered",
    },
  },
});
