<template>
  <div class="container page">
    <div class="con">
      <div :class="['lottery_draw',{'rotate':canRoll},{'rotate1':level.one},{'rotate2':level.two},{'rotate3':level.three},{'rotate4':level.four},{'rotate5':level.five},{'rotate6':level.six},{'rotate7':level.seven},{'rotate8':level.eight}]"></div>
      <div class="click_start" @click="rotate_start"></div>
    </div>
    <div class="add_info">
      <b></b>
      <el-row type="flex" class="row-bg">
        <el-col :span="6"><div class="grid-content bg-purple title">奖项等级</div></el-col>
        <el-col :span="18"><div class="grid-content bg-purple-light title">奖品设置</div></el-col>
      </el-row>
      <el-row v-for="(v,i) in workcode" type="flex" class="row-bg" :key="i">
        <el-col :span="6"><div class="grid-content bg-purple">{{i}}</div></el-col>
        <el-col :span="18"><div class="grid-content bg-purple-light">{{v}}</div></el-col>
      </el-row>
    </div>
    <div :class="['start_extend',{'active':big},{'toleft':small}]">
      
    </div>
    <div :class="['end_extend',{'active':big},{'toright':small}]">
      
    </div>
    <transition name="fade">
      <div class="mask" v-if="prompts">
        <div :class="['conbox',{'active':prompts2}]">
          <h2 v-html="tipmsg"></h2> 
          <span @click="prompts=prompts2=false"></span>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>

export default {
    name: 'present',
    data(){
      return {
        big:false,
        small:false,
        prompts:false,
        prompts2:false,
        canRoll:false,
        noStop:false,
        tipmsg:'',
        level:{
          one:false,
          two:false,
          three:false,
          four:false,
          five:false,
          six:false,
          seven:false,
          eight:false,
        },
        workcode:{
          '一等奖':'MacBook Pro 11.6英寸笔记本电脑',
          '二等奖':'小米空气净化器2',
          '三等奖':'小米智能手环2',
          '四等奖':'华夏精品活动参与卡',
        }
      }
    },
    mounted(){
      common.noShare();
    },
    methods:{
      rotate_start(){
        
        

        if(!this.noStop){

          //转盘请求
          this.noStop = true;
          
          ax('luckPrize.do',{codeId:this.$route.params.id,name:sessionStorage.name,phone:sessionStorage.phone})
          .then(response=>{
            // console.log(response)
            if(response.result=='succ'){
              // console.log('start')
              this.init_level();
              this.big = true;
              setTimeout(()=>{
                this.small = true;
              },1000);
              let level = response.level;
              setTimeout(()=>{
                level == 1 ? this.level.one = true : level == 2 ? this.level.two = true : level == 3 ? this.level.three = true : level == 4 ? this.level.four = true : level == 5 ? this.level.five = true : level == 6 ? this.level.six = true : level == 7 ? this.level.seven = true : this.level.eight = true;
              },1500);
              
              setTimeout(()=>{
                this.tipmsg = `恭喜您获得<br/>${level == 1 ? '一等奖 MacBook Pro 11.6英寸笔记本电脑' : level == 2 ? '二等奖 小米空气净化器2' : level == 3 ? '三等奖 小米智能手环2' : level == 4 ? '四等奖 华夏精品活动参与卡' : level == 5 ? '一等奖 MacBook Pro 11.6英寸笔记本电脑' : level == 6 ? '二等奖 小米空气净化器2' : level == 7 ? '三等奖 小米智能手环2' : '四等奖 华夏精品活动参与卡'}`;
                this.prompts = true;//这个是弹层的半透明黑色背景，没有过渡和动画
                setTimeout(()=>this.prompts2=true,50);//这个是展示几等奖的面板  有向下滑动的动画
                this.noStop=false;
              },11500)
            }else{
              // this.init_level();
              this.tipmsg = response.msg;this.prompts = true;setTimeout(()=>this.prompts2=true,50);
              this.noStop = false;
            }
          })
          .catch(err=>{
              //断网四等奖
                this.init_level();
                this.big = true;
                setTimeout(()=>{
                  this.small = true;
                },1000);
                setTimeout(()=>{
                  this.level.four = true;
                },1500);
                
                setTimeout(()=>{
                  this.tipmsg = `恭喜您获得<br/>四等奖 华夏精美活动参与卡`;
                  this.prompts = true;setTimeout(()=>this.prompts2=true,50);
                  this.noStop=false;
                },11500)
          })
        }
      },
      init_level(){
        this.level = {
          one:false,
          two:false,
          three:false,
          four:false,
          five:false,
          six:false,
          seven:false,
          eight:false,
        }
        this.big = false;
        this.small = false;
      }
    }
}
</script>

