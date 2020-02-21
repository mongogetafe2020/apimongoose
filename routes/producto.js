let express = require('express');
let app = express();
let Producto = require('../models/producto');

app.get('/', (req, res) => {
    Producto.find({}, (err, productos) => {
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

app.get('/:_id', (req, res) => {
    Producto.find({_id: req.params._id}, (err, productos) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.status(200).json({
            producto: productos[0]
        });
    });
});

app.get('/search/:termino', (req, res) => {
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
    console.log(req.body)
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

app.put('/:_id', (req, res) => {

    let _id = req.params._id;
    let updateQuery = {};

    if (req.body.nombre) {
        updateQuery.nombre = req.body.nombre;
    }
    if (req.body.descripcion) {
        updateQuery.descripcion = req.body.descripcion;
    }
    if (req.body.precio) {
        updateQuery.precio = req.body.precio;
    }
    if (req.body.sku) {
        updateQuery.sku = req.body.sku;
    }
    
    Producto.findByIdAndUpdate(_id, {$set: updateQuery}, (err, producto) => {
        if (err) {
            return res.status(400).json({
                mensaje: "Error ...",
                error: err  
            });
        }
        res.status(200).json({
            mensaje: `El producto ${producto.sku} ha sido actualizado`
        });
    });

});

app.delete('/:_id', (req, res) => {

    Producto.findByIdAndRemove(req.params._id, (err, producto) => {
        if (err) {
            return res.status(400).json({
                mensaje: "Error ...",
                error: err  
            });
        }
        res.status(200).json({
            mensaje: `El producto ${producto.sku} ha sido eliminado`
        });
    });

});

module.exports = app;