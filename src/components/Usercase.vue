<template>
    <div class="usercase-wrap">
        <div class="usercase-contnet">
            <img src="../assets/img/yx_khlpfa_02.png" alt="">
            <p>2016年末，小李爸爸为2岁的儿子购买了金牌产品组合常青树+医保通，首年保费5676元。2017年4月，宝宝因发烧到医院检查，被诊断为“急性淋巴细胞白血病”，确诊重疾后，公司依照常青树重大疾病险保险责任，<b>赔付了50万元</b> 。</p>
            <img src="../assets/img/yx_an1_05.png" alt="">
            <p>治疗一直在持续，在扣除年度免赔额后，剩余自负部分，公司依照医保通产品责任进行了理赔，在医保通的一个保单年度内共赔付了10次,<b>合计赔付184271.4元</b>。</p>
            <img src="../assets/img/yx_an2_05.png" alt="">
            <p>2017年末，医保通自动续保成功。目前治疗仍在继续，后续的治疗我们依然承担责任。持续的保障将为小李带来全面呵护.使李爸爸后顾无忧。</p>
            <img src="../assets/img/yx_an3.png" alt="">
        </div>
    </div>
</template>
<script>
export default {
    name: 'usercase',
    data(){
      return {
      }
    }
}
</script>

<style lang='less' scoped>
@import url(../assets/css/main.less);
.usercase-wrap{
    background: #F9F4E0;
    font-size: 1.2em;
    color: #514742;
    line-height: 1.3em;
}
img{ pointer-events: none; }
.usercase-contnet{
    padding:.2em 0.7em;
    margin-bottom: 1em;
    width: 100%;
    &>img{
        width: 100%;
        margin: 0.8em 0;
    }
    &>p{
        text-indent: 2em;
    }
    p{
        margin-top: 0.3em;
        b{
            color: #BC1E24;
        }
    }  
}
</style>
