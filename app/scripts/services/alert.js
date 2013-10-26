angular.module("tamadroidApp").factory("alert", function($rootScope, $timeout) {
	
	$rootScope.alerts = [ ];
	
	$rootScope.closeAlert = function(alert) {
		for (var i = 0; i < $rootScope.alerts.length; i++) {
			if ($rootScope.alerts[i] === alert) {
				$rootScope.alerts.splice(i, 1);
				break;
			}
		}
	};
	
	return function (msg, type, time) {
		var alert = {
			msg: msg,
			type: type || "success"
		};
		$rootScope.alerts.push(alert);
		$timeout(function() {
			$rootScope.closeAlert(alert);
		}, time || 30000);
	};

});