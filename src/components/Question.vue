<template>
    <div class="container page">
      <!-- <img src="../assets/img/bg_ask.png"> -->
      <div class="add_info">
        <ul>
          <li>
            <h1 style="margin-top: 1em;">您孩子的年龄</h1>
            <div class="hxradio">
              <label><input type="radio" v-model="answer.age" value="1"><em></em>0到12岁</label>
              <label><input type="radio" v-model="answer.age" value="2"><em></em>13到18岁</label>
              <label><input type="radio" v-model="answer.age" value="3"><em></em>19到25岁</label>
            </div>  
          </li>
          <li>
            <h1>您孩子的性别</h1>
            <div class="hxradio">
               <label><input type="radio" v-model="answer.gender" value="M"><em></em>小王子</label>
               <label><input type="radio" v-model="answer.gender" value="F"><em></em>小公主</label>
            </div>  
          </li>
          <li>
            <h1>1.您认为把孩子培养成人需要准备多少教育金？</h1>
            <div class="hxradio long">
              <label><input type="radio" v-model="answer.education" value="1"><em></em>10万到30万</label>
              <label><input type="radio" v-model="answer.education" value="2"><em></em>30万到50万</label>
              <label><input type="radio" v-model="answer.education" value="3"><em></em>50万到80万</label>
              <label><input type="radio" v-model="answer.education" value="4"><em></em>80万以上</label>
             </div>  
          </li>
          <li>
            <h1>2.在当今教育成本越来越高的大环境下，您是否感受到子女教育资金的压力？</h1>
            <div class="hxradio">
              <label><input type="radio" v-model="answer.pressure" value="1"><em></em>有</label>
              <label><input type="radio" v-model="answer.pressure" value="2"><em></em>有一点</label>
              <label><input type="radio" v-model="answer.pressure" value="3"><em></em>没有</label>
             </div>  
          </li>
          <li>
            <h1>3.您更看重教育金储蓄的哪些特征？（多选）</h1>
            <div class="hxradio">
              <label><input type="checkbox" v-model="answer.characteristic[0]"><em></em>安全性</label>
              <label><input type="checkbox" v-model="answer.characteristic[1]"><em></em>专款专用</label>
              <label><input type="checkbox" v-model="answer.characteristic[2]"><em></em>锁定利率</label>
              <label><input type="checkbox" v-model="answer.characteristic[3]"><em></em>复利增值</label>
              <label @touchstart="choose_all()"><input type="checkbox" v-model="answer.characteristic[4]"><em></em>以上全部</label>
             </div>  
          </li>
          <li>
            <h1>4.您目前已经通过以下哪些渠道在做孩子的教育金储蓄？</h1>
            <div class="hxradio wrap">
              <label><input type="radio" v-model="answer.channel" value="1"><em></em>银行存款</label>
              <label><input type="radio" v-model="answer.channel" value="2"><em></em>股票基金</label>
              <label><input type="radio" v-model="answer.channel" value="3"><em></em>短期理财</label>
              <label style="display:inline;margin-right:.7em;"><input type="radio" v-model="answer.channel" value="4"><em></em>其他</label><input v-model='answer.other' :disabled="answer.channel!=4" placeholder="请输入其他原因" type="text" class="other_word">
             </div>  
          </li>
        </ul>
      </div>

      <div class="add_info next">
        <b></b>
        <b class="flower"></b>
        <b class="flower2"></b>
        <b class="grass"></b>
        <h2 style="margin-top: 1em;">为真情回馈新老客户，公司结合当前家庭和少儿客户需求，推出了华夏福临门年金保险（少儿版）。为了确保向客户提供高品质的服务体验，所有理财顾问必须获得一定数量客户的好评才可获得该产品的销售资格，请您对理财顾问的表现进行评价，感谢您的支持。</h2>
        <ul>
          <li>
            <h1 style="margin-top: 1em;">1.请问您对华夏保险整体情况是否已经了解？</h1>
            <div class="hxradio">
              <label><input type="radio" v-model="answer.cases" value="1"><em></em>不了解</label>
              <label><input type="radio" v-model="answer.cases" value="2"><em></em>一般了解</label>
              <label><input type="radio" v-model="answer.cases" value="3"><em></em>非常了解</label>
            </div>  
          </li>
          <li>
            <h1>2.请问您对华夏福临门年金保险（少儿版）计划的特色和利益是否已经了解？</h1>
            <div class="hxradio">
              <label><input type="radio" v-model="answer.benefit" value="1"><em></em>不了解</label>
              <label><input type="radio" v-model="answer.benefit" value="2"><em></em>一般了解</label>
              <label><input type="radio" v-model="answer.benefit" value="3"><em></em>非常了解</label>
            </div>  
          </li>
          <li>
            <h1>3.请问您对理财顾问的总体评价是？</h1>
            <div class="hxradio">
              <label><input type="radio" v-model="answer.comment" value="1"><em></em>优秀</label>
              <label><input type="radio" v-model="answer.comment" value="2"><em></em>良好</label>
              <label><input type="radio" v-model="answer.comment" value="3"><em></em>一般</label>
             </div>  
          </li>
        </ul>
        <h2 class="title">如果您觉得满意，您是否可以考虑再提供三位朋友，帮助理财顾问完成考核。</h2>
        <ol class="other">
          <li><input v-model='answer.friend.name1' type="text" class="otherName" placeholder="姓名"><input v-model='answer.friend.phone1' placeholder="电话" type="text" class="otherTel"></li>
          <li><input v-model='answer.friend.name2' type="text" class="otherName" placeholder="姓名"><input v-model='answer.friend.phone2' placeholder="电话" type="text" class="otherTel"></li>
          <li><input v-model='answer.friend.name3' type="text" class="otherName" placeholder="姓名"><input v-model='answer.friend.phone3' placeholder="电话" type="text" class="otherTel"></li>
        </ol>
      </div>
      <a v-if="!mask" class="btn" @click="evn">提交</a>
      <div v-if="mask" class="mask"></div>
    </div>
  
