// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
// import Vuex from 'vuex'
import App from './App';
import router from './router';
import ax from './ajaxrequest/ajaxPromise';
import rq from './ajaxrequest/requesthash';
import rt from './rotate/rotate';
import pop from './popalert/popalert';
import {Row,Col,Loading} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/js/noshare'


Vue.use(Row);
Vue.use(Col);
Vue.use(Loading);

Vue.config.productionTip = false


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

window.ax = ax;
window.rq = rq;
window.rotate = rt;
window.popalert = pop;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
