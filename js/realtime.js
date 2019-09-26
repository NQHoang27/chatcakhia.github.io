var app = angular.module('app', ['firebase']);
app.controller('chatCtrl', ['$scope', '$firebase', function($scope, $firebase) {
	var name = prompt("Nick Name: ", '');
	var image = "https://ptetutorials.com/images/user-profile.png";
	$scope.name = name;
	$scope.chatMessage = "";
	if (name != "") {
		var date = new Date();
		var strDate = date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear();
		var hours = date.getHours();
		var min = date.getMinutes();
		var ref = new Firebase("https://chatcakhia.firebaseio.com");
		var sync = $firebase(ref);
		$scope.chatMessages = sync.$asArray();
		$scope.sendChat = function() {
			var chatMessage = {
				name: name,
				image: image,
				strDate: strDate,
				hours: hours,
				min: min,
				message: $scope.chatMessage
			};
			$scope.chatMessages.$add(chatMessage);
			$scope.chatMessage = "";
		}
		$scope.clear = function() {
			for(var i = 0; i < $scope.chatMessages.length; i++) {
				$scope.chatMessages.$remove($scope.chatMessages[i]);
			}
		}
	} else {
		alert('Vui lòng điền nickname để tiếp tục! :)');
		location.reload();
	}
}]);



