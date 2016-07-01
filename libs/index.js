
						// Routes Mapped functions
/*=========================================================================*/


module.exports.index1 = index1;


						// Main classes and process
/*=========================================================================*/


function index1(req, callback) {
	var context = { "name": "Alan", "hometown": "Somewhere, TX",
             "kids": [{"name": "Jimmy", "age": "12"}, {"name": "Sally", "age": "4"}]};
    callback(context, 200);
}