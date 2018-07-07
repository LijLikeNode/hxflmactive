<template>
	<div class="singleselect">
		<input type="text" placeholder="请选择" :value="value" readonly="readonly" ref="ss" @input="$emit('input', $event.target.value)" name="msg_qxz"><b @click="showSelf"></b>
	</div>
</template>
<script>
export default {
	name: 'singleselect',
	data(){
		return {
			mpk:null
		};
	},
	props:['opts','value','title','canChoose'],
	watch:{
		opts(newVal,oldVal){
			// 更新滚轮
			let m=$(this.$refs.ss).data('mPicker').updateData(this.opts);
		}
	},
	mounted(){
		let fs=Math.ceil($(window).width()*0.037*2.4),el=$(this.$refs.ss),_this=this;
		// console.log(this.canChoose)
		if(this.canChoose!=true){
			// console.log(111111111)
			this.mpk=el.mPicker({
				level:1,
				dataJson:this.opts,
				// data1:this.opts,
				Linkage:false,
				rows:6,
				height: fs,
				idDefault:true,
				header:'<div class="mPicker-header">'+(_this.title || '请选择')+'</div>',
				confirm:function(){
					//console.log(el.data('value1'));
					_this.$emit('change',el.val(),el.data('value1'),el.data('id1'));
				},
				cancel:function(){
					//console.info($('.select-value3').data('id1'));
				}
			});
		}
		
		// console.log(el)
		let sty='<style id="mpickfix">body .mPicker-content li{line-height:'+fs+'px;}</style>';
    	if($('#mpickfix').length==0) $('head').append(sty);

		$('.mPicker-mask').off('click touchend').on('click touchend',function(){
			$(this).addClass('hide');
			$('.mPicker-main').addClass('down');
			setTimeout(()=>{
				$('.mPicker').addClass('hide');
			$('.mPicker-main').remove();
		},500);
		});
	},
	methods:{
		showSelf(){
			console.log(this.mpk)
			this.mpk.show();
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import url(../assets/css/main.less);
.singleselect{
	position: relative;
	input{
		width:100%;background: none;border:none;position:relative;z-index:2;
	}
	b{
		position:absolute;top:.8em;right:.6em;border:.4em solid transparent;border-top:.4em solid #1b9832;
	}
}
</style>
