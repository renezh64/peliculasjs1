var express = require('express');
var router = express.Router();
const Director = require("../model/mdlDirector.js");
const {getConnection , closeConn} =require("../bd/connect-mongo.js");

/* GET users listing. */
router.get('/', async(req, res, next)=> {
  try
  {
    await getConnection();
    const mDirector = await Director.find();
    res.json(mDirector);
    closeConn();
  }
  catch(error)
  {
    res.status(500).json({ error: error.message });   
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
    const miDirector = await Director.findById(req.params.id);
    if(!miDirector)
    {return res.status(404).json({ error: 'Director no encontrado' });}
    res.json(miDirector);
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
router.put('/add', async (req, res) => 
{
  try
  {
    await getConnection();
    const miDirector = new Director(req.body);
    await miDirector.save();
    res.status(201).json(miDirector);
    closeConn();
  }
  catch (error)
  {
    res.status(400).json({ error: error.message });
    closeConn();
  }
});

//Actualiza
router.post('/:id', async (req, res) => {
  try 
  {
    await getConnection();
    const miDirector = await Director.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true, });
    if(!miDirector)
  { return res.status(404).json({ error: 'Director no encontrado' }); }
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
  { return res.status(404).json({ error: 'Directos no encontrado' });}
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