<template>
  <div>
    <b-breadcrumb>
      <b-breadcrumb-item tag="router-link" to="/">ホーム</b-breadcrumb-item>
      <b-breadcrumb-item tag="router-link" to="/list/create"
        >記事</b-breadcrumb-item
      >
      <b-breadcrumb-item tag="router-link" to="/" active>{{
        title.stringValue
      }}</b-breadcrumb-item>
    </b-breadcrumb>
    <div class="content">
      <h1>{{ title.stringValue }}</h1>
      <div class="mb-20">
        <b-button
          type="is-info"
          tag="a"
          :href="
            'https://twitter.com/intent/tweet?ref_src=twsrc%5Etfw&url=' +
            encodeURI('https://www.gynoidwiki.com' + $route.path) +
            '&text=' +
            encodeURI(title.stringValue + ' | ガイノイドWiki')
          "
          size="is-small"
          icon-left="twitter"
          target="_blank"
        >
          Twitterにて共有</b-button
        >
      </div>

      <div class="mt-50 page" v-html="change(body.stringValue)"></div>

      <div class="mt-50">
        <ul>
          <li>作成日時:{{ time(created_at.timestampValue) }}</li>
          <li>最終更新:{{ time(updated_at.timestampValue) }}</li>
        </ul>
        <p>
          <nuxt-link
            :to="
              '/list/' +
              $route.params.id +
              '?title=' +
              encodeURI(title.stringValue)
            "
            >編集履歴</nuxt-link
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { marked } from "marked";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

marked.setOptions({ breaks: true });
dayjs.extend(utc);
dayjs.extend(timezone);

export default {
  name: "HomePage",
  script: [
    {
      src: "https://platform.twitter.com/widgets.js",
      async: true,
    },
  ],
  head() {
    return {
      title: this.title.stringValue,
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content: this.body.stringValue,
        },
        {
          hid: "og:site_name",
          property: "og:site_name",
          content: "ガイノイドwiki",
        },
        { hid: "og:type", property: "og:type", content: "website" },
        { hid: "og:url", property: "og:url", content: this.$route.path },
        {
          hid: "og:title",
          property: "og:title",
          content: this.title.stringValue,
        },
        {
          hid: "keywords",
          name: "keywords",
          content: this.title.stringValue,
        },
        {
          hid: "og:description",
          property: "og:description",
          content: this.body.stringValue,
        },
        {
          hid: "og:image",
          property: "og:image",
          content:
            "https://lh3.googleusercontent.com/nzqzypUE3seovKtwyu1__g7ruz0I03bf_Scj_aTggkfLI-dZeEqbKkYY38aL7ENbvvFiuDNhC-K2oI1w9rXFOVcYKnuzEkaf9T2aaW3Xgt1HPdBIq5BzijsvlPCzl05at0TUqGmyuNPuuS6AMFIMm-olbGxfuJhHKbBAwZlXZmem26R_OPREcfyQNgRYCj0XsscGNqtPQAxXziYgVCggQySGWyEViR4nVg_T3g7D2jy2XY9eA2hYC2gH14MKmEpAclJLpUGvGhknsexv6VBCEUj66HDDTnai4ns_5Lw9prke3xBU0Ct9foyjYWOrkKIEcigXBFR4XVax48ce8HFu9tHJYVmHR8oi20JfN3SNCmyP9OJHIXFB0pZ_oXfY4O60wuCFX6pnaFCUoyQ49ixmGRkEfqa8mjJTapVHHfLxnraIa2l9e6nGVyWXEdDMhCqggJpFioH2yxb8Pfj0oqsin6dJf97-y_9QGr09LVO1rw382PLDXF7UErZjma-lLNNcZne2dE9mv5ZH6TbDdKr0q6yN_snWmKuCxVpIKzsdlWWQvDY8yQajzo2HQZrvXD81bvy4d_-J-EQ58LqaMrZin_Ilvb7ghukKaPYUpG4HJ46GSah1a1fSp7o-mCHv0vkZxiR83MnG--GCrWIgV5AjC_UdqfYWhgGuJixA7Ysicld67hhcmd0HFLvJmGBIibBFr2QZ6_834fptT-fCcHs3yyeSK_GA11bLtFmFzBrKTQVGFd9HaUUtM4jM-DK057NyPcCzMlmGp8qGvgOFKzg78lYgNz-PLA31V5r5-a0abqITjFEWEGV1K0qinvCWQSZEP9NrpQzcD2emAsVmZ--F-Vht6ACzhHFWM3-Mcp3BHumvGFD3IrHAVCdL1u7n-ldMyOOMW90WwzKoTvJxMz4KjJ9lY_gCuV6l6Xy7jGPBzvI=w1280-h720-no?authuser=0",
        },
        { name: "twitter:card", content: "summary" },
      ],
    };
  },
  async asyncData({ route, error, $axios }) {
    const id = route.params.id;

    const url =
      "https://firestore.googleapis.com/v1/projects/gynoidwiki-d189f/databases/(default)/documents/article/" +
      route.params.id;

    try {
      const res = await $axios.$get(url);
      return res.fields;
    } catch {
      error({});
    }
  },
  methods: {
    time: function (data) {
      const time = dayjs
        .utc(data.seconds)
        .tz("Asia/Tokyo")
        .format("YYYY-MM-DD HH:mm:ss");

      return time;
    },
    change: function (str) {
      return marked.parse(str);
    },
  },
};
</script>

<style>
a {
  word-break: break-all;
}
.p-10 {
  padding: 10px;
}

.mt-30 {
  margin-top: 30px;
}

.white {
  color: white;
}
</style>
