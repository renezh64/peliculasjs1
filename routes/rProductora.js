var express = require('express');
var router = express.Router();
const Productora = require("../model/mdlProductora.js");
const {getConnection , closeConn} =require("../bd/connect-mongo.js");

/* GET users listing. */
router.get('/', async(req, res, next)=> {
	try
	{
    await getConnection(); 
		const mProductora = await Productora.find();
		res.json(mProductora);
    closeConn();
	}
	catch(error)
	{
		res.status(500).json({ error: error.message+" error" });		closeConn();
	}
  //res.send('respond with a resource++++');
});

//obtenemos uno
router.get("/:id", async(req, res, next)=> 
{
	try
	{
    await getConnection(); 
		const miProductora = await Productora.findById(req.params.id);
		if(!miProductora)
		{return res.status(404).json({ error: 'Productora no encontrado' });}
		res.json(miProductora);
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
    const miProductora = new Productora(req.body);
    await miProductora.save();
    res.status(201).json(miProductora);
    closeConn();
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
    await getConnection(); 
    const miProductora = await Productora.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true, });
    if(!miProductora)
	{ return res.status(404).json({ error: 'Productora no encontrado' }); }
	res.json(miProductora);
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
    const miProductora= await Productora.findByIdAndDelete(req.params.id);
    if(!miProductora)
	{	return res.status(404).json({ error: 'Directos no encontrado' });}
    res.json({ message: 'Productora borrado exitosamente' });
    closeConn();
  }
  catch(error)
  {
    res.status(500).json({ error: error.message }); closeConn();
  }
});

module.exports = router;