let express = require('express');
let mongoose = require('mongoose');
let chalk = require('chalk');
let bodyParser = require('body-parser');

let app = express();

let producto = require('./routes/producto');

let opciones = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}

app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost:27017/compras', opciones)
        .then(() => {
            console.log(chalk.bgBlue("Conexión Base Datos Ok"));
        })
        .catch((err) => {
            console.log(chalk.bgRed("Error conexión Base datos"), err);
        })

app.use('/producto', producto);

app.listen(3000, () => {
    console.log(`Servidor escuchando en 
                 http://localhost:8000`);
});