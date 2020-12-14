var express = require('express');
var api = express.Router();
const { Pedido } = require('../models/pedido');
const { Sucursal } = require('../models/sucursal');
const { Producto } = require('../models/producto');
const {Logger, LoggerType} = require('../logs/logger');


const _ = require('lodash')
const { ApiResponse } = require('../models/api-response')
const { ObjectID } = require('mongodb')



api.get('/pedidos', async (req, res) => {

    try {
        const {password, tokens, ...usuario} = req.usuarioRequest._doc
        let fields = 'cantidad producto sucursal estado comentario total fecha _id'
        let pedidos = await Pedido.find({usuario : new ObjectID(usuario._id)}, fields)
            .populate('sucursal')
            .populate('producto');
    
        Logger.log('Request exitoso, se retorna 200')
        res.status(200).send(new ApiResponse(pedidos));

    }catch(e) {
        Logger.log('Request fallido, se retorna 400. Ver error debajo', LoggerType.ERROR)
        Logger.log(e, LoggerType.ERROR)
        errorHelper(e)
        res.status(400).send(new ApiResponse({}, errorHelper(e)))
    }

})



api.post('/pedidos', async (req, res) => {

    try {
        
        let dataPedido = _.pick(req.body, ['cantidad', 'idProducto', 'idSucursal']);
        
        let sucursal;
        let producto;

        if(ObjectID.isValid(dataPedido.idSucursal)) {
            sucursal = await Sucursal.findOne(new ObjectID(dataPedido.idSucursal));
        }
        if(ObjectID.isValid(dataPedido.idProducto)) {
            producto = await Producto.findOne(new ObjectID(dataPedido.idProducto));
        }

        if(!producto || !sucursal) {
            Logger.log('Request fallido, se retorna 400. Producto o sucursal incorrectos', LoggerType.ERROR)
            return res.status(400).send(new ApiResponse({}, 'Producto o sucursal incorrectos'))    
        }

        if(isNaN(dataPedido.cantidad) || Number(dataPedido.cantidad) <= 0) {
            Logger.log('Request fallido, se retorna 400. Cantidad incorrecta', LoggerType.ERROR)
            return res.status(400).send(new ApiResponse({}, 'Cantidad debe ser número mayor a 0'))
        }
        
        let pedido = new Pedido({
            cantidad: dataPedido.cantidad,
            fecha: Date.now(),
            producto,
            sucursal,
            estado: 'pendiente',
            total: dataPedido.cantidad * producto.precio,
            usuario: req.usuarioRequest
        })

        pedido = await pedido.save();
        Logger.log('Request exitoso, se retorna 200')
        res.status(200).send(new ApiResponse({},''));

    } catch (e) {
        Logger.log('Request fallido, se retorna 400. Ver error debajo', LoggerType.ERROR)
        Logger.log(e, LoggerType.ERROR)
        res.status(400).send(new ApiResponse({}, errorHelper(e)))
    }
})


function errorHelper(obj) {
    const str = obj.toString();
    if(str.indexOf('MDLERR') > -1) {
        return str.substr(str.indexOf('MDLERR')+7);
    }
    return str;

}


api.put('/pedidos/:id', async (req, res) => {
    

    try {
        

        let _id = req.params.id;
        const {password, tokens, ...usuario} = req.usuarioRequest._doc
        
        if(!ObjectID.isValid(_id)) {
            Logger.log('Request fallido, se retorna 400. Id de producto incorrecto', LoggerType.ERROR)
            return res.status(400).send(new ApiResponse({}, 'Id de producto incorrecto'))    
        }

        let fields = 'cantidad producto sucursal estado comentario total fecha _id'
        let pedido = await Pedido.findOne({'usuario' : new ObjectID(usuario._id)}, fields)
            .populate('sucursal')
            .populate('producto');
    
        if(!pedido) {
            Logger.log('Request fallido, se retorna 400. Id de producto incorrecto', LoggerType.ERROR)
            return res.status(400).send(new ApiResponse({}, 'Id de producto incorrecto'))
        }

        if(pedido.estado !== 'pendiente') {
            Logger.log('Request fallido, se retorna 400. Producto en estado incorrecto', LoggerType.ERROR)
            return res.status(400).send(new ApiResponse({}, 'Producto en estado incorrecto'))
        }
        if(!req.body.comentario) {
            Logger.log('Request fallido, se retorna 400. Debe ingresar comentario', LoggerType.ERROR)
            return res.status(400).send(new ApiResponse({}, 'Debe ingresar comentario'))
        }

        pedido.estado = 'entregado';
        pedido.comentario = req.body.comentario;

        await pedido.save();

        Logger.log('Request exitoso, se retorna 200')
        res.status(200).send(new ApiResponse({},''));
    }
    catch (e) {
        Logger.log('Request fallido, se retorna 400. Ver error debajo', LoggerType.ERROR)
        Logger.log(e, LoggerType.ERROR)

        res.status(400).send(new ApiResponse({}, errorHelper(e)))
    }

})





module.exports = api;