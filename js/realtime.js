var app = angular.module('app', ['firebase']);
app.controller('chatCtrl', ['$scope', '$firebase', function($scope, $firebase) {
	var name = prompt("Nick Name: ", '');
	var image = "https://ptetutorials.com/images/user-profile.png";
	$scope.name = name;
	$scope.chatMessage = "";
	if (name && $scope.chatMessage != null) {
		
		var ref = new Firebase("https://laravelfirebase-5724e.firebaseio.com/");
		var sync = $firebase(ref);
		$scope.chatMessages = sync.$asArray();
		$scope.sendChat = function() {
			var chatMessage = {
				name: name,
				image: image,
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


