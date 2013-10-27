angular.module("tamadroidApp").factory("appMarket", function(appDb, filterFilter) {

	function random(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	
	function extractRandomElement(array) {
		var i = random(0, array.length - 1);
		return array.splice(i, 1)[0];
	}

	var activeApps = [
		{ name: "FooApp", ver: 1, author: "Acme Corp." },
		{ name: "BarApp", ver: 2 },
		{ name: "Ingress", ver: 10, batteryFactor: 2 }
	];
	
	var abandonedApps = [ ];
	
	var lastUpdate = new Date();
	
	function createNewApp() {
		if (!appDb.length) {
			appDb.restore();
		}
		var app = extractRandomElement(appDb);
		var allMarketApps = activeApps.concat(abandonedApps);
		while (filterFilter(allMarketApps, { name: app.name }, true).length) {
			app.name = makeNameMoreUnique(app.name);
		}
		if (!app.ver) {
			app.ver = 1;
		}
		activeApps.push(app);
	}
	
	function abandonSomeApp() {
		if (!activeApps.length) {
			return;
		}
		var app = extractRandomElement(activeApps);
		abandonedApps.push(app);
	}
	
	function updateSomeApp() {
		if (!activeApps.length) {
			return;
		}
		var i = random(0, activeApps.length - 1);
		var app = activeApps[i];
		app.ver = (app.ver || 1) + 1;
	}
	
	var nameModifiers = [ "Plus", "2014", "Extra", "Premium", "Special Edition" ];
	
	function makeNameMoreUnique(name) {
		return name + " " + nameModifiers[random(0, nameModifiers.length - 1)];
	}
	
	return {
		getAvailableApps: function() {
			return activeApps.concat(abandonedApps);
		},
		updateMarket: function() {
			var amountOfChanges = Math.floor((new Date() - lastUpdate) / 10000);
			if (amountOfChanges <= 0) {
				return;
			}
			lastUpdate = new Date();
			for (var i = 0; i < amountOfChanges; i++) {
				var rnum = Math.random();
				if (rnum < 0.2) {
					createNewApp();
				} else if (rnum > 0.9) {
					abandonSomeApp();
				} else {
					updateSomeApp();
				}
			}
		}
	};

});