</template>
<script>

export default {
    name: 'question',
    data(){
      return {
        answer:{
          age:'',
          gender:'',
          education:'',
          pressure:'',
          characteristic:[false,false,false,false,false],
          channel:'',
          cases:'',
          benefit:'',
          comment:'',
          salesmanId:'',
          other:'',
          friend:{
            name1:'',
            name2:'',
            name3:'',
            phone1:'',
            phone2:'',
            phone3:''
          }
        },
        mask:false,
        canSubmit:true
      }
    },
    watch:{
      'answer.characteristic'(newVal){
        let items = newVal.slice(0,4);
        this.answer.characteristic[4]=items.includes(false)?false:true;
      }
    },
    created(){
      common.noShare();
    },
    mounted(){
      this.answer.salesmanId = this.$route.params.id;
      rq()&&rq().luckCode?this.review_ask():'';
    },
    methods:{
      review_ask(){
        this.mask=true;
        this.request_answer();
      },
      request_answer(){
        ax('findQuestion.do',{'salesmanCode':this.$route.params.id,'luck_code':rq().luckCode},true).then(res=>{
          if(res.result=='succ'){
            let data = res.data;
            data.characteristic = data.characteristic.split(',');
            // console.log(data.characteristic)
            data.characteristic.map((v,i)=>{
              v.indexOf("false")!==-1?data.characteristic[i]=false:v.indexOf("true")!==-1?data.characteristic[i]=true:'';
            });
            // console.log(data.characteristic)
            data.friend = JSON.parse(data.friend);
            this.answer = data;
          }
        })
      },
      evn(x){//点击跳转
        if(this.canSubmit){
          this.canSubmit=false;
          if(!this.check_empty()){
            popalert.fade('您的问卷有未选择项');
            this.canSubmit=true;
            return;
          }
          if(!this.check_connect_format()){
            this.canSubmit=true;
            return;
          }
          this.submit_data();
        }
      },
      choose_all(){
        this.answer.characteristic[4]==true?this.answer.characteristic.fill(false,0,4):this.answer.characteristic.fill(true,0,4);
      },
      check_empty(){
        let data = this.answer;
        let pass;
        for(let i in data){//检查空项
          if(i!='other'&&i!='characteristic'&&i!='friend'){
            if(data[i]==''){
              pass = false;
              break;
            }
          }else if(i=='characteristic'){
            pass=false;
            data[i].map((v,i)=>{
              v==true?pass=true:'';
            })
          }
        }
        return pass;
      },
      check_connect_format(){
        //检查电话号码
        let pass=true;
        if(this.answer.friend.name1||this.answer.friend.phone1){
          pass = this.answer.friend.name1&&this.answer.friend.phone1?this.check_format(this.answer.friend.name1,this.answer.friend.phone1):popalert.fade('请将联系人姓名与电话补全');
        }
        if(this.answer.friend.name2||this.answer.friend.phone2){
          pass = this.answer.friend.name2&&this.answer.friend.phone2?this.check_format(this.answer.friend.name2,this.answer.friend.phone2):popalert.fade('请将联系人姓名与电话补全');
        }
        if(this.answer.friend.name3||this.answer.friend.phone3){
          pass = this.answer.friend.name3&&this.answer.friend.phone3?this.check_format(this.answer.friend.name3,this.answer.friend.phone3):popalert.fade('请将联系人姓名与电话补全');
        }
        return pass==true?true:false;
      },
      check_format(name,phone){//console.log('进入检查')
        let pass;
        pass=this.check_name_format(name)&&this.check_phone_format(phone)?true:false;
        return pass;
      },
      check_name_format(name){//console.log('进入姓名检查')
        let pass = /^[\u4E00-\u9FA5A-Za-z]+$/.test(name);
        !pass?popalert.fade('请输入汉字或英文姓名'):'';
        return pass;
      },
      check_phone_format(phone){//console.log('进入手机检查')
        let pass = /^1[345789][0-9]{9}$/.test(phone);
        !pass?popalert.fade('请输入正确的手机号'):'';
        return pass;
      },
      submit_data(){
        let data = {...this.answer};
        data.friend = JSON.stringify(this.answer.friend);
        data.characteristic = JSON.stringify(this.answer.characteristic);
        ax('submitQuestion.do',data,true).then((res)=>{
          res.result=='succ'?this.submit_success(res.codeId):this.error_tip(res.msg);
        }).catch((err)=>{
          this.canSubmit=true;
        })
      },
      submit_success(x){
        popalert.fade('问卷提交成功，即将跳转至信息回执页面');
        setTimeout(()=>{this.$router.push(`/?codeId=${x}&sourceFrom=online&salesmanId=${this.answer.salesmanId}`);},2500);
      },
      error_tip(x){
        this.canSubmit=true;
        popalert.fade(x);
      }
    }
}
</script>

