//conexion
const mongoose=require("mongoose");

const getConnection = async ()=> {
	try
	{
		const url ="mongodb+srv://renezapata:velRNW0tAaWuNlSi@clusterrzh001.gdfwt.mongodb.net/renemoviesdb?retryWrites=true&w=majority&appName=ClusterRZH001";
		
    
		await mongoose.connect(url);
		console.log("Conecto  con db server");
		return mongoose.connection;
	}
	catch(error)
	{ console.log(error);	throw error;}	
}

//cierra la conexion
const closeConn= async ()=>{
	try
	{
		await mongoose.connection.close();
		console.log("Cierre conexion")

	} catch(error)
	{
		console.error("Error cerrando conexion:",error);
		throw error;
	}

};

module.exports={ getConnection, closeConn };