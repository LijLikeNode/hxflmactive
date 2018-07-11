<template>
    <div class="container page">
      <div class="con">
        <div class="top"></div>
        <div class="middle">
          <div class="animal"></div>
          <dl>
            <dt>我　　给：</dt>
            <dd class="forecastybt-wg">
              <single-select class="inputs inputs-wg" :opts="relationshipList" v-model="relText" @change="changeRel"></single-select>
              <span  class="pos-rel">设计保障</span>
            </dd>
          </dl>
           <dl>
            <dt>姓　　名：</dt>
            <dd class="rel-mine">
              <input type="text" placeholder="请输入被保人姓名" v-model="name">
            </dd>
          </dl>
          <dl>
            <dt>性　　别：</dt>
            <dd>
              <div class="hxradio">
                <label><input type="radio" v-model="sex" value="M"><em></em>男</label>
                <label><input type="radio" v-model="sex" value="F"><em></em>女</label>
              </div>
            </dd>
          </dl>
          <dl>
            <dt>年　　龄：</dt>
            <dd><select-date ref="birth" @query="queryRate"></select-date></dd>
          </dl>
          <dl>
            <dt><span>被保险人</span><span>是否有医保：</span></dt>
            <dd>
              <div class="hxradio hxradio-isMast">
                <label><input type="radio" v-model="hasybt" value="Y"><em></em>有</label>
                <label><input type="radio" v-model="hasybt" value="N"><em></em>无</label>
              </div>
            </dd>
          </dl>
          <p class="text-color" >备注：职工医保、城镇医保、新农合、大学生医保皆属于有医保。</p>
          <dl>
            <dt><span>重疾保额：</span><span>常青树多倍版</span></dt>
            <dd><input style="width:60%;" type="number" ref="cov" placeholder="请您输入保额" v-model="coverage"> 万元</dd>
          </dl>
          <p class="text-color">备注:最低1万,建议为年收入的10倍,通常在20万以上</p>
          <dl>
            <dt><span>交费期间：</span><span>常青树多倍版</span></dt>
            <dd><single-select class="inputs inputs-qj" :opts="payList" v-model="payText" @change="choosePayment"></single-select></dd>
          </dl>
          <p class="text-color">附加医保通2.0，每年享受最高500万保障额度。</p>
          <!-- <dl>
            <dt>质子重离子：</dt>
            <dd>
              <div class="hxradio">
                <label><input type="radio" v-model="hasflz" value="Y"><em></em>有</label>
                <label><input type="radio" v-model="hasflz" value="N"><em></em>无</label>
              </div>
            </dd>
          </dl> -->
          <div class="showPrem">
            <div class="left">
              保　　费：
            </div>
            <div class="right">
              <dl>
                <dt>常青树(多倍版):</dt>
                <dd><input type="text" readonly v-model="cqsPrem"></dd>
              </dl>
              <dl>
                <dt>医保通2.0版:</dt>
                <dd><input type="text" readonly v-model="ybtPrem"></dd>
              </dl>
              <dl>
                <dt>总计:</dt>
                <dd><input style="position:absolute;width:120%;left:-1.4em;" type="text" readonly v-model="totalPrem"></dd>
              </dl>
            </div>
            
            <div style="clear:both;"></div>
          </div>
          <div class="btn" @click="submitInfo"><p>做好啦!<br>我要看我做的详细保障计划</p></div>
          <div class="btns"></div>
        </div>
        <div class="bottom"></div>
      </div>
      
    </div>
  
</template>
<script>
import SelectDate from '@/pluginCom/SelectDate'
import SingleSelect from '@/pluginCom/SingleSelect'
export default {
    name: 'home',
    data(){
      return {
        name:'',
        sex:'M',
        ybtRate:'',
        cqsRate:'',
        coverage:30,
        payText:'20年',
        relText: '本人',
        hasybt:'Y',
        hasflz:'Y',
        payList:[{name:'1年'},{name:'3年'},{name:'5年'},{name:'10年'},{name:'15年'},{name:'20年'}],
        relationshipList:[{name:'本人'},{name:'父亲'},{name:'母亲'},{name:'丈夫'},{name:'妻子'},{name:'儿子'},{name:'女儿'}]
      }
    },
    components:{SelectDate,SingleSelect},
    computed:{
      age(){
        // console.log(this.$refs.birth.age)
        return this.$refs.birth.age;
      },
      cqsPrem(){
        return Math.round(this.cqsRate/1000*this.coverage*10000*100)/100+'元';
      },
      ybtPrem(){
        return this.ybtRate+'元';
      },
      totalPrem(){
        return (parseInt(this.cqsPrem) + parseInt(this.ybtPrem)) + '元';
      },
      payment(){
        return parseInt(this.payText);
      }
    },
    watch:{
      payment(newVal){
        // console.log(newVal)
        if(newVal==1||newVal==3||newVal==5){
          this.$refs.birth.startDate = common.GetDateStr(-1,-55);
        }else{
          this.$refs.birth.startDate = common.GetDateStr(-1,-50);
        }
        this.queryRate();
      },
      sex:{
        handler(){
          this.queryRate();
        },
      },
      hasybt:{
        handler(){
          this.queryRate();
        },
      },
    },
    mounted(){
      this.queryRate();
      let el = $(this.$refs.cov);
      el.blur((e)=>{
        // console.log(e.target.value);
        let value = e.target.value;
        if(value<1){
          popalert.fade('保额不能低于1万元');
          this.coverage = 30;
          return;
        }
        if( String(Math.round(value/0.1*100)/100).indexOf('.') != -1){
          popalert.fade('保额必须是1000的整数倍');
          this.coverage = 30;
          return;
        }
      })
    },
    methods:{
      choosePayment(val){
        this.payText = val;
      },
      changeRel (val) {  // 关系
        this.relText = val;
      },
      evn(x){//点击跳转
        x=='intro'?this.to_intro():x=='rank'?this.to_rank():this.to_ybtintro();
      },
      queryRate(){
        let data = {
          sex:this.sex,
          age:this.$refs.birth.age,
          payment:this.payment,
          hasybt:this.hasybt
        }
        ax('queryRate.do',data,true).then(res=>{
          this.ybtRate = res.data.ybt_rate;
          this.cqsRate = res.data.cqs_rate;
        })
      },
      submitInfo(){
        let ss = {
          name:this.name,
          sex:this.sex,
          birth:this.$refs.birth.date,
          age:this.$refs.birth.age,
          coverage:Math.round(this.coverage*10000*100)/100,
          cqsPrem:parseInt(this.cqsPrem),
          ybtPrem:parseInt(this.ybtPrem),
          totalPrem:parseInt(this.totalPrem),
          hasybt:this.hasybt,
          payment:this.payment,
          hasflz:this.hasflz,
          salesmanId:rq().salesmanId
        }

        let submit = () => {
          ax('createPlan.do',{data:JSON.stringify(ss)},true).then(res=>{
            if(res.result=='succ'){
              popalert.fade('生成计划书成功');
              setTimeout(()=>{
                this.$router.push(`/planbook/${rq().salesmanId}/${res.codeId}`);
              },2000);
            }
          })
        }

        for(let i in ss){
          // console.log(i)
          if(ss[i]===''){
            popalert.fade('请您将信息补充完整');
            break;
          }
          if(i=='salesmanId') submit();
        }




      },
    }
}
</script>

<style lang='less' scoped>
@import url(../assets/css/main.less);

