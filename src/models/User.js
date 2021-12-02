const connDB = require('../connectionDB/ConnDB'),
	Schema = connDB.Schema;

var userSchema = new Schema({
	username: 	 { type: String, unique: true},
	password: { type: String },
	nombre: { type: String },  

});

//
module.exports = connDB.model('User', userSchema, 'users');