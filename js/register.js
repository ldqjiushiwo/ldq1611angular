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
				var user = require('./user');
				var totast = require('./totast');
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
				var User = require("./user");
				User.loadUserHeader();
				User.loadUserContent();	
			})
			$('.registerHeaderBtn').tap(function(){
				var Login = require('./login');
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
				var totast = require('./totast')
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