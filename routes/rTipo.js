var express = require('express');
var router = express.Router();
const Tipo = require("../model/mdlTipo.js");
const getConnection =require("../bd/connect-mongo.js");

/* GET users listing. */
router.get('/', async(req, res, next)=> {
	try
	{
		const mTipo = await Tipo.find();
		res.json(mTipo);
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
		const miTipo = await Tipo.findById(req.params.id);
		if(!miTipo)
		{return res.status(404).json({ error: 'Tipo no encontrado' });}
		res.json(miTipo);
	}
	catch (error)
	{
		res.status(500).json({ error: error.message });
	}
	//next();
  //res.send('respond with a resourceaqui viene la consulta y listamos uno');
});

// Crear un nuevo tipo
router.post('/add', async (req, res) => 
{
  try
  {
    const miTipo = new Tipo(req.body);
    await miTipo.save();
    res.status(201).json(miTipo);
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
    const miTipo = await Tipo.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true, });
    if(!miTipo)
	{ return res.status(404).json({ error: 'Tipo no encontrado' }); }
	res.json(miTipo);
  }
  catch(error)
  {
    res.status(400).json({ error: error.message });
  }
});

// Borrar un Tipo
router.delete('/:id', async (req, res) => {
  try
  {
    const miTipo= await Tipo.findByIdAndDelete(req.params.id);
    if(!miTipo)
	{	return res.status(404).json({ error: 'Tipo no encontrado' });}
    res.json({ message: 'Tipo borrado exitosamente' });
  }
  catch(error)
  {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
