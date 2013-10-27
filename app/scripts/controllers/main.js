angular.module("tamadroidApp").controller("MainCtrl", function($scope, $interval, appMarket, $modal, alert, gameSpeed, firmwareDb) {

    $scope.speed = gameSpeed;
	
	function decreaseMood(obj) {
		var moodDecreaseSize = robot.level * Math.random() / 2;

//		moodDecreaseSize = moodDecreaseSize * ($scope.speed.interval / 2000) / $scope.speed.acceleration;

		obj.moodPoints = Math.max(0, obj.moodPoints - moodDecreaseSize);
	}
	
	var intervalPromise;
	function setInterval() {
		if (intervalPromise) {
			$interval.cancel(intervalPromise);
		}
		intervalPromise = $interval(function() {
			appMarket.updateMarket();
			dischargeTick();
//			robot.battery = Math.max(0, robot.battery - 1);
			decreaseMood(robot);
			robot.mood = robot.moodPoints;
			for (var i = 0; i < robot.installedApps.length; i++) {
				var app = robot.installedApps[i];
				decreaseMood(app);
				robot.mood += app.moodPoints;
			}
			robot.mood = Math.max(0, robot.mood);
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
		if (robot.battery >= robot.batteryMax) {
			return;
		}
		robot.battery = Math.min(robot.battery + robot.batteryMax/10, robot.batteryMax);
		$scope.addXP();
	};
	
	$scope.install = function(app) {
		app = angular.copy(app);
		if (!app.size) {
			app.size = 10;
		}
		if (!app.moodPoints) {
			app.moodPoints = 10;
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

	$scope.uninstall = function(app) {
		for (var i = 0; i < robot.installedApps.length; i++) {
			var installedApp = robot.installedApps[i];
			if (installedApp.name === app.name) {
				robot.installedApps.splice(i, 1);
				break;
			}
		}
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
	}, true);
	
	var robot = $scope.robot = {
		name: "Tamadroid",
		battery: 700,
		batteryMax: 700,
		memory: 0,
		systemMemory: 20,
        mood: 100,
		moodPoints: 100,
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
		var currentXP = robot.xp;
		var newXP = currentXP + 10;
		robot.xp = newXP;
		if (Math.floor(newXP / 100) > Math.floor(currentXP / 100)) {
			robot.level++;
			alert("<strong>Congratulations!</strong> You've got level up!<br>" +
				"Your new level is " + robot.level);
		}
	};

	var dischargeTick = function(){
		var batteryDecreaseSize = 5;
		var apps = robot.installedApps;
		for(var i = 0; i<apps.length; i++){
			var app = apps[i];

			batteryDecreaseSize += app.batteryUsage || 1;
		}

//		batteryDecreaseSize = batteryDecreaseSize * ($scope.speed.interval / 2000) / $scope.speed.acceleration;

		robot.battery = Math.max(0, robot.battery - batteryDecreaseSize);
	}

	$scope.getBatteryLevel = function(){
		return $scope.robot.battery / $scope.robot.batteryMax * 100;
	}

	$scope.getFirmwareVersion = function(){
		return firmwareDb[robot.level - 1].name;
	}
	
});