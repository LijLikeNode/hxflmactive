<template>
    <div class="container page">
      <!-- <img src="../assets/img/bg_intro.png"> -->
      <div class="banner"></div>
      <div class="exhibition">
        <h2>尊敬的客户：</h2>
        <p>因华夏医保通费用补偿性医疗保险续保条件为额度内终身续保，根据监管要求，市场上此类产品需在6月底前停止销售。</p>
        <p>为更好地满足客户新需求，设计有竞争力的保险产品，华夏保险现面向广大客户征求新医保通产品设计意见，凡填写医保通产品问卷调研客户，可获得<span>幸运抽奖</span>一次，感谢您的参与！（注：每个手机号可参与一次活动）。</p>
      </div>
      <a @click="evn" :class="{cust:isCustomer}"></a>
      <transition name="fade">
        <div class="guide_mask" v-show="guide" @click="guide=false">
         <!--  <img src="../assets/img/guide.png" width="100%" height="100%"> -->
        </div>
      </transition>
    </div>
  
</template>
<script>

export default {
    name: 'ybtintro',
    data(){
      return {
        guide:false
      }
    },
    computed:{
      isCustomer(){
        return (rq()&&rq().type=="cust") ? true : false;
      }
    },
    mounted(){
      doShare("","百万医疗“医保通”震撼来袭 全国热销等你来抢！","开门红爆款！最低每天五毛钱，即可享高达每年200万、终身500万的住院医疗保障！","http://zmt.ihxlife.com/tenyears2/#/ybtintro/"+this.$route.params.id+"?type=cust",'http://zmt.ihxlife.com/tenyears2/ybt.png');
    },
    methods:{
      evn(){//判断来源 业务员OR客户
        (rq()&&rq().type=="cust") ? this.customer_click() : this.salesman_click();
      },
      customer_click(){
        this.$router.push(`/ybtquestion/${this.$route.params.id}`)
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
  background: url('../assets/img/ybt_intro_bg.png') no-repeat center center; background-size: cover;position: relative;
  padding-bottom: 6em;
  div.banner{
    background: url('../assets/img/ybt_banner.png') no-repeat center center; background-size: 100%;height:40%;position:absolute;width:100%;
  }
  div.exhibition{
    background:#FFECAB;border: 1px solid #54ACA4;position:absolute;top:45%;width:90%;margin-left: 5%;border-radius: 5px;padding: 1em 3% 1.5em;
    p{
      color:#75314D;font-size:1.25em;line-height:1.6em;
      span{color:#eb5e12;font-weight:bold;}
    }
    h2{
      color:#75314D;font-size:1.4em;font-weight: bold;margin-bottom: .3em;
    }
  }
  img{width: 100%;}
  a{
    position: fixed;bottom: 2%;margin:0 5%;width: 90%;background: url('../assets/img/ybt_invite.png') no-repeat center center; background-size: 100%;height: 5em;line-height: 4.8em;text-align:center;font-size: 1.2em;color: #fff;
    &.cust{
      background: url('../assets/img/ybt_cust.png') no-repeat center center;background-size: 100%;
    }
  }
  div.guide_mask{
    position: fixed;top: 0;left: 0;width: 100%;height: 100%;background: url('../assets/img/guide.png') no-repeat center center ; background-size: 100% 100%;
  }
}

</style>
