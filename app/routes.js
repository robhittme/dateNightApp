// Dependencies
var mongoose               = require('mongoose');
var Restaurant            = require('./model.js');


// Opens App Routes
module.exports = function(app) {

    // GET Routes
    // --------------------------------------------------------
    // Retrieve records for all restaurants in the db
    app.get('/restaurants', function(req, res){

        // Uses Mongoose schema to run the search (empty conditions)
        var query = Restaurant.find({});
        query.exec(function(err, restaurants){
            if(err)
                res.send(err);

            // If no errors are found, it responds with a JSON of all restaurants
            res.json(restaurants);
        });
    });

    // Retrieve records of individual restaurant
    app.get('/restaurant/:restaurant_id', function(req, res) {

        console.log(req.params.restaurant_id);
        Restaurant.findById(req.params.restaurant_id, req.body, function (err, post) {
        if (err) return console.log(err);
        res.json(post);
      });
    });

    // POST Routes
    // --------------------------------------------------------
    // Provides method for saving new restaurants in the db
    app.post('/restaurants', function(req, res){

        // Creates a new User based on the Mongoose schema and the post bo.dy
        var newRestaurant = new Restaurant(req.body);

        // New User is saved in the db.
        newRestaurant.save(function(err){
            if(err)
                res.send(err);

            // If no errors are found, it responds with a JSON of the new user
            res.json(req.body);
        });
    });

    // DELETE Routes
    // --------------------------------------------------------

    app.delete('/restaurant/:restaurant_id', function(req, res){

        Restaurant.remove({
            _id: req.params.restaurant_id
        }, function(err, restaurant){
            console.log("RESPONSE AFTER DELETE");
            if (err) {
                console.log("DELETE ERROR");
                res.send(err);
            }

            // get and return all the restaurants after you delete.
            Restaurant.find(function(err, restaurants){
                if(err) {
                    res.send(err)
                }
                res.json(restaurants);
            });
        });
    });

    // UPDATE Routes
    // --------------------------------------------------------

    app.put('/restaurant/:restaurant_id', function(req, res){

        console.log("REQ.PARAMS.RESTAURANT_ID: " + req.params.restaurant_id);
        console.log(req.body);

        var query = {_id: req.params.restaurant_id};

        Restaurant.update(query, {$set: {name: req.body.name, address: req.body.address, cuisine: req.body.cuisine }}, null, function (err, post) {
            console.log("POST: " + post);
            if (err) return console.log(err);
            res.json(post);
          });
    });
    


    //TODO: SUCCESSFULLY SEARCH FOR RESTAURANT BASED ON CUISINE.

    app.post('/query/', function(req, res){

       var searchCuisine = JSON.stringify(req.body.cuisine);

       console.log("SEARCH CUISINE: " + searchCuisine);
       console.log("REQ.BODY: " + req.body.cuisine);

       // Restaurant.$where('cuisine' === searchCuisine).exec(function(err, results){
       //   console.log(results);
       // });


        Restaurant.find({'cuisine': req.body.cuisine}, 'name address cuisine', function(err, restaurants){
            console.log("RESTAURANT: " + restaurants);
         
            res.json(restaurants);
        })
       // if(cuisine){
       //      query = query.where('cuisine').equals(searchCuisine);
       // };
    
        // query.exec(function(err, restaurants){
        //     if(err)
        //         res.send(err);
        //     else
        //         console.log("RESTAURANTS: " + restaurants);
        //         res.json(restaurants);
        // })
       
    });
};