<template>
  <div>
    <b-breadcrumb>
      <b-breadcrumb-item tag="nuxt-link" to="/">ホーム</b-breadcrumb-item>
      <b-breadcrumb-item tag="nuxt-link" to="/create" active
        >新規ページ作成</b-breadcrumb-item
      >
    </b-breadcrumb>

    <h1>新規ページ作成</h1>

    <p class="mb-50">
      記事の作成前に「<nuxt-link to="/siteinfo">このサイトについて</nuxt-link
      >」や「<nuxt-link to="policy">プライバシーポリシー</nuxt-link
      >」を読んでください。
    </p>

    <b-field label="タイトル">
      <b-input v-model="title" maxlength="30"></b-input>
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

<style>
.errors {
  margin: 10px 0;
}
</style>

<script>
let count;
import { doc, setDoc, collection, getFirestore } from "firebase/firestore";
import { marked } from "marked";
marked.setOptions({ breaks: true });

export default {
  head() {
    return {
      title: "新規ページ作成",
      meta: [{ hid: "robots", name: "robots", content: "noindex" }],
    };
  },
  data() {
    return {
      title: "",
      tags: [],
      body: "",
      activeTab: 0,
    };
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
      return marked(this.body);
    },
  },
  methods: {
    post: async function () {
      const now = new Date();
      const db = getFirestore();
      const getid = collection(db, "article");
      const backup = collection(db, "backup");
      const page_id = doc(getid).id;
      const backup_id = doc(backup).id;

      const page = await setDoc(doc(db, "article", page_id), {
        id: page_id,
        title: this.title,
        body: this.body,
        created_at: now,
        updated_at: now,
      });

      setDoc(doc(db, "backup", backup_id), {
        id: backup_id,
        page_id: page_id,
        title: this.title,
        body: this.body,
        date: now,
      });

      this.$router.push("/page/" + page_id);
    },
  },
};
</script>
