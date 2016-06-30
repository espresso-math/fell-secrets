/*=======================================================================================================================
/
/										The Routes Table.
/						      Everything gets piped in and piped out here.
/
========================================================================================================================*/
var fell_secrets = require('./libs/fell-secrets');

module.exports = {
	// The get routes
	get_coordinate: function(data, hroute) { // Queries the database for coordinates.
		hroute("coordinates", this.x200()); // hroute means hook route
	},
	get_gravatar: function() {

	},
	get_index: function(data, hroute) {
		fell_secrets.get_index(data, function(val, err) {
			hroute(val, err);
		});
	},
	// The post routes
	post_coordinate: function() { // Posts a new query to database.

	},
	// The hroutes
	x200: function() { // 200 success
		var date = new Date();
		console.log("#=> 200 finished " + date.toISOString());
		return 200;
	},
	x404: function() { // 404 error
		var date = new Date();
		console.log("#=> 404 error " + date.toISOString());
		return 404;
	},
	x502: function() { // 502 error
		var date = new Date();
		console.log("#=> 502 error " + date.toISOString());
		return 502;
	},
	x500: function() { // 500 error
		var date = new Date();
		console.log("#=> 500 error " + date.toISOString());
		return 500;
	}
};



						

