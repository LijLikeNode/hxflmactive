// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import "babel-polyfill";
// require('./assets/util/vconsole.js');
// import './assets/js/polyfill.min.js';
import Vue from 'vue';
import App from './App';
import router from './router';
import $ from 'jquery';
import common from './ajaxrequest/common'
import ax from './ajaxrequest/ajaxPromise';
import {hxajax} from './ajaxrequest/jqueryAjax';
import rq from './ajaxrequest/requesthash';
import listener from './listener/listion';
import rt from './rotate/rotate';
import pop from './popalert/popalert';
import {Row,Col,Loading} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/js/noshare';
import './assets/js/weChat_share.js';


Vue.use(Row);
Vue.use(Col);
Vue.use(Loading);
Vue.config.productionTip = false;


// console.log(vConsole)
window.$ = $;
window.ax = ax;
window.jqax = hxajax;
window.rq = rq;
window.common = common;
window.rotate = rt;
window.popalert = pop;
window.listener = listener;
/* eslint-disable no-new */

listener.back();
const historyStack = {
    data: {
        history: [],
        forward: true
    },
    watch: {
        '$route' (to, from) {
            document.title=to.meta.txt;
            if(this.history.length > 0 && to.path == this.history[this.history.length - 1]){
                this.forward = false;
                this.history.pop();
            }else{
                this.forward = true;
                this.history.push(from.path);
            }
        }
    }
};


new Vue({
  el: '#app',
  router,
  mixins: [historyStack],
  template: '<App :forward="forward"/>',
  components: { App }
})
