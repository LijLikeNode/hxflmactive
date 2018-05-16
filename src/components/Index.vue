<template>
  <div class="container page" v-loading='loading' 
    element-loading-text="正在提交，请稍等"
    element-loading-background="rgba(0, 0, 0, 0.8)">
    <div class="add_info">
      <b></b>
      <ul>
        <li><input type="text" v-model="name" placeholder="请输入姓名（必填）"></li>
        <li><input type="number" v-model="phone" placeholder="请输入电话（必填）"></li>
        <li><input type="number" v-model="identifycode" placeholder="请输入验证码（必填）"><span :class="count !== ''? 'nomal': ''" @touchstart="send_code($event)"><b v-html="countHtml"></b></span></li>
        <li><input type="text" v-model="workcode" :readonly="source=='online'" placeholder="请输入寿险顾问工号（必填）"></li>
        <li><h3 class="submit_btn" @click="submit"></h3></li>
      </ul>
    </div>
  </div>
</template>
<script>
//source;//客户来源 online：线上 offline：线下
export default {
    name: 'index',
    data(){
      return {
        name:'',
        phone:'',
        identifycode:'',
        workcode:'',
        codeId:'',
        count:'',
        loading:false,
        countHtml: '发送<br/>验证码',
        source:''
      }
    },
    created(){
      this.codeId = rq()&&rq().codeId?rq().codeId:'';
      this.source = rq()&&rq().sourceFrom?'online':'offline';
      this.workcode = rq()&&rq().salesmanId?rq().salesmanId:'';
    },
    mounted(){
      common.noShare();
    },
    computed:{
      nomal(){
        return (this.count=='')
      }
    },
    methods:{
      send_code(){//发送短信验证码
        if(this.count==''){
          if(this.check_phone_format()){
            ax('sendVercode.do',{'phone':this.phone}).then((response)=>{
              if(response.result && response.result == 'succ'){
                this.count_down();
              }
              popalert.fade(response.msg)
            });
          };
        }
      },
      count_down(e){//倒计时
        this.count = 60;
        this.countHtml = `60`
        let timer = setInterval(()=>{
          if(this.count!=1) {
            this.count--;
            this.countHtml = `${this.count}`
          }else{
            clearInterval(timer);
            this.count = '';
            this.countHtml = '发送<br/>验证码'
          } 
        },1000);
      },
      check_empty(){//查空
        let pass = (this.name!=''&&this.sex!=''&&this.identifycode!=''&&this.workcode!='');
        if(!pass){
          popalert.fade('请您完善回执信息');
        }
        return pass;
      },
      check_format(){//检查格式
        //1.姓名格式
        //2.电话号码格式
        //3.短信验证码
        //4.工号
        if(this.check_name_format()){
          if(this.check_phone_format()){
            return true;
          }
        }
      },
      check_name_format(){
        let pass = /^[\u4E00-\u9FA5A-Za-z]+$/.test(this.name);
        !pass?popalert.fade('请输入汉字或英文姓名'):'';
        return pass;
      },
      check_phone_format(){
        let pass = /^1[345789][0-9]{9}$/.test(this.phone);
        !pass?popalert.fade('请输入正确的手机号'):'';
        return pass;
      },
      check_indentifycode_format(){

      },
      submit(){
        if(this.check_empty()){
          if(this.check_format()){
            this.loading = true;
            ax('submitInfo.do',{'name':this.name,'phone':this.phone,'code':this.identifycode,'salesmanId':this.workcode,'codeId':this.codeId,'source':this.source}).then(response=>{
              // console.log(response);
              this.loading = false;
              if(response.result=='succ'){
                sessionStorage.name = this.name;
                sessionStorage.phone = this.phone;
                this.$router.push(`/present/${this.codeId}`)
              }else{
                this.loading = false;
                popalert.fade(response.msg);
              }
              // response.result=='succ'?this.$router.push(`/present/${this.codeId}`):popalert.fade(response.msg);
            })
          }
          // this.check_format()?ax('submitInfo.do',{'name':this.name,'phone':this.phone,'code':this.identifycode,'salesmanId':this.workcode,'codeId':this.codeId}).then(response=>{
          //   // console.log(response);
          //   if(response.result=='succ'){
          //     sessionStorage.name = this.name;
          //     sessionStorage.phone = this.phone;
          //     this.$router.push(`/present/${this.codeId}`)
          //   }else{
          //     popalert.fade(response.msg);
          //   }
          //   // response.result=='succ'?this.$router.push(`/present/${this.codeId}`):popalert.fade(response.msg);
          // }):'';
        }
      }
    }
}
</script>

<style lang='less' scoped>
@import url(../assets/css/main.less);
div.container{
  background: url(../assets/img/bg.png) no-repeat center center; background-size:cover;
  div.add_info{
     position: absolute;bottom: 3em;width:90%;left: 5%;background: #fff;box-shadow: 0px 0px 20px 0px rgba(175,250,108,0.5);padding:3.5em 2em 1.5em;border-radius:10px;
    ul{
      li{
        height:3.3em;font-size: 1.3em;
        h3{
          background:url(../assets/img/confirm.png) no-repeat center center;background-size:100%;height:100%;
        }
      }
      li:not(:last-child){
        background:#def8e5;border-radius: 50px;height:2em;margin-bottom: 1.5em;position:relative;
        input{
          background:none;border:none;outline: none;display:block;width:100%;text-align: center;line-height:2;color:#999;
          // color:#3fb600;
        }
        input::-webkit-input-placeholder{
            color:#3fb600;
        }
        input::-moz-placeholder{   /* Mozilla Firefox 19+ */
            color:#3fb600;
        }
        input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
            color:#3fb600;
        }
        input:-ms-input-placeholder{  /* Internet Explorer 10-11 */ 
            color:#3fb600;
        }
        span{
          position:absolute;
          right: 0;
          top:0;
          height:100%;
          width:5.1em;
          color: #3fb600;
          text-align: center;
          border-radius:5px;
        }
      }
      li:nth-of-type(3){
        background: transparent;
        input,span{
          background:#def8e5; 
          border-radius: 50px;
        }
        input{
          width: 72%;
        }
        span{
          width: 26%;
          font-size: .6em;
          line-height: 1.5;
          &.nomal{
            line-height: 3;
          }
          b{
            width:100%;
            position: absolute;
            font-weight: normal;
            background: transparent;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-40%);
          }
        }
      }
    }
    b{
      position:absolute;top:-1.5em;left:1em;width:8em;height:4em;background:url(../assets/img/arrow.png) no-repeat center center;background-size:100%;
    }
  }
  
}

</style>