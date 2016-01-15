// app.js

// Declares the initial angular module "meanMapApp". Module grabs other controllers and services. Note the use of ngRoute.
var app = angular.module('DateNightApp', ['addCtrl', 'queryCtrl', 'viewAllCtrl', 'geolocation', 'gservice', 'ngRoute'])

    // Configures Angular routing -- showing the relevant view and controller when needed.
    .config(function($routeProvider){

        // Join Team Control Panel
        $routeProvider

        .when('/join', {
            controller: 'addCtrl', 
            templateUrl: 'partials/addForm.html',

        })
        .when('/find', {
            controller: 'queryCtrl',
            templateUrl: 'partials/queryForm.html'

        })
        .when('/viewAll', {
            controller: 'viewAllCtrl',
            templateUrl: 'partials/restaurantList.html'

        })
        .otherwise({redirectTo:'/join'})
    });