<template>
  <div class="frame">
    <h1>エラーが発生しました</h1>

    <NuxtLink to="/">ホームに戻る</NuxtLink>
  </div>
</template>

<script>
export default {
  name: "Error",
  head() {
    return {
      title: "エラーページ",
      meta: [{ hid: "robots", name: "robots", content: "noindex" }],
    };
  },
};
</script>
