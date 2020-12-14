var express = require('express');
var api = express.Router();
const { ApiResponse } = require('../models/api-response')
const {Logger, LoggerType} = require('../logs/logger');



api.post('/logs', (req, res) => {
    try {
        console.log(req.body)
        console.log(process.env.logKey)
        if(req.body.logKey === process.env.logKey && ['all','off','debug'].indexOf(req.body.level) !== -1) {
            Logger.setLevel(req.body.level)
            Logger.log(`Request exitoso, se cambia log a ${req.body.level} y se retorna 200`)
            return res.status(200).send(new ApiResponse({mensaje: `se cambia log a ${req.body.level}`},''))
        }
        Logger.log('Request no exitoso, no autorizado. Se retorna 401')
        return res.status(401).send(new ApiResponse({},''))

    } catch (error) {
        Logger.log('Request no exitoso. Se retorna 400. Ver error debajo')
        Logger.log(error, LoggerType.ERROR);
        res.status(400).send(new ApiResponse({},''))

    }
})


module.exports = api;