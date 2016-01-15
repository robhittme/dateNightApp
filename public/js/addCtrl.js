// Creates the addCtrl Module and Controller. Note that it depends on the 'geolocation' and 'gservice' modules and controllers.
var addCtrl = angular.module('addCtrl', ['geolocation', 'gservice']);
addCtrl.controller('addCtrl', function($scope, $http, $rootScope, geolocation, gservice){

    // Initializes Variables
    // ----------------------------------------------------------------------------
    $scope.formData = {};
    var coords = {};

    // Set initial coordinates to the center of the US

    geolocation.getLocation().then(function(data){
       

        // Display message confirming that the coordinates verified.
        $scope.formData.htmlverified = "Yep (Thanks for giving us real data!)";

        gservice.refresh($scope.formData.address);

    });

    // Functions
    // ----------------------------------------------------------------------------
    

    // Creates a new user based on the form fields
    $scope.createRestaurant = function() {

        // Grabs all of the text box fields
        var restaurantData = {
            name: $scope.formData.name,
            address: $scope.formData.address,
            cuisine: $scope.formData.cuisine,
            htmlverified: $scope.formData.htmlverified
        };

        // Saves the user data to the db
        $http.post('/restaurants', restaurantData).success(function (data) {
            console.log(data);

            // Once complete, clear the form (except location)
            $scope.formData.name = "";
            $scope.formData.address = "";
            $scope.formData.cuisine = "";

            // Refresh the map with new data
            gservice.refresh($scope.formData);

        }).error(function (data) {
            console.log('Error: ' + data);
        });
    };
});