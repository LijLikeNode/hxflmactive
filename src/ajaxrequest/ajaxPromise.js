// import axios from 'axios';
// // 参数为地址，参数，遮罩
// const ax = (url,para,mask) => {
//     if(mask) window.popalert.waitstart();
    // let param={...para};
//     let baseURL='/star/'+'feedback/dial/';
//     return axios({
//         baseURL:baseURL,
//         method:para.axType || 'post',
//         url:url,
//         data:para.axType!=='get' ? param : null,
//         params:para.axType==='get' ? param : null,
//         // responseType:'json',
//         // timeout: 1000,
//         // withCredentials: true,  // 带cookie
//         // headers: {openId:88888888,userId:88888888}
//     })
//     .then(function (response) {
//         // console.log(response.data);
//         // if(!!callback) callback(response.data);
//         if(mask) window.popalert.waitend();
//         return response.data;
//     })
//     .catch(function (error) {
//         console.log(error);
//         if(mask){
//             window.popalert.waitend();
//             setTimeout(()=>{
//                 window.popalert.fade('网络错误，请稍后重试');
//             },500);
//         }
//         else window.popalert.fade('网络错误，请稍后重试');
//     });
// };

// export default ax;

import axios from 'axios';
// 参数为地址，参数，回调，遮罩，消息，同步 ----- 其中回调为数组时，第一个为成功，第二个为完成，错误采用统一方法

// const baseURL = 'http://test.hxlife.com/csf/feedback/dial/'
const baseURL = 'http://zmt.ihxlife.com/fb/dial/'

const ax =async (url,para,mask) => {
    if(mask) window.popalert.waitstart();
    
    // let baseURL='/star/'+'feedback/dial/';
    // let baseURL='/star/';

    let param = new URLSearchParams();
    for(let i in para){
        param.append(i,para[i]);
    }
    return axios({
        baseURL:baseURL,
        method:para.axType || 'post',
        url:url,
        data:para.axType!=='get' ? param : null,
        params:para.axType==='get' ? param : null,
        // responseType:'json',
        // timeout: 1000,
        // withCredentials: true,  // 带cookie
    })
    .then(function (response) {
        // console.log(response.data);
        // if(!!callback) callback(response.data);
        // if(mask) window.popalert.waitend();
        return response.data;
    })
    .catch(function (error) {
        // console.log(error);
        // if(mask){
        //     window.popalert.waitend();
        //     setTimeout(()=>{
        //         // window.popalert.fade('网络错误，请稍后重试');
        //     },500);
        // }
        // else window.popalert.fade('网络错误，请稍后重试');
    });
};

export default ax;