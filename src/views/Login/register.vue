<template>
  <a-spin :spinning="spinning" :delay="delayTime">
    <div class="register-container">
      <a-row class="OutRow">
        <a-col class="a" :xs="0" :sm="0" :md="0" :lg="0" :xl="0"></a-col>
        <a-col class="a" :xs="24" :sm="24" :md="24" :lg="22" :xl="22">
          <div class="registerform-container">
            <header>用户注册</header>
            <div class="formBox">
              <a-form
                layout="vertical"
                :model="formRegisterState"
                @finish="handleFinish"
                :rules="rules"
                name="custom-validation"
                 ref="formRef"
              
              >
                <a-form-item label="用户名" name="user">
                  <a-input
                    v-model:value="formRegisterState.user"
                    placeholder="Username"
                    utocomplete="off"
                  >
                  </a-input>
                </a-form-item>
                <a-form-item label="密码" name="password">
                  <a-input
                    v-model:value="formRegisterState.password"
                    type="password"
                    placeholder="Password"
                  >
                  </a-input>
                </a-form-item>
                <a-form-item label="密码确认" name="passwordCheck">
                  <a-input
                    v-model:value="formRegisterState.passwordCheck"
                    type="password"
                    placeholder="PasswordCheck"
                  >
                  </a-input>
                </a-form-item>

               

 
 <a-form-item label="验证码" name="code">
                

<a-input-search
      v-model:value="formRegisterState.code"
      placeholder="code"
      enter-button="获取验证码"
      size="large"
     @search="GetCode"
    />
                </a-form-item>

                <a-form-item style="text-align: center">
                  <a-button type="primary" html-type="submit" size="large">
                    注册
                  </a-button>
                  <a-button
                    style="margin-left: 3px"
                    type="primary"
                    size="large"
                    @click="returnBtn"
                  >
                    返回
                  </a-button>
                </a-form-item>
              </a-form>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
  </a-spin>
</template>

<script lang="ts">
import { ValidateErrorEntity } from "ant-design-vue/es/form/interface";
import { defineComponent, reactive, UnwrapRef, ref } from "vue";
import { message } from "ant-design-vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
// import {login} from '../../Request/login'
import {IFormRegisterState} from '../../TypeInterface/loginInterface'

export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();
     const formRef = ref();
    const spinning = ref<boolean>(false);
    const delayTime = 1;
    const formRegisterState: UnwrapRef<IFormRegisterState> = reactive({
      user: "",
      password: "",
      passwordCheck: "",
      code: undefined,
    });
    const handleFinish = async (values: any) => {
       spinning.value = !spinning.value;

      let result = await store.dispatch("RegisterSys", formRegisterState);
       console.log(result);

      if (!result) {
        message.error("注册失败.");
      } else {
         spinning.value = !spinning.value;
    message.success("注册成功,正在跳转到登录页面.");
   
     await (()=>{
      return  new Promise((res)=>{
             setTimeout(()=>{
             res(true);
           },500)
       })
           
      })()
        
       router.push({path: '/login'});
      }
      
     
    };
    const returnBtn = () => {
      router.push({ path: "/login" });
    };



 const GetCode = () => {
     alert("getcode")
    };






let checkCode = async (rule:any, value:any) => {
      if (!value) {
        return Promise.reject('Please input the code');
      }

      if (value?.length!=4) {
        return Promise.reject('Please input correct code');
      } else {
       
          return Promise.resolve();
        
      }
    };

    let validatePass = async (rule:any, value:any) => {
      if (value === '') {
        return Promise.reject('Please input the password');
      } else {
        if (formRegisterState.passwordCheck !== '') {
          formRef.value.validateFields('passwordCheck');
        }

        return Promise.resolve();
      }
    };

    let validatePass2 = async (rule:any, value:any) => {
      if (value === '') {
        return Promise.reject('Please input the password again');
      } else if (value !== formRegisterState.password) {
        return Promise.reject("Two inputs don't match!");
      } else {
        return Promise.resolve();
      }
    };
    const rules = {
      user: [
        {
          required: true,
          message: "Please input Activity name",
          trigger: "blur",
        },
        {
          min: 3,
          max: 5,
          message: "Length should be 3 to 5",
          trigger: "blur",
        },
      ],
       password: [
        {
          required: true,
          validator: validatePass,
          trigger: 'change',
        },
      ],
      passwordCheck: [
        {
           required: true,
          validator: validatePass2,
          trigger: 'change',
        },
      ],
      code: [
        {
           required: true,
          validator: checkCode,
          trigger: 'change',
        },
      ],
    };

    return {
      formRegisterState,
      handleFinish,
      returnBtn,
      spinning,
      delayTime,
      rules,formRef,
      GetCode
    };
  },
});
</script>

<style scoped>
.register-container {
  width: 100%;
  height: 100vh;
  background-color: rgba(85, 85, 76, 0.253);
  background-image: url("~@/assets/bg3.jpg"); 
  background-size: cover;
  border: 1px solid #eee;
}
.a {
  border: 0px solid #eee;
  height: 100%;
}
.OutRow {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center !important;
  height: 67%;
  margin-top: calc((100vh - 500px) / 2);
}
.registerform-container {
  width: 95%;
  height: 95%;
  border: 0px solid #eee;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #19404ee3;
  border-radius: 10px;
}



.registerform-container .ant-form
{
    width: 80%;
}
.a:last-child {
  display: flex;
  justify-content: center;
  align-items: center;
}
header {
  font-size: 25px;
  font-weight: 600;
  letter-spacing: 3px;
  color: #e8eef8;
  border: 0px solid #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10%;
  margin-bottom: 35px;
}
.formBox {
  border: 0px solid red;
  height: 75%;
  display: flex;

  justify-content: center;
  align-items: center;
}
</style>