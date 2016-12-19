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
