require('dotenv').config() // .env
const   express = require('express'), 
        morgan = require('morgan'), //Ver request en consola 
        app = express(),
        cors = require('cors'),
        path = require('path');

// settings
app.set('port', process.env.PORT); //Setear puerto, ej: localhost:4000

//test pull request - Pull Request - 2


// middlewares
app.use(cors()); //Allow all
app.use(morgan('dev')); //Ver request en consola 
app.use(express.urlencoded({extended: false})); //body post form HTML 
app.use(express.json()); //JSON documents
app.use( express.static('public') );

//Routes
//Cambiar ENTIDAD, 
//app.use('/api', require('./routes/ENTIDAD'));
app.use('/api', require('./routes/LibroRouter')); // /api/
app.use('/api', require('./routes/AuthorRouter'));
app.use('/api', require('./routes/UserRouter'));

app.get('*', (req,res) => { res.sendFile( path.resolve('./public/index.html') ) });

// starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});
