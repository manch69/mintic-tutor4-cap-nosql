const connDB = require('../connectionDB/ConnDB'),
	Schema = connDB.Schema;

var authorSchema = new Schema({
	nombre: 	 { type: String}
	    
});


module.exports = connDB.model('Autor', authorSchema);