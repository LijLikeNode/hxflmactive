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
        <div class="tips">
          <p>注：特、一、二等奖在京东惠采平台上采购，如遇该产品停产或缺货，将更换为等值其他礼品。</p>
        </div>
      </div>
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
      doShare("","五年交费换来一生现金流？福临门（少儿版）请您参与有奖评鉴!","福临门好不好？您说了算！五年交费换来一生现金流？福临门（少儿版）请您参与有奖评鉴","http://zmt.ihxlife.com/tenyears/#/intro/"+this.$route.params.id+"?type=cust",'http://zmt.ihxlife.com/tenyears/pic.png');
      // doShare("","填问卷 抽大奖","新福临门上市有奖评鉴  春暖花开华夏好礼相赠","http://test.hxlife.com/csf/tenyears/#/intro/"+this.$route.params.id+"?type=cust",'http://zmt.ihxlife.com/tenyears/pic.png');
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
  padding-bottom: 6em;background:#fff;padding-top: 2em;
  img{width: 100%;}
  a{
    position: fixed;bottom: 2%;margin:0 5%;width: 90%;background: url('../assets/img/btn_bg.png') no-repeat center center; background-size: 100%;height: 5em;line-height: 4.8em;text-align:center;font-size: 1.2em;color: #fff;
  }
  div.guide_mask{
    position: fixed;top: 0;left: 0;width: 100%;height: 100%;background: url('../assets/img/guide.png') no-repeat center center ; background-size: 100% 100%;
  }
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
  .container-brief{
    padding:  0 2em 2em 2em;
    color: #1E1E1E;
    font-weight: bold;
    &>p{
      text-indent: 2em;
      span{
        display:inline-block;text-align:center;font-size:1.2em;
      }
    }
    &>h1{
      color: #88c9f6;
      line-height: 1.6em;
      font-weight: bold;
      font-size: 1.8em;
      margin-bottom: 0.7em;
    }
    .prize-alls,.cont-cqs{
        margin-top: 1.2em;
    }
    .prize-list{
      text-indent: .8em;
        span{
            &:nth-child(2){
                // width: 13.7em;
                display: inline-block;
            }
            &:last-child{
                color: #B81119;
                font-weight: bold;
                padding-left: 0.4em;
                text-align: right;
                float: right;
            }
        }
    }
  }
}


.tips{
  padding:0 5%;padding-top:1em;position: relative;text-align:center;
  
}
</style>