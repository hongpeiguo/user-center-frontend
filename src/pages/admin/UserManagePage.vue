<template>
  <div id="userManagePage">
    <a-input-search
      style="max-width: 320px; margin-bottom: 20px"
      v-model:value="searchValue"
      placeholder="输入用户名搜索"
      enter-button="搜索"
      size="large"
      @search="onSearch"
    />
    <a-table :columns="columns" :data-source="data">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'avatarUrl'">
          <a-image :src="record.avatarUrl" :width="120" />
        </template>
        <template v-else-if="column.dataIndex === 'userRole'">
          <div v-if="record.userRole === 1">
            <a-tag color="green">管理员</a-tag>
          </div>
          <div v-else>
            <a-tag color="blue">普通用户</a-tag>
          </div>
        </template>
        <template v-else-if="column.dataIndex === 'gender'">
          {{ record.gender === 1 ? "男" : "女" }}
        </template>
        <template v-else-if="column.dataIndex === 'createTime'">
          {{ dayjs(record.createTime).format("YYYY-MM-DD HH:mm:ss") }}
        </template>
        <template v-else-if="column.key === 'action'">
          <a-button danger @click="doDelete(record.id)">删除</a-button>
        </template>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts" setup>
import { deleteUser, searchUsers } from "@/api/user";
import { ref } from "vue";
import { message } from "ant-design-vue";
import dayjs from "dayjs";

const searchValue = ref("");
// 获取数据
const onSearch = () => {
  fetchData(searchValue.value);
};

// 删除数据
const doDelete = async (id: string) => {
  if (!id) {
    return;
  }
  const res = await deleteUser(id);
  if (res.data.code === 0) {
    message.success("删除成功");
    fetchData();
  } else {
    message.error("删除失败");
  }
};

const columns = [
  {
    title: "id",
    dataIndex: "id",
    align: "center",
  },
  {
    title: "用户名",
    dataIndex: "userName",
    align: "center",
  },
  {
    title: "账号",
    align: "center",
    dataIndex: "userAccount",
  },
  {
    title: "头像",
    align: "center",
    dataIndex: "avatarUrl",
  },
  {
    title: "性别",
    align: "center",
    dataIndex: "gender",
  },
  {
    title: "创建时间",
    align: "center",
    dataIndex: "createTime",
  },
  {
    title: "用户角色",
    align: "center",
    dataIndex: "userRole",
  },
  {
    title: "操作",
    align: "center",
    key: "action",
  },
];

// 数据
const data = ref([]);

// 获取数据
const fetchData = async (username = "") => {
  const res = await searchUsers(username);
  if (res.data.data) {
    data.value = res.data.data;
  } else {
    message.error("获取数据失败");
  }
};

fetchData();
</script>
