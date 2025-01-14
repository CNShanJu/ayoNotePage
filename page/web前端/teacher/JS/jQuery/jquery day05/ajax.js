function  ajax (url,type,data,cb) {
	$.ajax({
		url:url,
		type:type,
		data:data,
		success:function(data){
			cb(data);
			
		}
	})
	
}