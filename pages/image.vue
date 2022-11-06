<template>
  <div>
    <div>
      <b-field>
        <b-upload v-model="file" multiple drag-drop expanded>
          <section class="section">
            <div class="content has-text-centered">
              <p>
                <b-icon icon="upload" size="is-large"></b-icon>
              </p>
              <p>画像ファイルをアップロードできます。</p>
            </div>
          </section>
        </b-upload>
      </b-field>
    </div>

    <div class="mt-20">
      <b-button type="is-primary" expanded　@click="post"
        >アップロード</b-button
      >
    </div>

    <div class="content mt-20 frame">
      <h2>画像について</h2>
      <ul>
        <li>画像をクリックすると、URLをコピーできます。</li>
        <li>
          アップロード前に<nuxt-link to="/policy"
            >プライバシーポリシー</nuxt-link
          >を閲覧してください。
        </li>
      </ul>
    </div>

    <div class="mt-20 gallery">
      <img
        :src="
          'https://firebasestorage.googleapis.com/v0/b/gynoidwiki-16419.appspot.com/o/image%2F' +
          list.id +
          '?alt=media'
        "
        :alt="list.id"
        v-for="(list, num) in data"
        :key="num"
        loading="lazy"
        @click="
          paste(
            'https://firebasestorage.googleapis.com/v0/b/gynoidwiki-16419.appspot.com/o/image%2F' +
              list.id +
              '?alt=media'
          )
        "
      />
    </div>
  </div>
</template>

<script>
import { getStorage, ref, uploadBytes } from "firebase/storage";
import {
  doc,
  setDoc,
  collection,
  getFirestore,
  getDocs,
  query,
  limit,
  orderBy,
} from "firebase/firestore";

export default {
  head() {
    return {
      title: "画像アップロード",
      meta: [{ hid: "robots", name: "robots", content: "noindex" }],
    };
  },
  data() {
    return {
      file: [],
      data: [],
    };
  },
  methods: {
    post: function () {
      const now = new Date();
      let mountainsRef;
      var c = "abcdefghijklmnopqrstuvwxyz0123456789";
      var cl = c.length;
      var name = "";
      for (var i = 0; i < 30; i++) {
        name += c[Math.floor(Math.random() * cl)];
      }

      const file = this.file;
      const storage = getStorage();
      const storageRef = ref(storage, "/image/" + name);

      uploadBytes(storageRef, file).then((snapshot) => {
        this.file = [];
      });

      const db = getFirestore();
      const getid = collection(db, "article");

      setDoc(doc(db, "image", name), {
        id: name,
        created_at: now,
      });

      alert("アップロードに成功しました!");

      this.dataget();
    },
    dataget: function () {
      let data = [];
      const db = getFirestore();
      const docRef = collection(db, "image");

      getDocs(query(docRef, orderBy("created_at", "desc"), limit(100))).then(
        (snapshot) => {
          snapshot.forEach((doc) => {
            data.push(doc.data());
          });
        }
      );

      this.data = data;
    },
    paste: function (url) {
      navigator.clipboard
        .writeText(url)
        .then(() => {
          alert("コピーに成功しました!");
        })
        .catch((e) => {
          alert("コピーに失敗しました。");
        });
    },
  },
  mounted() {
    this.dataget();
  },
};
</script>
