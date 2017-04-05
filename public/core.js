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

  $scope.activities= [];

  $scope.onLoad = function(){
    //Grabs stats that are stored in MongoDB
    $http.get('/api/stats')
      .success(function(data) {
        $scope.stats = data[0];
        $scope.stats.ytd_ride_totals.distance = getMiles($scope.stats.ytd_ride_totals.distance).toFixed(2);
        $scope.stats.ytd_ride_totals.moving_time = Math.floor($scope.stats.ytd_ride_totals.moving_time / 60);
      })
      .error(function(data) {
        console.log('Error: ' + data);
    });
    //Grabs activities from Strava API
    $http.get('/api/strava/activities')
      .success(function(data) {
        buildActivties(data.slice(4));
      })
      .error(function(data) {
        console.log('Error: ' + data);
    });

  };
  //Gets fields that we need from activities
  //TODO: This data modeling should be done on backend
  var buildActivties = function(data){
    for (var i = 0; i < 4; i++){
      var activity = {
        name: data[i].name,
        distance: getMiles(data[i].distance).toFixed(2),
        map: data[i].map.summary_polyline,
        time: Math.floor(data[i].moving_time / 60)
      };
      $scope.activities.push(activity);
    }
  };
  //Once $scope.activities is populated, generate a map from the activity's polyline
  $scope.buildMaps = function(){
    for (var i = 0; i < $scope.activities.length; i++){
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
        paths: google.maps.geometry.encoding.decodePath($scope.activities[i].map),
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

  //Converts km to miles
  function getMiles(i) {
     return i*0.000621371192;
  }
}