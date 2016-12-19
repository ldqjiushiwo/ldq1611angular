module.exports = {
	loadFoot: function() {
		$('#footer').load("html/foot.html", function() {
			var Home = require("./home");
			var Kind = require("./Kind");
			var Cart = require("./cart");
			var User = require("./user");
			var More = require("./more");
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