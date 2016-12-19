/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	//引入每一个页面所用的js，其实就是每一个模块
	var Home = __webpack_require__(1);
	var Kind = __webpack_require__(4);
	var Cart = __webpack_require__(5);
	var User = __webpack_require__(10);
	var More = __webpack_require__(13);
	var Foot = __webpack_require__(14);

	//引入我们需要的css文件
	__webpack_require__(15);
	//Home.loadHomeHeader();
	//Home.loadHomeContent();

	//Kind.loadKindHeader();
	//Kind.loadKindContent()

	//Cart.loadCartHeader();
	//Cart.loadCartContent();

	//User.loadUserHeader();
	//User.loadUserContent();

	//More.loadMoreHeader();
	//More.loadMoreContent();

	//默认显示我们首页的数据

	Home.loadHomeHeader();
	Home.loadHomeContent();
	Foot.loadFoot();
	//点击底部导航显示不同的区域---------路由
	//$("#footer").find("li").on("tap",function(){
	//	var $index = $(this).index();
	//	$(this).addClass("acive").siblings().removeClass("acive");
	//	switch ($index){
	//		case 0:
	//			Home.loadHomeHeader();
	//			Home.loadHomeContent();
	//			break;
	//		case 1:
	//			Kind.loadKindHeader();
	//			Kind.loadKindContent();
	//			break;
	//		case 2:
	//			Cart.loadCartHeader();
	//			Cart.loadCartContent();
	//			break;
	//		case 3:
	//			User.loadUserHeader();
	//			User.loadUserContent();
	//			break;
	//		case 4:
	//			More.loadMoreHeader();
	//			More.loadMoreContent();
	//			break;
	//		default:
	//			break;
	//	}
	//});
	$("#mask").tap(function(){
		$(this).hide()
	})

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

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
							var Detail = __webpack_require__(2);
							Detail.loadDetailHeader("home",goodsID);
							Detail.loadDetailContent(goodsID);
							Detail.loadDetailFooter();
						})
						$('.cartBtn').on('tap',function(e){
							e.stopPropagation();
							var goodsID = $(this).attr("goodsID");
							var totast = __webpack_require__(7);
	//						totast.makeText("请先登录",1000);
	//						var Login = require('./login');
	//						Login.loadLoginHeader("home");
	//						Login.loadLoginContent("home");
	//						console.log(goodsID)
							if(localStorage.getItem('islogin')=="ok"){
	//							console.log(localStorage.getItem('userID'))
								var userID = localStorage.getItem('userID');
								var cartAdd = __webpack_require__(8);
								cartAdd.addCart(userID,goodsID,1);
							}else{
								
									totast.makeText("请先登录",1000);
									var Login = __webpack_require__(11);
									Login.loadLoginHeader("home");
									Login.loadLoginContent("home");
								
							}
						})
					}
				});
				
			})
		}
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var mySwiper;
	module.exports = {
		loadDetailHeader: function(type, goodsID) {
			$("#header").load("html/detail.html #detailHeader", function() {
				console.log("ok")
				$('#back').on('tap', function() {
					if(type == "home") {
						var home = __webpack_require__(1);
						var foot = __webpack_require__(3);
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

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
		loadFoot: function() {
			$('#footer').load("html/foot.html", function() {
				var Home = __webpack_require__(1);
				var Kind = __webpack_require__(4);
				var Cart = __webpack_require__(5);
				var User = __webpack_require__(10);
				var More = __webpack_require__(13);
				$("#footer").find("li").on("tap", function() {
					var $index = $(this).index();
					$(this).addClass("acive").siblings().removeClass("acive");
					switch($index) {
						case 0:
							Home.loadHomeHeader();
							Home.loadHomeContent();
							break;
						case 1:
							Kind.loadKindHeader();
							Kind.loadKindContent();
							break;
						case 2:
							Cart.loadCartHeader();
							Cart.loadCartContent();
							break;
						case 3:
							User.loadUserHeader();
							User.loadUserContent();
							break;
						case 4:
							More.loadMoreHeader();
							More.loadMoreContent();
							break;
						default:
							break;
					}
				});
			})
		}
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = {
		loadKindHeader:function(){
			$("#header").load("html/kind.html #kindHeader",function(){
				console.log("ok")
			})
		},
		loadKindContent:function(){
			$("#content").load("html/kind.html #kindContent",function(){
				console.log("ok")
			})
		}
	}


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
		loadCartHeader: function() {
			$("#header").load("html/cart.html #cartHeader", function() {
				console.log("ok")
				$('#toEdit').tap(function() {
					var CartEdit = __webpack_require__(6);
					CartEdit.loadAddEditHeader();
					CartEdit.loadAddEditContent();
				})
				$('#pay').tap(function(){
					$.ajax({
						type:"get",
						url:"http://datainfo.duapp.com/shopdata/getCar.php?callback=",
						data:{
							"userID":localStorage.getItem('userID')
						},
						dataType:"jsonp",
						success:function(data){
							var orderList = JSON.stringify(data);
							localStorage.setItem("orderList",orderList);
							var userID = localStorage.getItem("userID");
							for(var i in data){
								var goodsID = data[i].goodsID;
								var AddCart = __webpack_require__(8);
								AddCart.addCart(userID,goodsID,0,"pay");
							}
						}
					});
				})
			})
		},
		loadCartContent: function() {
			$("#content").load("html/cart.html #cartContent", function() {
				console.log("ok")
				$.ajax({
					type: "get",
					url: "http://datainfo.duapp.com/shopdata/getCar.php?callback=",
					dataType: "jsonp",
					data: {
						"userID": localStorage.getItem("userID"),
					},
					success: function(data) {
						console.log(data)
						if(data == "0") {
							$('#toEdit').show();
							$('#pay').show();
							$('#cartContent').html("您的购物车空空如也")
						} else {
							$('#toEdit').show();
							$('#pay').show();
							for(var i in data) {
								var img = data[i].goodsListImg;
								var goodsID = data[i].goodsID;
								var name = data[i].goodsName;
								var price = data[i].price;
								var className = data[i].className;
								var number = data[i].number;
								var newPrice = 0;
								if(data[i].discount == "0") {
									newPrice = price;
								} else {
									newPrice = (price * data[i].discount / 10).toFixed(1);
								}
								$("#cartList").append('<li class="cartItem">'+
									'<div class="deleteItem" goodsID="'+goodsID+'">'+
										'删除'+
									'</div>'+
									'<div class="itemBox">'+
										'<div class="itemImg">'+
											'<img src="'+img+'"/>'+
										'</div>'+
										'<div class="itemInfo">'+
											'<p>'+name+'</p>'+
											'<p>'+className+'</p>'+
											'<p>单价：￥'+newPrice+'</p>'+
											'<p>数量：'+number+'</p>'+
										'</div>'+
									'</div>'+
								'</li>')
							}
						}
						$('.cartItem').swipeLeft(function(e){
							$(this).find('.itemBox').animate({
								"right":"1.2rem"
							},300).parent('.cartItem').siblings().find(".itemBox").animate({
								"right":"0rem"
							},300)
						});
						$('.cartItem').swipeRight(function(e){
							$(this).find('.itemBox').animate({
								"right":"0rem"
							},300)
						});
						$(".deleteItem").tap(function(){
	//						alert("删除成功");
							var userID = localStorage.getItem("userID");
							var goodsID = $(this).attr("goodsID");
							var AddCart = __webpack_require__(9);
							AddCart.addCart(userID,goodsID,0,"delete");
							
						})
					}
				});
			})
		}
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
		loadAddEditHeader: function() {
			$("#header").load("html/addEdit.html #addEditHeader", function() {
				console.log("ok")
				$('.finshi').tap(function(){
					var Cart = __webpack_require__(5);
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
								var totast = __webpack_require__(7);
								totast.makeText("至少选一个啊！！",2000);
							}else{
								num--;
								totalNum-=1;
								$('#pro'+goodsID).html(num);
								totalPrice-=newprice;
								localStorage.setItem('totalNum',totalNum);
								localStorage.setItem('totaiPrice',totalPrice);
								var userID = localStorage.getItem("userID");
								var AddCart = __webpack_require__(8);
								AddCart.addCart(userID,goodsID,num);
							}
						})
						$('.add').tap(function(){
							var goodsID= $(this).attr('goodsID');
							var newprice= $(this).attr('newprice');
							var num = $('#pro'+goodsID).html()*1;
							if(num==5){
								var totast = __webpack_require__(7);
								totast.makeText("最多五个哦！！",2000);
							}else{
								num++;
								totalNum-=(-1);
								$('#pro'+goodsID).html(num);
								totalPrice-=-newprice;
								localStorage.setItem('totalNum',totalNum);
								localStorage.setItem('totaiPrice',totalPrice);
								var userID = localStorage.getItem("userID");
								var AddCart = __webpack_require__(8);
								AddCart.addCart(userID,goodsID,num);
							}
						})
					}

				});
			})
		}
	}

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports ={
		makeText:function(str,time){
			$('#totast').show();
			$('#tip').html(str);
			setTimeout(function(){
				$('#totast').hide();
			},time)
		}
	}


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

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
					var totast = __webpack_require__(7);
					if(data=="1"){
						if(type=="delete"){
							totast.makeText("删除成功",1000)
							var Cart = __webpack_require__(5);
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


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

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
					var totast = __webpack_require__(7);
					if(data=="1"){
						if(type=="delete"){
							totast.makeText("删除成功",1000)
							var Cart = __webpack_require__(5);
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


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
		loadUserHeader:function(){
			$("#header").load("html/user.html #userHeader",function(){
				console.log("ok")
				$('#back').tap(function(){
					var Home = __webpack_require__(1);
					Home.loadHomeHeader();
					Home.loadHomeContent();
					$('#footer').find('li').eq(0).addClass('acive').siblings().removeClass('acive');
				})
			})
		},
		loadUserContent:function(){
			$("#content").load("html/user.html #userContent",function(){
				console.log("ok")
				$('.loginBtn').tap(function(){
					var Login = __webpack_require__(11);
					Login.loadLoginHeader("user");
					Login.loadLoginContent();
				})
				$('.registerBtn').tap(function(){
					var Register = __webpack_require__(12);
					Register.loadRegisterHeader("user");
					Register.loadRegisterContent();
				})
				if(localStorage.getItem('islogin')=="ok"){
					$('.allBtn').hide();
					$('.nicheng>span').html(localStorage.getItem("userID"));
				}
			})
		}
	}


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
		toLogin:function(userID,password,type){
	//		alert("dadasdasdsa")
			$.ajax({
				type:"get",
				url:"http://datainfo.duapp.com/shopdata/userinfo.php",
				data:{
					"status":"login",
					"userID":userID,
					"password":password
				},
				beforeSend:function(){
					
				},
				success:function(data){
	//				console.log(data)
					var totast = __webpack_require__(7);
					if(data=="0"){
						totast.makeText('用户名不存在',2000)
					}else{
						if(data=="2"){
							totast.makeText('密码错误',2000)
						}else{
							localStorage.setItem('islogin','ok');
							localStorage.setItem('userID',userID);
							if(type=="user"){
								var User = __webpack_require__(10);
								User.loadUserHeader();
								User.loadUserContent();
							}
						}
					}
				}
			});
		},
		loadLoginHeader:function(type){
			$("#header").load("html/login.html #loginHeader",function(){
				console.log("ok")
				if(type=="user"){
					$('#back').tap(function(){
						var User = __webpack_require__(10);
						User.loadUserHeader();
						User.loadUserContent();	
					})
				}else{
					if(type=="home"){
						$('#back').tap(function(){
							var Home = __webpack_require__(1);
							Home.loadHomeHeader();
							Home.loadHomeContent();	
						})
					}
				}
				$('.loginHeaderBtn').tap(function(){
					var Register = __webpack_require__(12);
					Register.loadRegisterHeader("user");
					Register.loadRegisterContent(); 
				})
			})
		},
		loadLoginContent:function(){
			var that = this;
			$("#content").load("html/login.html #loginContent",function(){
				console.log("ok")
				$('#loginBtn').tap(function(){
					var totast = __webpack_require__(7);
					var userID = $('#userName').val();
					var password = $('#password').val();
					if(userID==""){
						totast.makeText('用户名不能为空',2000)
					}else{
						if(password==""){
							totast.makeText('密码不能为空',2000)
						}else{
							that.toLogin(userID,password,"user")
						}
					}
				})
			})
		}
	}

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
		toRegister:function(userID,password){
	//		alert("dadasdasdsa")
			$.ajax({
				type:"get",
				url:"http://datainfo.duapp.com/shopdata/userinfo.php",
				data:{
					"status":"register",
					"userID":userID,
					"password":password
				},
				beforeSend:function(){
					
				},
				success:function(data){
	//				console.log(data)
					var user = __webpack_require__(10);
					var totast = __webpack_require__(7);
					if(data=="0"){
						totast.makeText("用户名已存在",2000)
					}else{
						if(data=="1"){
							totast.makeText("注册成功",2000)
							user.loadUserHeader();
							user.loadUserContent();
						}
					}
					
				}
			});
		},
		loadRegisterHeader:function(type){
			$("#header").load("html/register.html #registerHeader",function(){
				console.log("ok")
				
				$('#back').tap(function(){
					var User = __webpack_require__(10);
					User.loadUserHeader();
					User.loadUserContent();	
				})
				$('.registerHeaderBtn').tap(function(){
					var Login = __webpack_require__(11);
					Login.loadLoginHeader("user");
					Login.loadLoginContent();
				})
				
			})
		},
		loadRegisterContent:function(){
			var that = this;
			$("#content").load("html/register.html #registerContent",function(){
				console.log("ok")
				$('#registerBtn').tap(function(){
					var totast = __webpack_require__(7)
					var userID = $('#userName').val();
					var password = $('#password').val();
					var password1 = $('#password1').val();
					if(userID==""){
						totast.makeText("用户名不能为空",1000);
					}else{
						if(password==""){
							totast.makeText("密码不能为空",1000);
						}else{
							if(password!==password1){
								totast.makeText("输入密码不一致",1000);
							}else{
								totast.makeText("可以注册啦",1000);
								that.toRegister(userID,password);
							}
						}
					}
				})
			})
		}
	}

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
		loadMoreHeader:function(){
			$("#header").load("html/more.html #moreHeader",function(){
				console.log("ok")
			})
		},
		loadMoreContent:function(){
			$("#content").load("html/more.html #moreContent",function(){
				console.log("ok")
				if(localStorage.getItem('islogin')=="ok"){
					$('.btn1').tap(function(){
						localStorage.setItem('islogin','false');
						var User = __webpack_require__(10);
						User.loadUserHeader("user");
						User.loadUserContent();
						$('#footer').find('li').eq(3).addClass('acive').siblings().removeClass('acive');
					})
					$('.btn2').tap(function(){
						localStorage.setItem('islogin','false');
						var Login = __webpack_require__(11);
						Login.loadLoginHeader("user");
						Login.loadLoginContent();
						$('#footer').find('li').eq(3).addClass('acive').siblings().removeClass('acive');
					})
				}
			})
		}
	}


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
		loadFoot: function() {
			$('#footer').load("html/foot.html", function() {
				var Home = __webpack_require__(1);
				var Kind = __webpack_require__(4);
				var Cart = __webpack_require__(5);
				var User = __webpack_require__(10);
				var More = __webpack_require__(13);
				$("#footer").find("li").on("tap", function() {
					var $index = $(this).index();
					$(this).addClass("acive").siblings().removeClass("acive");
					switch($index) {
						case 0:
							Home.loadHomeHeader();
							Home.loadHomeContent();
							break;
						case 1:
							Kind.loadKindHeader();
							Kind.loadKindContent();
							break;
						case 2:
							Cart.loadCartHeader();
							Cart.loadCartContent();
							break;
						case 3:
							User.loadUserHeader();
							User.loadUserContent();
							break;
						case 4:
							More.loadMoreHeader();
							More.loadMoreContent();
							break;
						default:
							break;
					}
				});
			})
		}
	}

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(16);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(18)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/.0.26.1@css-loader/index.js!./../node_modules/.4.0.2@sass-loader/index.js!./style.scss", function() {
				var newContent = require("!!./../node_modules/.0.26.1@css-loader/index.js!./../node_modules/.4.0.2@sass-loader/index.js!./style.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(17)();
	// imports


	// module
	exports.push([module.id, "body,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\nhr,\np,\nblockquote,\ndl,\ndt,\ndd,\nul,\nol,\nli,\npre,\nform,\nfieldset,\nlegend,\nbutton,\ninput,\ntextarea,\nth,\ntd {\n  margin: 0;\n  padding: 0; }\n\nbody,\nbutton,\ninput,\nselect,\ntextarea {\n  font-size: 12px;\n  line-height: 1.5;\n  font-family: arial; }\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  font-size: 100%; }\n\naddress,\ncite,\ndfn,\nem,\nvar {\n  font-style: normal; }\n\ncode,\nkbd,\npre,\nsamp {\n  font-family: couriernew, courier, monospace; }\n\nsmall {\n  font-size: 12px; }\n\nul,\nol {\n  list-style: none; }\n\na {\n  text-decoration: none; }\n\na:hover {\n  text-decoration: underline; }\n\nsup {\n  vertical-align: text-top; }\n\nsub {\n  vertical-align: text-bottom; }\n\nlegend {\n  color: #000; }\n\nfieldset,\nimg {\n  border: 0;\n  width: 100%;\n  display: block; }\n\nbutton,\ninput,\nselect,\ntextarea {\n  font-size: 100%; }\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0; }\n\n@font-face {\n  font-family: 'iconfont';\n  /* project id 195271 */\n  src: url(\"//at.alicdn.com/t/font_zino49v6idlsor.eot\");\n  src: url(\"//at.alicdn.com/t/font_zino49v6idlsor.eot?#iefix\") format(\"embedded-opentype\"), url(\"//at.alicdn.com/t/font_zino49v6idlsor.woff\") format(\"woff\"), url(\"//at.alicdn.com/t/font_zino49v6idlsor.ttf\") format(\"truetype\"), url(\"//at.alicdn.com/t/font_zino49v6idlsor.svg#iconfont\") format(\"svg\"); }\n\n.iconfont {\n  font-family: \"iconfont\" !important;\n  font-size: 16px;\n  font-style: normal;\n  -webkit-font-smoothing: antialiased;\n  -webkit-text-stroke-width: 0.2px;\n  -moz-osx-font-smoothing: grayscale; }\n\n.ellipsis {\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis; }\n\n.ellipsis-2 {\n  display: -webkit-box;\n  overflow: hidden;\n  white-space: normal !important;\n  text-overflow: ellipsis;\n  word-wrap: break-word;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical; }\n\nhtml {\n  width: 100%;\n  height: 100%;\n  font-size: 100px; }\n\nbody {\n  width: 100%;\n  height: 100%;\n  font-size: 12px;\n  display: flex;\n  flex-direction: column; }\n\n#mask {\n  width: 100%;\n  height: 100%;\n  position: fixed;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  background: rgba(0, 0, 0, 0.95);\n  z-index: 9999 !important;\n  display: none; }\n  #mask img {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%); }\n\n#totast {\n  width: 60%;\n  height: 0.8rem;\n  background: rgba(0, 0, 0, 0.8);\n  position: fixed;\n  bottom: 30%;\n  left: 20%;\n  border-radius: 0.15rem;\n  display: none; }\n  #totast #tip {\n    font-size: 0.4rem;\n    color: #fff;\n    text-align: center;\n    line-height: 0.8rem; }\n\nheader {\n  width: 100%;\n  height: 0.88rem;\n  background: #e4366b; }\n  header ul {\n    width: 100%;\n    height: 100%;\n    display: flex;\n    color: #fff; }\n    header ul li {\n      display: flex;\n      height: 100%;\n      justify-content: center;\n      align-items: center; }\n    header ul li:nth-child(1),\n    header ul li:nth-child(3) {\n      width: 1.2rem; }\n      header ul li:nth-child(1) span,\n      header ul li:nth-child(3) span {\n        display: block;\n        width: 1.2rem;\n        height: 0.6rem;\n        font-size: 0.32rem;\n        color: #fff;\n        font-weight: bold;\n        background: -webkit-linear-gradient(top, #ff8bc0, #e4366b);\n        border-radius: 0.1rem;\n        text-align: center;\n        line-height: 0.6rem;\n        margin-right: 0.2rem;\n        margin-left: 0.2rem; }\n    header ul li:nth-child(1) {\n      font-size: 0.4rem;\n      text-shadow: 1px 1px 1px #000; }\n      header ul li:nth-child(1) i.iconfont {\n        font-size: 0.6rem; }\n    header ul li:nth-child(3) .iconfont {\n      font-size: 0.4rem; }\n    header ul li:nth-child(2) {\n      flex: 1;\n      font-size: 0.4rem; }\n      header ul li:nth-child(2) .searchBox {\n        width: 100%;\n        height: 60%;\n        background: #fff;\n        border-radius: 0.1rem;\n        display: flex;\n        align-items: center; }\n        header ul li:nth-child(2) .searchBox i.iconfont {\n          font-size: 0.35rem;\n          margin-top: 0.03rem;\n          color: #999; }\n        header ul li:nth-child(2) .searchBox span {\n          flex: 1;\n          display: block;\n          font-size: 0.18rem;\n          color: #999; }\n\nsection {\n  flex: 1;\n  overflow-y: auto; }\n  section #homeContent .swiper-container {\n    width: 100%;\n    height: 3rem;\n    background: #f66; }\n  section #homeContent .proList li {\n    width: 100%;\n    height: 2rem;\n    background: #fff;\n    display: flex;\n    position: relative; }\n    section #homeContent .proList li:after {\n      content: \"\";\n      position: absolute;\n      width: 100%;\n      height: 1px;\n      bottom: 0;\n      left: 0;\n      background-color: #000;\n      transform-origin: 0 0;\n      transform: scaleY(0.5); }\n    section #homeContent .proList li .proImg {\n      width: 2rem;\n      height: 1.8rem;\n      margin: 0.1rem; }\n      section #homeContent .proList li .proImg img {\n        width: 100%;\n        height: 100%; }\n    section #homeContent .proList li .proInfo {\n      flex: 1;\n      margin-right: 0.1rem;\n      position: relative; }\n      section #homeContent .proList li .proInfo p {\n        width: 100%; }\n        section #homeContent .proList li .proInfo p:nth-child(1) {\n          margin-top: 0.2rem;\n          line-height: 0.4rem;\n          font-size: 0.3rem;\n          display: -webkit-box;\n          overflow: hidden;\n          white-space: normal !important;\n          text-overflow: ellipsis;\n          word-wrap: break-word;\n          -webkit-line-clamp: 2;\n          -webkit-box-orient: vertical; }\n        section #homeContent .proList li .proInfo p:nth-child(2) {\n          color: #f66; }\n          section #homeContent .proList li .proInfo p:nth-child(2) span {\n            font-size: 0.32rem;\n            color: #f66;\n            font-weight: 900; }\n          section #homeContent .proList li .proInfo p:nth-child(2) del {\n            color: #999;\n            margin-left: 0.2rem; }\n        section #homeContent .proList li .proInfo p:nth-child(3) {\n          font-size: 0.28rem; }\n      section #homeContent .proList li .proInfo span.cartBtn {\n        position: absolute;\n        text-align: center;\n        bottom: 0.2rem;\n        right: 0.2rem;\n        display: block;\n        width: 1.2rem;\n        height: 0.6rem;\n        background: -webkit-linear-gradient(top, #ff8bc0, #e4366b); }\n        section #homeContent .proList li .proInfo span.cartBtn .iconfont {\n          color: #fff;\n          font-size: 0.4rem; }\n  section #detailContent {\n    width: 100%;\n    height: 100%; }\n    section #detailContent #detailSwiper {\n      width: 100%;\n      height: 100%;\n      background-color: #007AFF; }\n      section #detailContent #detailSwiper #proSwiper {\n        width: 100%;\n        height: 5rem; }\n  section #userContent .proList li {\n    width: 100%;\n    height: 2rem;\n    background: #fff;\n    display: flex;\n    position: relative; }\n    section #userContent .proList li .proImg {\n      width: 2rem;\n      height: 1.8rem;\n      margin: 0.1rem; }\n      section #userContent .proList li .proImg img {\n        width: 100%;\n        height: 100%; }\n    section #userContent .proList li .proInfo {\n      flex: 1;\n      margin-right: 0.1rem; }\n      section #userContent .proList li .proInfo p {\n        width: 100%; }\n        section #userContent .proList li .proInfo p:nth-child(1) {\n          margin-top: 0.3rem;\n          margin-left: 0.15rem;\n          line-height: 0.4rem;\n          font-size: 0.4rem;\n          font-weight: bold; }\n        section #userContent .proList li .proInfo p:nth-child(2) {\n          display: flex; }\n          section #userContent .proList li .proInfo p:nth-child(2) span {\n            flex: 1;\n            margin-left: 0.15rem;\n            margin-top: 0.4rem;\n            background: -webkit-linear-gradient(top, #ff8bc0, #e4366b);\n            height: 0.8rem;\n            font-size: 0.32rem;\n            color: #fff;\n            text-align: center;\n            line-height: 0.8rem;\n            font-weight: 900;\n            border-radius: 0.2rem; }\n  section #loginContent {\n    display: flex;\n    flex-direction: column;\n    margin: 0.6rem 0.2rem; }\n    section #loginContent input {\n      display: block;\n      flex: 1;\n      height: 0.8rem;\n      margin-bottom: 0.5rem;\n      text-indent: 0.15rem;\n      border-radius: 0.15rem;\n      font-size: 0.32rem;\n      color: #ccc; }\n      section #loginContent input:nth-child(3) {\n        border: 0;\n        color: #fff;\n        background: -webkit-linear-gradient(top, #ff8bc0, #e4366b);\n        font-size: 0.32rem;\n        font-weight: bold; }\n  section #registerContent {\n    display: flex;\n    flex-direction: column;\n    margin: 0.6rem 0.2rem; }\n    section #registerContent input {\n      display: block;\n      flex: 1;\n      height: 0.8rem;\n      margin-bottom: 0.5rem;\n      text-indent: 0.15rem;\n      border-radius: 0.15rem;\n      font-size: 0.32rem;\n      color: #ccc; }\n      section #registerContent input:nth-child(4) {\n        border: 0;\n        color: #fff;\n        background: -webkit-linear-gradient(top, #ff8bc0, #e4366b);\n        font-size: 0.32rem;\n        font-weight: bold; }\n  section #addEditContent .proList li {\n    width: 100%;\n    height: 2rem;\n    background: #fff;\n    display: flex;\n    position: relative; }\n    section #addEditContent .proList li:after {\n      content: \"\";\n      position: absolute;\n      width: 100%;\n      height: 1px;\n      bottom: 0;\n      left: 0;\n      background-color: #000;\n      transform-origin: 0 0;\n      transform: scaleY(0.5); }\n    section #addEditContent .proList li .proImg {\n      width: 2rem;\n      height: 1.8rem;\n      margin: 0.1rem; }\n      section #addEditContent .proList li .proImg img {\n        width: 100%;\n        height: 100%; }\n    section #addEditContent .proList li .proInfo {\n      flex: 1;\n      margin-right: 0.1rem; }\n      section #addEditContent .proList li .proInfo p {\n        width: 100%; }\n        section #addEditContent .proList li .proInfo p:nth-child(1) {\n          margin-top: 0.2rem;\n          line-height: 0.28rem;\n          font-size: 0.24rem;\n          display: -webkit-box;\n          overflow: hidden;\n          white-space: normal !important;\n          text-overflow: ellipsis;\n          word-wrap: break-word;\n          -webkit-line-clamp: 1;\n          -webkit-box-orient: vertical; }\n        section #addEditContent .proList li .proInfo p:nth-child(2) {\n          font-size: 0.3rem;\n          margin-top: 0.05rem; }\n        section #addEditContent .proList li .proInfo p:nth-child(3) {\n          font-size: 0.3rem; }\n          section #addEditContent .proList li .proInfo p:nth-child(3) span {\n            color: #e4366b;\n            font-size: 0.3rem;\n            font-weight: bold; }\n        section #addEditContent .proList li .proInfo p:nth-child(4) {\n          display: flex; }\n          section #addEditContent .proList li .proInfo p:nth-child(4) span {\n            display: block;\n            line-height: 0.4rem;\n            flex: 1;\n            border: 2px solid #ccc;\n            text-align: center; }\n            section #addEditContent .proList li .proInfo p:nth-child(4) span:nth-child(2) {\n              border-left: 0;\n              border-right: 0; }\n  section #cartContent {\n    width: 100%; }\n    section #cartContent #cartList {\n      width: 100%; }\n      section #cartContent #cartList .cartItem {\n        width: 100%;\n        height: 2rem;\n        position: relative; }\n        section #cartContent #cartList .cartItem .deleteItem {\n          position: absolute;\n          right: 0;\n          top: 0;\n          bottom: 0;\n          background-color: #eee;\n          width: 1.2rem;\n          line-height: 2rem;\n          font-size: 0.48rem;\n          color: #e4366b;\n          text-align: center; }\n        section #cartContent #cartList .cartItem .itemBox {\n          display: flex;\n          background-color: #fff;\n          position: absolute;\n          left: 0;\n          top: 0;\n          right: 0;\n          bottom: 0; }\n          section #cartContent #cartList .cartItem .itemBox .itemImg {\n            width: 1.8rem;\n            height: 1.8rem;\n            margin: 0.1rem; }\n            section #cartContent #cartList .cartItem .itemBox .itemImg img {\n              width: 100%;\n              height: 100%; }\n          section #cartContent #cartList .cartItem .itemBox .itemInfo {\n            flex: 1;\n            margin-top: 0.14rem;\n            position: relative;\n            margin-right: 0.2rem; }\n            section #cartContent #cartList .cartItem .itemBox .itemInfo P {\n              width: 100%;\n              font-size: 0.34rem;\n              line-height: 0.42rem;\n              margin-top: 0.01rem; }\n              section #cartContent #cartList .cartItem .itemBox .itemInfo P:nth-child(1) {\n                display: -webkit-box;\n                overflow: hidden;\n                white-space: normal !important;\n                text-overflow: ellipsis;\n                word-wrap: break-word;\n                -webkit-line-clamp: 1;\n                -webkit-box-orient: vertical; }\n              section #cartContent #cartList .cartItem .itemBox .itemInfo P:nth-child(3) {\n                color: #333; }\n        section #cartContent #cartList .cartItem:after {\n          content: \"\";\n          position: absolute;\n          width: 100%;\n          height: 1px;\n          bottom: 0;\n          left: 0;\n          background-color: #000;\n          transform-origin: 0 0;\n          transform: scaleY(0.5); }\n\nfooter {\n  width: 100%;\n  height: 1rem;\n  background-color: #333; }\n  footer ul {\n    widows: 100%;\n    height: 100%;\n    display: flex; }\n    footer ul li {\n      flex: 1;\n      border-top: 0.06rem solid transparent;\n      box-sizing: border-box;\n      display: flex;\n      flex-direction: column;\n      justify-content: center;\n      align-items: center;\n      color: #fff; }\n      footer ul li i.iconfont {\n        font-size: 0.4rem; }\n      footer ul li span {\n        font-size: 0.18rem; }\n  footer #detailFooter ul {\n    widows: 100%;\n    height: 100%;\n    display: flex; }\n    footer #detailFooter ul li {\n      flex: 1;\n      font-size: 0.36rem;\n      line-height: 1rem;\n      text-align: center;\n      color: #fff; }\n\n.acive {\n  border-color: #e4366b;\n  color: #e4366b; }\n", ""]);

	// exports


/***/ },
/* 17 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }
/******/ ]);