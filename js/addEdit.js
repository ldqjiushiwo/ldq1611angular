module.exports = {
	loadAddEditHeader: function() {
		$("#header").load("html/addEdit.html #addEditHeader", function() {
			console.log("ok")
			$('.finshi').tap(function(){
				var Cart = require('./cart');
				Cart.loadCartHeader();
				Cart.loadCartContent();
			})
		})
	},
	loadAddEditContent: function() {
		$("#content").load("html/addEdit.html #addEditContent", function() {
			console.log("ok")
			$.ajax({
				type: "get",
				url: "http://datainfo.duapp.com/shopdata/getCar.php?callback=",
				dataType: "jsonp",
				data: {
					"userID": localStorage.getItem('userID')
				},
				success: function(data) {
					console.log(data);
					$('#addCartList').html("");
					var totalNum = 0;
					var totalPrice = 0; 
					for(var i in data) {
						var img = data[i].goodsListImg;
						var name = data[i].goodsName;
						var price = data[i].price;
						var goodsID = data[i].goodsID;
						var discount = data[i].discount;
						var classname = data[i].className;
						var number = data[i].number;
						var newprice = 0;
						totalNum+=number+1;
						if(discount == "0") {
							newprice = price;
						} else {
							newprice = (price * discount / 10).toFixed(1);
						}
						$('#addCartList').append('<li>' +
							'<div class="proImg">' +
							'<img src="' + img + '" />' +
							'</div>' +
							'<div class="proInfo">' +
							'<p>' + name + '</p>' +
							'<p>' + classname + '</p>' +
							'<p>单价：<span>' + newprice + '</span></p>' +
							'<p><span class="jian" goodsID="'+goodsID+'" newprice="'+newprice+'">-</span><span id="pro'+goodsID+'">'+number+'</span><span class="add" goodsID="'+goodsID+'" newprice="'+newprice+'">+</span></p>' +
							'</div>'+

							'</li>')
					}
					$('.jian').tap(function(){
						var goodsID= $(this).attr('goodsID');
						var newprice= $(this).attr('newprice');
						var num = $('#pro'+goodsID).html()*1;
						if(num==1){
							var totast = require('./totast');
							totast.makeText("至少选一个啊！！",2000);
						}else{
							num--;
							totalNum-=1;
							$('#pro'+goodsID).html(num);
							totalPrice-=newprice;
							localStorage.setItem('totalNum',totalNum);
							localStorage.setItem('totaiPrice',totalPrice);
							var userID = localStorage.getItem("userID");
							var AddCart = require("./addCart");
							AddCart.addCart(userID,goodsID,num);
						}
					})
					$('.add').tap(function(){
						var goodsID= $(this).attr('goodsID');
						var newprice= $(this).attr('newprice');
						var num = $('#pro'+goodsID).html()*1;
						if(num==5){
							var totast = require('./totast');
							totast.makeText("最多五个哦！！",2000);
						}else{
							num++;
							totalNum-=(-1);
							$('#pro'+goodsID).html(num);
							totalPrice-=-newprice;
							localStorage.setItem('totalNum',totalNum);
							localStorage.setItem('totaiPrice',totalPrice);
							var userID = localStorage.getItem("userID");
							var AddCart = require("./addCart");
							AddCart.addCart(userID,goodsID,num);
						}
					})
				}

			});
		})
	}
}