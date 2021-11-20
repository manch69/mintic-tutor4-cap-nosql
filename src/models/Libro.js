const connDB = require('../connectionDB/ConnDB'),
	Schema = connDB.Schema;

var libroSchema = new Schema({
	nombre: 	 { type: String },
	descripcion: { type: String }   
});


module.exports = connDB.model('Libro', libroSchema);