<style lang='less' scoped>
@import url(../assets/css/main.less);
div.container{
  background: url(../assets/img/bg2.png) no-repeat center center; background-size: 100%;background-position: cover;height: 100%;overflow: hidden;
  div.start_extend,div.end_extend{
    position: fixed;width: 5.5em;height: 5.5em;top: 40%;transform: translateY(-50%);transition: all .5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }
  div.start_extend{
    background: url('../assets/img/start_extend.png') no-repeat center center;background-size: 100%;left: 30%;transform: scale(0);
    &.active{ transform: scale(1); }
    &.toleft{ left:0;margin-left: -100%;transform: scale(.8);}
  }
  div.end_extend{
    background: url('../assets/img/end_extend.png') no-repeat center center;background-size: 100%;right: 30%;transform: scale(0);
    &.active{transform: scale(1);}
    &.toright{ right:0;margin-right: -100%;transform: scale(.8);}
  }
  div.add_info{
     position: absolute;bottom: 6%;width:90%;left: 5%;padding:3.2em 0em .5em;background:#fff;border-radius:8px;
    .row-bg{
      .grid-content{
        text-align: center;font-size:1.2em;margin-bottom:.5em;color:rgb(82,158,42);
        &.title{
          font-size:1em;color:rgb(141,209,105);
        }
      }
    }
    b{
      position:absolute;top:-1.5em;left:1em;width:8em;height:4em;background:url(../assets/img/arrow2.png) no-repeat center center;background-size:100%;
    }
  }
  div.con{
    position:absolute;top:35%;left:50%;transform:translate(-50%,-50%);width:90%;height:30em;border-radius: 100px;
    div.lottery_draw{
      width:100%;height:100%;background:url(../assets/img/dial.png) no-repeat center center;background-size:100%;position: absolute;top: 0;left: 0;
      &.rotate{
        .animation(rotate 800ms linear infinite);
      }
      &.rotate1{
        .animation(rotate1 10000ms cubic-bezier(0, 0, .30, 1) forwards);
      }
      &.rotate2{
        .animation(rotate2 10000ms cubic-bezier(0, 0, .30, 1) forwards);
      }
      &.rotate3{
        .animation(rotate3 10000ms cubic-bezier(0, 0, .30, 1) forwards);
      }
      &.rotate4{
        .animation(rotate4 10000ms cubic-bezier(0, 0, .30, 1) forwards);
      }
      &.rotate5{
        .animation(rotate5 10000ms cubic-bezier(0, 0, .30, 1) forwards);
      }
      &.rotate6{
        .animation(rotate6 10000ms cubic-bezier(0, 0, .30, 1) forwards);
      }
      &.rotate7{
        .animation(rotate7 10000ms cubic-bezier(0, 0, .30, 1) forwards);
      }
      &.rotate8{
        .animation(rotate8 10000ms cubic-bezier(0, 0, .30, 1) forwards);
      }
    }
    div.click_start{
      position:absolute;top:48.5%;left:50%;transform:translate(-50%,-50%);width:26%;height:10em;background:url(../assets/img/indicator.png) no-repeat center center;background-size:100%;
    }
  } 
}
.keyframes(rotate;{
  0%{.transform(rotate(0deg));}
  100%{.transform(rotate(2182.5deg));}
});
.keyframes(rotate1;{//1
  0%{.transform(rotate(0deg));}
  100%{.transform(rotate(1957.5deg));}
});
.keyframes(rotate2;{//2
  0%{.transform(rotate(0deg));}
  100%{.transform(rotate(1912.5deg));}
});
.keyframes(rotate3;{//3
  0%{.transform(rotate(0deg));}
  100%{.transform(rotate(1867.5deg));}
});
.keyframes(rotate4;{//4
  0%{.transform(rotate(0deg));}
  100%{.transform(rotate(2002.5deg));}
});
.keyframes(rotate5;{//5
  0%{.transform(rotate(0deg));}
  100%{.transform(rotate(2137.5deg));}
});
.keyframes(rotate6;{//6
  0%{.transform(rotate(0deg));}
  100%{.transform(rotate(2092.5deg));}
});
.keyframes(rotate7;{//7
  0%{.transform(rotate(0deg));}
  100%{.transform(rotate(2047.5deg));}
});
.keyframes(rotate8;{//8
  0%{.transform(rotate(0deg));}
  100%{.transform(rotate(2182.5deg));}
});
.mask{
  background:rgba(0,0,0,.7);position:fixed;width:100%;height:100%;z-index: 10;display: block;
  .conbox{
    position: absolute;top: -30%;left:50%;transform:translateX(-50%);z-index: 11;width: 70%;height: 25%;border-radius: 5px;color: #999;background:url(../assets/img/tips.png) no-repeat center center;background-size: 100%;padding-top: 18%;text-align: center;transition: top .5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    &.active{
      top: 30%;
    }
    span{
      position: absolute;bottom:-20%;left:50%;transform:translateX(-50%);background: url(../assets/img/close.png);width: 2em;height: 2em;background-size: 100%;
    }
    h2{
      line-height: 2;color: #529e2a;
    }
  }
}
</style>
