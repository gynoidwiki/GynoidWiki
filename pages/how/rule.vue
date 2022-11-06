<template>
  <div>
    <h1>記事作成のルール</h1>
    <div class="frame">
      <h2>タイトル</h2>
      <ul>
        <li>
          キャラクターの場合
          <ul>
            <li>〇〇(作品名)と書いてください。</li>
          </ul>
        </li>
      </ul>

      <h2>記事</h2>
      <ul>
        <li>記事は「マークダウン」を使っています。</li>
        <li>見出しは「## ○○」です。#が1個で表示されません。</li>
      </ul>

      <ul>
        <p>以下のリンクの貼り付けは禁止です。</p>
        <li>アフィリエイトリンク</li>
        <li>関係ないサイトのリンク</li>
        <li>アダルトサイトのリンク</li>
        <li>有害なサイトのリンク</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "ルール",
  head() {
    return {
      title: "記事作成のルール",
    };
  },
};
</script>
