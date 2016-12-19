//引入每一个页面所用的js，其实就是每一个模块
var Home = require("./home");
var Kind = require("./Kind");
var Cart = require("./cart");
var User = require("./user");
var More = require("./more");
var Foot = require("./Foot");

//引入我们需要的css文件
require("../css/style.scss");
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