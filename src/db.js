require("dotenv").config();
const mongoose = require("mongoose");

const URL = process.env.URI;
const databaseName = "develop";

//Para usar el nuevo analizador de cadenas, pasar la opción {useNewUrlParser: true } a mongoose.connect
// Para utilizar el nuevo motor Server Discover and Monitoring, pasar la opción { useUnifiedTopology: true } al constructor de mongoose


mongoose
  .connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("DB Connected");
  })
  .catch((error) => {
    console.error("DB Connection Error:", error);
  });

const dbConnection = mongoose.connection;

module.exports = dbConnection;



//------------------------------------------------------------------------------------------------------//

// require("dotenv").config();
// const MongoClient = require("mongodb").MongoClient;
// const URL = process.env.URI;
// const databaseName = "develop";

// var DbConnection = function () {
//   var client = null;

//   async function DbConnect() {
//     try {
//       console.log("DB Connect");
//       var _client = new MongoClient(URL, { useUnifiedTopology: true });
//       await _client.connect();
//       //let _db = await MongoClient.connect(URL);

//       return _client;
//     } catch (e) {
//       console.log("ERRROR: ", e);

//       return null;
//     }
//   }

//   async function Get() {
//     try {
//       if (client != null) {
//         return client.db(databaseName);
//       } else {
//         client = await DbConnect();

//         return client.db(databaseName);
//       }
//     } catch (e) {
//       return e;
//     }
//   }

//   async function GetClient() {
//     try {
//       if (client != null) {
//         return client;
//       } else {
//         client = await DbConnect();

//         return client;
//       }
//     } catch (e) {
//       return e;
//     }
//   }

//   return { GetConection: Get, GetClient: GetClient };
// };

// //NO ES NECESARIO LLAMAR A LA FUNCIÓN A LA HORA DE EXPORTARLA. ESTARÍA MEJOR EXPORTARLO ASI:
// // module.exports = DbConnection;

// module.exports = DbConnection();

// CON MONGOOSE SERIA TODO MUCHO MAS SIMPLE, MAS INTUITIVO:
