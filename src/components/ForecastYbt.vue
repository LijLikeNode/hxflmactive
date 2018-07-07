<template>
    <div class="container page">
      <div class="con">
        <div class="top"></div>
        <div class="middle">
          <div class="animal"></div>
          <dl>
            <dt>您给谁买：</dt>
            <dd><input type="text" placeholder="请输入被保人姓名" v-model="name"></dd>
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
            <dt>交费期间：</dt>
            <dd><single-select class="inputs" :opts="payList" v-model="payText" @change="choosePayment"></single-select></dd>
          </dl>
          <dl>
            <dt>有无医保：</dt>
            <dd>
              <div class="hxradio">
                <label><input type="radio" v-model="hasybt" value="Y"><em></em>有</label>
                <label><input type="radio" v-model="hasybt" value="N"><em></em>无</label>
              </div>
            </dd>
          </dl>
          <dl>
            <dt>质子重离子：</dt>
            <dd>
              <div class="hxradio">
                <label><input type="radio" v-model="hasflz" value="Y"><em></em>有</label>
                <label><input type="radio" v-model="hasflz" value="N"><em></em>无</label>
              </div>
            </dd>
          </dl>
          <dl>
            <dt>保　　额：</dt>
            <dd><input type="text" ref="cov" placeholder="请您输入保额" v-model="coverage"></dd>
          </dl>
          <div class="showPrem">
            <div class="left">
              保　　费：
            </div>
            <div class="right">
              <dl>
                <dt>新常青树：</dt>
                <dd><input type="text" readonly v-model="cqsPrem"></dd>
              </dl>
              <dl>
                <dt>新医保通：</dt>
                <dd><input type="text" readonly v-model="ybtPrem"></dd>
              </dl>
              <dl>
                <dt>总　　计：</dt>
                <dd><input type="text" readonly v-model="totalPrem"></dd>
              </dl>
            </div>
            <div style="clear:both;"></div>
          </div>
        </div>
        <div class="bottom"></div>
      </div>
      <div class="btn" @click="submitInfo">
        
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
        coverage:10000,
        payText:'1年',
        hasybt:'Y',
        hasflz:'Y',
        payList:[{name:'1年'},{name:'3年'},{name:'5年'},{name:'10年'},{name:'15年'},{name:'20年'}],
      }
    },
    components:{SelectDate,SingleSelect},
    computed:{
      age(){
        // console.log(this.$refs.birth.age)
        return this.$refs.birth.age;
      },
      cqsPrem(){
        return Math.round(this.cqsRate/1000*100)/100*this.coverage;
      },
      ybtPrem(){
        return this.ybtRate;
      },
      totalPrem(){
        return Number(this.cqsPrem) + Number(this.ybtPrem);
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
        console.log(e.target.value);
        let value = e.target.value;
        if(value<1000){
          popalert.fade('保额不能低于1000元');
          this.coverage = 10000;
          return;
        }
        if(value%1000!=0){
          popalert.fade('保额必须是1000的整数倍');
          this.coverage = 10000;
          return;
        }
      })
    },
    methods:{
      choosePayment(val){
        this.payText = val;
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
          coverage:this.coverage,
          cqsPrem:this.cqsPrem,
          ybtPrem:this.ybtPrem,
          totalPrem:this.totalPrem,
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
        position:absolute;bottom:-13em;right:0;width:23em;height:23em;background:url('../assets/img/new/n_bird.png') no-repeat center center ;background-size:100%;z-index: 100;
      }
    }
    dl{
      height:2.5em;line-height: 2.5;font-size: 1.1em;
      dt{
        display: inline-block;width: 6.5em;text-align:right;
      }
      dd{
        display: inline-block;width:65%;position:relative;
        input{
          background: #d8e48d;outline: none;border:1px solid #1b9832;padding:.2em .2em 
        }
      }
    }
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
      float: left;height:2em;line-height: 2;font-size: 1.1em;width:6em;text-align:right;
    }
    .right{
      float:left;width:70%;margin-top: -.1em;
      dl {
        dt{
          width:auto;
        }
        dd{
          width:55%;
          input{
            width:100%;background:transparent;
          }
        }
      }
    }
  }
  .btn{
    width:72%;height:2.5em;margin: 0 auto;background:url('../assets/img/new/n_btn.png') no-repeat center center ;background-size:100%;margin-top:4em;
    -webkit-box-shadow: 0 0 5px #000;
  -moz-box-shadow: 0 0 5px #000;
  box-shadow: 0 0 5px #000;
  position:relative;z-index:101;

  }
  .inputs{
    background: #d8e48d;outline: none;border:1px solid #1b9832;height:2em;line-height:2;padding-left: .2em;width:50%;
  }
}

</style>
