require("dotenv").config();
const mongoose = require("mongoose");

const URL = process.env.URI;

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



