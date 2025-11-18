<template>
  <div id="basicLayout">
    <a-layout>
      <a-layout-header class="header"><GlobalHeader /></a-layout-header>
      <a-layout-content class="content"><router-view /></a-layout-content>
      <a-layout-footer class="footer">
        <a href="www.baidu.com" target="_blank"> 编程坟墓by嫩蝶 </a>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script setup lang="ts">
import GlobalHeader from "@/components/GlobalHeader.vue";
</script>

<style scoped>
#basicLayout .footer {
  background: #efefef;
  text-align: center;
  padding: 16px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}

#basicLayout .content {
  padding: 20px;
  margin-bottom: 28px;
  background: linear-gradient(to right, #fefefe, #fff);
}

#basicLayout .header {
  padding-inline: 20px;
  margin-bottom: 16px;
  color: unset;
  background: white;
}
</style>
