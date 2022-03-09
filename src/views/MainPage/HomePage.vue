<template>
    <div class="HomePage">
        <div class="HomePageContent"> 主页显示</div>
 
    </div>
</template>

<script lang="ts">
import { reactive, toRefs,defineComponent } from 'vue'

export default defineComponent({
    setup () {
        const state = reactive({
            count: 0,
        })
    
        return {
            ...toRefs(state),
        }
    }
})
</script>

<style scoped>
.HomePage{
    border:1px solid red;
    box-sizing: border-box;
   padding:1px;
    
    
       
     height: calc(100vh - 100px);
   overflow: auto;
    
    
}
.HomePageContent{
    border:1px solid rgb(19, 92, 201);
    box-sizing: border-box;
   
      min-width:1000px;
     min-height: 675px;
      height: calc(100vh - 109px);
    /* background-image: url("../../assets/bgHome.png");
    background-repeat: no-repeat; 
    background-origin: border-box;
    background-size: cover; */
    background-color: darkgray;
     
}
</style>