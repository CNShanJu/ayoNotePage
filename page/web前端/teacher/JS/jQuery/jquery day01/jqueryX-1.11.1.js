//封装id选择器  获取id的元素
function $(id){
	if(id.substring(0,1)=="#"){
		return document.getElementById(id.substring(1))
	}
}

// 标签选择器的封装  getElementsByTagName兼容性特别的好。
function $(ele){
	return document.getElementsByTagName(ele);
}


// document.getElementsByClassName 兼容性并不好，在ie低版本浏览器并不支持
// 处理兼容性的问题
function $(selector){
  var className=selector.substring(1);
  if(document.getElementsByClassName){
	  return document.getElementsByClassName(className); 
  }else{
	  // 先获取html文档中所有的标签
	  var ele=document.getElementsByTagName("*");
	  var arr=[];
	  var reg=new RegExp("^(|\\s)"+className+"(|\\s)$");
	  // " bigbox" "bigbox "  " bigbox "
	  for(var i=0;i<ele.length;i++){
		  if(reg.test(ele[i].className)){
			  arr.push(ele[i]);
		  }
	  }
	  return arr;
  }
}



