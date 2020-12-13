var express = require('express');
var api = express.Router();
const { Receta } = require('../models/receta')
const _ = require('lodash')
const { ApiResponse } = require('../models/api-response')



api.get('/recetas', (req, res) => {

    Receta.find({}).populate('usuario',{tokens: 0, password: 0})
        .then((recetas) => res.status(200).send(recetas ))
        .catch((e) => res.status(400).send(new ApiResponse({}, `Mensaje: ${e}`)))
})


api.post('/recetas', async (req, res) => {


    try {
        
        const recetaData = _.pick(req.body, ['preparacion', 'nombre', 'ingredientes','urlImagen']);
        recetaData.usuario = req.usuarioRequest._id;
        let receta = await new Receta(recetaData).save();
        receta = await Receta.findById(receta._id).populate('usuario',{tokens: 0, password: 0})
        res.status(200).send(receta)
    } catch (e) {
        console.log(e)
        res.status(400).send(new ApiResponse({}, `Mensaje: ${'Error al dar de alta'}`))
    }
})

api.put('/recetas/:id', async (req, res) => {


    try {
        
        const recetaId = req.params.id
        const recetaData = _.pick(req.body, ['preparacion', 'nombre', 'ingredientes', 'urlImagen']);
        recetaData.usuario = req.usuarioRequest._id;
        
        
        let receta = await Receta.findByIdAndUpdate(recetaId,recetaData);
        receta = await Receta.findById(receta._id).populate('usuario',{tokens: 0, password: 0})
        res.status(200).send(receta)
    } catch (e) {
        console.log(e)
        res.status(400).send(new ApiResponse({}, `Mensaje: ${'Error al dar de alta'}`))
    }
})


api.get('/recetas/:id', async (req, res) => {

    try {
        const recetaId = req.params.id
        let receta = await Receta.findById(recetaId).populate('usuario',{tokens: 0, password: 0});

        if (receta) {
            res.status(200).send(receta);
        } else {
            res.status(404).send(new ApiResponse({}, 'Receta no encontrada'));
        }

    } catch (e) {
        console.log('Error ',e)
        res.status(400).send(new ApiResponse({}, `Mensaje: ${e}`))
    }
})


module.exports = api;