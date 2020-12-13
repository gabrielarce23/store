var {Usuario} = require('./../models/usuario');
const {Logger, LoggerType} = require('../logs/logger');

const authorizedEndpoints = [
    {path: '/usuarios', method: 'post'},
    {path: '/usuarios/session', method: 'post'},
    {path: '/logs', method: 'post'},

]

var autenticacion = (req, res, next) => {
    
    Logger.log('')
    Logger.log(`Nuevo request: method > ${req.method}, url > ${req.url}`)


    if(authorizedEndpoints.find(
        ae => ae.path === req.url && ae.method === req.method.toLowerCase()
    )){
        Logger.log(`Autorizado para seguir sin token...`)
        next()
    }else{
        var token = req.header('x-auth')
        Logger.log(`Token enviado > ${token}`)
        Usuario.findByToken(token).then((usuario) => {

            if (!usuario) {
                
                return Promise.reject(`No se encontró el usuario para ese token`)
            }
            req.usuarioRequest = usuario
            Logger.log(`Autorizado > ${usuario.email}`)
            next()
        }).catch((e) => {
            Logger.log('No se ha podido autenticar la petición, se rechazará con 401')
            Logger.log(e,LoggerType.ERROR)
            res.status(401).send()
        })

    }

}

module.exports = {
    autenticacion
}