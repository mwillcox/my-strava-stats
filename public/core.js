var stravaStats = angular.module('stravaStats', []);

function mainController($scope, $http) {

  $http.get('/api/strava/stats')
    .success(function(data) {
      $scope.stats = data;
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });

  $http.get('/api/strava/athelete')
    .success(function(data) {
      $scope.athelete = data;
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });

  $http.get('/api/strava/activities')
    .success(function(data) {
      $scope.activities = data;
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });
    

  function getMiles(i) {
     return i*0.000621371192;
  }

}