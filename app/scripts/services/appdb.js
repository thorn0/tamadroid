angular.module("tamadroidApp").factory("appDb", function() {
	var db = [ {
		name: "Google Play services",
		author: "Google"
	}, {
		name: "Maps",
		author: "Google"
	}, {
		name: "Gmail",
		author: "Google"
	}, {
		name: "YouTube",
		author: "Google"
	}, {
		name: "Facebook",
		author: "Facebook"
	}, {
		name: "Angry Birds",
		author: "Rovio Mobile Ltd."
	}, {
		name: "Skype",
		author: "Skype",
		batteryUsage: 30
	}, {
		name: "Twitter",
		author: "Twitter"
	}, {
		name: "Adobe Reader",
		author: "Adobe Systems"
	}, {
		name: "Google+",
		author: "Google"
	}, {
		name: "Instagram",
		author: "Instagram"
	}, {
		name: "Google Play Music",
		author: "Google"
	}, {
		name: "Dropbox",
		author: "Dropbox, Inc."
	}, {
		name: "Hangouts",
		author: "Google"
	}, {
		name: "Foursquare",
		author: ""
	}, {
		name: "Ingress",
		author: "Niantic",
		batteryUsage: 20
	}, {
		name: "Fruit Ninja Free",
		author: "Halfbrick Studios"
	}, {
		name: "Google Play Books",
		author: "Google"
	}, {
		name: "Voice Search",
		author: "Google"
	}, {
		name: "Chrome Browser - Google",
		author: "Google"
	}, {
		name: "Google Translate",
		author: "Google"
	} ];
	var backup = angular.copy(db);
	db.restore = function() {
		db.length = 0;
		db.push.apply(db, backup);
	};
	return db;
});