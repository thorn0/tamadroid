angular.module("tamadroidApp").controller("MainCtrl", function($scope, $interval, appMarket, $modal, alert, gameSpeed) {

    $scope.speed = gameSpeed;
	
	var intervalPromise;
	function setInterval() {
		if (intervalPromise) {
			$interval.cancel(intervalPromise);
		}
		intervalPromise = $interval(function() {
			appMarket.updateMarket();
			$scope.robot.battery = Math.max(0, $scope.robot.battery - 1);
		}, $scope.speed.interval * $scope.speed.acceleration);
	}

	$scope.$watch("speed", setInterval, true);

    $scope.openInstallModal = function() {
		appMarket.updateMarket();
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
		if (!app.size) {
			app.size = 10;
		}
		if (app.size + robot.memory > 100) {
			alert("Not enough memory", "error");
			return;
		}
		app.installed = new Date();
		for (var i = 0; i < robot.installedApps.length; i++) {
			var installedApp = robot.installedApps[i];
			if (installedApp.name === app.name) {
				if (installedApp.ver === app.ver) {
					return;
				}
				robot.installedApps.splice(i, 1);
				break;
			}
		}
		robot.installedApps.push(app);
		$scope.addXP();
		alert(app.name + " v. " + app.ver + " has been installed");
	};

	$scope.$watch("robot.installedApps", function() {
		robot.memory = robot.systemMemory;
		for (var i = 0; i < robot.installedApps.length; i++) {
			robot.memory += robot.installedApps[i].size;
		}
		if (robot.memory > 100) {
			robot.memory = 100;
		}
		$scope.eyeSize = 8;
		if (robot.memory > 50) {
			$scope.eyeSize = Math.round($scope.eyeSize * (1 + (robot.memory - 50) / 100));
		}
			console.log($scope.eyeSize);
	}, true);
	
	var robot = $scope.robot = {
		name: "Tamadroid",
		battery: 100,
		memory: 0,
		systemMemory: 20,
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
			alert("<strong>Congratulations!</strong> You've got level up!<br>" +
				"Your new level is " + $scope.robot.level);
		}
	};
	
});