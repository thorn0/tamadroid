angular.module("tamadroidApp").controller("MainCtrl", function($scope, $interval, appMarket, $modal) {

	$scope.rotate = 0;
	
	$interval(function() {
		$scope.rotate += 1;
	}, 500);

    $scope.name = "Tamadroid";

    $scope.install = function() {
        $modal.open({
			templateUrl: "views/install.html",
			scope: $scope
		});
    }

    $scope.var = {
        current: 90,
        total: 100
    };

	
	var robot = $scope.robot = {
		battery: 100,
		memory: 1000,
		freeMemory: 700,
		installedApps: [
		],
		level: 1,
		xp: 0
	};


	
	
	
}).factory("appMarket", function() {

	var marketApps = [
		{ name: "FooApp", ver: 1 },
		{ name: "BarApp", ver: 2 }
	];
	
	var lastUpdate = new Date();
	
	function updateMarket() {
		if (new Date() - lastUpdate > 10000) {
			lastUpdate = new Date();
			angular.forEach(marketApps, function(app) {
				app.ver++;
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