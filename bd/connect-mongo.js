//conexion
const mongoose=require("mongoose");
//usr: usrPelicula clave: Gq9BhFhmmu3BSlUB
const getConnection = async ()=> {
	try
	{
		const url ="mongodb+srv://renezapata:velRNW0tAaWuNlSi@clusterrzh001.gdfwt.mongodb.net/renemoviesdb?retryWrites=true&w=majority&appName=ClusterRZH001";
		
		await mongoose.connect(url);
		console.log("Conecto  con db server");
	}
	catch(error)
	{ console.log(error);	}	
}

module.exports=getConnection 