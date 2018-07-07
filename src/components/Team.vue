<template>
	<div class="container">
		
	<!-- 1.直辖区 -->
		<div class="district" v-if="dutyInfo.grade_id==4">
			<h3><span></span>直辖区</h3>
			<div class="block">
				<p>{{dutyInfo.name}}　　直辖部（{{dutyInfo.manager_grade_name}}）</p>
				<p>入职日期：{{dutyInfo.employ_date}}</p>
			</div>
		</div>



	<!-- 2.直辖部 -->
		<div class="district" v-if="dutyInfo.grade_id==3">
			<h3><span></span>直辖部</h3>
			<div class="block">
				<p>{{dutyInfo.name}}　　直辖组（{{dutyInfo.manager_grade_name}}）</p>
				<p>入职日期：{{dutyInfo.employ_date}}</p>
			</div>
		</div>




	<!-- 3.直辖组 -->
		<div class="district" v-if="dutyInfo.grade_id==2">
			<h3><span></span>直辖组</h3>
			<div class="block">
				<p>{{dutyInfo.name}}　　{{dutyInfo.grade_name}}</p>
				<p>入职日期：{{dutyInfo.employ_date}}</p>
			</div>
		</div>








		<div class="district">
			<h3><span></span>组员<b></b></h3>
			<div class="block">
				<h2>明细<b  :class="[{'active':watchGroup}]" @click="watchGroup=!watchGroup"></b><span class="num">{{this.groupList.length}}人</span></h2>
			</div>
			

			<div v-if="watchGroup">	
				<ul  class="total">
					<li class="title">
						<span>本月合计</span>
						<span>昨日合计</span>
					</li>
					<li>
						<span>{{total_month}}</span>
						<span>{{total_yesterday}}</span>
					</li>
				</ul>




				<ul>
					<li class="title">
						<span>姓名</span>
						<span>本月获客</span>
						<span>昨日获客</span>
					</li>
					<li v-for="(val,index) in showList" :key="index">
						<span>{{val.name}}</span>
						<span>{{val.monthCount}}</span>
						<span>{{val.yesterdayCount}}</span>
					</li>
				</ul>


				<p class="getMore" @click="showMore" v-show = "num!=groupList.length">点击加载更多</p>
			</div>
			

		</div>




	</div>
</template>

<script>
	export default{
		name:'team',
		data(){
			return {
				dutyInfo:{},
				watchGroup:false,
				groupList:[],
				num:10,
				total_yesterday:0,
				total_month:0,
			}
		},
		mounted(){
			this.getDutyInfo();

		},
		computed:{
			userid(){
				return rq().userid;
			},
			showList(){
				return this.groupList.slice(0,this.num);
			},
		},
		watch:{
			watchGroup(newVal){
				!newVal?this.num=10:'';
			}
		},
		methods:{
			//获取职务信息
			getDutyInfo(){
				ax('queryCustomer.do',{userid:this.userid}).then(res=>{
					this.dutyInfo = res;

					if(this.dutyInfo.grade_id==2){

						this.groupList = this.dutyInfo.list;	
						this.total_month = res.total_month;
						this.total_yesterday = res.total_yesterday;
						return;
					}




					if(this.groupList.length>0) return;
					this.getGroupInfo(this.dutyInfo.agent_code,this.dutyInfo.agent_group);
				});
			},
			//获取组员信息
			getGroupInfo(agent_code,agent_group){
				let data = {
					agent_code,
					agent_group
				}
				// ax('queryDeptCustomer.do',data).then(res=>{
				// 	console.log(res)
				// 	return ax('queryAddempCustomer.do',{agent_code})
				// }).then(res=>{
				// 	this.groupList = res.list;
				// });


				ax('queryAddempCustomer.do',{agent_code}).then(res=>{
					this.groupList = res.list;
					this.total_month = res.total_month;
					this.total_yesterday = res.total_yesterday;
				});
			},
			showMore(){
				this.num+=10;
				console.log(this.num)
				if(this.num >= this.groupList.length) this.num = this.groupList.length;
			},
		},
	}
</script>

<style lang='less' scoped>
@import url(../assets/css/main.less);
@color-red:#b91119;
@color-bg:#d8e48d;
@color-green:#1a9731;
div.container{
  background: url('../assets/img/new/n_teambg.png') center top; background-size:100%;position: relative;padding-top: 4em;min-height: 100vh;padding-bottom:2em;
  div.district{
  	h3{
  		font-size: 1.2em;color:@color-red;padding-left:1em;height:2em;line-height:2;font-weight:bold;padding-right: 1.5em;
		span{
			display:inline-block;width:1.2em;height:1.2em;background:url('../assets/img/new/n_red.png') no-repeat center center;background-size:100%;vertical-align:middle;margin-right:.5em;
		}
		b{float:right;}
  	}
	div.block{
		background:@color-bg;padding:1em 0 1em 2em;margin:1em 0;
		-webkit-box-shadow: 0 0 1em @color-bg;
		 -moz-box-shadow: 0 0 1em @color-bg;
		 box-shadow: 0 0 1em @color-bg;
		p{
			font-size:1.2em;line-height:1.5;
		}
		h2{
			font-size:1.2em;padding-right:1.5em;
			b{
				float:right;
				margin-top: -.5em;
				border-left:.6em solid transparent;
				border-right:.6em solid transparent;
				border-bottom:.8em solid @color-green;
				border-top:.8em solid transparent;
				// transition:all ease .2s;
				&.active{
					border-bottom:.8em solid transparent;
					border-top:.8em solid @color-green;
					
					margin-top: .4em;
				}
			}
			span{
				float:right;margin-right:.5em;
			}
		}
	}


	ul{
	  	border:1px solid #666;border-radius:8px;margin-top: 1.5em;width:90%;margin-left:5%;overflow:hidden;
	  	li{
	  		height:3em;line-height:3;border-top:1px solid #666;background:#d8e58d;
	  		span{
	  			display:inline-block;width:32%;text-align:center;
	  			border-right: 1px solid #666;
	  			&:last-child{
	  				border:none;
	  			}
	  		}
	  		&.title{
	  			background:#1a9731;color:#fff;border:none;
	  		}
	  	}
	  	&.total{
	  		span{
	  			width:49%;
	  		}
	  	}
	  }


	p.getMore{
		width:50%;text-decoration: underline;font-style: italic;color:@color-red;margin:0 auto;text-align:center;margin-top:1em;
	}


  }
}

</style>
