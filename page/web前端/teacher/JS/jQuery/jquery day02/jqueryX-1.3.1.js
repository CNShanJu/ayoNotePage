var $ = function(selector) {
	this.tqObject = new TQObject();
	if (selector.substring(0, 1) == "#") {
		var elem = document.getElementById(selector.substring(1));
		this.tqObject.data.push(elem);
		console.log(this.tqObject.data);
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
		var elems=document.getElementsByTagName(selector);
		this.tqObject.data=elems;
	}
	return this.tqObject;
}

var TQObject = function() {
	// 这个数组里面存储着获取的dom元素
	this.data = [];
}


TQObject.prototype = {
	html: function(content) {
		if (content) {
			for (var i = 0; i < this.data.length; i++) {
				this.data[i].innerHTML = content;
			}
			return this;
		} else {
			return this.data[0].innerHTML
		}

	},
	size: function() {
		return this.data.length;
	},
	val: function(content) {
		if (content) {
			for (var i = 0; i < this.data.length; i++) {
				this.data[i].value = content;
			}
			return this;
		} else {
			return this.data[0].value;
		}
	},
	append: function(str) {
		console.log(str);
		for (var i = 0; i < this.data.length; i++) {
			this.data[i].innerHTML += str;
		}
		return this;
	},
	addClass: function(classname) {
		for (var i = 0; i < this.data.length; i++) {
			var elem = this.data[i];
			if (elem.getAttribute("class")) {
				var oldclassname = elem.getAttribute("class");
				var newclassname = oldclassname + " " + classname;
				elem.setAttribute("class", newclassname);
			} else {
				elem.setAttribute("class", classname);
			}
		}
		return this;
	},
	removeClass:function(classname){
		// <div id="div" class="a b c d">32323</div>
		/* a b d */
		if(classname){
			for(var i=0;i<this.data.length;i++){
				var arr=this.data[i].getAttribute("class").split(" ")
				console.log(arr);
				var newclassname=""
				// arr=[a,b,c,d];
				// newclassname="a b d "
				for(var j=0;j<arr.length;j++){
					if(arr[j]==classname){
						continue;
					}
					newclassname+=arr[j]+" ";
				}
				newclassname=newclassname.substring(0,newclassname.length-1);//删除最后一个字符后面的空格
				this.data[i].setAttribute("class",newclassname);
			}
			return this;
		}else{
			for(var i=0;i<this.data.length;i++){
				this.data[i].setAttribute("class","");
			}
			return this;
		}
	},
	attr:function(name,value){
		if(name&&value){
			for(var i=0;i<this.data.length;i++){
				this.data[i].setAttribute(name,value);
			}
			return this;
		}else if(name){
			return this.data[0].getAttribute(name);
		}
	}
}
