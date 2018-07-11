<template>
    <div class="container page activities-wrap">
        <div class="activities-headImg">
            <img src="../assets/img/yxhd_bg.png" alt="营销头部">
        </div>
        <div class="activities-contnet">
            <div class="prize-center">活动简介</div>
            <p>
                为推广市场上最具竞争力的年金产品：华夏福临门（少儿版），活动期间，凡听取华夏寿险顾问介绍华夏福临门（少儿版）年金产品，并填写评鉴问卷的尊贵客户，可获得抽奖一次。感谢您的支持，让我们做的更好。
            </p>
            <div class="prize-alls prize-center">奖品设置</div>
            <p v-for="(v,i) in workcodes" :key="i" class="prize-list">
                <span>{{v.name}}</span>
                <span>{{v.text}}</span>
                <span>{{v.num}}</span>
            </p>
            <p class="cont-cqs">常青树，是华夏保险推出的产品性价比市场领先的终身型重大疾病保险;医保通，是华夏保险推出的“低保费高保障”的医疗险。</p>
            <p>华夏常青树+医保通，是最体现客户利益至上的重疾险组合，为客户提供最好的家庭健康防护网。</p>
            <!-- <img src="../assets/img/ybt_ms_02.png" alt=""> -->
            <img src="../assets/img/cqs_dbb.png" alt="">
            <ul>
                <li>
                    <h6>特色一：常青树可赔付7.9倍，是前所未有的突破</h6>
                    <p>华夏常青树（多倍版）重大疾病保险，将重疾分为6组，每组可赔付1次，其中癌症单分1组，更加贴心；同时增加中症赔付，可赔付保额的50%，累计可赔付2次；罹患轻症，可赔付保额的30%，累计可赔付3次。累计7.9倍的赔付，一旦拥有，再无后顾之忧。(新农合、城镇医保、大学生医保都属医保)，免赔额外100%给付。</p>
                </li>
                <li>
                    <h6>特色二：常青树是保障范围更广的产品之一</h6>
                    <p>华夏常青树（多倍版）重大疾病保险保障全面，再创病种数量新纪录。身故、全残、100种重疾、20种中症、35种轻症保障至终身，同时包括疾病终末期给付，这些都是为提升客户体验而增加的保障。同时，其保费豁免责任更显产品设计的人性化：重疾、中症、轻症都可豁免保费。保费豁免，合同继续有效。</p>
                </li>
                <li>
                    <h6>特色三：常青树是行业更具性价比的重疾险之一</h6>
                    <p>华夏常青树（多倍版）重大疾病保险是行业内保费实惠的产品之一。自2014年第一次推出，截至2018年6月份，常青树系列产品已经给超过200万个客户带来保障，累计保额超6000亿元！</p>
                </li>
            </ul>
            <img src="../assets/img/cqs_ybt.png" alt="">
            <ul>
                <li>
                    <h6>特色一：保障齐全，有无医保均可享</h6>
                    <p>华夏常青树（多倍版）重大疾病保险，将重疾分为6组，每组可赔付1次，其中癌症单分1组，更加贴心；同时增加中症赔付，可赔付保额的50%，累计可赔付2次；罹患轻症，可赔付保额的30%，累计可赔付3次。累计7.9倍的赔付，一旦拥有，再无后顾之忧。(新农合、城镇医保、大学生医保都属医保)，免赔额外100%给付。</p>
                </li>
                <li>
                    <h6>特色二：保障额度高，百种重疾0免赔</h6>
                    <p>每年拥有高达500万元的医疗保障额度，其中一般医疗200万元、100种重疾医疗200万元、附加质子重离子医疗100万元。且100种重疾0元免赔。</p>
                </li>
                <li>
                    <h6>特色三：人性化，多款外购靶向药免费用</h6>
                    <p>被保险人可凭医院处方，并且通过第三方合作机构的审核后，可到指定药房免费获得部分靶向类药品（或预约送药上门服务）。</p>
                </li>
                <li>
                    <h6>特色四：附加质子重离子治疗，彰显尊贵</h6>
                    <p>附加质子重离子治疗，每年最高100万保障额度，零免赔。</p>
                </li>
                <li>
                    <h6>特色五：10年保证续保，满期续保免审核</h6>
                    <p>10年保证续保，保证续保期间不因健康状况、历史赔付、产品停售而拒保，且费率不受产品整体费率调整影响。在10年期间届满时，同样不因被保险人的健康状况或历史理赔情况而拒绝投保人的续保申请。</p>
                </li>
                <li>
                    <h6>特色六：保费低廉，保障轻松享</h6>
                    <p>不分性别，费率低廉，如30岁333元年，40岁4075/年。</p>
                </li>
            </ul>
            <div class="user_case_btn" @click="user_case" >
                客户理赔案例
            </div>
            <!-- <p>2016年末，小李爸爸为2岁的儿子购买了金牌产品组合常青树+医保通，首年保费5676元。2017年4月，宝宝因发烧到医院检查，被诊断为“急性淋巴细胞白血病”，确诊重疾后，公司依照常青树重大疾病险保险责任，<b>赔付了50万元</b> 。</p>
            <img src="../assets/img/yx_an1_05.png" alt="">
            <p>治疗一直在持续，在扣除年度免赔额后，剩余自负部分，公司依照医保通产品责任进行了理赔，在医保通的一个保单年度内共赔付了10次,<b>合计赔付184271.4元</b>。</p>
            <img src="../assets/img/yx_an2_05.png" alt="">
            <p>2017年末，医保通自动续保成功。目前治疗仍在继续，后续的治疗我们依然承担责任。持续的保障将为小李带来全面呵护.使李爸爸后顾无忧。</p>
            <img src="../assets/img/yx_an3.png" alt=""> -->
            <h6 class="activities-explain">
                <img src="../assets/img/yx_sm_05.png" alt="">    
                <span>说明</span>
            </h6>
            <div>1.本文中的常青树是指:目前在售的华夏常青树重大疾病系列保险产品;案例中的常青树是指华夏常青树重大疾病保险(全能版)。</div>
            <div>2.本资料仅供参考，具体的保险责任、责任免除等事项以我司华夏常青树重大疾病保险系列产品条款和《华夏医保通(2.0版)医疗保险条款》及生效保险合同为准。</div>
            <div class="activities-yqbtn" @click="salesman_click" v-show="isUser">
                <!-- <img src="../assets/img/yx_yqlh_05.png" alt=""> -->
                <p>邀请客户参与定制</p>
            </div>
        </div>
        <div class="activities-foot">
            <span @click="state_btn">设计体验</span>
            <span>心动购买</span>
        </div>
        <div class="guide_mask" v-show="guide" @click="salesman_btn">
            <div></div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'activities',
    data(){
      return {
        guide:false,
        isUser: true,
        // workcode:{
        //   '特等奖':'Apple iMac 21.5英寸一体机',
        //   '一等奖':'iPhone X 手机（256G）',
        //   '二等奖':'iPad mini 平板电脑（128G WLAN）',
        //   '三等奖':'家用儿童紧急医药包',
        //   '四等奖':'华夏精品活动参与卡',
        // },
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
    mounted(){
        if (rq().is_user && rq().is_user == '1') {
            this.isUser = false;
        }
        doShare("","家庭保障DIY体验：百万保额您来设计！","设计保障，抽取大奖，您也可以成为专业的保险师！","http://zmt.ihxlife.com/tenyears2/#/activities?is_user=1&userid="+ rq().userid +"",'http://zmt.ihxlife.com/tenyears/ybt.png');        
    },
    methods:{
      salesman_click(){
        this.guide = true;　　　　　　　　　　
      },
      salesman_btn() {
          this.guide = false;
      },
      state_btn () {
          this.$router.push(`/forecastybt?salesmanId=${rq().userid || ''}`);
        //   http://zmt.ihxlife.com/tenyears2/#/forecastybt?salesmanId=110001793
      },
      user_case () {
          this.$router.push(`/usercase?salesmanId=${rq().userid || ''}`);
      }
    }
}
</script>

<style lang='less' scoped>
@import url(../assets/css/main.less);
.container{
    padding-bottom:5em;
}
.activities-wrap{
    background: #F9F4E0;
    font-size: 1.2em;
    color: #514742;
    line-height: 1.3em;
    
}
.user_case_btn{
    text-align: center;
    text-decoration: underline;
    color: #B81119;
    font-size: 1.2em;
    border: none;
    margin: .6em 0;
}
img{ pointer-events: none; }
.activities-headImg{
    width: 100%;
    img{
        width: 100%;
        height: auto;
    }
}
.activities-contnet{
    padding:.2em 0.7em;
    margin-bottom: 5em;
    width: 100%;
    &>img{
        width: 90%;

        margin: 0.8em 5%;
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
    .activities-yqbtn{
        width:80%;margin: 0 auto;background:#1a9731;margin-top:1em;text-align:center;color:#fff;padding:.1em 0 .3em 0 ;
        left:50%;transform:translateX(-50%);
        p{
          border-top:1px solid #fff;
          border-bottom:1px solid #fff;
          padding:.2em 0;
        }
        -webkit-box-shadow: 0 0 5px #000;
        -moz-box-shadow: 0 0 5px #000;
        box-shadow: 0 0 5px #000;
        position:fixed;bottom:5em;
    }
    .prize-list{
        text-indent: .8em;
        span{
            &:nth-child(2){
                width: 13.7em;
                display: inline-block;
            }
            &:last-child{
                color: #B81119;
                font-weight: bold;
                padding-left: 0.4em;
                text-align: right;
            }
        }
    }
    ul{
        li{
            h6{
                color: #1A9731;
                background: url('../assets/img/yx_list_03.png') no-repeat left;
                background-size: 1.2rem;
                font-weight: bold;
                padding-left: 1.5em;
                font-size: 1.05em;
                margin-top: 0.5em;
            }
            p{
                padding: 0 1.5em;
            }
        }
    }
    .activities-explain{
        color: #1A9731;
        font-weight: bold;
        img{
            width: 1em;
        }
       
    }
    &>div{
        margin-top: 0.3em;
        padding: 0.1em;
    }
    .prize-alls,.cont-cqs{
        margin-top: 1.2em;
    }
    .cont-cqs{
        border-top: 2px dashed grey;
        padding-top: .5em;
    }
    .prize-center{
        text-align: center;
        font-size: 1.2em;
        font-weight: bold;
    }
}
.activities-foot{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    height: 3.5em;
    color: #fff;
    span{
        width: 50%;
        cursor: pointer;
        font-size: 1em;
        line-height: 3.5em;
        text-align: center;
       
        &:first-child{
            background: #B81119;
        }
        &:last-child{
            background: #1A4064;
        }
    }
}
div.guide_mask{
    position: fixed;top: 0;left: 0;width: 100%;height: 90%;background: url('../assets/img/guide1.png') no-repeat center center ; background-size: 100% 100%;
    // position: fixed;top: 0;left: 0;width: 100%;height: 100%;
    div{
        background: rgba(0,0,0,.4);
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height: 10%;
        z-index: 22;
    }
  }
</style>
