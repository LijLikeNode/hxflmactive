<template>
    <div class="container page">
      <img src="../assets/img/bg_intro.png">
      <a @click="evn">{{btn_text}}</a>
    </div>
  
</template>
<script>

export default {
    name: 'intro',
    data(){
      return {
        
      }
    },
    computed:{
      btn_text(){
        return (rq()&&rq().type=="cust") ? "填写问卷" : "邀请客户";
      }
    },
    mounted(){
      
    },
    methods:{
      evn(){//判断来源 业务员OR客户
        (rq()&&rq().type=="cust") ? this.customer_click() : this.salesman_click();
      },
      customer_click(){
        console.log('customer_click');
      },
      salesman_click(){
        console.log('salesman_click');
      },
    }
}
</script>

<style lang='less' scoped>
@import url(../assets/css/main.less);
div.container{
  // background: url(../assets/img/bg_intro.png) no-repeat center center; background-size: cover;position: relative;
  padding-bottom: 6em;
  img{width: 100%;}
  a{
    position: fixed;bottom: 0;margin:0 5%;width: 90%;background: url('../assets/img/btn_bg.png') no-repeat center center; background-size: 100%;height: 5em;line-height: 4.8em;text-align:center;font-size: 1.2em;color: #fff;
  }
}

</style>
