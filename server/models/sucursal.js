var mongoose = require('mongoose')

var SucursalSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    direccion: {
        type: String,
        required: true,
    },
    ciudad: {
        type: String,
        required: true,
    },
    pais: {
        type: String,
        required: true,
    },
})

var Sucursal = mongoose.model('Sucursal',SucursalSchema)
module.exports = {Sucursal}