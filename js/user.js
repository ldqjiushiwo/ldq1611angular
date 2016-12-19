module.exports = {
	loadUserHeader:function(){
		$("#header").load("html/user.html #userHeader",function(){
			console.log("ok")
			$('#back').tap(function(){
				var Home = require("./home");
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
				var Login = require('./login');
				Login.loadLoginHeader("user");
				Login.loadLoginContent();
			})
			$('.registerBtn').tap(function(){
				var Register = require('./register');
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
