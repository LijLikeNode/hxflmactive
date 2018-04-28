const listener = {};

listener.back = ()=>{
	window.addEventListener("popstate", function(e) {
		document.title=='少儿成长调查问卷'||document.title=='排行榜'?self.location.reload():'';
    }, false);
}

export default listener;