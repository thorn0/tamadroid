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
});