const {Schema, model} = require("mongoose");

const TipoSchema = new Schema({
  Nombre: {type: String, required: true,},
  FechaCre: { type: Date, default: Date.now },
  FechaAct: { type: Date, default: Date.now },
  Descripcion: { type: String, required: true },
});

TipoSchema.pre('save', (next) =>{
  this.FechaAct = Date.now();
  next();
});

module.exports= model("mdlTipo", TipoSchema);