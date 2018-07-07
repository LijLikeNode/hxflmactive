<template>
    <div class="container page">
      <div> 
        <!-- <single-select class="inputs" :opts="selectList" v-model="seText" @change="choosePayment"></single-select> -->
      </div>
      <div class="add_info">
        <b></b>
        <el-row type="flex" class="row-bg">
          <el-col :span="5"><div class="grid-content bg-purple title">姓名</div></el-col>
          <el-col :span="7"><div class="grid-content bg-purple-light title">手机号</div></el-col>
          <el-col :span="7"><div class="grid-content bg-purple title">中奖日期</div></el-col>
          <el-col :span="5"><div class="grid-content bg-purple-light title">中奖等级</div></el-col>
        </el-row>
        <div class='content'>
          <el-row v-for="(v,i) in rank_data" type="flex" :class="['row-bg','extend',{'ybt':v.product_type=='ybt'}]" :key="i">
            <el-col :span="5" class="name"><div class="grid-content bg-purple name"  @click="review_ask(v.source,v.luck_code,v.salesmanCode,v.product_type)"><a :class="[{'icon':v.source=='online'}]"></a>{{v.name}}</div></el-col>
            <el-col :span="7"><div class="grid-content bg-purple-light">{{v.phone}}</div></el-col>
            <el-col :span="7"><div class="grid-content bg-purple">{{v.tTime}}</div></el-col>
            <el-col :span="5"><div class="grid-content bg-purple-light">{{v.luckLevel}}</div></el-col>
          </el-row>
          <p v-if="has_more"><i @click="get_items">点击加载更多</i></p>
        </div>
        
      </div>
    </div>
  
</template>
<script>
import SingleSelect from '@/pluginCom/SingleSelect';
export default {
    name: 'rank',
    data(){
      return {
        salesmanId:'',
        rank_data:[],
        current_page:1,
        has_more:false,
        seText:'产品评鉴',
        selectList:[{name:'产品评鉴'},{name:'保障体验'}],
        type:'ncqs',
      }
    },
    components:{SingleSelect},
    mounted(){
      common.noShare();
      this.salesmanId = this.$route.params.id||rq().userid;
      // this.salesmanId = rq()?rq().salesmanId:'';
      this.get_items();
    },
    watch:{
      seText(newVal){
        // this.type = newVal=='产品评鉴'?'':'ncqs';
        // this.current_page = 1;
        // this.rank_data = [];
        // this.get_items();
      }
    },
    methods:{
      choosePayment(val){
          this.seText = val;
      },
      get_items(){//请求排行榜信息
        ax('rankingGrade.do',{'salesmanId':this.salesmanId,'type':this.type,page:this.current_page,rows:10},true).then(response=>{
            this.rank_data.push(...response.data);
            this.has_more = (response.status=='yes');
        });
        // jqax('rankingGrade.do',{'salesmanId':this.salesmanId,'type':'time',page:this.current_page,rows:10},data=>{
        //     alert(data)
        // });
        this.current_page+=1;
      },
      review_ask(source,luckCode,salesmanId,productType){
        if(source=='online'){
          productType=='flm'?this.$router.push(`/question/${salesmanId}?luckCode=${luckCode}`):productType=='ncqs'?this.$router.push(`/planbook/${salesmanId}/${luckCode}?from=rank`):this.$router.push(`/ybtquestion/${salesmanId}?luckCode=${luckCode}`);
        }
      }
    }
}
</script>

<style lang='less' scoped>
@import url(../assets/css/main.less);
div.container{
  background: url(../assets/img/bg3.png) center top; background-size: 100%;
  div.add_info{
     position: absolute;top:15%;width:90%;left: 5%;padding:3.2em 1em .1em;height: 70%;margin-top: 10%;background: #fff;border-radius: 8px;
    .content{
      overflow: scroll;height: 95%;position: relative;
      a{
        width: 1.2em;height: 1em; display: inline-block;vertical-align: middle;
        &.icon{
          background:url('../assets/img/online.png') no-repeat top center;background-size: 100%;
        }
      }
     }
    .row-bg{
      .grid-content{
        text-align: center;font-size:1em;
        // color:rgb(82,158,42);
        &.title{
          font-size:1.2em;color:rgb(141,209,105);
        }
        &.ybt{
          color:@deepRed;
        }
      }
      &.extend{
        padding:.8em 0;color:rgb(82,158,42);
        border-bottom:1px solid #eee;
        &.ybt{
          color:#3333bc;
        }
      }
    }
    p{
      text-align: center;margin-top: .8em;
      i{
        display: inline-block;padding:.5em 1em ;color: #529e2a;text-decoration: underline;
      }
    }
    b{
      position:absolute;top:-1.5em;left:1em;width:8em;height:4em;background:url('../assets/img/arrow3.png') no-repeat center center;background-size:100%;
    }
  }
  div.name{text-align: left !important;}
  .inputs{
    width:10em;
    border:1px solid #000;
    line-height:1.8;
    border-radius:3px;padding-left:2em;padding-bottom:.5em;
    margin:0 auto;
    margin-top:3em;
    -webkit-box-shadow: 0 0 .2em #000;
     -moz-box-shadow: 0 0 .2em #000;
     box-shadow: 0 0 .2em #000;
    &.singleselect{
      b{
        top:2em;
      }
    }
    
  }
}

</style>
