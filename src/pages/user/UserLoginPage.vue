<script lang="ts" setup>
import { reactive } from "vue";
import { userLogin } from "@/api/user";
import { useLoginUserStore } from "@/store/useLoginUserStore";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";

/**
 * 接口定义数据类型
 */
interface FormState {
  userAccount: string;
  userPassword: string;
}

/**
 * 接收数据，要符合接口的定义
 */
const formState = reactive<FormState>({
  userAccount: "",
  userPassword: "",
});

/**
 * 固定导入
 */
const router = useRouter();
/**
 * 导入用户登录要用的数据
 */
const loginUserStore = useLoginUserStore();

/**
 * 提交表单
 * @param values
 */
const handleSubmit = async (values: any) => {
  // 6. 调用登录 API
  // await userLogin(values) 会暂停代码执行，直到 userLogin 函数返回结果。
  // userLogin 是你封装好的函数，它发送一个 POST 请求到后端的登录接口。
  // values 包含了用户输入的账号和密码。
  // res 是后端返回的响应数据。
  const res = await userLogin(values);
  // 登录成功，把登录态保存到全局状态中
  if (res.data.code === 0 && res.data.data) {
    // a. 调用 Pinia Store 的方法，从后端获取当前登录用户的详细信息，
    //    并将其保存到全局状态中，以便其他组件可以访问。
    await loginUserStore.fetchLoginUser();
    message.success("登录成功");
    // c. 使用 router 实例进行编程式导航，跳转到首页 ('/')。
    //    replace: true 表示用新的路由记录替换当前的记录，
    //    用户点击浏览器“后退”按钮时不会回到登录页。
    router.push({
      path: "/",
      replace: true,
    });
  } else {
    message.error("登录失败");
  }
};
</script>
<template>
  <div id="userLoginPage">
    <h2 class="title">用户登录</h2>
    <a-form
      style="max-width: 480px; margin: 0 auto"
      :model="formState"
      name="basic"
      label-align="left"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 20 }"
      autocomplete="off"
      @finish="handleSubmit"
    >
      <a-form-item
        label="账号"
        name="userAccount"
        :rules="[{ required: true, message: '请输入账号' }]"
      >
        <a-input
          v-model:value="formState.userAccount"
          placeholder="请输入账号"
        />
      </a-form-item>
      <a-form-item
        label="密码"
        name="userPassword"
        :rules="[
          { required: true, message: '请输入密码' },
          { min: 8, message: '密码不能小于 8 位' },
        ]"
      >
        <a-input-password
          v-model:value="formState.userPassword"
          placeholder="请输入密码"
        />
      </a-form-item>
      <a-form-item :wrapper-col="{ offset: 4, span: 20 }">
        <a-button type="primary" html-type="submit">登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<style scoped>
#userLoginPage .title {
  text-align: center;
  margin-bottom: 16px;
}
</style>
