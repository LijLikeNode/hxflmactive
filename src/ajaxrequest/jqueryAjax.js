const ajax = {};
export const hxajax = (url,para,callback,mask,msg,sync,errmsg)=>{
	let param={...para};
        // let baseUrl=document.location.protocol+'//'+document.domain+'/website/server/';
        // let baseUrl='/star/server/';
        let baseUrl='/star/feedback/dial/';

	// console.log(JSON.stringify(param));
    // alert(JSON.stringify(param));
    if(url.indexOf('http')!=0) url=baseUrl+url;
        $.ajax({
            async:!sync,
            type:'POST',
            url:url,
            cache:false,
            /*dataType:'jsonp',
            jsonp:'callbackparam',
            jsonpCallback:'success_jsonpCallback',*/
            data:param,
            // data:{content:encodeURIComponent(JSON.stringify(param)),uuid:md5},
            beforeSend(){
                // if(mask) popalert.waitstart();
            },
            success(data){
                // console.log(JSON.stringify(data));
                // _taq.push({convert_id:"77668073581", event_type:"button"})
                // if(msg) popalert.fadewait(data.message);
                if(typeof callback == 'function') callback(data);
                else if(typeof callback == 'object') callback[0](data);
                resolve(data);
            },
            error(err){
                // popalert.fadewait('请求失败，请稍后重试');
                if(typeof callback == 'object' && typeof callback[2] == 'function') callback[2]();
                // reject(err);
            },
            complete(){
                if(mask) popalert.waitend();
                if(typeof callback == 'object' && typeof callback[1] == 'function') callback[1]();
            }
        });
};

export default ajax;