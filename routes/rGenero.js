var express = require('express');
var router = express.Router();
const Genero = require("../model/mdlGenero.js");
const {getConnection , closeConn} =require("../bd/connect-mongo.js");

/* GET users listing. */
router.get('/', async(req, res, next)=> {
	try
	{
    await getConnection(); 
		const mGenero = await Genero.find();
		res.json(mGenero);
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
		const miGenero = await Genero.findById(req.params.id);
		if(!miGenero)
		{return res.status(404).json({ error: 'Genero no encontrado' });}
		res.json(miGenero);
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

// Crear un nuevo 
router.post('/add', async (req, res) => 
{
  try
  {
    await getConnection(); 
    const miGenero = new Genero(req.body);
    await miGenero.save();
    res.status(201).json(miGenero);
    closeConn();
  }
  catch (error)
  {
    res.status(400).json({ error: error.message });
    closeConn();
  }
});

//Actualiza
router.put('/items/:id', async (req, res) => {
  try 
  {
    await getConnection(); 
    const miGenero = await Genero.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true, });
    if(!miGenero)
	{ return res.status(404).json({ error: 'Genero no encontrado' }); }
	res.json(miDirector);
  closeConn();
  }
  catch(error)
  {
    res.status(400).json({ error: error.message });
    closeConn();
  }
});

// Borrar un 
router.delete('/:id', async (req, res) => {
  try
  {
    await getConnection(); 
    const miDirector= await Director.findByIdAndDelete(req.params.id);
    if(!miDirector)
	{	return res.status(404).json({ error: 'Directos no encontrado' });}
    res.json({ message: 'Director borrado exitosamente' });
    closeConn();
  }
  catch(error)
  {
    res.status(500).json({ error: error.message });
    closeConn();
  }
});

module.exports = router;