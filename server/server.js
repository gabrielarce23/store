const express = require('express')
const bodyParser = require('body-parser')
const _ = require('lodash')
const cors = require('cors')


const {Logger, LoggerType} = require('./logs/logger');


try {
    Logger.log('')
    Logger.log('')
    Logger.log('******************************************************************')
    Logger.log('Comienza app')
    
    
    Logger.log('')
    Logger.log('Cargando variables de config...')
    require('./config/config')
    Logger.log('Fin de carga de variables de config.')
    Logger.log('')
    
    require('./db/mongoose')
    
    const { autenticacion } = require('./middlewares/autenticacion')
    const usuariosRuta = require('./routes/usuario-rutas');
    
    //const recetaRutas = require('./routes/receta-rutas');
    
    
    
    
    
    const app = express()
    app.use(cors())
    
    const port = process.env.PORT
    
    app.use(bodyParser.json())
    
    app.use('/api', autenticacion)
    app.use('/api', usuariosRuta);
    /* app.use('/api', recetaRutas) */
    
    
    let ruta = __dirname
    ruta = ruta.substring(0, ruta.length - 6) + 'doc'
    
    app.use(express.static(ruta))
    
    app.listen(port, () => {
        console.log('Api iniciada, ver archivo de logs en logs/')
        Logger.log(`Api iniciada en puerto ${port}`)
    })
    
    
    
    
    
    
    module.exports = { app }
} catch(e) {
    Logger.log(e, LoggerType.ERROR)
}
