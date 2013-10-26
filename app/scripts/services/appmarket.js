angular.module("tamadroidApp").factory("appMarket", function() {

	var marketApps = [
		{ name: "FooApp", ver: 1, author: "Acme Corp." },
		{ name: "BarApp", ver: 2 },
		{ name: "Ingress", ver: 10 }
	];
	
	var lastUpdate = new Date();
	
	function updateMarket() {
		if (new Date() - lastUpdate > 10000) {
			lastUpdate = new Date();
			angular.forEach(marketApps, function(app) {
				app.ver = (app.ver || 1) + 1;
			});
		}
	}
	
	return {
		getAvailableApps: function() {
			updateMarket();
			return marketApps;
		}
	};

});