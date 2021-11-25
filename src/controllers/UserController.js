const connDB = require('../connectionDB/ConnDB');

var user = require('../models/User.js');

// read -> GET
exports.login = function (req, res) {
    var username = req.body.username;
    var password = req.body.password;

    user.find({username: username},function(err, userRes) {
        if(!err) {
            if(userRes.length < 1){
                res.json({user:{}, proceso: false, err: "Usuario inexistente."});
            }else{
                if(userRes[0].password === password){
                    res.json({user: userRes[0], proceso: true});
                }else{
                    res.json({user:{}, proceso: false, err: "Contraseña Erronea."});
                }
            }
        } else {
            console.log('ERROR: ' + err);
            res.json({user:{}, proceso: false, err: err});
        }
    });
};

// read -> GET
exports.readAll = function (req, res) {
        user.find(function(err, users) {
            if(!err) {
                res.json(users);
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

    user.findById(id, function(err, users) {
        if(!err) {
            res.json(users);
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

    newuser.save(function(err) {
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

    user.findByIdAndDelete(id, function(err, users) {
        if(!err) {
            res.json(id);
        } else {
            console.log('ERROR: ' + err);
        }
    });
};

// delete All-> DELETE
exports.deleteAll = function (req, res) {
    user.deleteMany(function(err, userRes) {
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

    user.findByIdAndUpdate(id, req.body, function(err, users) {
        if(!err) {
            res.json(id);
        } else {
            console.log('ERROR: ' + err);
        }
    });
};