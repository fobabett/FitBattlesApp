angular.module('starter.controllers', ['ionic'])

.controller('DashCtrl', function($scope) {})

.controller('LoginCtrl', function($scope, Session, $state, $ionicPopup) {
    $scope.data = {};
    $scope.login = Session.login;
    $scope.login = function() {
      Session.login ({user: $scope.data.user, username: $scope.data.username, password: $scope.data.password}) 
      .success(function(data) {
          if(data.success) {
            console.log(data.success);
            console.log(Session.loggedIn);
            Session.loggedIn = true;
            $state.go('tab.dash');
            console.log(Session.loggedIn);
          }
          else {
            var alertPopup = $ionicPopup.alert({
              title: 'Login failed!',
              template: 'Please check your credentials!'
            });
          }
        })
        .error(function (error) {
          console.log(error);
        });
    }
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
  $scope.remove = function(friend) {
    Friends.remove(friend);
  }
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope, $http, $ionicPopup, $timeout) {
  $http.post('http://localhost:4000/progress/json')
    .success(function(data) {
      
    })
  $http.get('http://localhost:4000/progress/json')
    .success(function(data) {
      console.log(data);
      $scope.username = data.username;

      $scope.startingWeight = data.startingWeight;
      $scope.currentWeight = data.currentWeight;
      $scope.goalWeight = data.goalWeight;

      $scope.weightLeft = data.currentWeight - data.goalWeight;
      $scope.health = data.startingWeight - data.goalWeight;
      $scope.attack = data.currentWeight - data.goalWeight;
      $scope.weightLost = data.currentWeight - $scope.health;

      $scope.showAlert = function() {
        var alertPopup = $ionicPopup.alert({
          title: 'Attacked for '+ $scope.attack+' HP!',
          template: $scope.weightLeft + ' pounds to go!'
        });
      };

      $scope.showPopup = function() {
        $scope.data = {}
      
        // popup for weight input
        var weightPromptPopup = $ionicPopup.show({
          template: '<input type="text" ng-model="data.currentWeight">',
          title: 'Enter New Weight',
          subTitle: 'Attack With Your Weight Loss',
          scope: $scope,
          buttons: [
            { text: 'Cancel' },
            {
              text: '<b>Attack!</b>',
              type: 'button-positive',
              id: 'attack',
              onTap: function(e) {
                if (!$scope.data.currentWeight) {
                  e.preventDefault();
                } else {
                  $scope.showAlert();
                }
              }
            }
          ]
      });
      weightPromptPopup.then(function(res) {
        // console.log('Tapped!', res);

      });
      // $timeout(function() {
      //    weightPromptPopup.close(); 
      // }, 2000);
    };
  });

  $scope.settings = {
    enableFriends: true
  };

});
