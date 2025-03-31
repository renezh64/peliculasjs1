var express = require('express');
var router = express.Router();
const Tipo = require("../model/mdlTipo.js");
const {getConnection , closeConn} =require("../bd/connect-mongo.js");

// Establecer la conexión al cargar el archivo (opcional)
//getConnection().catch( err =>{ console.error("Error inicial de conexión:", err);});

/* GET users listing. */
router.get('/', async(req, res, next)=> {
	try
	{
    await getConnection(); 
		const mTipo = await Tipo.find();
    res.json(mTipo);
    closeConn();
	}
	catch(error)
	{
		res.status(500).json({ error: error.message+" rene" });		
    closeConn();
	}
  //res.send('respond with a resource++++');
});

//obtenemos uno
router.get("/:id", async(req, res, next)=> 
{
	try
	{
    await getConnection();
		const miTipo = await Tipo.findById(req.params.id);
		if(!miTipo)
		{return res.status(404).json({ error: 'Tipo no encontrado' });}
		res.json(miTipo);
    closeConn();
	}
	catch (error)
	{
		res.status(500).json({ error: error.message });
    closeConn();
	}
	//next();
  //res.send('respond with a resourceaqui viene la consulta y listamos uno');
});

// Crear un nuevo tipo
router.put('/add', async (req, res) => 
{
  try
  {
    await getConnection();
	
    const miTipo = new Tipo(req.body);
    await miTipo.save();
    
    res.status(201).json(miTipo);
    closeConn();
  }
  catch (error)
  {
	  console.log(req.body);
    res.status(400).json({ error: error.message });
    closeConn();
  }
});

//Actualiza
router.post('/:id', async (req, res) => {
	console.log(req.params);
  try 
  {
    await getConnection();
    const miTipo = await Tipo.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true, });
	
    if(!miTipo)
	{ return res.status(404).json({ error: 'Tipo no encontrado' }); }
	res.json(miTipo);
	closeConn();
  }
  catch(error)
  {
    res.status(400).json({ error: error.message });
    closeConn();
  }
});

// Borrar un Tipo
router.delete('/:id', async (req, res) => {
  try
  {
    await getConnection();
    const miTipo= await Tipo.findByIdAndDelete(req.params.id);
    if(!miTipo)
	{	return res.status(404).json({ error: 'Tipo no encontrado' });}
    res.json({ message: 'Tipo borrado exitosamente' });
    closeConn();
  }
  catch(error)
  {
    res.status(500).json({ error: error.message }); closeConn();
  }
});

module.exports = router;
