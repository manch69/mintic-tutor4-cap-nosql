const connDB = require('../connectionDB/ConnDB');

var author = require('../models/Author.js');

// read -> GET
exports.readAll = function (req, res) {
        author.find(function(err, authors) {
            if(!err) {
                res.json(authors);
            } else {
                console.log('ERROR: ' + err);
            }
        });
};

// read one-> GET
exports.readById = function (req, res) {
    const id = req.params.id; // author/id ej: author/168468
    //const idautor = req.query.idautor; // author/id ej: author/168468?idautor=456
    //console.log(id,idautor);

    author.findById(id, function(err, authors) {
        if(!err) {
            res.json(authors);
        } else {
            console.log('ERROR: ' + err);
        }
    });
};

// create one-> POST
exports.create = function (req, res) {
    
    var newauthor = new author({
        nombre:    req.body.nombre 
    });

    newauthor.save(function(err) {
        if(!err) {
            console.log('Created');
        } else {
            console.log('ERROR: ' + err);
        }
    });

    res.json(newauthor);
};



// delete one-> DELETE
exports.deleteOne = function (req, res) {
    const id = req.params.id; // author/id ej: author/168468

    author.findByIdAndDelete(id, function(err, authors) {
        if(!err) {
            res.json(id);
        } else {
            console.log('ERROR: ' + err);
        }
    });
};

// delete All-> DELETE
exports.deleteAll = function (req, res) {
    author.deleteMany(function(err, res) {
        if(!err) {
            res.json("OK");
        } else {
            console.log('ERROR: ' + err);
        }
    });

};

// update one-> PUT
exports.update = function (req, res) {
    const id = req.params.id; // author/id ej: author/168468

    author.findByIdAndUpdate(id, req.body, function(err, authors) {
        if(!err) {
            res.json(id);
        } else {
            console.log('ERROR: ' + err);
        }
    });
};