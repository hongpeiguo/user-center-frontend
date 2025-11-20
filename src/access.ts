import router from "@/router";
import { useLoginUserStore } from "@/store/useLoginUserStore";
import { message } from "ant-design-vue";

/**
 * 全局权限校验
 */
// router.beforeEach 是 Vue Router 提供的全局前置守卫。
// 它会在路由发生变化、组件渲染之前执行。
// 常用于权限验证、登录检查等全局拦截逻辑。
// 参数说明：
// - to: 即将要进入的目标路由对象 (Route Object)
// - from: 当前导航正要离开的路由对象
// - next: 一个函数，必须调用它来 resolve 这个钩子。执行效果依赖于 next 方法的调用参数。
router.beforeEach(async (to: any, from: any, next: any) => {
  // 1. 获取全局状态管理中的登录用户信息
  // useLoginUserStore 是一个 Pinia store，用于管理全局的登录用户状态。
  // 这里假设你已经通过 Pinia 创建了名为 loginUserStore 的状态存储。
  const loginUserStore = useLoginUserStore();

  // 从 store 中获取 loginUser 对象，里面包含了用户的信息，如 id, username, userRole 等。
  const loginUser = loginUserStore.loginUser;

  // 2. 定义需要进行权限校验的路由规则
  // 获取目标路由的完整路径 (例如: "/admin/user/list")
  const toUrl: string = to.fullPath;
  console.log("路径以 admin 开头，进行权限检查");
  // 判断目标路径是否以 "admin" 开头。
  // 这是一个简单的权限控制方式，所有 /admin 下的路由都被视为需要管理员权限。
  if (toUrl.startsWith("/admin")) {
    // 3. 权限校验逻辑
    // 校验条件：
    // - !loginUser: 用户未登录 (loginUser 为 null 或 undefined)
    // - loginUser.userRole !== 1: 用户已登录，但角色不是管理员 (假设 userRole === 1 代表管理员)
    if (!loginUser || loginUser.userRole !== 1) {
      // 4. 无权限处理
      // 显示错误提示信息
      message.error("无权限访问");

      // 强制跳转到登录页，并将当前想要访问的路径作为 redirect 参数传递过去。
      // 这样做的目的是：当用户登录成功后，可以根据这个 redirect 参数，自动跳转到他之前想要访问的页面。
      next(`/user/login?redirect=${to.fullPath}`);

      // return 语句用于终止后续代码的执行，因为我们已经通过 next() 决定了路由的走向。
      return;
    }
  }

  // 5. 有权限或无需权限的情况
  // 如果代码执行到这里，说明：
  // a) 用户访问的不是 /admin 开头的路由，或者
  // b) 用户访问的是 /admin 路由，但已经登录且是管理员角色。
  // 调用 next() 表示放行，允许路由正常跳转。
  next();
});
