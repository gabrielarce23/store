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
    
    
    Logger.log('')
    Logger.log('Cargando middlewares, rutas');
    const { autenticacion } = require('./middlewares/autenticacion')
    const usuariosRuta = require('./routes/usuario-rutas');
    const productosRuta = require('./routes/producto-rutas');
    const sucursalesRuta = require('./routes/sucursal-rutas');
    const pedidosRuta = require('./routes/pedido-rutas');
    const logsRuta = require('./routes/log-rutas');
    
    const app = express()
    app.use(cors())
    
    const port = process.env.PORT
    
    app.use(bodyParser.json())
    
    app.use('/api', autenticacion)
    app.use('/api', usuariosRuta);
    app.use('/api', productosRuta);
    app.use('/api', sucursalesRuta);
    app.use('/api', pedidosRuta);
    app.use('/api', logsRuta);
    
    
    Logger.log('Fin carga rutas');

    
    Logger.log('');
    Logger.log('Publicando carpeta doc y api');
 
    
    let ruta = __dirname
    ruta = ruta.substring(0, ruta.length - 6) + 'static'
    app.use(express.static(ruta))
    
    app.listen(port, () => {
        console.log('Api iniciada, ver archivo de logs en logs/')
        Logger.log(`Api iniciada en puerto ${port}`)
    })
    
    
    
    
    
    
    module.exports = { app }
} catch(e) {
    Logger.log(e, LoggerType.ERROR)
}
