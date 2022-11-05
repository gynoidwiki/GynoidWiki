import axios from "axios";
const base = "https://gynoidwiki.com";
const url = process.env.NUXT_ENV_SITE_MAP;

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "%s | ガイノイドWiki",
    title: "ガイノイドWiki",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
      {
        hid: "og:site_name",
        property: "og:site_name",
        content: "ガイノイドWiki",
      },
      { hid: "og:type", property: "og:type", content: "website" },
      {
        hid: "og:url",
        property: "og:url",
        content: "https://www.gynoidwiki.com/",
      },
      { hid: "og:title", property: "og:title", content: "ガイノイドWiki" },
      {
        hid: "og:description",
        property: "og:description",
        content: "このサイトはガイノイドwikiです。",
      },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:creator", content: "@androidrobot999" },
      {
        hid: "og:image",
        property: "og:image",
        content:
          "https://lh3.googleusercontent.com/3lcpSKNy1SKoqjqVurhZUIHAp7iPvLGWiPQbmE-h0cIY7paR-O4pbPWeci0cwg5Joi6ZEe81OinuhKTxVuPVew3b-m8mj6fF3GTWYTZHe3CSJFhKPlhyxN4M9g97X-acFHyXr5X76_1UcntKTJTLXPByBXFcKc0tc8Hx-P4dZTIGSl8J4N6_5XGB9l9yXWwyq562xTpPelZLmbOAz6B1dMH7eOLahoQ9xOeMlV17kys_nGnUNySMXELVRT8iNxovCyD8rJD02dkgdBm_Rs43G480lSuA43Agc8QjeztfjHsQegKm3uotwWuwuyEDJ_HA4CumZyyZsPV_ZaLiuWs1yrc2Uvl3Ej6yRYxiMIvO4j8llRKSMwxUCAJEEf_5V89DVlzRl8BqGHO9kqXf-mlR5cHSABpvj7LSA9BUXS5pSqBgJ8DLcL6VT7_dhhhcsPbMQB-4tOFFhid2REOQmL51gI3nf4eMe96_FNKJ9ege-bsy7yGw7rXBmdlu1ltH7my_YwMfAcV34qC-92AcOWhJPqYJ0XVDwjouxxGzrcZPZK_g8DyyHHqmAj_0AbLGT5LiF8UVGxqeUhbzUR7sP9sslxTUCNtMrc4cGH-6fdsvn0jopeT5mohyjoyRSlRhVj1SGDN0GbeFjy9X3X8-NrY78ZMCbcfWv9MdFB8Te5Kl1h6OEObcsYqKSteE-1bgITznK1Q3R60K1eOFMnc_uNeWBkd8SDfEptevcu6mp9pbKBzXOOCwJjP6z707i3dbtLBghkAbnLmVxo1v6aVPCxKEYwB1Caffk0-lbcIhJp1SQM8TM4fuvxEfrYC6TFvggodlUixhuuxVSnB-iwU-LeNU6o9ABwjunwn_kdK6eoOw3ytZ36F6oB3k69dR-VxAWPPzhFoufR3uK7-Q_hnlTnwql527bsXSUQhsHa6f=w1280-h720-no?authuser=0",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~assets/css/style.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{ src: "@/plugins/firebase.js", mode: "client" }],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/buefy
    "nuxt-buefy",
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: "/",
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  sitemap: {
    path: "/sitemap.xml",
    hostname: base,
    exclude: ["/create", "/edit/*", "/maintenance", "/list/*", "/backup/*"],
    routes: async () => {
      const res = await axios.get(url);
      return res.data.documents.map(
        (info) => "/page/" + info.fields.id.stringValue
      );
    },
  },
};
