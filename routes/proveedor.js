let express = require('express');
let app = express();

let Proveedor = require('../models/proveedor');

app.post('/', (req, res) => {

    let proveedor = new Proveedor({
        nombre: req.body.nombre,
        cif: req.body.cif,
        direccion: {
            calle: req.body.calle,
            localidad: req.body.localidad,
            provincia: req.body.provincia
        }
    });

    proveedor.save((err, proveedor) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.status(200).json({
            mensaje: `El proveedor ${proveedor.nombre} ha sido creado`
        });
    });
});

module.exports = app;