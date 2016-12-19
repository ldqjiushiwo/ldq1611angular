var mySwiper;
module.exports = {
	loadDetailHeader: function(type, goodsID) {
		$("#header").load("html/detail.html #detailHeader", function() {
			console.log("ok")
			$('#back').on('tap', function() {
				if(type == "home") {
					var home = require("./home");
					var foot = require("./foot");
					home.loadHomeHeader();
					home.loadHomeContent();
					foot.loadFoot();
				}
			})

		})
	},
	loadDetailContent: function(goodsID) {
		$("#content").load("html/detail.html #detailContent", function() {
			//			console.log("ok")
			//			console.log(goodsID)
			$.ajax({
				type:"get",
				url:"http://datainfo.duapp.com/shopdata/getGoods.php?callback=",
				dataType:"jsonp",
				data:{
					goodsID:goodsID
				},
				beforeSend:function(){
					
				},
				success:function(data){
					console.log("detail",data),
					console.log(goodsID);
					var goodsBenUrlStr = data[0].goodsBenUrl;
					var goodsBenUrl = JSON.parse(goodsBenUrlStr);
					var goodsBenUrlLen =  goodsBenUrl.length;
					$("#proWrapper").html("");
					for(var i=0;i<goodsBenUrlLen;i++){
						$('#proWrapper').append('<div class="swiper-slide maskImg" imgsrc="'+goodsBenUrl[i]+'"><img src="'+goodsBenUrl[i]+'" alt="" /></div>')
					}
					var proSwiper =new Swiper("#proSwiper",{
						loop:true,
						preventLinksPropagation : false,
						pagination: '.swiper-pagination'
					})
					$('.maskImg').doubleTap(function(){
						$('#mask').show();
						$("#mask").find("img").attr("src",$(this).attr("imgsrc"));
					})
				}
			});
			mySwiper = new Swiper('#detailSwiper', {
				resistanceRatio: 0,
				onSlideChangeEnd: function(swiper) {
					var _index = swiper.activeIndex;
					$('#haha').find('li').eq(_index).addClass('acive').siblings().removeClass('acive');
				}
			})

		})
	},
	loadDetailFooter: function(goodsID) {
		$("#footer").load("html/detail.html #detailFooter", function() {
			console.log("ok")
			console.log(goodsID)
			$('#footer').find('li').on('tap', function() {
				var $index = $(this).index();
				mySwiper.slideTo($index, 300, false);
				$(this).addClass('acive').siblings().removeClass('acive');
			})
		})
	},
}