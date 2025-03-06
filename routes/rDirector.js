var express = require('express');
var router = express.Router();
const Director = require("../model/mdlDirector.js");
const getConnection =require("../bd/connect-mongo.js");

/* GET users listing. */
router.get('/', async(req, res, next)=> {
	try
	{
		const mDirector = await Director.find();
		res.json(mDirector);
	}
	catch(error)
	{
		res.status(500).json({ error: error.message+" rene" });		
	}
  //res.send('respond with a resource++++');
});

//obtenemos uno
router.get("/:id", async(req, res, next)=> 
{
	try
	{
		const miDirector = await Director.findById(req.params.id);
		if(!miDirector)
		{return res.status(404).json({ error: 'Director no encontrado' });}
		res.json(miDirector);
	}
	catch (error)
	{
		res.status(500).json({ error: error.message });
	}
	//next();
  //res.send('respond with a resourceaqui viene la consulta y listamos uno');
});

// Crear un nuevo 
router.post('/add', async (req, res) => 
{
  try
  {
    const miDirector = new Director(req.body);
    await miDirector.save();
    res.status(201).json(miDirector);
  }
  catch (error)
  {
    res.status(400).json({ error: error.message });
  }
});

//Actualiza
router.put('/items/:id', async (req, res) => {
  try 
  {
    const miDirector = await Director.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true, });
    if(!miDirector)
	{ return res.status(404).json({ error: 'Director no encontrado' }); }
	res.json(miDirector);
  }
  catch(error)
  {
    res.status(400).json({ error: error.message });
  }
});

// Borrar un 
router.delete('/:id', async (req, res) => {
  try
  {
    const miDirector= await Director.findByIdAndDelete(req.params.id);
    if(!miDirector)
	{	return res.status(404).json({ error: 'Directos no encontrado' });}
    res.json({ message: 'Director borrado exitosamente' });
  }
  catch(error)
  {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;