<template>
	<div class="container">
		<div class="con">
			<div class="top"></div>
			<div class="middle">
				<h2>被保险人：{{info.name}}</h2>


				<ul>
					<li class="title">
						<span>交费期间</span>
						<span>保险金额</span>
						<span>保障期间</span>
						<span>首年保金</span>
					</li>
					<li>
						<span>{{info.payment}}年</span>
						<span>{{info.coverage}}</span>
						<span>终身</span>
						<span>{{info.totalPrem}}</span>
					</li>
				</ul>


				<ul>
					<li class="title">
						<span>投保险种</span>
						<span>保险金额</span>
						<span>交费期间</span>
						<span>首年保金</span>
					</li>
					<li>
						<span>新常青树</span>
						<span>{{info.coverage}}</span>
						<span>{{info.payment}}年</span>
						<span>{{info.cqsPrem}}</span>
					</li>
					<li>
						<span>新医保通</span>
						<span>-</span>
						<span>1年</span>
						<span>{{info.ybtPrem}}</span>
					</li>
				</ul>


			<h3 class="ptitle"><i></i>新常青树</h3>
			<ol>
				<li>
					<h3><span>◆</span>100种重疾保障 <b>{{info.coverage/10000}}</b> 万元/次，最高可达 <b>{{info.coverage/10000*6}}</b> 万元</h3>
                	<p>重疾分六组，每组赔一次；癌症单独分组，更加贴心。</p>
				</li>
				<li>
					<h3><span>◆</span>20种中症保障 <b>{{info.coverage*0.5}}</b> 元/次，最高可达 <b>{{info.coverage}}</b> 元</h3>
                	<p>最高二次赔付，重疾保障继续有效</p>
				</li>
				<li>
					<h3><span>◆</span>35种轻症保障 <b>{{info.coverage*0.3}}</b> 元/次，最高可达 <b>{{info.coverage*0.3*3}}</b> 元</h3>
                	<p>最高三次赔付，重疾保障继续有效，早发现早治疗</p>
				</li>
				<li>
					<h3><span>◆</span>疾病终末期保障 <b>{{info.coverage/10000}}</b> 万元/已交保费/现价较大者</h3>
                	<p>等待期内给付已交保费；18周岁前，给付2倍已交保费</p>
				</li>
				<li>
					<h3><span>◆</span>不幸身故或全残，给付 <b>{{info.coverage/10000}}</b> 万元/已交保费/现价较大者</h3>
                	<p>等待期内给付已交保费；18周岁前，给付2倍已交保费</p>
				</li>
				<li>
					<h3><span>◆</span>被保险人罹患重疾/中症/轻症，免交后期保费，养病可安心</h3>
                	<p>人性化设计，免除后顾之忧</p>
				</li>
			</ol>

			<h3 class="ptitle"><i></i>新医保通</h3>
			<ol>
				<li>
					<h3><span>◆</span>极致额度</h3>
                	<p>每年拥有高达 <b>{{info.hasflz=="Y"?500:400}}</b> 万元的医疗保障额度</p>
                	<p>一般医疗 <b>200</b> 万元，每年免赔额1万（若不出险，每2年降低1000免赔额）</p>
					<p>100种重疾医疗 <b>200</b> 万元，0元免赔</p>
					<p v-if="info.hasflz=='Y'">质子重离子医疗 <b>100</b> 万元</p>
					<p>100%报销，有无医保均可享（有医保但未经医保报销：60%）</p>
				</li>
				<li>
					<h3><span>◆</span>全面保障</h3>
					<p>住院医疗全面覆盖</p>
					<p>床位费、膳食费、重症监护室床位费、药品费、护理费、手术费等</p>
				</li>
				<li>
					<h3><span>◆</span>一生守护</h3>
					<p>出生且出院满28天即可投保</p>
					<p>最高投保年龄达65岁</p>
					<p>10年保证续保，满期续保免审核</p>
				</li>
			</ol>
			</div>
			<div class="bottom"></div>
		</div>
		<div class="btn" @click="submitInfo" v-if="!showBtn">
        
      </div>
	</div>
