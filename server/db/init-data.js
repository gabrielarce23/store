const { Producto } = require('../models/producto');
const { Sucursal } = require('../models/sucursal');
const {Logger, LoggerType} = require('../logs/logger');
var data = require("./data.json");
async function initData() {

    let productos = await Producto.find({});
    Logger.log(`Existen ${productos.length} productos en la bd`);
    if(productos.length === 0 ) {
        Logger.log('Cargando productos a la bd desde data.json')
        await Producto.insertMany(data.productos)
        Logger.log('Fin de carga de productos')
    } 

    let sucursales = await Sucursal.find({});
    Logger.log(`Existen ${sucursales.length} sucursales en la bd desde data.json`);
    if(sucursales.length === 0 ) {
        Logger.log('Cargando sucursales a la bd')
        await Sucursal.insertMany(data.sucursales)
        Logger.log('Fin de carga de sucursales')
    }
}


module.exports = {initData}