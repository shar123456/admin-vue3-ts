<template>
  <a-layout id="Main">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo">
        <span :class="titleTxt1">{{ titleTxt }}</span>
      </div>

      <a-menu theme="dark" mode="inline" v-model:selectedKeys="selectedKeys"   v-model:openKeys="openKeys">
        <a-menu-item key="/Home/HomePage">
          <AppstoreOutlined />
          <span
            ><router-link
              to="/Home/HomePage"
              style="color: rgba(255, 255, 255, 0.65)"
              >首页</router-link
            ></span
          >
        </a-menu-item>

        <a-sub-menu key="sub1">
          <template #icon>
            <SettingOutlined />
          </template>
          <template #title>系统设置</template>

          <a-menu-item key="/Home/UserListPage">
            <user-outlined />
            <span
              ><router-link
                to="/Home/UserListPage"
                style="color: rgba(255, 255, 255, 0.65)"
                >用户列表</router-link
              ></span
            >
          </a-menu-item>
          <a-menu-item key="/Home/RolePage">
            <TrademarkCircleOutlined />
            <span
              ><router-link
                to="/Home/RolePage"
                style="color: rgba(255, 255, 255, 0.65)"
                >角色列表</router-link
              ></span
            >
          </a-menu-item>

          <a-menu-item key="/Home/testPage">
            <user-outlined />
            <span
              ><router-link
                to="/Home/testPage"
                style="color: rgba(255, 255, 255, 0.65)"
                >test page</router-link
              ></span
            >
          </a-menu-item>

          <a-menu-item key="/Home/MainPage">
            <video-camera-outlined />
            <span
              ><router-link
                to="/Home/MainPage"
                style="color: rgba(255, 255, 255, 0.65)"
                >首页</router-link
              ></span
            >
          </a-menu-item>

          <a-menu-item key="/Home/ToDoList">
            <upload-outlined />
            <span
              ><router-link
                to="/Home/ToDoList"
                style="color: rgba(255, 255, 255, 0.65)"
                >ToDoList</router-link
              ></span
            >
          </a-menu-item>
          <a-menu-item key="/Home/MyTest">
            <upload-outlined />
            <span
              ><router-link
                to="/Home/MyTest"
                style="color: rgba(255, 255, 255, 0.65)"
                >MyTest</router-link
              ></span
            >
          </a-menu-item>

          <a-menu-item key="5">Option 5</a-menu-item>
          <a-menu-item key="/Home/ToDoList">
            <upload-outlined />
            <span
              ><router-link
                to="/Home/ToDoList"
                style="color: rgba(255, 255, 255, 0.65)"
                >ToDoList</router-link
              ></span
            >
          </a-menu-item>
          <a-menu-item key="7">Option 7</a-menu-item>
          <a-menu-item key="8">Option 8</a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header
        class="headerLayout"
        style="background: #fff; padding: 0"
      >
        <a-row>
          <a-col :xs="6" :sm="0" :md="2" :lg="2" :xl="2">
            <menu-unfold-outlined
              v-if="collapsed"
              class="trigger"
              @click="Mycollapsed(collapsed)"
            />
            <menu-fold-outlined
              v-else
              class="trigger"
              @click="Mycollapsed(collapsed)"
            />
          </a-col>
          <a-col :xs="0" :sm="0" :md="0" :lg="10" :xl="10">
            <span
              style="
                font-size: 18px;
                font-weight: 600;
                color: rgb(33, 124, 160);
              "
              >您好，欢迎使用麦克奥迪MES管理系统</span
            >
          </a-col>
          <a-col :xs="0" :sm="0" :md="0" :lg="10" :xl="10">
            <div class="funbox">
              <a href="#" title="全屏" @click="toggleFullscreen"
                ><FullscreenOutlined
              /></a>
              <a href="#" @click="toggleFullscreen" title="消息"
                ><BellOutlined
              /></a>
              <a href="#" @click="toggleFullscreen" title="搜索"
                ><SearchOutlined
              /></a>

              <!-- <a href="#" @click="toggleFullscreen">全屏</a>
          <a href="#" @click="toggleFullscreen">全屏</a> -->
            </div>
          </a-col>
          <a-col :xs="18" :sm="0" :md="22" :lg="2" :xl="2" class="avatarCls">
            <a-dropdown>
              <a class="ant-dropdown-link" @click.prevent>
                <a-avatar>
                  <template #icon> <img src="../assets/tx.jpg" /></template>
                </a-avatar>

                Admin
                <DownOutlined />
              </a>
              <template #overlay>
                <a-menu>
                  <a-menu-item>
                    <a href="javascript:;">个人设置</a>
                  </a-menu-item>
                  <a-menu-item>
                    <a href="javascript:;" @click="LogOut">退出登录</a>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </a-col>
        </a-row>
      </a-layout-header>

      <a-layout-content
        :style="{
          margin: '0px 0px',
          padding: '1px',
          background: '#fff',
          minHeight: '280px',
        }"
      >
        <a-row class="breadPanel">
          <a-col
            style="border: 0px solid red"
            :xs="0"
            :sm="12"
            :md="12"
            :lg="12"
            :xl="22"
          >
            <a-breadcrumb style="margin: 1px 0">
              <a-breadcrumb-item style="height: 30px; font-weight: 500">
                当前位置：</a-breadcrumb-item
              >
              <a-breadcrumb-item
                v-for="(item, index) in routeDescArr"
                :key="index"
                style="height: 30px; font-weight: 500"
              >
                {{ item }}
              </a-breadcrumb-item>
            </a-breadcrumb>
          </a-col>
          <a-col :xs="0" :sm="0" :md="0" :lg="0" :xl="0"> </a-col>
          <a-col
            style="border: 0px solid rgb(19, 207, 44); text-align: right"
            :xs="0"
            :sm="12"
            :md="12"
            :lg="12"
            :xl="2"
          >
          </a-col>
        </a-row>

        <div id="homeContent"><router-view></router-view></div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DownOutlined,
  FullscreenOutlined,
  BellOutlined,
  SearchOutlined,
  AppstoreOutlined,
  SettingOutlined,
  TrademarkCircleOutlined,
} from "@ant-design/icons-vue";
import { defineComponent, onMounted, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import screenfull from "screenfull";
export default defineComponent({
  components: {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    DownOutlined,
    FullscreenOutlined,
    BellOutlined,
    SearchOutlined,
    AppstoreOutlined,
    SettingOutlined,
    TrademarkCircleOutlined,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    let collapsed = ref<boolean>(false);
    let titleTxt = ref("");
    let titleTxt1 = ref("");
    let selectedKeys = ref<string[]>([route.path]);
    let routeDesc = ref<string>(route.path);
    let routeDescMeta = ref<any>(route?.meta);
     let openKeys= ref(['']);
    const LogOut = () => {
      localStorage.setItem("starToken", "");
      router.push({ path: "/login", query: { selected: "1" } });
    };

    onMounted(() => {
      if (routeDescMeta.value && routeDescMeta.value.rName) {
        console.log(1);

        routeDescArr.value = routeDescMeta.value.rName.split("/");
        routeDescArr.value.splice(0, 1);
      } else {
        routeDescArr.value = routeDesc.value.split("/");
        routeDescArr.value.splice(0, 1);
      }
 if(route.meta && route.meta.Sub&&route.meta.Sub=="sub1")
        {
openKeys.value=["sub1"]
        }
      if (collapsed.value) {
        titleTxt.value = "M";
        titleTxt1.value = "titleTxt11";
      } else {
        titleTxt.value = "Motic 麦克奥迪";
        titleTxt1.value = "titleTxt12";
      }
    });
    let routeDescArr = ref<string[]>([""]);
    watch(
      () => route.path,
      (newValue, oldValue) => {
        console.log(route.meta);
        //  console.log(newValue)
        //     console.log(oldValue)
        if (route.meta && route.meta.rName) {
          routeDescArr.value = (route.meta.rName as string).split("/");
          routeDescArr.value.splice(0, 1);
        } else {
          routeDescArr.value = routeDesc.value.split("/");
          routeDescArr.value.splice(0, 1);
        }
       

        // console.log(routeDesc.value);
      }
    );

    function toggleFullscreen() {
      console.log(screenfull);
      //https://blog.csdn.net/weixin_42324665/article/details/106917095
      if (screenfull.enabled) {
        screenfull.toggle();
      }
    }

    const Mycollapsed = (p: boolean) => {
      if (collapsed.value) {
        setTimeout(() => {
          titleTxt.value = "Motic 麦克奥迪";
        }, 100);

        titleTxt1.value = "titleTxt12";
      } else {
        titleTxt.value = "M";
        titleTxt1.value = "titleTxt11";
      }

      collapsed.value = !collapsed.value;
    };

    return {
      selectedKeys,
      collapsed,
      LogOut,
      Mycollapsed,
      titleTxt,
      titleTxt1,
      routeDescArr,
      openKeys,
      toggleFullscreen,
    };
  },
});
</script>
<style>
.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger:hover {
  color: #1890ff;
}

.logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.logo span {
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 3px;
}

.site-layout .site-layout-background {
  background: #fff;
}

#Main {
  width: 100%;
  height: 100vh;
  background-color: #fff;
}
.trigger svg {
  height: 25px !important;
  width: 25px !important;
  margin-left: 0px;
}
.avatarCls {
  border: 0px solid red;
  display: flex !important;
  justify-content: flex-end !important;
  padding-right: 5px;
  padding-left: 5px;
  align-items: flex-start;
  line-height: 40px;
}

