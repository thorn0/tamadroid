angular.module("tamadroidApp").controller("MainCtrl", function($scope, $interval, appMarket, $modal) {

    $scope.speed = {
        interval: 1000,
        acceleration: 1
    };
    $scope.name = "Tamadroid";

	$interval(function() {
		$scope.rotate += 1;
        $scope.robot.battery--;
	}, $scope.speed.interval * $scope.speed.acceleration);


    $scope.install = function() {
        $modal.open({
			templateUrl: "views/install.html",
			scope: $scope
		});
    };

	var robot = $scope.robot = {
		battery: 100,
		memory: 70,
        mood: 100,
		installedApps: [
		],
		level: 1,
		xp: 0
	};


	$scope.addXP = function(){

		var currentXP = $scope.robot.xp;
		var newXP = currentXP + 10;

		$scope.robot.xp = newXP;

		if (Math.floor(newXP/100) > Math.floor(currentXP/100)){
			$scope.robot.level++;
			alert("Congratulations! You've got level up!\n" +
				"Your new level is "+$scope.robot.level);
		}

	}
	
	
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