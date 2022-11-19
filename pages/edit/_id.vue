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

    <h1>ページの編集</h1>
    <p class="mb-50">
      記事の作成前に「<nuxt-link to="/siteinfo">このサイトについて</nuxt-link
      >」や「<nuxt-link to="policy">プライバシーポリシー</nuxt-link
      >」を読んでください。
    </p>

    <b-field label="タイトル">
      <b-input v-model="title" maxlength="100"></b-input>
    </b-field>

    <b-field label="内容">
      <b-tabs v-model="activeTab">
        <b-tab-item label="マークダウン">
          <b-input type="textarea" v-model="body" :rows="rows"></b-input>
        </b-tab-item>

        <b-tab-item label="プレビュー">
          <div v-html="preview" class="content page"></div>
        </b-tab-item>

        <b-tab-item label="記事の記法">
          <div class="content">
            <p>記事の作成は<b>マークダウン</b>を用いて行います。</p>
            <p>見出しは「##」を使ってください。「#」では表示されません。</p>
          </div>
        </b-tab-item>
      </b-tabs>
    </b-field>

    <div class="buttons">
      <b-button type="is-primary" expanded v-bind:disabled="check" @click="post"
        >投稿</b-button
      >
    </div>
  </div>
</template>

<style></style>

<script>
let count;
import {
  setDoc,
  getFirestore,
  collection,
  updateDoc,
  doc,
} from "firebase/firestore";
import { marked } from "marked";
marked.setOptions({ breaks: true });

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
      activeTab: 0,
    };
  },
  async asyncData({ route, $axios }) {
    const id = route.params.id;
    let docSnap;

    if (route.query.backup) {
      const url =
        "https://firestore.googleapis.com/v1/projects/gynoidwiki-d189f/databases/(default)/documents/article/" +
        route.query.backup;
      const res = await $axios.$get(url);
      return {
        title: res.fields.title.stringValue,
        body: res.fields.body.stringValue,
      };
    } else {
      const url =
        "https://firestore.googleapis.com/v1/projects/gynoidwiki-d189f/databases/(default)/documents/article/" +
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
      if (!this.title || this.title.length > 100 || !this.body) {
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
      return marked(this.body);
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
