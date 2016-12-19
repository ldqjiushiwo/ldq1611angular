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
					var User = require('./user');
					User.loadUserHeader("user");
					User.loadUserContent();
					$('#footer').find('li').eq(3).addClass('acive').siblings().removeClass('acive');
				})
				$('.btn2').tap(function(){
					localStorage.setItem('islogin','false');
					var Login = require('./login');
					Login.loadLoginHeader("user");
					Login.loadLoginContent();
					$('#footer').find('li').eq(3).addClass('acive').siblings().removeClass('acive');
				})
			}
		})
	}
}
