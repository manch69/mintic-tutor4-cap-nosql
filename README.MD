Capacitacion API REST CRUD NOSQL 
=============================
### Por: Miguel Noriega

Esta capacitacion se dicto el dia 18 de noviembre del 2021,
bajo el marco del programa Mision Tic 2022, en el alma mater UIS.

La grabacion de dicha capacitacion puede ser encontrada en la seccion de Bienestar estudiantil.

----------------------------------
## Pasos para crear una API REST CRUD SQL
----------------------------------
1. Crear proyecto node
    ```
    npm init
    ```

2. Instalar dependencias
    ```
    npm install express mongoose morgan
    ```
3. Instalar dependencias para Desarrollo
    ```
    npm install nodemon -D
    ```
4. Crear Estructura de Proyecto API, por capas.
    - src
        - controllers
        - models
        - routes
        - connectionDB

5.  Crear index.js (NOTA: Por organizacion se recomienda una carpeta src).

6. EXTRA:
    Para simular un entorno de produccion con sus variables de entorno es necesario:
    1. Instalar
    ```
    npm install dotenv
    ```
    2. Agregar esta linea de codigo a index.js
    ```js
    require('dotenv').config()
    ```
    3. Crear un archivo llamado .env, en la raiz del proyecto.
        La estructura del proyecto puede verse como:
    
        - node_modules      (Carpeta)
        - src               (Carpeta)
        - .env              (Archivo)
        - package-lock.json (Archivo)
        - package.json      (Archivo)

7. Heroku:
```
heroku create
```
```
heroku git:remote -a NAME_PROJECT
```
```
git push heroku main
```

## Utils:

1. index.js (Plantilla)
```js
require('dotenv').config() // Requiere npm install dotenv 
const express = require('express'); 
const morgan = require('morgan'); //Ver requests en consola 
const app = express();

// settings
app.set('port', process.env.PORT || 4000); //Setear puerto, ej: localhost:4000

// middlewares
app.use(morgan('dev')); //Ver request en consola 
app.use(express.urlencoded({extended: false})); //body post form HTML 
app.use(express.json()); //JSON documents

//Routes
//Cambiar ENTIDAD, 
//app.use('/api', require('./routes/ENTIDAD'));
//app.use('/api', require('./routes/LibroRouter')); //Ejemplo de una entidad llamada Libro

// starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});
```

2. ConnectionDB (Plantilla)
```js
const mongoose = require('mongoose'); 

//Se recomienda utilizar process.env.DATABASE_URI

mongoose.connect('mongodb+srv://manch:1234qwer@cluster0.hjldf.mongodb.net/test?retryWrites=true&w=majority', function(err, res) {
	if(err) {
		console.log('ERROR: connecting to Database. ' + err);
	} else {
		console.log('Connected to Database');
	}
});

module.exports = mongoose;

```
3. models (Plantilla):

```js
const connDB = require('../connectionDB/ConnDB'),
	Schema = connDB.Schema;

/* La entidad de ejemplo es Libro, donde sus fields son
Nombre y descripcion.

    Mas info y ejemplos https://mongoosejs.com/docs/api/schema.html
*/

var libroSchema = new Schema({
	nombre: 	 { type: String },
	descripcion: { type: String }    
});


module.exports = connDB.model('Libro', libroSchema);
```

3. routes (Plantilla):
Se debe cambiar la entidad correspondiente.

```js
const express = require('express');

/*
Es necesario reemplazar la palabra ENTIDAD, por su
correspondiente, ejemplo libroController, ...

Una forma rapida de hacerlo es utilizar Ctrl + H,
Ojo despues de reemplazar igual es necesario revisar
si todo quedo bien.
*/

let ENTIDADController = require('../controllers/ENTIDADController')

let ENTIDAD = express.Router();

    ENTIDAD.route('/ENTIDAD')
        .get(ENTIDADController.readAll);

    ENTIDAD.route('/ENTIDAD/:id')
        .get(ENTIDADController.readById);

    ENTIDAD.route('/ENTIDAD')
        .post(ENTIDADController.create);

    ENTIDAD.route('/ENTIDAD/:id')
        .delete(ENTIDADController.delete);

    ENTIDAD.route('/ENTIDAD/:id')
        .put(ENTIDADController.update);

module.exports = ENTIDAD;

```

3. Controller Manual Plantilla.
```js
const connDB = require('../connectionDB/ConnDB');

/*
Es necesario reemplazar la palabra libro, por su
correspondiente entidad, ejemplo author, ...

Una forma rapida de hacerlo es utilizar Ctrl + H,
Ojo despues de reemplazar igual es necesario revisar
si todo quedo bien.
*/

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
```

