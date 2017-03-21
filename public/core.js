var stravaStats = angular.module('stravaStats', [])
  .directive('onFinishRender',['$timeout', '$parse', function ($timeout, $parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('ngRepeatFinished');
                    if(!!attr.onFinishRender){
                      $parse(attr.onFinishRender)(scope);
                    }
                });
            }
        }
    }
}]);

function mainController($scope, $http) {

  $scope.newActivities= [];

  $scope.onLoad = function(){
    
    $http.get('/api/strava/athelete')
    .success(function(data) {
      $scope.athelete = data;
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });
    
    $http.get('/api/stats')
      .success(function(data) {
        $scope.stats = data[0];
        $scope.stats.ytd_ride_totals.distance = getMiles($scope.stats.ytd_ride_totals.distance).toFixed(2);
        $scope.stats.ytd_ride_totals.moving_time = Math.floor($scope.stats.ytd_ride_totals.moving_time / 60);
      })
      .error(function(data) {
        console.log('Error: ' + data);
    });

    $http.get('/api/strava/activities')
      .success(function(data) {
        $scope.activity = data[0];
        //populate dynamically
        buildActivties(data.slice(5));
      })
      .error(function(data) {
        console.log('Error: ' + data);
    });

  };

  var buildActivties = function(data){
    for (var i = 0; i < 5; i++){
      var activity = {
        name: data[i].name,
        distance: getMiles(data[i].distance).toFixed(2),
        map: data[i].map.summary_polyline
      };
      $scope.newActivities.push(activity);
      
    }
    console.log($scope.newActivities);
  };

  $scope.buildMaps = function(){
    for (var i = 0; i < $scope.newActivities.length; i++){
      var myLatLng = new google.maps.LatLng(37.773972, -122.431297);
      var mapOptions = {
        zoom: 12,
        center: myLatLng,
        mapTypeId: google.maps.MapTypeId.TERRAIN
      };

      var route;
       var map = new google.maps.Map(document.getElementById("map-" + i),
        mapOptions);

       // Construct the polygon
      route = new google.maps.Polygon({
        paths: google.maps.geometry.encoding.decodePath($scope.newActivities[i].map),
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0
      });

      route.setMap(map);
      map.setCenter(route.getPath().getAt(Math.round(route.getPath().getLength() / 2)));
    }
  }


  function getMiles(i) {
     return i*0.000621371192;
  }

}