var express = require('express');
var api = express.Router();
const { Usuario } = require('../models/usuario')
const {Logger, LoggerType} = require('../logs/logger');


const _ = require('lodash')
const { ApiResponse } = require('../models/api-response')
const { ObjectID } = require('mongodb')



api.get('/usuarios/session', (req, res) => {

    const {password, tokens, ...usuario} = req.usuarioRequest._doc
    Logger.log('Request exitoso, se retorna 200')
    res.status(200).send(new ApiResponse(usuario));

})

api.post('/usuarios/session', async (req, res) => {

    try {
        let usuario = await Usuario.findOne({email: req.body.email.toLowerCase(), password: req.body.password})

        if (usuario) {
            const {tokens, nombre, email, apellido, direccion} = usuario;
            Logger.log('Request exitoso, se retorna 200')
            res.status(200).send(new ApiResponse({nombre, apellido, direccion, email, token:  tokens[0].token }));
        } else {
            Logger.log('Request fallido, se retorna 404. Ver error debajo', LoggerType.ERROR)
            Logger.log('Usuario y/o contraseña inválidos', LoggerType.ERROR)
            res.status(404).send(new ApiResponse({}, 'Usuario y/o contraseña inválidos'));
        }

    } catch (e) {
        Logger.log('Request fallido, se retorna 400. Ver error debajo', LoggerType.ERROR)
        Logger.log(e, LoggerType.ERROR)
        res.status(400).send(new ApiResponse({}, errorHelper(e)))
    }
})


api.post('/usuarios', async (req, res) => {


    try {
        
        var usuario = new Usuario(_.pick(req.body, ['email', 'nombre', 'apellido', 'password','direccion']))
        usuario.email = usuario.email.toString().toLowerCase()
        usuario = await usuario.save()
        await usuario.generateAuthToken();
        usuario.save();
        Logger.log('Request exitoso, se retorna 200')
        res.status(200).send(new ApiResponse({}));
    } catch (e) {
        Logger.log('Request fallido, se retorna 400. Ver error debajo', LoggerType.ERROR)
        Logger.log(e, LoggerType.ERROR)
        errorHelper(e)
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


module.exports = api;