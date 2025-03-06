var express = require('express');
var router = express.Router();
const Productora = require("../model/mdlProductora.js");
const getConnection =require("../bd/connect-mongo.js");

/* GET users listing. */
router.get('/', async(req, res, next)=> {
	try
	{
		const mProductora = await Productora.find();
		res.json(mProductora);
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
		const miProductora = await Productora.findById(req.params.id);
		if(!miProductora)
		{return res.status(404).json({ error: 'Productora no encontrado' });}
		res.json(miProductora);
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
    const miProductora = new Productora(req.body);
    await miProductora.save();
    res.status(201).json(miProductora);
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
    const miProductora = await Productora.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true, });
    if(!miProductora)
	{ return res.status(404).json({ error: 'Productora no encontrado' }); }
	res.json(miProductora);
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
    const miProductora= await Productora.findByIdAndDelete(req.params.id);
    if(!miProductora)
	{	return res.status(404).json({ error: 'Directos no encontrado' });}
    res.json({ message: 'Productora borrado exitosamente' });
  }
  catch(error)
  {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;