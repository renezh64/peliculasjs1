import {Schema, model} from "mongoose";

const ProductoraSchema= Schema({
	NombresPro:{type: String, required: true},
	Estado:{type: String, required: true, enum:["Activo","Inactivo"]},
	FechaCre:{type: Date, required:true},
	FechaAct:{type: Date, required:true},
	Eslogan:{type: String, required: true},
	Descripcion:{type: String, required: false}
});

ProductoraSchema.pre('save', (next) =>{
  this.FechaAct = Date.now();
  next();
});

module.export= model("mdlProductora", ProductoraSchema);