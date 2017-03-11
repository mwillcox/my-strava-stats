var stravaStats = angular.module('stravaStats', []);

function mainController($scope, $http) {

  $http.get('/api/stats')
    .success(function(data) {
      $scope.stats = data[0];
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
      $scope.activities = data.slice(0,10);

    })
    .error(function(data) {
      console.log('Error: ' + data);
    });
    

  function getMiles(i) {
     return i*0.000621371192;
  }

}