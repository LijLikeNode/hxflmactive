<template>
    <div class="container page">
      <div class="container-brief">
        <h1>五年交费换来一生现金流？福临门（少儿版）请您参与有奖评鉴</h1>
        <div class="textCenter"> 活动简介</div>
        <p class="fontWeight">
            为推广市场上最具竞争力的年金产品：华夏福临门（少儿版），活动期间，凡听取华夏寿险顾问介绍华夏福临门（少儿版）年金产品，并填写评鉴问卷的尊贵客户，可获得抽奖一次。感谢您的支持，让我们做的更好。
        </p>
        <div class="prize-alls textCenter">奖品设置</div>
        <p v-for="(v,i) in workcodes" :key="i" class="prize-list">
            <span>{{v.name}}</span>
            <span>{{v.text}}</span>
            <span>{{v.num}}</span>
        </p>
      </div>

      <img src="../assets/img/guide/guide1.jpg">
      <img src="../assets/img/guide/guide2.jpg">
      <img src="../assets/img/guide/guide3.jpg">
      <img src="../assets/img/guide/guide4_1.png">
      <img src="../assets/img/guide/guide4_2.png">
      <img src="../assets/img/guide/guide4_3.png">
      <img src="../assets/img/guide/guide5.jpg">
      <img src="../assets/img/guide/guide6.jpg">
      <img src="../assets/img/guide/guide7.jpg">
      <img src="../assets/img/guide/guide8.jpg">
      <img src="../assets/img/guide/guide9.jpg">
      <img src="../assets/img/guide/guide10.jpg">
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
        guide:false,
        workcodes: [
            {
                name: '特等奖：',
                text: 'Apple iMac 21.5英寸一体机',
                num: '3台'
            },
            {
                name: '一等奖：',
                text: 'iPhone X 手机（256G）',
                num: '9个'
            },
            {
                name: '二等奖：',
                text: 'iPad mini 平板电脑',
                num: '90个'
            },
            {
                name: '三等奖：',
                text: '家用儿童紧急医药包',
                num: '30000个'
            },
            {
                name: '四等奖：',
                text: '华夏精品活动参与卡',
                num: '50000份'
            }
        ]
      }
    },
    computed:{
      btn_text(){
        return (rq()&&rq().type=="cust") ? "填写问卷" : "邀请客户";
      }
    },
    mounted(){
      // console.log(this.$route.name)
      // doShare("","五年交费换来一生现金流？福临门（少儿版）请您参与有奖评鉴!","福临门好不好？您说了算！五年交费换来一生现金流？福临门（少儿版）请您参与有奖评鉴","http://zmt.ihxlife.com/tenyears2/#/intro/"+this.$route.params.id+"?type=cust",'http://zmt.ihxlife.com/tenyears/pic.png');
      doShare("","五年交费换来一生现金流？福临门（少儿版）请您参与有奖评鉴!","福临门好不好？您说了算！五年交费换来一生现金流？福临门（少儿版）请您参与有奖评鉴","http://zmt.ihxlife.com/tenyears/#/intro/"+this.$route.params.id+"?type=cust",'http://zmt.ihxlife.com/tenyears/pic.png');
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
.textCenter{
  text-align: center;
  font-weight: bold;
  font-size: 1.4em;
  margin: .4em 0;  
}
.fontWeight{
  line-height: 1.4em;
  font-size: 1.2em;
}
div.container{
  .container-brief{
    padding: .5em;
    color: #1E1E1E;
    font-weight: bold;
    &>p{
      text-indent: 2em;
    }
    &>h1{
      color: #88c9f6;
      line-height: 1.6em;
      font-weight: bold;
      font-size: 1.6em;
      margin-bottom: 0.7em;
    }
    .prize-alls,.cont-cqs{
        margin-top: 1.2em;
    }
    .prize-list{
      text-indent: .8em;
        span{
            &:nth-child(2){
                width: 13.7em;
                display: inline-block;
            }
            &:last-child{
                color: #B81119;
                font-weight: bold;
                padding-left: 0.4em;
                text-align: right;
            }
        }
    }
  }
  font-size: 1.2em;
  color: #514742;
  line-height: 1.4em;
  // background: url(../assets/img/bg_intro.png) no-repeat center center; background-size: cover;position: relative;
  padding-bottom: 6em;
  background: #fff;
  
  img{width: 100%;}
  a{
    position: fixed;bottom: 2%;margin:0 5%;width: 90%;background: url('../assets/img/btn_bg.png') no-repeat center center; background-size: 100%;height: 5em;line-height: 4.8em;text-align:center;font-size: 1.2em;color: #fff;
  }
  div.guide_mask{
    position: fixed;top: 0;left: 0;width: 100%;height: 100%;background: url('../assets/img/guide.png') no-repeat center center ; background-size: 100% 100%;
  }
}

</style>
