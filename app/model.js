// Pulls Mongoose dependency for creating schemas
var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

// Creates a Restaurant Schema. This will be the basis of how restaurant data is stored in the db
var RestaurantSchema = new Schema({
    name: {type: String, required: true},
    address: {type: String, required: true},
    cuisine: {type: String, required: true},
    htmlverified: String,
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now},
});

// Sets the created_at parameter equal to the current time
RestaurantSchema.pre('save', function(next){
    now = new Date();
    this.updated_at = now;
    if(!this.created_at) {
        this.created_at = now
    }
    next();
});

// mongoose.connect('localhost:3000/db');
// // Indexes this schema in 2dsphere format (critical for running proximity searches)
RestaurantSchema.index({location: '2dsphere'});

// Exports the RestaurantSchema for use elsewhere. Sets the MongoDB collection to be used as: "scotch-users"
module.exports = mongoose.model('date-night', RestaurantSchema);
 