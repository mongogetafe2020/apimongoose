let mongoose = require('mongoose');

let ProductoSchema = new mongoose.Schema({
    nombre: String,
    descripcion: String,
    precio: Number,
    sku: {type: String, unique: true}
});

module.exports = mongoose.model('Producto', ProductoSchema);