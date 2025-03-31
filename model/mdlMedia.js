import {Schema, model} from "mongoose";

const MediaSchema= Schema({
	Serial:{type: String, required: true, unique:true},
	Titulo:{type: String, required: true},
	Sinopsis:{type: String, required: true},
	Foto:{type: String, required: true},
	FechaCre:{type: Date, required:true},
	FechaAct:{type: Date, required:true},
	FechaCre:{type: Date, required:true},
	AnoEstren:{type: Integer, required:true},
	GeneroPrin:{type: Schema.Types.ObjectId,ref:"mdlGenero", required: false},	
	DirectorPrin:{type: Schema.Types.ObjectId,ref:"mdlDirector", required: false},
	Productora:{type: Schema.Types.ObjectId,ref:"mdlProductora", required: false},
	Tipo:{type: Schema.Types.ObjectId,ref:"mdlTipo", required: false}	
});
//modificar para relacionar con otras tablas.
module.export= model("mdlMedia", MediaSchema);