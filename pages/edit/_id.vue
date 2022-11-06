<template>
  <div>
    <b-breadcrumb>
      <b-breadcrumb-item tag="nuxt-link" to="/">ホーム</b-breadcrumb-item>
      <b-breadcrumb-item tag="nuxt-link" :to="'/page/' + id">{{
        title
      }}</b-breadcrumb-item>
      <b-breadcrumb-item tag="nuxt-link" :to="'/edit/' + id" active
        >{{ title }}の編集</b-breadcrumb-item
      >
    </b-breadcrumb>

    <h1>ページ編集</h1>
    <p class="mb-50">
      記事の作成前に「<nuxt-link to="/siteinfo">このサイトについて</nuxt-link
      >」や「<nuxt-link to="policy">プライバシーポリシー</nuxt-link
      >」を読んでください。
    </p>

    <div class="mb-10">
      <label for="title">タイトル</label>
      <b-form-input
        input-id="title"
        v-model="title"
        placeholder="タイトルは30文字までです"
      ></b-form-input>
    </div>

    <div class="mb-10">
      <label>内容</label>
      <div>
        <b-tabs content-class="mt-3">
          <b-tab title="マークダウン" active>
            <b-form-textarea
              v-model="body"
              placeholder="マークダウン方式で書いてください"
              :rows="rows"
            ></b-form-textarea>
          </b-tab>
          <b-tab title="プレビュー"
            ><div class="frame" v-html="preview"></div
          ></b-tab>
          <b-tab title="記法について">
            <p>記事の作成は<b>マークダウン</b>を用いて行います。</p>
            <p>見出しは「##」を使ってください。「#」では表示されません。</p>
          </b-tab>
        </b-tabs>
      </div>
    </div>
    <div>
      <b-button block variant="primary" v-bind:disabled="check" @click="post"
        >投稿</b-button
      >
    </div>
  </div>
</template>

<style></style>

<script>
import {
  setDoc,
  getFirestore,
  collection,
  updateDoc,
  doc,
} from "firebase/firestore";
import { marked } from "marked";
let count;

export default {
  head() {
    return {
      title: this.title + "の編集",
      meta: [{ hid: "robots", name: "robots", content: "noindex" }],
      script: [{ src: "https://cdn.jsdelivr.net/npm/marked/marked.min.js" }],
    };
  },
  data() {
    return {
      title: "",
      body: "",
      error: null,
    };
  },
  async asyncData({ route, $axios }) {
    const id = route.params.id;
    let docSnap;

    if (route.query.backup) {
      const url =
        "https://firestore.googleapis.com/v1/projects/gynoidwiki-16419/databases/(default)/documents/article/" +
        route.query.backup;
      const res = await $axios.$get(url);
      return {
        title: res.fields.title.stringValue,
        body: res.fields.body.stringValue,
      };
    } else {
      const url =
        "https://firestore.googleapis.com/v1/projects/gynoidwiki-16419/databases/(default)/documents/article/" +
        route.params.id;
      const res = await $axios.$get(url);
      return {
        title: res.fields.title.stringValue,
        body: res.fields.body.stringValue,
      };
    }
  },
  computed: {
    check: function () {
      if (!this.title || this.title.length > 30 || !this.body) {
        return true;
      } else {
        return false;
      }
    },
    rows: function () {
      count = this.body.split(/\r\n|\r|\n/);

      if (count.length > 5) {
        return count.length;
      } else {
        return 5;
      }
    },
    preview: function () {
      return marked.parse(this.body);
    },
  },
  methods: {
    post: async function () {
      const now = new Date();
      const db = getFirestore();
      const backup = collection(db, "backup");
      const backup_id = doc(backup).id;

      const page = await updateDoc(doc(db, "article", this.$route.params.id), {
        id: this.$route.params.id,
        title: this.title,
        body: this.body,
        updated_at: now,
      });

      setDoc(doc(db, "backup", backup_id), {
        id: backup_id,
        page_id: this.$route.params.id,
        title: this.title,
        body: this.body,
        date: now,
      });

      this.$router.push("/page/" + this.$route.params.id);
    },
    tagsplit(str) {
      if (str != null) {
        return str.split(",");
      }
      return null;
    },
  },
};
</script>
