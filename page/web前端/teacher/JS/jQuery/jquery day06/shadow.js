// jQuery.fn.shadow=function(){
// 	this.each(function(){
// 		$obj=$(this);
// 		for(var i=0;i<5;i++){
// 			$obj.clone().css({
// 				position:"absolute",
// 				left:$obj.offset().left+i,
// 				top:$obj.offset().top+i,
// 				zIndex:-1,
// 				opacity:0.3
// 			}).appendTo("body");
// 		}
// 	})
// }


// jQuery.fn.shadow_simple=function(slice,opacity,zIndex){
// 	this.each(function(){
// 		$obj=$(this);
// 		for(var i=0;i<slice;i++){
// 			$obj.clone().css({
// 				position:"absolute",
// 				left:$obj.offset().left+i,
// 				top:$obj.offset().top+i,
// 				zIndex:zIndex,
// 				opacity:opacity
// 			}).appendTo("body");
// 		}
// 	})
// }


// jQuery.fn.shadow_map=function(obj){
// 	this.each(function(){
// 		$obj=$(this);
// 		for(var i=0;i<obj.slice;i++){
// 			$obj.clone().css({
// 				position:"absolute",
// 				left:$obj.offset().left+i,
// 				top:$obj.offset().top+i,
// 				zIndex:obj.zIndex,
// 				opacity:obj.opacity
// 			}).appendTo("body");
// 		}
// 	})
// }


jQuery.fn.shadow_defaults=function(option){
	// option 用户传递过来的参数
	// 设置默认的参数
	var  defaults={
		slice:4,
		opacity:0.3,
		zIndex:-1
	}
	var opts=$.extend(defaults,option);
	this.each(function(){
		$obj=$(this);
		for(var i=0;i<opts.slice;i++){
			$obj.clone().css({
				position:"absolute",
				left:$obj.offset().left+i,
				top:$obj.offset().top+i,
				zIndex:opts.zIndex,
				opacity:opts.opacity
			}).appendTo("body");
		}
	})
}

