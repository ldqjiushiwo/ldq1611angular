module.exports = {
	//加载的首页的头部区域
	loadHomeHeader: function() {
		//load()方法去加载我们需要的内容
		$("#header").load("html/home.html #homeHeader", function() {
			console.log("ok")
		})
	},
	//加载的首页的内容区域
	loadHomeContent: function() {
		$("#content").load("html/home.html #homeContent", function() {
			console.log("ok")
			
			$.ajax({
				dataType:"jsonp",
				type:"get",
				url:" http://datainfo.duapp.com/shopdata/getBanner.php?callback=",
				beforeSend:function(){
					$('#load').show();
					$('#warper').hide();
				},
				success:function(data){
					$('#load').hide();
					$('#warper').show();
					//console.log(data[0].goodsBenUrl);
					var len = data.length;
					$('#warper').innerHTML = "";
					for(var i=0;i<len;i++){
						$('#warper').append('<div class="swiper-slide"><img src="'+JSON.parse(data[i].goodsBenUrl)[0]+'" /></div>')
					}
					var mySwiper = new Swiper('.swiper-container', {
						loop: true,
						autoplay: 3000,
						autoplayDisableOnInteraction: false,
						// 如果需要分页器
						pagination: '.swiper-pagination',
					})
				}
			});
			$.ajax({
				type:"get",
				url:" http://datainfo.duapp.com/shopdata/getGoods.php?callback=",
				dataType:"jsonp",
				beforeSend:function(){
					
				},
				success:function(data){
//					console.log(data);
					for(var i in data){
//						alert(data[i].goodsName)
						var name = data[i].goodsName;
						var goodsListImg = data[i].goodsListImg;
						var price = data[i].price;
						var discount = data[i].discount;
						var goodsID = data[i].goodsID;
						var newPrice = 0;
						if(discount == "0"){
							newPrice = price;
							discount = "不打";
						}else{
							//.toFixed(1)取小数点后一位
							newPrice = (price*discount/10).toFixed(1);
						}
						$('.proList').append('<li class="proItem" goodsID="'+goodsID+'"><div class="proImg"><img src="'+goodsListImg+'" /></div><div class="proInfo"><p>'+name+'</p><p>￥<span>'+newPrice+'</span><del>￥'+price+'</del></p><p>'+discount+'折</p><span class="cartBtn" goodsID="'+goodsID+'"><i class="iconfont">&#xe601;</i></span></div></li>');
					}
					$('.proItem').on('tap',function(){
						var goodsID = $(this).attr("goodsID");
						var Detail = require("./detail");
						Detail.loadDetailHeader("home",goodsID);
						Detail.loadDetailContent(goodsID);
						Detail.loadDetailFooter();
					})
					$('.cartBtn').on('tap',function(e){
						e.stopPropagation();
						var goodsID = $(this).attr("goodsID");
						var totast = require('./totast');
//						totast.makeText("请先登录",1000);
//						var Login = require('./login');
//						Login.loadLoginHeader("home");
//						Login.loadLoginContent("home");
//						console.log(goodsID)
						if(localStorage.getItem('islogin')=="ok"){
//							console.log(localStorage.getItem('userID'))
							var userID = localStorage.getItem('userID');
							var cartAdd = require('./addCart');
							cartAdd.addCart(userID,goodsID,1);
						}else{
							
								totast.makeText("请先登录",1000);
								var Login = require('./login');
								Login.loadLoginHeader("home");
								Login.loadLoginContent("home");
							
						}
					})
				}
			});
			
		})
	}
}