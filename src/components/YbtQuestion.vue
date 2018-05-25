<template>
    <div class="container page">
      <div class="banner"></div>

      <div class="add_info" v-for="(item,index) in question" :key="index">
        <h2><span :class="'num'+index"></span>{{item.topic}}<b v-if="item.choiceType=='checkbox'" style="color:#F85F00;font-weight:normal;margin-right:.2em;">[选择三个]</b></h2>
        <div class="hxradio">
          <!-- 单选框 -->
          <label v-if="item.choiceType=='radio'" v-for="(val,i) in item.options">
            <input :type="item.choiceType" v-model="item.answer" :value="item.choiceType=='radio'?i+1:false" >
            <em></em>{{val}}
          </label>
          <!-- 复选框 -->
          <label v-if="item.choiceType=='checkbox'" v-for="(val,i) in item.options">
            <input :type="item.choiceType" v-model="item.answer[i]" >
            <em></em>{{val}}
          </label>
        </div>
        <p v-if="item.note!=''">{{item.note}}</p>
      </div>

      <a v-if="!mask" class="btn" @click="evn"></a>
      <div v-if="mask" class="mask"></div>
    </div>
  
</template>
<script>

export default {
    name: 'ybtquestion',
    data(){
      return {
        answer:{
          salesmanId:"",
          ybt_problem1:1,
          ybt_problem2:2,
          ybt_problem3:[false,false,false,false,false,false,false,false]
        },

        question:[
          {
            topic:'以下医保通哪种续保条件您更能接受？',
            options:[
              'A.一年一保',
              'B.三年保证续保',
              'C.五年保证续保',
              'D.更多年份保证续保',
            ],
            choiceType:'radio',
            answer:'',
            note:'注：保证续保年份时间越长，费率越高'
          },
          {
            topic:'您是否接受在购买医保通时，无社保人员费率为有社保人员费率3倍，从而两者享受相同理赔报销政策？',
            options:[
              '接受',
              '不接受'
            ],
            choiceType:'radio',
            answer:'',
            note:''
          },
          {
            topic:'请您从以下医保通8个优势中选择出您最感兴趣的',
            options:[
              'A.住院前后门诊费用可报销',
              'B.重大疾病每年有额外100万报销额度',
              'C.疾病等待期仅为30天',
              'D.产品费率较低，30岁首次投保仅需308元',
              'E.突破社保，合理且必要的住院医疗费用，包含自费药、进口药等都可报销',
              'F.投保年龄涵盖从28天到65周岁,可续保至终身',
              'G.限额内发生理赔，仍可续保',
              'H.报销额度高，每年报销额度高达200万'
            ],
            choiceType:'checkbox',
            answer:[false,false,false,false,false,false,false,false],
            note:''
          },
        ],

        mask:false,
        canSubmit:true
      }
    },
    watch:{
      
    },
    computed:{
      
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
            data.ybt_problem3 = data.ybt_problem3.split(',');
            data.ybt_problem3.map((v,i)=>{
              v.indexOf("false")!==-1?data.ybt_problem3[i]=false:v.indexOf("true")!==-1?data.ybt_problem3[i]=true:'';
            });
            this.answer = data;
            this.get_data();
          }
        })
      },
      get_data(){
        //为答案赋值
        //遍历问题
        for (let [index, elem] of this.question.entries()) {
          index==0?elem.answer=this.answer.ybt_problem1:index==1?elem.answer=this.answer.ybt_problem2:elem.answer=this.answer.ybt_problem3;
        }
      },
      evn(x){//点击跳转
        if(this.canSubmit){
          this.canSubmit=false;
          if(!this.check_empty()){
            this.canSubmit=true;
            return;
          }
          this.submit_data();
        }
      },
      check_empty(){
        //遍历问题
        for (let [index, elem] of this.question.entries()) {
          index==0?this.answer.ybt_problem1=elem.answer:index==1?this.answer.ybt_problem2=elem.answer:this.answer.ybt_problem3=elem.answer;
        }
        let data = this.answer;
        let pass=true;
        for(let i in data){//检查空项
          if(i!='ybt_problem3'){
            if(data[i]==''){
              pass = false;
              popalert.fade('您的问卷有未选择项');
              break;
            }
          }else{//判断多选题是否为三个答案
            let correctNum=0;
            for (let elem of data[i].values()) {
              elem==true?correctNum++:'';
            }
            if(correctNum!==3) {
              pass = false;
              popalert.fade('多选题须选择三个答案');
              break;
            } 
          }
        }
        return pass;
      },
      submit_data(){
        ax('ybtSubmitQuestion.do',{data:JSON.stringify(this.answer)},true).then((res)=>{
          res.result=='succ'?this.submit_success(res.codeId):this.error_tip(res.msg);
        }).catch((err)=>{
          this.canSubmit=true;
        })
      },
      submit_success(x){
        popalert.fade('问卷提交成功，即将跳转至信息回执页面');
        setTimeout(()=>{this.$router.push(`/?codeId=${x}&sourceFrom=online&salesmanId=${this.answer.salesmanId}&product_type=ybt`);},2500);
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
  background: url('../assets/img/ybt_intro_bg.png') top center; background-size: 100%;position: relative;padding-bottom: 1.3em;
  div.banner{
    background: url('../assets/img/qbanner.png') no-repeat center center; background-size: 100%;height:17.5em;
  }
  div.mask{position: fixed;top: 0;left: 0;width: 100%;height: 100%;z-index: 999;}
  img{width: 100%;}
  a{
    &.btn{
      display: block;margin:0 5%;width: 90%;background: url('../assets/img/ybt_qustion_btn.png') no-repeat center center; background-size: 100%;height: 5em;text-align:center;
    }
  }
  div.add_info{
    // position: absolute;top: 2em;left: 5%;
    width:90%;background: @yellowBg;box-shadow: 0px 0px 8px 0px rgba(69,142,204,0.5);padding:.1em 2em 1em;border-radius:4px;position: relative;margin-left: 5%;margin-bottom: 3%;border: @greenBorder;
    h2{
      font-size: 1.2em;font-weight:bold;color: @deepRed;margin:1em 0;position:relative;padding-left: 1.6em;
      &.title{
        font-size: 1.2em;line-height: 1.5;
      }
      span{
        width:1.6em;height:1.6em;position:absolute;top:-.3em;left:-.4em;
        &.num0{
          background:url('../assets/img/num1.png') no-repeat center center;background-size:100%;
        }
        &.num1{
          background:url('../assets/img/num2.png') no-repeat center center;background-size:100%;
        }
        &.num2{
          background:url('../assets/img/num3.png') no-repeat center center;background-size:100%;
        }

      }
    }
    p{
      color:#F85F00;
    }

    h1{
      padding:  0 0 1em;line-height: 1.7;
    }
    .hxradio{
      display: block;color:@deepRed;
      label{
        // width: 32%;display: inline-block;margin-bottom: 1em;
        margin-bottom:1em;
        display:block;
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
            display: inline-block;width: 1.3em;height: 1.3em;vertical-align: -.15em;background: url('../assets/img/ybt_radio_nocheck.png') no-repeat center center;background-size: 100%;margin-right: .2em;box-sizing: border-box;transition: all linear .2s;
          }
          &:checked + em{
            background: url('../assets/img/ybt_radio_check.png') no-repeat center center;background-size: 100%;
          }
        }
        &[type=checkbox]{
          &+em{
            display: inline-block;width: 1.2em;height: 1.2em;vertical-align: -.15em;background: url('../assets/img/ybt_box_nocheck.png') no-repeat center center;background-size: 99%;margin-right: .2em;box-sizing: border-box;transition: all linear .2s;
          }
          &:checked + em{
            background: url('../assets/img/ybt_box_check.png') no-repeat center center;background-size: 99%;
          }
        }
        &.other_word{
          display: inline-block;border:none;outline: none;background: @inputBg;padding: .5em 0 .5em .5em;border-radius: 8px;font-size: 1em;vertical-align: middle;width: 77%;
        }
      }
      
    }
    h3{
      background:url('../assets/img/confirm.png') no-repeat center center;background-size:100%;height:100%;
    }
  }
}

</style>
