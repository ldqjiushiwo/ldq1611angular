module.exports ={
	makeText:function(str,time){
		$('#totast').show();
		$('#tip').html(str);
		setTimeout(function(){
			$('#totast').hide();
		},time)
	}
}
