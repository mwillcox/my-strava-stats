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
        $scope.activity = data[0];
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });
    

  function getMiles(i) {
     return i*0.000621371192;
  }

  $scope.onLoad = function(){

    var myLatLng = new google.maps.LatLng(37.773972, -122.431297);
    var mapOptions = {
      zoom: 12,
      center: myLatLng,
      mapTypeId: google.maps.MapTypeId.TERRAIN
    };

    var bermudaTriangle;

    var map = new google.maps.Map(document.getElementById('map'),
      mapOptions);


    // Construct the polygon
    bermudaTriangle = new google.maps.Polygon({
      paths: google.maps.geometry.encoding.decodePath("}{teFdocjViDv@O|AzRtuCpyAoQzCp]zCCz@~G`EEt@rHjKe@`G`q@P|U`FpQi@|EsBgEuDqB{C~Bo@`C`CdL{@~A{Bi@zBhGk@|EbAjFKnLnBrF`@rKo@tCnCrIkBnErD|GaCfJn@~PpAhGnC_@nB|DpHcCpGvAfH}Hg@`CsHlGa@~H`@fGdCbFeDdHfHxT[hEjBfJyDb@|@bSiHvAtE`@`BxKiBdGeCBZnFbEg@oAfGtD~SwA~HeBhBpHY`@lGbB?rAnG{M|AwNq@qD`Fob@jBeKjK}Cl@[gFdCbBsB}@HwG|AWFrGnD}DSlBm@KbA{CiDyAE~AM{B_HuFkDl@kCat@iMV}BlBcFcIZgCoAdCgCwDzBeTqD_RzAaIeBsGsGw@tCdGyCqF|A?NsMYgR{B{H{b@kMoFNcKcJaFn@gKsC}ScNnRAtAwBjJqB|@oKrD_G|FcDCmI_DcMOaJtJwB|AeGxIqCjBaJ|AUzCcG~Bm@fA`D~ABq@_KfIoB_PsiCcBeBiKnA_C_FeFw|@YuKfA["),
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0
    });

    bermudaTriangle.setMap(map);
    map.setCenter(bermudaTriangle.getPath().getAt(Math.round(bermudaTriangle.getPath().getLength() / 2)));
  
  }

}