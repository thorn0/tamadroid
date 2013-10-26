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
		]
	};

	$scope.appMarket = appMarket;

});