<template>
  <b-navbar>
    <template #brand>
      <b-navbar-item class="font24" tag="nuxt-link" :to="{ path: '/' }">
        ガイノイドWiki
      </b-navbar-item>
    </template>
    <template #start>
      <b-navbar-dropdown label="ページ">
        <b-navbar-item tag="nuxt-link" to="/create"> 新規 </b-navbar-item>
        <b-navbar-item
          v-if="$route.params.id"
          tag="nuxt-link"
          :to="'/edit/' + $route.params.id"
          >編集</b-navbar-item
        >
      </b-navbar-dropdown>
      <b-navbar-item tag="nuxt-link" to="/policy">
        プライバシーポリシー
      </b-navbar-item>
      <b-navbar-item tag="nuxt-link" to="/image">
        画像アップロード
      </b-navbar-item>
      <b-navbar-item tag="nuxt-link" to="/contact">
        お問い合わせ
      </b-navbar-item>
    </template>

    <template #end>
      <b-navbar-item tag="div">
        <b-field grouped>
          <b-input placeholder="検索ワード" v-model="keyword"></b-input>
          <p class="control">
            <b-button
              label="検索"
              type="is-primary"
              v-bind:disabled="check"
              @click="search"
            />
          </p>
        </b-field>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  data() {
    return {
      keyword: "",
    };
  },
  methods: {
    search: function () {
      this.$router.push("/search?keyword=" + this.keyword);
    },
  },
  computed: {
    check: function () {
      if (this.keyword.length < 2) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>