<style lang='less' scoped>
@import url(../assets/css/main.less);
div.container{
  background: url('../assets/img/bg_ask.png') no-repeat center center; background-size: cover;position: relative;padding-top: 2em;padding-bottom: 2em;
  div.mask{position: fixed;top: 0;left: 0;width: 100%;height: 100%;z-index: 999;}
  img{width: 100%;}
  a{
    &.btn{
      display: block;margin:0 5%;width: 90%;background: url('../assets/img/btn_bg.png') no-repeat center center; background-size: 100%;height: 5em;line-height: 4.8em;text-align:center;font-size: 1.2em;color: #fff;
    }
  }
  div.add_info{
    // position: absolute;top: 2em;left: 5%;
    width:90%;background: #fff;box-shadow: 0px 0px 8px 0px rgba(69,142,204,0.5);padding:.1em 1em 0;border-radius:10px;position: relative;margin-left: 5%;margin-bottom: 12%;
    &.next{
      // top: 51em;
      padding-top: 2.5em;
      margin-bottom: 5%;
    }
    h2{
      font-size: 1em;color: @mainGreen;line-height: 2em;
      &.title{
        font-size: 1.2em;line-height: 1.5;
      }
    }
    ul{
      li{
        font-size: 1.1em;color: @mainGreen;
        h1{
          padding:  0 0 1em;line-height: 1.7;
        }
        .hxradio{
          display: block;
          label{
            width: 32%;display: inline-block;margin-bottom: 1em;
            &:last-child{
              margin-right: 0;
            }
          }
          &.long{
            label{
              width:42%;margin-right: 1.2em;
            }
          }
          &.wrap{
            padding-bottom: 1em;
          }
          input{
            display: none;
            &[type=radio]{
              &+em{
                display: inline-block;width: 1em;height: 1em;vertical-align: -.15em;background: url(../assets/img/radio-nocheck.png) no-repeat center center;background-size: 100%;margin-right: .2em;box-sizing: border-box;transition: all linear .2s;
              }
              &:checked + em{
                background: url(../assets/img/radio-check.png) no-repeat center center;background-size: 100%;
              }
            }
            &[type=checkbox]{
              &+em{
                display: inline-block;width: 1em;height: 1em;vertical-align: -.15em;background: url(../assets/img/box-nocheck.png) no-repeat center center;background-size: 99%;margin-right: .2em;box-sizing: border-box;transition: all linear .2s;
              }
              &:checked + em{
                background: url(../assets/img/box-check.png) no-repeat center center;background-size: 99%;
              }
            }
            &.other_word{
              display: inline-block;border:none;outline: none;background: @inputBg;padding: .5em 0 .5em .5em;border-radius: 8px;font-size: 1em;vertical-align: middle;width: 77%;
            }
          }
          
        }
        h3{
          background:url(../assets/img/confirm.png) no-repeat center center;background-size:100%;height:100%;
        }
      }
      
    }
    ol{
      &.other{
        margin-top: 1em;
        li{
          display: flex;width: 100%;
          input{
            border:none;outline: none;background: @inputBg;margin-bottom: 3%;padding: .4em 0 .4em .5em;border-radius: 5px;font-size: 1.3em;color: @blueShadow;
            &.otherName{
              width: 33%;
              margin-right: 3%;
            }
            &.otherTel{
              width: 62%;
            }
          }
          
        }
        &:last-child{
          margin-bottom: 3%;
        }
      }
    }
    b{
      position:absolute;top:-1.5em;left:1em;width:8em;height:4em;background:url(../assets/img/arrow4.png) no-repeat center center;background-size:100%;
      &.flower{
        background:url('../assets/img/flower.png') no-repeat center center;background-size:100%;left:66%;width:1.5em;height:1.5em;top:-1.3em;
      }
      &.grass{
        background:url('../assets/img/grass.png') no-repeat center center;background-size:100%;left:40%;width:2em;height:2em;top:-1.6em;
      }
      &.flower2{
        background:url('../assets/img/flower2.png') no-repeat center center;background-size:100%;left:85%;width:1.7em;height:2em;top:-1.8em;
      }
    }
  }
  input::-webkit-input-placeholder{
      color:@mainGreen;
  }
  input::-moz-placeholder{   /* Mozilla Firefox 19+ */
      color:@mainGreen;
  }
  input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
      color:@mainGreen;
  }
  input:-ms-input-placeholder{  /* Internet Explorer 10-11 */ 
      color:@mainGreen;
  }
}

</style>
