angular.module("tamadroidApp").controller("MainCtrl", function($scope, $interval) {

	$scope.rotate = 0;
	
	$interval(function() {
		$scope.rotate += 1;
	}, 500, 10);

    $scope.name = "Tamadroid";
});