// Creates the gservice factory. This will be the primary means by which we interact with Google Maps
angular.module('gservice', [])
    .factory('gservice', function($rootScope, $http){

        // Initialize Variables
        // -------------------------------------------------------------
        // Service our factory will return
        var googleMapService = {};
        var initialLocation = '90 Sheppard St. Charleston SC';
        var geocoder = new google.maps.Geocoder();

       
        // Functions
        // --------------------------------------------------------------


        // Get address for the restaurant
        function geocodeAddress(geocoder, resultsMap, restaurantLocation) {
            if(restaurantLocation){
                var address = restaurantLocation;
                var icon = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
            } else {
                var address = initialLocation;
                var icon = "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
            }
 
          new google.maps.Geocoder().geocode({'address': address}, function(results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
              resultsMap.setCenter(results[0].geometry.location);
              var marker = new google.maps.Marker({
                map: resultsMap,
                position: results[0].geometry.location,
                icon: icon
              });
            } else {
              console.log('Geocode was not successful for the following reason: ' + status);
            }
          });
        };

        // Refresh the Map with new data.
        googleMapService.refresh = function( location, filterResults){

            console.log(filterResults);

            $http.get('/restaurants').success(function(response){

                if(filterResults){
                    initialize(response, true);
                } else {
                    initialize(response, false);
                }

            }).error(function(){});
            
        };

    
        // Initializes the map
        var initialize = function(locations, filter) {

            var mapOptions = {
              zoom: 14,
              center: { address: initialLocation }
            };

            map = new google.maps.Map(document.getElementById("map"), mapOptions);
        
            // Loop through each location in the array and place a marker
            locations.forEach(function(n, i){

                var  contentString =
                        '<p><b>Restaurant</b>: ' + n.username +
                        '<br><b>Address</b>: ' + n.address +
                        '<br><b>Cuisine</b>: ' + n.cuisine +
                        '</p>';

                var marker = new google.maps.Marker({
                    position: n.address,
                    map: map,
                    title: "Big Map",
                    message: new google.maps.InfoWindow({
                            content: contentString,
                            maxWidth: 200
                          })
                });


           // For each marker created, add a listener that checks for clicks
               marker.addListener('click', function() {
                    marker.message.open(map, marker);
                });

                geocodeAddress(geocoder, map, n.address);

            });

            geocodeAddress(locations, map);
        };


        google.maps.event.addDomListener(window, 'load', googleMapService.refresh());
        return googleMapService;
    });

