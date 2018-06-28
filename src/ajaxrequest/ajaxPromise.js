import axios from 'axios';
import Qs from 'qs';
// 参数为地址，参数，回调，遮罩，消息，同步 ----- 其中回调为数组时，第一个为成功，第二个为完成，错误采用统一方法
const baseURL = 'http://zmt.ihxlife.com/fb/dial/'
// const baseURL = 'http://zmt.ihxlife.com/fb1/dial/'
// let baseURL='/star/'+'feedback/dial/';
const ax =async (url,para,mask) => {
    if(mask) window.popalert.waitstart();
    let param = Qs.stringify(para);
    return axios({
        baseURL:baseURL,
        method:para.axType || 'post',
        url:url,
        data:para.axType!=='get' ? param : null
    })
    .then(function (response) {
        if(mask) window.popalert.waitend();
        return response.data;
    })
    .catch(function (error) {
        if(mask){
            window.popalert.waitend();
            setTimeout(()=>{
                window.popalert.fade('网络错误，请稍后重试');
            },500);
        }
    });
};

export default ax;