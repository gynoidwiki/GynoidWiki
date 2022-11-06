<template>
  <div>
    <h1>新規ページ作成</h1>
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

<script>
import { doc, setDoc, collection, getFirestore } from "firebase/firestore";
import { marked } from "marked";
let count;

export default {
  head() {
    return {
      title: "新規ページ作成",
      meta: [{ hid: "robots", name: "robots", content: "noindex" }],
      script: [{ src: "https://cdn.jsdelivr.net/npm/marked/marked.min.js" }],
    };
  },
  data() {
    return {
      title: "",
      tags: [],
      body: "",
      error: null,
    };
  },
  computed: {
    check: function () {
      if (
        !this.title ||
        this.title.length > 30 ||
        this.tags.length < 1 ||
        this.tags.length > 20 ||
        !this.body
      ) {
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
      const getid = collection(db, "article");
      const backup = collection(db, "backup");
      const page_id = doc(getid).id;
      const backup_id = doc(backup).id;

      const page = await setDoc(doc(db, "article", page_id), {
        id: page_id,
        title: this.title,
        tags: this.tags,
        body: this.body,
        created_at: now,
        updated_at: now,
      });

      setDoc(doc(db, "backup", backup_id), {
        id: backup_id,
        page_id: page_id,
        title: this.title,
        tags: this.tags,
        body: this.body,
        date: now,
      });

      this.$router.push("/page/" + page_id);
    },
  },
};
</script>

<style>
.mb-10 {
  margin-bottom: 10px;
}
</style>
