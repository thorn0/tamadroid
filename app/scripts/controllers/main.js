angular.module("tamadroidApp").controller("MainCtrl", function($scope, $interval, appMarket, $modal) {

    $scope.speed = {
        interval: 1000,
        acceleration: 1
    };
    $scope.name = "Tamadroid";

	var intervalPromise;
    function setInterval() {
        intervalPromise = $interval(function() {
		$scope.rotate += 1;
        $scope.robot.battery--;
	}, $scope.speed.interval * $scope.speed.acceleration);
    }

    $scope.$watch('speed', function() {
      if (intervalPromise) $interval.cancel(intervalPromise);
      setInterval();
    }, true);


    $scope.install = function() {
        $modal.open({
			templateUrl: "views/install.html",
			scope: $scope
		});
    };

    $scope.recharge = function() {
        var currentBattery = $scope.robot.battery;
        var newBattery = currentBattery + 10;
        if (newBattery > 100)
            newBattery = 100;
        $scope.robot.battery = newBattery;
        $scope.addXP();
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

	var batteryColorCache = {}, scale = chroma.scale(["gray", "#a4c639"]).mode('lab').domain([0, 100]);
	$scope.getColorByBattery = function() {
		var bat = Math.floor(robot.battery);
		if (!batteryColorCache[bat]) {
			batteryColorCache[bat] = scale(robot.battery).hex();
		}
		return batteryColorCache[bat];
	};

	$scope.appMarket = appMarket;
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