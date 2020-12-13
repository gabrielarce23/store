var express = require('express');
var api = express.Router();
const { Sucursal } = require('../models/sucursal')
const _ = require('lodash')
const { ApiResponse } = require('../models/api-response')
const {Logger, LoggerType} = require('../logs/logger');



api.get('/sucursales', (req, res) => {
    selectFields = 'nombre direccion ciudad pais';
    let filter = {};
    Sucursal.find(filter, selectFields)
        .then(
            (sucursales) => {
                Logger.log('Request exitoso, se retorna 200')
                res.status(200).send(sucursales)
            })
        .catch((e) => {
            Logger.log('Request incorrecto, se retorna 400')
            Logger.log(e, LoggerType.Error)
            res.status(400).send(new ApiResponse({}, `Mensaje: ${e}`))
        })
})


module.exports = api;