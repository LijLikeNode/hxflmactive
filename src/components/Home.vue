<template>
    <div class="container page">
      <a class="home_entrance" @click="evn('intro')"></a>
      <a class="rank_entrance" @click="evn('rank')"></a>
    </div>
  
</template>
<script>

export default {
    name: 'home',
    data(){
      return {
        
      }
    },
    mounted(){
      
    },
    methods:{
      evn(x){//点击跳转
        x=='intro'?this.to_intro():this.to_rank();
      },
      to_rank(){
        // console.log('to_rank')
        this.$router.push(`/rank${rq()?'/'+rq().salesmanId:''}`);
      },
      to_intro(){
        // console.log('to_intro')
        this.$router.push(`/intro${rq()?'/'+rq().salesmanId:''}`);
      }
    }
}
</script>

<style lang='less' scoped>
@import url(../assets/css/main.less);
div.container{
  background: url(../assets/img/bg4.png) no-repeat center center; background-size: cover;position: relative;
  a{
    position: absolute;
    &.home_entrance{
      background: url('../assets/img/home_entrance.png') no-repeat center center;background-size:100%;top: 20%;right: 5%;width: 13em;height: 5em;
    } 
    &.rank_entrance{
      background: url('../assets/img/rank_entrance.png') no-repeat center center;background-size:100%;top: 48.5%;left: 5%;width: 13em;height: 5em;
    } 
  }
}

</style>
