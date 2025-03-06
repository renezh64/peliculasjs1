import {Schema, model} from "mongoose";

const DirectorSchema= Schema({
	Nombres:{type: String, required: true},
	Estado:{type: String, required: true, enum:["Activo","Inactivo"]},
	FechaCre:{type: Date, required:true},
	FechaAct:{type: Date, required:true},
});

DirectorSchema.pre('save', (next) =>{
  this.FechaAct = Date.now();
  next();
});

module.export= model("mdlDirector",DirectorSchema);