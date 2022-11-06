<template>
  <div>
    <div class="header">
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand to="/">ガイノイドWiki</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item-dropdown text="ページ" right>
              <b-dropdown-item to="/create">作成</b-dropdown-item>
              <b-dropdown-item
                href="#"
                v-if="$route.params.id"
                :to="'/edit/' + $route.params.id"
                >編集</b-dropdown-item
              >
            </b-nav-item-dropdown>
            <b-nav-item to="/image">画像</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <b-container class="bv-example-row mt-10">
      <b-row>
        <b-col lg="8"><Nuxt /></b-col>
        <b-col lg="4"><Side /></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<style></style>

<script>
import { getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";
import Side from "@/components/Side.vue";

export default {
  middleware: "maintenance",
  data() {
    return {
      keyword: "",
    };
  },
  components: {
    Side,
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        signInAnonymously(auth)
          .then(() => {
            console.log("Login");
          })
          .catch((error) => {
            this.$router.push("/error");
          });
      }
    });
  },
};
</script>

<style>
.mt-10 {
  margin-top: 10px;
}
</style>
