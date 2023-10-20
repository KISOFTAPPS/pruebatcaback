const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const xss = require("xss-clean");
const http = require("http");
const StudentTables = require("./tables/StudentTables");

class Server {
    constructor() {
        // Se crea una instancia de express y se guarda en la propiedad "app"
        this.app = express();

        // Se obtiene el puerto desde la variable de entorno
        this.port = process.env.PORT;

        // Rutas
        this.estudiantePath = "/api/estudiante";

        // Se agregan los middlewares
        this.middlewares();

        // Se agregan tablas
        this.createTables();

        // Se agregan las rutas
        this.routes();

        // Http server
        this.server = http.createServer(this.app);
    }

    createTables() {
        StudentTables();
    }

    // Función para agregar los middlewares
    middlewares() {
        // Se habilita CORS con las opciones por defecto
        this.app.use(
            cors({
                origin: true,
                credentials: true,
                methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
            })
        );

        // Se agrega el middleware de seguridad xss - para ataques xss
        this.app.use(xss());

        // Se agrega el middleware de seguridad helmet - para distintas vulnerabilidades
        this.app.use(helmet());

        // Se agrega el middleware morgan para ver los detalles de las conexiones en la consola
        this.app.use(morgan("dev"));

        // Se agrega el middleware para leer y parsear el body en formato JSON
        this.app.use(express.json());

        // Se agrega el middleware para servir archivos estáticos
        this.app.use(express.static("public"));

        // Se habilita el enrutamiento estricto
        this.app.enable("strict routing");
    }

    // Función para agregar las rutas
    routes() {
        this.app.use(this.estudiantePath, require("../routes/estudiante"));
        this.app.use(this.estudiantePath, require("../routes/address"));
        this.app.use(this.estudiantePath, require("../routes/email"));
        this.app.use(this.estudiantePath, require("../routes/phone"));
    }

    // Función para iniciar el servidor
    start() {
        // Se inicia el servidor en el puerto especificado
        this.server.listen(this.port, () => {
            console.log("Servidor corriendo en el puerto:", this.port);
        });
    }
}

module.exports = Server;
