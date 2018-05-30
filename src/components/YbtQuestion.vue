<template>
    <div class="container page">
      <!-- <div class="banner"></div> -->

      <div class="add_info" v-for="(item,index) in question" :key="index">
        <h2><span>{{index+1}}</span>{{item.topic}}</h2>
        <div class="hxradio">
          <!-- 单选框 -->
          <label v-if="item.choiceType=='radio'" v-for="(val,i) in item.options">
            <input :type="item.choiceType" v-model="item.answer.value" :value="item.choiceType=='radio'?i+1:false"  @click.stop="jud_otheradvise(index,i)">
            <em></em>{{val}}
            <input class="advise" v-if="i==item.options.length-1" placeholder="请输入您的意见" v-model="item.answer.otherAdvise" disabled type="text" >
          </label>
          <!-- 复选框 -->
          <label v-if="item.choiceType=='checkbox'" v-for="(val,i) in item.options">
            <input :type="item.choiceType" v-model="item.answer.value[i]" @click.stop="jud_otheradvise(index,i,true)">
            <em></em>{{val}}
            <input class="advise" v-if="i==item.options.length-1" disabled v-model="item.answer.otherAdvise" placeholder="请输入您的意见" type="text">
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
          ybt_problem1:{
            value:1,
            otherAdvise:''
          },
          ybt_problem2:{
            value:2,
            otherAdvise:''
          },
          ybt_problem3:{
            value:[false,false,false,false,false,false,false,false],
            otherAdvise:''
          },
          ybt_problem4:{
            value:1,
            otherAdvise:''
          },
        },

        question:[
          {
            topic:'以下医保通哪种续保条件您更能接受？',
            options:[
              'A.一年一保，费率较现有医保通更低',
              'B.三年保证续保，费率跟现有医保通差不多',
              'C.五年保证续保，费率较现有医保通更高',
              'D.更多年份保证续保，费率较现有医保通明显提高',
              'E.我有不同意见：'
            ],
            choiceType:'radio',
            answer:{
              value:'',
              otherAdvise:'',
            },
            note:'注：保证续保年份时间越长，费率越高'
          },
          {
            topic:'您是否接受在购买医保通时，无社保人员费率为有社保人员费率的3倍，从而两者享受相同理赔报销政策？',
            options:[
              'A.接受',
              'B.不接受',
              'C.希望两者费率一致，但对免赔额或者报销额度做出不同规定',
              'D.我有不同意见：',
            ],
            choiceType:'radio',
            answer:{
              value:'',
              otherAdvise:'',
            },
            note:''
          },
          {
            topic:'请您从以下医保通的8个产品特点中选择出您最感兴趣的：（选择3个）',
            options:[
              'A.住院前后门诊费用可报销',
              'B.重大疾病每年有额外100万报销额度',
              'C.疾病等待期仅为30天',
              'D.产品费率较低，30岁首次投保仅需308元',
              'E.突破社保，合理且必要的住院医疗费用，包含自费药、进口药等都可报销',
              'F.投保年龄涵盖从28天到65周岁,可续保至终身',
              'G.限额内发生理赔，仍可续保',
              'H.报销额度高，每年报销额度高达200万',
              'I.我有不同意见：',
            ],
            choiceType:'checkbox',
            answer:{
              value:[false,false,false,false,false,false,false,false,false],
              otherAdvise:'',
            },
            note:''
          },
          {
            topic:'为保护老客户的合法权益，凡是投保现有医保通的客户，可以无条件在保单周年日通过保全换成新医保通：',
            options:[
              'A.好，我们应该尊重现有老客户的选择权，这样最妥',
              'B.不好，现有医保通拥有最好的续保条件，完全没必要',
              'C.我有不同意见：',
            ],
            choiceType:'radio',
            answer:{
              value:'',
              otherAdvise:'',
            },
            note:'注：如果因不可抗力新医保通没按时上市或者停止销售等情况，不受此条限制'
          }
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
      jud_otheradvise(index,items,checkbox){
        //index question的第几项
        //items question中options的第几项
        if(!checkbox){
          if(items==this.question[index].options.length-1) this.switch_adviese(true,index);
          else this.switch_adviese(false,index);
        }else{
          setTimeout(()=>{
            if(this.question[index].answer.value[8]) this.switch_adviese(true,index);
            else this.switch_adviese(false,index);
          },100);
        }
        
      },
      switch_adviese(canWrite,index){
        let el = $('div.hxradio')[index];
        if(canWrite){
          $(el).find('.advise').attr('disabled',false);
        }else{
          $(el).find('.advise').attr('disabled',true);
          this.question[index].answer.otherAdvise='';
        }
      },
      review_ask(){
        this.mask=true;
        this.request_answer();
      },
      request_answer(){
        ax('findQuestion.do',{'salesmanCode':this.$route.params.id,'luck_code':rq().luckCode},true).then(res=>{
          if(res.result=='succ'){
            let data = JSON.parse(res.data.ybt);
            this.answer = data;
            this.get_data();
          }
        })
      },
      get_data(){
        //为答案赋值
        //遍历问题
        for (let [index, elem] of this.question.entries()) {
          index==0?elem.answer=this.answer.ybt_problem1:
          index==1?elem.answer=this.answer.ybt_problem2:
          index==2?elem.answer=this.answer.ybt_problem3:
          elem.answer=this.answer.ybt_problem4;
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
          if(elem.answer.value==(elem.options.length)&&elem.answer.otherAdvise==''&&index!=2){
            popalert.fade('请您填写您的不同意见');
            return;
          }else if(index==2){
            if(elem.answer.value[8]==true&&elem.answer.otherAdvise==''){
              popalert.fade('请您填写您的不同意见');
              return;
            }
          }

          index==0?this.answer.ybt_problem1=elem.answer:index==1?this.answer.ybt_problem2=elem.answer:index==2?this.answer.ybt_problem3=elem.answer:this.answer.ybt_problem4=elem.answer;
        }
        let data = this.answer;
        let pass=true;
        for(let i in data){//检查空项
          if(i!='ybt_problem3'){
            if(data[i].value==''){
              pass = false;
              popalert.fade('您的问卷有未选择项');
              break;
            }
          }else{//判断多选题是否为三个答案
            let correctNum=0;
            for (let elem of data[i].value.values()) {
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
  background: url('../assets/img/ybt_intro_bg.png') no-repeat top center; background-size: 100%;position: relative;padding-bottom: 1.95rem;padding-top: 13.5rem;
  div.banner{
    // background: url('../assets/img/qbanner.png') no-repeat center center; background-size: 100%;height:17.5em;
  }
  div.mask{position: fixed;top: 0;left: 0;width: 100%;height: 100%;z-index: 999;}
  img{width: 100%;}
  a{
    &.btn{
      display: block;margin:0 20%;width: 60%;background: url('../assets/img/ybt_qustion_btn.png') no-repeat center center; background-size: 100%;height:3em;text-align:center;margin-top: 4.25rem;
    }
  }
  div.add_info{
    width:90%;background: transparent;padding:0 .5em;border-radius:4px;position: relative;margin-left: 5%;margin-bottom: 3%;
    h2{
      font-size: 1.1em;font-weight:bold;color: @deepRed;margin:.8em 0 ;position:relative;padding-left: 1.6em;
      &.title{
        font-size: 1.2em;line-height: 1.5;
      }
      span{
        width:1.3em;height:1.3em;position:absolute;top:0em;left:0em;background:@deepRed;border-radius:50%;color:#fff;text-align:center;line-height:1.3;font-weight:normal;
      }
    }
    p{
      color:@deepRed;font-size:.9em;padding-left: 1.4em;
    }

    h1{
      padding:  0 0 1em;line-height: 1.7;
    }
    .hxradio{
      display: block;color:@deepRed;
      .advise{
        position:absolute;top:0;left:8rem;height:1.5rem;outline:none;background:@lightGreen;border:none;margin-top:-.1em;text-align:center;color:#fff;display:block;
      }
     .advise::-webkit-input-placeholder{
            color:#fff;
        }
       .advise::-moz-placeholder{   /* Mozilla Firefox 19+ */
            color:#fff;
        }
       .advise:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
            color:#fff;
        }
       .advise:-ms-input-placeholder{  /* Internet Explorer 10-11 */ 
            color:#fff;
        }
      label{
        position:relative;
        margin-bottom:.9em;padding-left:1.3em;
        display:block;
        &:last-child{
          margin-right: 0;width:40%;
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
        &+em{
          position:absolute;top:.1em;left:0;
        }
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
