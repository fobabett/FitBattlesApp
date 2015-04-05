angular.module('starter.services', [])

.factory('Session', function($http) {
  console.log('Session');
  return {
    loggedIn: false,
    login: function(credentials) {
      return $http.post("http://localhost:4000/validateUser", credentials)
    }
  }
})

.factory('Friends', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var friends = [{
    id: 0,
    name: 'Darth Vader',
    rank: 1,
    points: 9001,
    // lastText: 'You on your way?',
    face: 'http://www.thegrafton.com/wp-content/uploads/2014/06/darth-vader-thumbs-up.jpg'
  }, {
    id: 1,
    name: 'Han Solo',
    rank: 2,
    points: 800,
    // lastText: 'Hey, it\'s me',
    face: 'http://i2.cdnds.net/12/44/618x500/movies_star_wars_bts_pics_2.jpg'
  }, {
    id: 2,
    rank: 3,
    points: 150,
    name: 'Chewbacca',
    // lastText: 'Did you get the ice cream?',
    face: 'http://cdn.business2community.com/wp-content/uploads/2015/01/Chewbacca.jpg'
  }];

  return {
    all: function() {
      return friends
    },
    get: function(friendId) {
      for (var i = 0; i < friends.length; i++) {
        if (friends[i].id === parseInt(friendId)) {
          return friends[i];
        }
      }
      return null;
    }
  };
});
