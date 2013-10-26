angular.module("tamadroidApp").controller("MainCtrl", function($scope, $interval) {

    $scope.speed = {
        interval: 1000,
        acceleration: 1
    };
    $scope.name = "YourName";

	$interval(function() {
		$scope.rotate += 1;
        $scope.robot.battery--;
	}, $scope.speed.interval * $scope.speed.acceleration);

    $scope.install = function() {
        //test action
        $scope.name = "Qwerty";
    }

	var robot = $scope.robot = {
		battery: 100,
		memory: 70,
        mood: 100,
		installedApps: [
		]
	};
	
	
}).factory("appMarket", function() {

	var marketApps = [
		{ name: "FooApp", ver: 1 },
		{ name: "BarApp", ver: 2 }
	];
	
	function updateMarket() {
	
	}
	
	return {
		getAvailableApps: function() {
			updateMarket();
			return marketApps;
		}
	};

});