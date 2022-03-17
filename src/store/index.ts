import { createStore } from 'vuex'
import {login,register} from '../Request/login'
export default createStore({
  state: {
    TOKEN: ""
  },
  mutations: {
    SetToken(state, payLoad) {
      state.TOKEN = payLoad;
    }
  },
  actions: {
     LoginSys({commit},payLoad){
     return new Promise((resolve)  => {
        const {user,password}=payLoad;
        setTimeout(  ()  => {          
           login({user,password}).then((res:any)=>{
              if (!res.success) {
                resolve(false);
              } else {
                commit("SetToken",res.token);
                localStorage.setItem("starToken",JSON.stringify(res.token));
                resolve(true);
               }
            }).catch((err:any)=>{
              console.log(err);
              resolve(false);
            });
        }, 200);
      });
    },
    RegisterSys({commit},payLoad){
      return new Promise((resolve)  => {
         
         setTimeout(  ()  => {          
          register(payLoad).then((res:any)=>{
               if (!res.success) {
                 resolve(false);
               } else {
                
                 resolve(true);
                }
             }).catch((err:any)=>{
               console.log(err);
               resolve(false);
             });
         }, 500);
       });
     }
  },
  modules: {
  }
})
