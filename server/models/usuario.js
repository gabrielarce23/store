var mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const bcrypt = require('bcryptjs')


var UsuarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        trim: true,
        required: true,
    },
    apellido: {
        type: String,
        trim: true,
        required: true,
    },
    direccion: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} No es un email válido.'
        }
    },
  
    password: {
        type: String,
        minlength: 8,
        required: true,
    },
    tokens: [{
        access: {
            type: String,
        },
        token: {
            type: String,
        }
    }],
})

UsuarioSchema.plugin(uniqueValidator);

UsuarioSchema.methods.generateAuthToken = async function () {
    var usuario = this;
    var access = 'auth'
    var token = jwt.sign({ _id: usuario._id.toHexString(), access }, process.env.JWT_SECRET).toString()

    usuario.tokens = usuario.tokens.concat([{ access, token }])
    await usuario.save()
    return token

}

UsuarioSchema.methods.removeToken = function (token) {
    var usuario = this;

    return usuario.update({
        $pull: {
            tokens: {
                token
            }
        }
    })
}

UsuarioSchema.statics.findByToken = function (token) {

    var Usuario = this
    var decoded
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)

    } catch (e) {
        return Promise.reject(e)
    }
    return Usuario.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    })
}
/*UsuarioSchema.pre('save', async function (next) {
    var usuario = this;
   
    if (usuario.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {

            bcrypt.hash(usuario.password, salt, (err, hash) => {
                usuario.password = hash
                next()
            })
        })
    } else {
        next()
    }

})*/
/*
UsuarioSchema.pre('findOneAndUpdate', function (next) {
    var usuario = this.getUpdate().$set;

   
    if (usuario.password !== 'n') {
        
        bcrypt.genSalt(10, (err, salt) => {

            bcrypt.hash(usuario.password, salt, (err, hash) => {

                usuario.password = hash

                next()
            })
        })
    } else {
        Usuario.findOne({_id: usuario._id}).then((usu)=>{
           
            usuario.password = usu.password
           
            next()
        })
        

    }



})
*/

UsuarioSchema.methods.hasMobileToken = function () {
    var usuario = this;
    for (token of usuario.tokens){
        if(token.access === 'mobile'){
            return true
        }
    }
    return false
}

UsuarioSchema.statics.findByCredentials = function (email, password) {
    Usuario = this
    return Usuario.findOne({ email }).exec().then((usuario) => {

        if (!usuario) {
            return Promise.reject('No encuentro usuario '+email)
        }

        return new Promise((resolve, reject) => {
            bcrypt.compare(password, usuario.password, (err, res) => {
                
                if (!res) {
                 
                    return reject('Contraseña incorrecta: '+password)
                }
                console.log('Res: ', res)
                return resolve(usuario)
            })
        })

    }).catch((e) => {
       
        return Promise.reject(e)
    })
}




var Usuario = mongoose.model('Usuario', UsuarioSchema)

module.exports = { Usuario }