.titleTxt11 {
  color: #fff !important;
  /* color: green !important;; */
  font-size: 15px !important;
}
.titleTxt12 {
  transition: all 3s linear;
  font-size: 15px !important;
  color: #fff !important;
}
.headerLayout {
  /* background-image: url('../assets/bg7.jpg')!important;
  background-position:center;
  background-repeat: no-repeat;
  background-size:contain; */
}
.breadPanel {
  border-bottom: 0px dotted red;
  height: 23px;
  background-color: #e5e6e9;
  margin-bottom: 3px;
}
.funbox {
  border: 0px solid red;
  display: flex !important;
  align-items: flex-start;
  justify-content: flex-end;
  line-height: 30px;
}
.funbox a {
  margin-right: 8px;
  font-size: 17px;
}
#homeContent {
}
.ant-menu.ant-menu-inline-collapsed > .ant-menu-item .ant-menu-item-icon,
.ant-menu.ant-menu-inline-collapsed
  > .ant-menu-item-group
  > .ant-menu-item-group-list
  > .ant-menu-item
  .ant-menu-item-icon,
.ant-menu.ant-menu-inline-collapsed
  > .ant-menu-item-group
  > .ant-menu-item-group-list
  > .ant-menu-submenu
  > .ant-menu-submenu-title
  .ant-menu-item-icon,
.ant-menu.ant-menu-inline-collapsed
  > .ant-menu-submenu
  > .ant-menu-submenu-title
  .ant-menu-item-icon,
.ant-menu.ant-menu-inline-collapsed > .ant-menu-item .anticon,
.ant-menu.ant-menu-inline-collapsed
  > .ant-menu-item-group
  > .ant-menu-item-group-list
  > .ant-menu-item
  .anticon,
.ant-menu.ant-menu-inline-collapsed
  > .ant-menu-item-group
  > .ant-menu-item-group-list
  > .ant-menu-submenu
  > .ant-menu-submenu-title
  .anticon,
.ant-menu.ant-menu-inline-collapsed
  > .ant-menu-submenu
  > .ant-menu-submenu-title
  .anticon {
  font-size: 24px !important;
}
</style>

