const common = {};

common.noShare = ()=>{
	if (typeof WeixinJSBridge == "undefined"){
	  if( document.addEventListener ){
	      document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
	  }else if (document.attachEvent){
	      document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
	      document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
	  }
	}else{
	  onBridgeReady();
	}
}

export default common;