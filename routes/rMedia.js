var express = require('express');
var router = express.Router();
const Media = require("../model/mdlMedia.js");
const {getConnection , closeConn} =require("../bd/connect-mongo.js");

// Establecer la conexión al cargar el archivo (opcional)
//getConnection().catch( err =>{ console.error("Error inicial de conexión:", err);});

/* GET users listing. */
router.get('/', async(req, res, next)=> {
	try
	{
		await getConnection(); 
		const mMedia = await Media.find();
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
		const miMedia = await Media.findById(req.params.id);
		if(!miMedia)
		{return res.status(404).json({ error: 'Media no encontrada' });}
		res.json(miMedia);
		closeConn();
	}
	catch (error)
	{
		res.status(500).json({ error: error.message });
		closeConn();
	}	
});

// Crear un nuevo tipo
router.put('/add', async (req, res) => 
{
  try
  {
    await getConnection();	
    const miMedia = new Media(req.body);
    await miMedia.save();
    
    res.status(201).json(miMedia);
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
  try 
  {
    await getConnection();
    const miMedia = await Media.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true, });	
    if(!miMedia)
	{ return res.status(404).json({ error: 'Media no encontrado' }); }
	res.json(miMedia);
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
    const miMedia= await Media.findByIdAndDelete(req.params.id);
    if(!miMedia)
	{	return res.status(404).json({ error: 'Media no encontrado' });}
    res.json({ message: 'Media borrado exitosamente' });
    closeConn();
  }
  catch(error)
  {
    res.status(500).json({ error: error.message }); closeConn();
  }
});

module.exports = router;