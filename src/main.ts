import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {setUpAntd} from '@/assets/ant-design-vue-config/ant-design-config'
import './Mock/mockDatas'

const app=createApp(App);

setUpAntd(app);
app.use(store);
app.use(router);

app.mount('#app')
