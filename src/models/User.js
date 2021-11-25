const connDB = require('../connectionDB/ConnDB'),
	Schema = connDB.Schema;

var userSchema = new Schema({
	username: 	 { type: String },
	password: { type: String },
	nombre: { type: String },  

});


module.exports = connDB.model('User', userSchema, 'users');