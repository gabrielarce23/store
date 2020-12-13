var mongoose = require('mongoose')

var ProductosSchema = mongoose.Schema({
    codigo: {
        type: String,
        required: true,
    },
    nombre: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
    },
    estado: {
        type: String,
        required: true,
    },
    precio: {
        type: Number,
    },
    urlImagen: {
        type: String,
        required: true,
    },
    puntaje: {
        type: Number,
        required: true,
    },
    etiquetas: [String]
})

var Producto = mongoose.model('Producto',ProductosSchema)
module.exports = {Producto}