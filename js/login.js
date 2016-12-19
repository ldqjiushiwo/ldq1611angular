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
				var totast = require('./totast');
				if(data=="0"){
					totast.makeText('用户名不存在',2000)
				}else{
					if(data=="2"){
						totast.makeText('密码错误',2000)
					}else{
						localStorage.setItem('islogin','ok');
						localStorage.setItem('userID',userID);
						if(type=="user"){
							var User = require("./user");
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
					var User = require("./user");
					User.loadUserHeader();
					User.loadUserContent();	
				})
			}else{
				if(type=="home"){
					$('#back').tap(function(){
						var Home = require("./home");
						Home.loadHomeHeader();
						Home.loadHomeContent();	
					})
				}
			}
			$('.loginHeaderBtn').tap(function(){
				var Register = require('./register');
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
				var totast = require('./totast');
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