const mongoose = require('mongoose'); 

mongoose.connect(process.env.DATABASE_URI, function(err, res) {
	if(err) {
		console.log('ERROR: connecting to Database. ' + err);
	} else {
		console.log('Connected to Database');
	}
});

module.exports = mongoose;