/*Importaciones de terceros */
require("dotenv").config();
//const cron = require('node-cron');
/*Importaciones propias */
const Server = require("./models/server");

/*Arranque de server */
const server = new Server()
server.start()
