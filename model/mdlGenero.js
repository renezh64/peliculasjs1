const {Schema, model} =require("mongoose");

const GeneroSchema= Schema({
	Nombre:{type: String, required: true},
	Estado:{type: String, required: true, enum:["Activo","Inactivo"]},
	FechaCre:{type: Date, required:true},
	FechaAct:{type: Date, required:true},
	Descripcion:{type: String, required: false}
});

module.exports= model("mdlGenero",GeneroSchema);