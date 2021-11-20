const connDB = require('../connectionDB/ConnDB');

var libro = require('../models/Libro.js');

// read -> GET
exports.readAll = function (req, res) {
        libro.find(function(err, libros) {
            if(!err) {
                res.json(libros);
            } else {
                console.log('ERROR: ' + err);
            }
        });
};

// read one-> GET
exports.readById = function (req, res) {
    const id = req.params.id; // libro/id ej: libro/168468
    //const idautor = req.query.idautor; // libro/id ej: libro/168468?idautor=456
    //console.log(id,idautor);

    libro.findById(id, function(err, libros) {
        if(!err) {
            res.json(libros);
        } else {
            console.log('ERROR: ' + err);
        }
    });
};

// create one-> POST
exports.create = function (req, res) {
    
    var newlibro = new libro({
        nombre:    req.body.nombre,
        descripcion: req.body.descripcion 
    });

    newlibro.save(function(err) {
        if(!err) {
            console.log('Created');
        } else {
            console.log('ERROR: ' + err);
        }
    });

    res.json(newlibro);
};


// delete one-> DELETE
exports.deleteOne = function (req, res) {
    const id = req.params.id; // libro/id ej: libro/168468

    libro.findByIdAndDelete(id, function(err, libros) {
        if(!err) {
            res.json(id);
        } else {
            console.log('ERROR: ' + err);
        }
    });
};

// delete All-> DELETE
exports.deleteAll = function (req, res) {
    libro.deleteMany(function(err, res) {
        if(!err) {
            res.json("OK");
        } else {
            console.log('ERROR: ' + err);
        }
    });

};

// update one-> PUT
exports.update = function (req, res) {
    const id = req.params.id; // libro/id ej: libro/168468

    libro.findByIdAndUpdate(id, req.body, function(err, libros) {
        if(!err) {
            res.json(id);
        } else {
            console.log('ERROR: ' + err);
        }
    });
};