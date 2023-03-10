var express = require('express');
var router = express.Router();
const Usuario = require('../models/usuario');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render("users", { title: "Lista de usuarios" });
});




router.get('/', async (req, res) => {
    try {
        //Le pondremos arrayUsuarioDB para diferenciar
        //los datos que vienen de la base de datos
        //con respecto al arrayUsuario que tenemos EN LA VISTA
        const arrayUsuarioDB = await Usuario.find();
        console.log(arrayUsuarioDB);
        res.render("usuario", { 
            arrayUsuario: arrayUsuarioDB
        })
    } catch (error) {
        console.error(error)
    }
})



router.get('/register', (req, res) => {
    res.render('register'); //nueva vista que llamaremos Crear
 })
 
 
 router.post('/', async (req, res) => {
     const body = req.body //Gracias al body parser, de esta forma
     //podremos recuperar todo lo que viene del body
     console.log(body) //Para comprobarlo por pantalla
     try {
         const usuarioDB = new Usuario(body) //Creamos un nuevo Usuario, gracias al modelo
         await usuarioDB.save() //Lo guardamos con .save(), gracias a Mongoose
         res.redirect('/usuario') //Volvemos al listado
     } catch (error) {
         console.log('error', error)
     }
 })
 
 router.get('/:id', async(req, res) => { //El id vendrá por el GET (barra de direcciones)
    const id = req.params.id //Recordemos que en la plantilla "usuario.ejs" le pusimos
    //a este campo usuario.id, por eso lo llamados con params.id
    try {
        const usuarioDB = await Usuario.findOne({ _id: id }) //_id porque así lo indica Mongo
							//Esta variable “Usuario” está definida arriba con el “require”
        //Buscamos con Mongoose un único documento que coincida con el id indicado
        console.log(usuarioDB) //Para probarlo por consola
        res.render('detalleusuario', { //Para mostrar el objeto en la vista "detalle", que tenemos que crear
            usuario: usuarioDB,
            error: false
        })
    } catch (error) { //Si el id indicado no se encuentra
        console.log('Se ha producido un error', error)
        res.render('detalleusuario', { //Mostraremos el error en la vista "detalle"
            error: true,
            mensaje: 'Usuario no encontrado!'
        })
    }
})
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    console.log('id desde backend', id)
    try {
        //En la documentación de Mongoose podremos encontrar la
        //siguiente función para eliminar
        const usuarioDB = await Usuario.findByIdAndDelete({ _id: id });
        console.log(usuarioDB)
        // https://stackoverflow.com/questions/27202075/expressjs-res-redirect-not-working-as-expected
        // res.redirect('/usuario') //Esto daría un error, tal y como podemos ver arriba
        if (!usuarioDB) {
            res.json({ 
                estado: false,
                mensaje: 'No se puede eliminar el Pokémon.'
            })
        } else {
            res.json({
                estado: true,
                mensaje: 'Pokémon eliminado.'
            })
        } 
    } catch (error) {
        console.log(error)
    }
})
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    console.log(id)
    console.log('body', body)
    try {
        const usuarioDB = await Usuario.findByIdAndUpdate(
            id, body, { useFindAndModify: false }
        )
        console.log(usuarioDB)
        res.json({
            estado: true,
            mensaje: 'Pokémon editado'
        })
    } catch (error) {
        console.log(error)
        res.json({
            estado: false,
            mensaje: 'Problema al editar el Pokémon'
        })
    }
})
 
module.exports = router;

module.exports = router;
