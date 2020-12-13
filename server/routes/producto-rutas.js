var express = require('express');
var api = express.Router();
const { Producto } = require('../models/producto')
const _ = require('lodash')
const { ApiResponse } = require('../models/api-response')
const {Logger, LoggerType} = require('../logs/logger');



api.get('/productos', (req, res) => {
    selectFields = 'nombre precio etiquetas _id urlImagen codigo';
    let filter = {};
    if(req.query.nombre) {
        filter = {nombre: {$regex: req.query.nombre, $options: 'i'}};
    }
    if(req.query.codigo) {
        filter.codigo = req.query.codigo
    }
    Producto.find(filter, selectFields)
        .then((productos) => {
            Logger.log('Request exitoso, se retorna 200')
            res.status(200).send(new ApiResponse(productos,''))
        }) 
        .catch((e) => {
            Logger.log('Request incorrecto, se retorna 400')
            Logger.log(e, LoggerType.Error)
            res.status(400).send(new ApiResponse({}, `Mensaje: ${e}`))
        }
        )
})





api.get('/productos/:id', async (req, res) => {

    try {
        const productoId = req.params.id
        let selectFields = 'nombre precio etiquetas _id urlImagen puntaje descripcion codigo';
    
        
        let producto = await Producto.findById(productoId, selectFields);

        if (producto) {
            Logger.log('Request exitoso, se retorna 200')
            res.status(200).send(new ApiResponse(producto));
        } else {
            Logger.log('Request no exitoso, se retorna 400')
            Logger.log('Producto no encontrado')
            res.status(404).send(new ApiResponse({}, 'Producto no encontrado'));
        }

    } catch (e) {
        Logger.log('Request no exitoso, se retorna 404')
        Logger.log(e,LoggerType.Error)
        res.status(404).send(new ApiResponse({}, 'Producto no encontrado'));
    }
})


module.exports = api;