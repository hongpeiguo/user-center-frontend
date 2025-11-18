<template>
  <div id="globalHeader">
    <a-row :wrap="false">
      <a-col flex="200px">
        <!-- left -->
        <div class="title-bar">
          <img class="logo" src="../assets/cat.jpg" alt="logo" />
          <div class="title">年糕用户中心</div>
        </div>
      </a-col>
      <a-col flex="auto">
        <!-- middle -->
        <a-menu
          v-model:selectedKeys="current"
          mode="horizontal"
          :items="items"
          @click="doMenuClick"
        >
          <a-menu-item key="mail">
            <template #icon>
              <mail-outlined />
            </template>
            Navigation One
          </a-menu-item>
          <a-menu-item key="app" disabled>
            <template #icon>
              <appstore-outlined />
            </template>
            Navigation Two
          </a-menu-item>
          <a-sub-menu>
            <template #icon>
              <setting-outlined />
            </template>
            <template #title>Navigation Three - Submenu</template>
            <a-menu-item-group title="Item 1">
              <a-menu-item key="setting:1">Option 1</a-menu-item>
              <a-menu-item key="setting:2">Option 2</a-menu-item>
            </a-menu-item-group>
            <a-menu-item-group title="Item 2">
              <a-menu-item key="setting:3">Option 3</a-menu-item>
              <a-menu-item key="setting:4">Option 4</a-menu-item>
            </a-menu-item-group>
          </a-sub-menu>
          <a-menu-item key="alipay">
            <a
              href="https://antdv.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Navigation Four - Link
            </a>
          </a-menu-item>
        </a-menu>
      </a-col>
      <a-col flex="80px">
        <!-- right -->
        <div class="user-login-status">
          <div v-if="loginUserStore.loginUser.id">
            {{ loginUserStore.loginUser.userName ?? "用户" }}
          </div>
          <div v-else>
            <a-button type="primary" href="/user/login">登录</a-button>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
import { h, ref } from "vue";
import { CrownOutlined, HomeOutlined } from "@ant-design/icons-vue";
import { MenuProps } from "ant-design-vue";
import { useRouter } from "vue-router";
import { useLoginUserStore } from "@/store/useLoginUserStore";
const router = useRouter();
// 当前选中菜单
const current = ref<string[]>([]);
// 监听路由变化，更新当前选中菜单
router.afterEach((to, from, failure) => {
  current.value = [to.path];
});

const doMenuClick = ({ key }: { key: string }) => {
  router.push({
    path: key,
  });
};

const loginUserStore = useLoginUserStore();
loginUserStore.fetchLoginUser();

const items = ref<MenuProps["items"]>([
  {
    key: "/",
    icon: () => h(HomeOutlined),
    label: "主页",
    title: "主页",
  },
  {
    key: "/user/login",
    label: "用户登录",
    title: "用户登录",
  },
  {
    key: "/user/register",
    label: "用户注册",
    title: "用户注册",
  },
  {
    key: "/admin/userManage",
    icon: () => h(CrownOutlined),
    label: "用户管理",
    title: "用户管理",
  },
  {
    key: "others",
    label: h(
      "a",
      { href: "https://www.baidu.com", target: "_blank" },
      "编程导航"
    ),
    title: "编程导航",
  },
]);
</script>
<style scoped>
.title-bar {
  display: flex;
  align-items: center;
}

.title {
  color: black;
  font-size: 18px;
  margin-left: 16px;
}

.logo {
  height: 48px;
}
</style>
