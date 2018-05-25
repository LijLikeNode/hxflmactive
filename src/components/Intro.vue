<template>
    <div class="container page">
      <img src="../assets/img/bg_intro.png">
      <a @click="evn">{{btn_text}}</a>
      <transition name="fade">
        <div class="guide_mask" v-show="guide" @click="guide=false">
         <!--  <img src="../assets/img/guide.png" width="100%" height="100%"> -->
        </div>
      </transition>
    </div>
  
</template>
<script>

export default {
    name: 'intro',
    data(){
      return {
        guide:false
      }
    },
    computed:{
      btn_text(){
        return (rq()&&rq().type=="cust") ? "填写问卷" : "邀请客户";
      }
    },
    mounted(){
      // console.log(this.$route.name)
      doShare("","填问卷 抽大奖","新福临门上市有奖评鉴  春暖花开华夏好礼相赠","http://zmt.ihxlife.com/tenyears2/#/intro/"+this.$route.params.id+"?type=cust",'http://zmt.ihxlife.com/tenyears2/pic.png');
      // doShare("","填问卷 抽大奖","新福临门上市有奖评鉴  春暖花开华夏好礼相赠","http://test.hxlife.com/csf/tenyears/#/intro/"+this.$route.params.id+"?type=cust",'http://zmt.ihxlife.com/tenyears/pic.png');
    },
    methods:{
      evn(){//判断来源 业务员OR客户
        (rq()&&rq().type=="cust") ? this.customer_click() : this.salesman_click();
      },
      customer_click(){
        this.$router.push(`/question/${this.$route.params.id}`)
      },
      salesman_click(){
        this.guide = true;
      }
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
    position: fixed;bottom: 2%;margin:0 5%;width: 90%;background: url('../assets/img/btn_bg.png') no-repeat center center; background-size: 100%;height: 5em;line-height: 4.8em;text-align:center;font-size: 1.2em;color: #fff;
  }
  div.guide_mask{
    position: fixed;top: 0;left: 0;width: 100%;height: 100%;background: url('../assets/img/guide.png') no-repeat center center ; background-size: 100% 100%;
  }
}

</style>
