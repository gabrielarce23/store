const { Producto } = require('../models/producto');
const { Sucursal } = require('../models/sucursal');
const {Logger, LoggerType} = require('../logs/logger');
var data = require("./data.json");
async function initData() {

    let productos = await Producto.find({});
    Logger.log(`Existen ${productos.length} productos en la bd`);
    if(productos.length === 0 ) {
        Logger.log('Cargando productos a la bd')
        await Producto.insertMany(data.productos)
        Logger.log('Fin de carga de productos')
    }

    let sucursales = await Sucursal.find({});
    Logger.log(`Existen ${sucursales.length} sucursales en la bd`);
    if(sucursales.length === 0 ) {
        Logger.log('Cargando sucursales a la bd')
        await Sucursal.insertMany([
            {
                nombre: 'Reducto', 
                direccion: 'Pando 2735', 
                ciudad: 'Montevideo',
                pais: 'Uruguay' 
            },
            {
                nombre: 'Centro', 
                direccion: 'Uruguay 890', 
                ciudad: 'Montevideo',
                pais: 'Uruguay' 
            },
            {
                nombre: 'Sayago', 
                direccion: 'Ariel 3000', 
                ciudad: 'Montevideo',
                pais: 'Uruguay' 
            },
            {
                nombre: 'Punta Carretas', 
                direccion: 'Solano García 2500', 
                ciudad: 'Montevideo',
                pais: 'Uruguay' 
            },
            {
                nombre: 'Malvin', 
                direccion: 'Asamblea 2652', 
                ciudad: 'Montevideo',
                pais: 'Uruguay' 
            },
        ])
        Logger.log('Fin de carga de sucursales')
    }
}


module.exports = {initData}