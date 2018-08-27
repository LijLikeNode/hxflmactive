<template>
    <div class="container page">



      <div class="block b1">
        <img src="../assets/img/b1.png" alt="">
        <a @click="evn('intro')">福临门少儿版评鉴</a>
      </div>

      <div class="block b2">
        <img src="../assets/img/b2.png" alt="">
        <a @click="evn('family')">家庭保障DIY体验</a>
      </div>

      <div class="block b3">
        <img src="../assets/img/b3.png" alt="">
        <a @click="evn('rank')">我的客户</a>
      </div>

      <div class="block b4">
        <img src="../assets/img/b4.png" alt="">
        <a @click="evn('team')">团队获客</a>
      </div>
      <!-- <span></span>
      <span v-if="dateMore"></span>
      <span></span>
      <a class="home_entrance" @click="evn('intro')"></a>
      <a class="rank_entrance" @click="evn('rank')"></a> -->
      <!-- <a class="ybt_entrance" @click="evn('ybt_intro')" v-if="dateMore"></a> -->
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
        console.log(x)
        x=='intro'?this.to_intro():x=='rank'?this.to_rank():x=='team'?this.to_team():x=='family'?this.to_family():'';
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
      to_team(){
        // console.log('to_rank')
        this.$router.push(`/team${rq()?'?userid='+rq().salesmanId:''}`);
      },
      to_family(){
        // console.log('to_rank')
        let href = `https://sales.ihxlife.com/imr/views/lazy_plan/information_entry.html?v=0719&agentState=1&agentCode=${rq().salesmanId}`;
        // console.log(href)
        location.href = href;
      },
    }
}
</script>

<style lang='less' scoped>
@import url(../assets/css/main.less);
div.container{
  background: url('../assets/img/bg4.png') no-repeat center center; background-size: 100% 100%;position: relative;padding-top: 20%;
  // a{
  //   position: absolute;width: 13em;height: 5em;
  //   &.home_entrance{
  //     background: url('../assets/img/home_entrance.png') no-repeat center center;background-size:100%;top: 20%;right: 5%;
  //   } 
  //   &.rank_entrance{
  //     background: url('../assets/img/rank_entrance.png') no-repeat center center;background-size:100%;top: 53%;
  //   } 
  //   &.ybt_entrance{
  //     background: url('../assets/img/ybt_entrance.png') no-repeat center center;background-size:100%;top: 45.5%;left: 5%;width: 14em;
  //   }
  // }
  // span{
  //   position: absolute;width: 13em;height: 13em;
  //   &:first-child{
  //     background: url('../assets/img/home1.png') no-repeat center center;background-size:100%;top: 13%;left: 5%;
  //   }
  //   &:nth-child(2){
  //     background: url('../assets/img/home2.png') no-repeat center center;background-size:100%;top: 46%;right: 5%;
  //   }
  //   &:nth-child(3){
  //     background: url('../assets/img/home3.png') no-repeat center center;background-size:96%;top: 38.5%;right: 5%;
  //   }
  // }








  //四个部分样式
  div.block{
    width:49%;display: inline-block;
    img{width:80%;display:block;margin: 0 auto;margin-bottom: 1em;}
    a{
      display:block;background:url('../assets/img/btnb.png') no-repeat center center;background-size:85%;height:4em;line-height: 4;color: #fff;text-align: center;
    }

    &.b1,&.b2{
      margin-bottom: 3em;
    }
  }
}

</style>
