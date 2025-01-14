var $ = function(selector) {
	    this.tqObject=new TQObject();
	if (selector.substring(0, 1) == "#") {
		var elem=document.getElementById(selector.substring(1));
		this.tqObject.data.push(elem);
	} else if (selector.substring(0, 1) == ".") {
		var className = selector.substring(1);
		var ele = document.getElementsByTagName("*");	
		var reg = new RegExp("^(|\\s)" + className + "(|\\s)$");
		// " bigbox" "bigbox "  " bigbox "
		for (var i = 0; i < ele.length; i++) {
			if (reg.test(ele[i].className)) {
				this.tqObject.data.push(ele[i]);
			}
		}
	} else {
		return document.getElementsByTagName(selector);
	}
	return this.tqObject;
}

var TQObject=function(){
	// 这个数组里面存储着获取的dom元素
	this.data=[];
}


TQObject.prototype={
	
	html:function(){
		console.log("shaokang");
	}
	
	
}


