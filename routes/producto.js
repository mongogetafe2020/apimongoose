let express = require('express');
let app = express();
let Producto = require('../models/producto');

app.get('/:termino', (req, res) => {
    Producto.find({nombre: {$regex: req.params.termino}}, (err, productos) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.status(200).json({
            productos: productos
        });
    });
});

app.post('/', (req, res) => {
    let producto = new Producto({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        sku: req.body.sku
    });
    producto.save((err, producto) => {
         if (err) {
             return res.status(400).json({
                mensaje: "Error ...",
                error: err
             });
         }
         res.status(200).json({
             mensaje: 'El producto sku: ' + 
                       producto.sku +
                       ' ha sido insertado correctamente'
         });
    });
});

module.exports = app;