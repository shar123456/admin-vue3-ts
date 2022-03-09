import { ref } from 'vue';

import axios from 'axios'


const  currentTime = ref("");
const GetNowTime = () => {
    const now = new Date();
    const hour = now.getHours() < 10 ? `0${now.getHours()}` : now.getHours();
    const minus =
        now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes();
    const sec =
        now.getSeconds() < 10 ? `0${now.getSeconds()}` : now.getSeconds();
    currentTime.value = `${hour}：${minus}：${sec}`;
    setTimeout(GetNowTime, 1000);
};


function GetImageAxios(url:string):any{
   
     return  axios.get(url);
  
}



export {currentTime,GetNowTime,GetImageAxios}