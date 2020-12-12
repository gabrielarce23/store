var mongoose = require ('mongoose');
const {Logger, LoggerType} = require('../logs/logger');

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI, {
     useNewUrlParser: true,
     useUnifiedTopology: true
    }).then(
        res => {
            Logger.log('Conexión a la bd exitosa')
        }
    ).catch(
        err => {
            Logger.log('Error al conectarse a la bd');
            Logger.log(err, LoggerType.ERROR);
        }
    )


module.exports = {
    mongoose
}