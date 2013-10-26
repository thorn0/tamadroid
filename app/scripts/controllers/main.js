angular.module("tamadroidApp").controller("MainCtrl", function($scope, $interval, appMarket, $modal) {

    $scope.speed = {
        interval: 2000,
        acceleration: 1
    };

	var intervalPromise;
	function setInterval() {
		if (intervalPromise) {
			$interval.cancel(intervalPromise);
		}
		intervalPromise = $interval(function() {
			$scope.rotate += 1;
			$scope.robot.battery = Math.max(0, $scope.robot.battery - 1);
		}, $scope.speed.interval * $scope.speed.acceleration);
	}

	$scope.$watch("speed", setInterval, true);

    $scope.openInstallModal = function() {
        $modal.open({
			templateUrl: "views/install.html",
			scope: $scope
		});
    };

    $scope.recharge = function() {
		if ($scope.robot.battery >= 100) {
			return;
		}
        $scope.robot.battery = Math.min($scope.robot.battery + 10, 100);
        $scope.addXP();
    };
	
	$scope.install = function(app) {
		app = angular.copy(app);
		robot.installedApps.push(app);
		$scope.addXP();
	};

	var robot = $scope.robot = {
		name: "Tamadroid",
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

	$scope.addXP = function() {
		var currentXP = $scope.robot.xp;
		var newXP = currentXP + 10;
		$scope.robot.xp = newXP;
		if (Math.floor(newXP / 100) > Math.floor(currentXP / 100)) {
			$scope.robot.level++;
			alert("Congratulations! You've got level up!\n" +
				"Your new level is " + $scope.robot.level);
		}
	};
	
	
});