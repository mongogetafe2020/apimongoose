let express = require('express');
let mongoose = require('mongoose');
let chalk = require('chalk');
let bodyParser = require('body-parser');
let cors = require('cors');

let app = express();

let producto = require('./routes/producto');
let proveedor = require('./routes/proveedor');

let opciones = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}


mongoose.connect('mongodb://localhost:27017/compras', opciones)
        .then(() => {
            console.log(chalk.bgBlue("Conexión Base Datos Ok"));
        })
        .catch((err) => {
            console.log(chalk.bgRed("Error conexión Base datos"), err);
        })


app.use(cors());
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({extended: true}));

app.use('/producto', producto);
app.use('/proveedor', proveedor);

app.listen(3000, () => {
    console.log(`Servidor escuchando en 
                 http://localhost:3000`);
});