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
/* 根据出生日期算出年龄 */
common.jsGetAge = function(strBirthday) {
    var returnAge;
    if(strBirthday!=''){
        var strBirthdayArr = strBirthday.split("-");
        var birthYear = strBirthdayArr[0];
        var birthMonth = strBirthdayArr[1];
        var birthDay = strBirthdayArr[2];
        var d;
        // console.log(strBirthday)
        d = new Date();
        var nowYear = d.getFullYear();
        var nowMonth = d.getMonth() + 1;
        var nowDay = d.getDate();
        if (nowYear == birthYear) {
            if (nowMonth == birthMonth) {
                var dayDiff = nowDay - birthDay; // 日之差
                if (dayDiff < 0) {
                    returnAge = -99;
                } else {
                    returnAge = 0;
                }
            } else {
                var monthDiff = nowMonth - birthMonth; // 月之差
                if (monthDiff < 0) {
                    returnAge = -99;
                } else {
                    returnAge = 0;
                }
            }
        } else {
            var ageDiff = nowYear - birthYear; // 年之差
            if (ageDiff > 0) {
                if (nowMonth == birthMonth) {
                    var dayDiff = nowDay - birthDay; // 日之差
                    if (dayDiff <= 0) {
                        returnAge = ageDiff - 1;
                    } else {
                        returnAge = ageDiff;
                    }
                } else {
                    var monthDiff = nowMonth - birthMonth; // 月之差
                    if (monthDiff < 0) {
                        returnAge = ageDiff - 1;
                    } else {
                        returnAge = ageDiff;
                    }
                }
            } else {
                returnAge = -1; // 返回-1 表示出生日期输入错误 晚于今天
            }
        }
        return returnAge; // 返回周岁年龄
    }
    
}
//获取日期
common.GetDateStr = function(AddDayCount,addYear) {
    let dd = new Date();
    dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
    if(addYear!=undefined){
        dd.setFullYear(dd.getFullYear()+addYear);
    }
    let y = dd.getFullYear();
    let m = ((dd.getMonth()+1)>9?(dd.getMonth()+1):"0"+(dd.getMonth()+1));//获取当前月份的日期
    let d = (dd.getDate()>9?dd.getDate():"0"+dd.getDate());
    return y+"-"+m+"-"+d;
};

export default common;