var viewAllCtrl = angular.module('viewAllCtrl', ['geolocation', 'gservice']);
viewAllCtrl.controller('viewAllCtrl', function($scope, $http, $rootScope, geolocation, gservice){




    function getAllRestaurants(){
        
        $http.get('/restaurants').success(function(response){
            $scope.restaurants = response;
        });
    };


    $scope.testing = function(){

       $scope.showEdit = true;
    }
    // Creates a new user based on the form fields
    $scope.deleteRestaurant = function(restaurantData) {

        console.log(restaurantData);

        // Saves the user data to the db
        $http.delete('/restaurant/' + restaurantData._id, restaurantData)
            .success(function (data) {

                
                // Refresh the map with new data
                gservice.refresh($scope.formData);
                getAllRestaurants();
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

    $scope.updateRestaurant = function(restaurantData){
        console.log(restaurantData);

        $http.put('/restaurant/' + restaurantData._id, restaurantData)
            .success(function(data){

                gservice.refresh(restaurantData);
                getAllRestaurants();
            })
            .error(function(err){
                console.log('Error: ' + err);
            })
    }

    getAllRestaurants();
}); 