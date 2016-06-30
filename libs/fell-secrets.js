
						// Routes Mapped functions
/*=========================================================================*/

module.exports = {
	get_coordinate: function(req, callback) {

	},
	get_index: function(data, hroute) {
		var dat = { "name": "Alan", "hometown": "Somewhere, TX",
             "kids": [{"name": "Jimmy", "age": "12"}, {"name": "Sally", "age": "4"}]};
        render_template('./templates/index.hbs', dat, function(val, err) {
        	hroute(val, err);
        });
	},
	post_coordinate: function (data, callback) {
	}
};
						// Main classes and process
/*=========================================================================*/


// Write new coordinate to database.
var low = require('lowdb'); // Flatfile database
var Handlebars = require('handlebars');
var fs = require('fs');

function Coordinate() {
	// Placeholder
}

Coordinate.prototype.write = function (data, callback) { // Write coordinate to database.
	var id = Date.now();
	if (data["coordinate"] != "" && data["fields"]) {
		var ordinate = {
			id: id,
			coordinate: data["coordinate"] + "#" + id,
			fields: data["fields"]
		};
		if (db.has('forum').value()) {
			db.get('forum').push(ordinate).value();
		} else {
			db.set('forum', []).value();
			db.get('forum').push(ordinate).value();
		}
		callback(true); // callback(err)
	} else {
		callback(false);
	}

};


function render_template(filePath, data, callback) { // Renders the handlebar template.
	fs.readFile(filePath, function(error, content) {
		if (!error) {
			var source = '';
			source += content;
			var template = Handlebars.compile(source);
			var result = template(data);
			callback(result, 200);
		} else {
			callback("404. Look elsewhere", 200);
		}
	});
}