jQuery.array_options={
	myFunction1:function(){
		console.log("array_options")
		
	},
	myFunction2:function(){
		console.log("array_options")
		
	},
	sum:function(arrayoptions){
		console.log(arrayoptions);
		var sum=0;
		$.each(arrayoptions,function(i,value){
			sum+=value;
		})
		return sum;
	}
}