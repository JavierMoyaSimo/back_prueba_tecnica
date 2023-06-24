const express = require("express");
const app = express();
const router = require("./routers");
const PORT = process.env.PORT || 3001;
//Cors options
const cors = require('cors')
var corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

// Middlewares
app.use(express.json());
app.use(cors(corsOptions));

//Rutas
app.use(router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
