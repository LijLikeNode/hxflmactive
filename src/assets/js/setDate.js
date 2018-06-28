(function(psdw){
  	let x=new Date();
	x.setFullYear(2018,6,1);
	let today = new Date();

	if (x>today)
	{
	    window.dateTime='less';
	}
	else
	{
	    window.dateTime='more';
	}
	console.log(window.dateTime)
})(750)