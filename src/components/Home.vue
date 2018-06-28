<template>
    <div class="container page">
      <span></span>
      <span v-if="dateMore"></span>
      <span></span>
      <a class="home_entrance" @click="evn('intro')"></a>
      <a class="rank_entrance" @click="evn('rank')"></a>
      <a class="ybt_entrance" @click="evn('ybt_intro')" v-if="dateMore"></a>
    </div>
  
</template>
<script>

export default {
    name: 'home',
    data(){
      return {
        
      }
    },
    computed:{
      dateMore(){
          return window.dateTime=='less'?true:false;
      }
    },
    mounted(){
      common.noShare();
      // doShare("","填问卷 抽大奖","新福临门上市有奖评鉴  春暖花开华夏好礼相赠","http://zmt.ihxlife.com/tenyears/#/intro/"+rq().salesmanId+"?type=cust",'http://zmt.ihxlife.com/tenyears/pic.png');
    },
    methods:{
      evn(x){//点击跳转
        x=='intro'?this.to_intro():x=='rank'?this.to_rank():this.to_ybtintro();
      },
      to_rank(){
        // console.log('to_rank')
        this.$router.push(`/rank${rq()?'/'+rq().salesmanId:''}`);
      },
      to_intro(){
        // console.log('to_intro')
        this.$router.push(`/intro${rq()?'/'+rq().salesmanId:''}`);
      },
      to_ybtintro(){
        // console.log('to_rank')
        this.$router.push(`/ybtintro${rq()?'/'+rq().salesmanId:''}`);
      },
    }
}
</script>

<style lang='less' scoped>
@import url(../assets/css/main.less);
div.container{
  background: url('../assets/img/bg4.png') no-repeat center center; background-size: 100% 100%;position: relative;
  a{
    position: absolute;width: 13em;height: 5em;
    &.home_entrance{
      background: url('../assets/img/home_entrance.png') no-repeat center center;background-size:100%;top: 20%;right: 5%;
    } 
    &.rank_entrance{
      background: url('../assets/img/rank_entrance.png') no-repeat center center;background-size:100%;top: 70%;right: 5%;
    } 
    &.ybt_entrance{
      background: url('../assets/img/ybt_entrance.png') no-repeat center center;background-size:100%;top: 45.5%;left: 5%;width: 14em;
    }
  }
  span{
    position: absolute;width: 13em;height: 13em;
    &:first-child{
      background: url('../assets/img/home1.png') no-repeat center center;background-size:100%;top: 13%;left: 5%;
    }
    &:nth-child(2){
      background: url('../assets/img/home2.png') no-repeat center center;background-size:100%;top: 63%;left: 5%;
    }
    &:nth-child(3){
      background: url('../assets/img/home3.png') no-repeat center center;background-size:96%;top: 38.5%;right: 5%;
    }
  }
}

</style>
