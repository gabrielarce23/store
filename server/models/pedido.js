var mongoose = require('mongoose')

var PedidosSchema = mongoose.Schema({
    fecha: {
        type: Number,
        required: true,
    },
    cantidad: {
        type: Number,
        required: true,
    },
    estado: {
        type: String,
        required: true,
    },
    comentario: {
        type: String,
    },
    total: {
        type: Number,
        required: true,
    },
    usuario:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Usuario',
    },
    producto:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Producto',
        require: true
    },
    sucursal:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Sucursal',
        require: true
    },
})

var Pedido = mongoose.model('Pedido',PedidosSchema)
module.exports = {Pedido}