</template>

<script>
	export default{
		name:'planbook',
		data(){
			return {
				info:'',
			}
		},
		mounted(){
			let data = {
				salesmanId:this.$route.params.salesmanid,
				codeId:this.$route.params.luck_code
			}

			ax('findPlan.do',data,true).then(res=>{
				this.info = res.data.text;
			})
		},
		computed:{
			showBtn(){
				return rq()&&rq().from=='rank';
			}
		},
		watch:{},
		methods:{
			submitInfo(){
				this.$router.push(`/index?codeId=${this.$route.params.luck_code}&sourceFrom=online&salesmanId=${this.$route.params.salesmanid}&product_type=ncqs`)
			}
		},
	}
</script>

<style lang='less' scoped>
@import url(../assets/css/main.less);

@mainGreen:#1a9731;
@bgGray:#1a9731;
div.container{
  background: url('../assets/img/new/newBg.png')  center top; background-size: 100%;position: relative;padding-top: 4em;min-height: 100vh;padding-bottom:2em;
  div.con{
    width: 90%;margin-left: 5%;

    div.top{
      background:url('../assets/img/new/n_plant.png') no-repeat center 100%;background-size:100%;height: 6em;position:relative;top:1px;
    }
    div.bottom{
      background:url('../assets/img/new/n_bgb.png') no-repeat center 0;background-size:100%;height: 4em;position:relative;top:-1px;
    }
    div.middle{
      background:url('../assets/img/new/n_bgs.png')  center 0;background-size:100%;position:relative;
      padding:.5em 10% 0;

      h2{
      	font-size:1.3em;color:#c63e42;text-align: right;
      }

	  ul{
	  	border:1px solid #666;border-radius:8px;margin-top: 1.5em;
	  	li{
	  		height:3em;line-height:3;border-top:1px solid #666;background:#d8e58d;
	  		span{
	  			display:inline-block;width:23.5%;text-align:center;
	  			border-right: 1px solid #666;
	  			&:last-child{
	  				border:none;
	  			}
	  		}
	  		&.title{
	  			background:#1a9731;color:#fff;border:none;
	  		}
	  	}
	  }


	  h3.ptitle{
	  	font-size:1.2em;font-weight:bold;margin:1em 0;padding-left:1.25em;position:relative;
		i{
			width:1.5em;height:1.5em;background:url('../assets/img/new/n_nocheck.png') no-repeat center center;background-size:100%;position:absolute;left:-.2em;top:-.2em;
		}
	  }

	  ol{
        li{position: relative;padding-left: 1.6em;
            &.title{
                padding-left: 0;height: 2em;line-height: 2em;font-weight: bold;color: @black;position: relative;border-bottom: 1px solid @bgGray;
                span{font-size: .6em;height: 1.3em;line-height: 1.2em;background: @mainGreen;color: #fff;border-radius:2em;font-weight: normal;padding: 0 1em;position: absolute;top: 50%;right: .5em;transform:translateY(-50%);}
            }
            margin-bottom: .5em;
            h3{
                color: @black;font-weight: bold;
                b{color: @mainGreen;}
                span{font-size: 1em;color: @mainGreen;position: absolute;left: 0;}
            }
            &:last-child{margin-bottom: 0;padding-bottom: .5em;}
        }
      }


    }
  }


  .btn{
    width:72%;height:2.5em;margin: 0 auto;background:url('../assets/img/new/n_btn2.png') no-repeat center center ;background-size:100%;margin-top:2em;
    -webkit-box-shadow: 0 0 5px #000;
  -moz-box-shadow: 0 0 5px #000;
  box-shadow: 0 0 5px #000;
  position:relative;z-index:101;

  }
}

</style>
