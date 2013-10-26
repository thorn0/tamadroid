angular.module("tamadroidApp").controller("MainCtrl", function($scope, $interval) {

	$scope.rotate = 0;
	
	$interval(function() {
		$scope.rotate += 1;
	}, 500, 10);

    $scope.name = "YourName";

    $scope.install = function() {
        //test action
        $scope.name = "Qwerty";
    }

    $scope.var = {
        current: 90,
        total: 100
    };

    $scope.name = "YourName";
	
	var robot = $scope.robot = {
		battery: 100,
		memory: 1000,
		freeMemory: 700,
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