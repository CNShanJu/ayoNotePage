var $ = function(selector) {
	if (selector.substring(0, 1) == "#") {
		return document.getElementById(selector.substring(1));
	} else if (selector.substring(0, 1) == ".") {
		var className = selector.substring(1);
		if (document.getElementsByClassName) {
			return document.getElementsByClassName(className);
		} else {
			// 先获取html文档中所有的标签
			var ele = document.getElementsByTagName("*");
			var arr = [];
			var reg = new RegExp("^(|\\s)" + className + "(|\\s)$");
			// " bigbox" "bigbox "  " bigbox "
			for (var i = 0; i < ele.length; i++) {
				if (reg.test(ele[i].className)) {
					arr.push(ele[i]);
				}
			}
			return arr;
		}
	} else {
		return document.getElementsByTagName(selector);
	}
}