div.container{
  background: url('../assets/img/new/newBg.png') center top; background-size: 100%;position: relative;padding-top: 4em;padding-bottom:2em;
  
  .forecastybt-wg{
    .pos-rel{
      position: absolute;
      right: 1em;
      top: -.3em;
      padding:0;
    }
    .inputs-wg{
      width: 60%;
    }
  }
  .inputs-qj{
    position: relative;
    top: 0.4em;
  }
  .text-color{
    color: #999593;
    margin-top: 0.7em;
    margin-bottom: .4em;
  }
  dl{
    dt{
      position: relative;
      span{
        font-weight: bold;
      
        &:nth-child(2){
          position: absolute;
          left: 0;
          bottom: -1.2em;
        }
      }
    }
  }
  div.con{
    width: 90%;margin-left: 5%;

    div.top{
      background:url('../assets/img/new/n_bgt.png') no-repeat center 100%;background-size:100%;height: 4em;position:relative;top:1px;
    }
    div.bottom{
      background:url('../assets/img/new/n_bgb.png') no-repeat center 0;background-size:100%;height: 4em;position:relative;top:-1px;
    }
    div.middle{
      background:url('../assets/img/new/n_bgs.png')  center 0;background-size:100%;position:relative;
      padding:0 8% 8em;
      .animal{
        position:absolute;bottom:-6em;right:0;width:23em;height:23em;background:url('../assets/img/new/n_bird.png') no-repeat center center ;background-size:100%;z-index: 100;
      }
    }
    dl{
      height:2.5em;line-height: 2.5;font-size: 1.1em;
      dt{
        display: inline-block;width: 6.5em;
        // text-align:right;
      }
      dd{
        display: inline-block;width:65%;position:relative;
        input{
          background: #d8e48d;outline: none;border:1px solid #1b9832;padding:.2em .2em 
        }
      }
    }
  }
  .hxradio-isMast{
    position: relative;
    top: .6em;
  }
  .hxradio{
    display: block;
    label{
      width:4em;
      display: inline-block;margin-bottom: 1em;
      &:last-child{
        margin-right: 0;
      }
    }
    &.long{
      label{
        margin-right: 1.2em;
      }
    }
    &.wrap{
      padding-bottom: 1em;
    }
    input{
      display: none;
      &[type=radio]{
        &+em{
          display: inline-block;width: 1em;height: 1em;background: url('../assets/img/new/n_nocheck.png') no-repeat center center;background-size: 100%;margin-right: .5em;box-sizing: border-box;transition: all linear .2s;transform: scale(2);
        }
        &:checked + em{
          background: url('../assets/img/new/n_check.png') no-repeat center center;background-size: 100%;transform: scale(2);
        }
      }
      &[type=checkbox]{
        &+em{
          display: inline-block;width: 1em;height: 1em;vertical-align: -.15em;background: url('../assets/img/box-nocheck.png') no-repeat center center;background-size: 99%;margin-right: .2em;box-sizing: border-box;transition: all linear .2s;
        }
        &:checked + em{
          background: url('../assets/img/box-check.png') no-repeat center center;background-size: 99%;
        }
      }
      &.other_word{
        display: inline-block;border:none;outline: none;background: @inputBg;padding: .5em 0 .5em .5em;border-radius: 8px;font-size: 1em;vertical-align: middle;width: 77%;
      }
    }
    
  }
  .showPrem{
    .left{
      float: left;height:2em;line-height: 2;font-size: 1.1em;width:6em;
      // text-align:right;
    }
    .right{
      float:left;width:70%;margin-top: -.1em;
      dl {
        position: relative;
        dt{
          width:auto;
        }
        dd{
          width:45%;
          position: absolute;
          right: 0;
          input{
            width:100%;background:transparent;
          }
        }
      }
    }
  }
  .btns{
    margin-top:6.5em
  }
  .btn{
    width:80%;margin: 0 auto;background:#1a9731;margin-top:1em;text-align:center;color:#fff;padding:.5em 0;
    p{
      border-top:1px solid #fff;
      border-bottom:1px solid #fff;
      padding:.2em 0;
    }
    -webkit-box-shadow: 0 0 5px #000;
  -moz-box-shadow: 0 0 5px #000;
  box-shadow: 0 0 5px #000;
  position:relative;z-index:101;

  }
  .inputs{
    background: #d8e48d;outline: none;border:1px solid #1b9832;height:2em;line-height:2;padding-left: .2em;width:96%;
  }
}
</style>
