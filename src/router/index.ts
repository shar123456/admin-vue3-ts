import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import HomePage from '../views/MainPage/HomePage.vue'
//const routes: Array<RouteRecordRaw> = [
const routes: Array<any> = [
  {
    path: '/',
    name: 'Home1',
    meta:{rName:"/首页/"},
    //component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
    redirect: "/Home/HomePage"
  },
  {
    path: '/Home',
    name: 'Home',
    meta:{rName:"/首页/"},
    component: Home,
    children:[
      {
        path: 'testPage',
        name: 'testPage',
        meta:{rName:"/首页/测试",Sub:"sub1"},
        component: "/"
      },
      {
        path: 'testPage',
        name: 'testPage',
        meta:{rName:"/首页/测试",Sub:"sub1"},
        component: () => import(/* webpackChunkName: "about" */ '../views/MainPage/textPage.vue')
      },
      {
        path: 'HomePage',
        name: 'HomePage',
        meta:{rName:"/主页"},
        component: () => import(/* webpackChunkName: "about" */ '../views/MainPage/HomePage.vue')
      }
      ,
      {
        path: 'MainPage',
        name: 'MainPage',
        meta:{rName:"/首页/MainPage",Sub:"sub1"},
        component: () => import(/* webpackChunkName: "about" */ '../views/MainPage/MainPage.vue')
      }
      ,
      {
        path: 'ToDoList',
        name: 'ToDoList',
        meta:{rName:"/首页/ToDoList",Sub:"sub1"},
        component: () => import(/* webpackChunkName: "about" */ '../views/MainPage/ToDoList.vue')
      }
      ,
      {
        path: 'MyTest',
        name: 'MyTest',
        component: () => import(/* webpackChunkName: "about" */ '../views/MainPage/MyTest.vue')
      }
      ,
      {
        path: 'UserListPage',
        name: 'UserListPage',
        meta:{rName:"/系统设置/用户列表",Sub:"sub1"},
        component: () => import(/* webpackChunkName: "about" */ '../views/MainPage/UserListPage.vue')
      }
      ,
      {
        path: 'RolePage',
        name: 'RolePage',
        meta:{rName:"/系统设置/角色列表",Sub:"sub1"},
        component: () => import(/* webpackChunkName: "about" */ '../views/MainPage/RolePage.vue')
      }
    ]
  },
  {
    path: '/about',
    name: 'About', 
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/403',
    name: '403',
    component: () => import(/* webpackChunkName: "about" */ '../views/Error/403.vue')
  }
  ,
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login/login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login/register.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to,from,next)=>{
  console.log(to.path)
  if(to.path==="/login"||to.path==="/register")
  {
    next();
  }
  else
  {
    const token=localStorage.getItem("starToken");
    console.log(token);
    
    if(!token){
      next("/login");
    }
    else
    {
      next();
    }
  }

})

export default router
