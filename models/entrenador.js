const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    nombre: String,
    contrasena: String,
})

//Creamos el modelo
const Entrenador = mongoose.model('dbusuario', usuarioSchema, "usuario");

module.exports = Usuario;
