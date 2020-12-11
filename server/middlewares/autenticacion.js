var {Usuario} = require('./../models/usuario')

const authorizedEndpoints = [
    {path: '/usuarios', method: 'post'},
    {path: '/usuarios/session', method: 'post'}
]

var autenticacion = (req, res, next) => {
    
    if(authorizedEndpoints.find(
        ae => ae.path === req.url && ae.method === req.method.toLowerCase()
    )){
        next()
    }else{
        var token = req.header('x-auth')
        Usuario.findByToken(token).then((usuario) => {

            if (!usuario) {
                return Promise.reject()
            }
            req.usuarioRequest = usuario
            next()
        }).catch((e) => {
            res.status(401).send()
        })

    }

}

module.exports = {
    autenticacion
}