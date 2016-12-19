module.exports = {
	addCart:function(userID,goodsID,number,type){
		$.ajax({
			type:"get",
			url:"http://datainfo.duapp.com/shopdata/updatecar.php",
			data:{
				"userID":userID,
				"goodsID":goodsID,
				"number":number
			},
			success:function(data){
				var totast = require('./totast');
				if(data=="1"){
					if(type=="delete"){
						totast.makeText("删除成功",1000)
						var Cart = require("./cart");
						Cart.loadCartHeader();
						Cart.loadCartContent();
					}else if(type=="pay"){
						totast.makeText("支付成功",1000)
						$("#content").html("您已支付成功")
					}else{
						totast.makeText("更新购物车成功",1000)
					}
				}else{
					totast.makeText("更新失败",1000)
				}
			}
		});
	}
}
