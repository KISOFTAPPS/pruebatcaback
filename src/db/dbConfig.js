const { createPool } = require("mysql2");

const db = createPool({
    host: process.env.MYSQL_HOST, // Cambia esto por la dirección de host de tu servidor MySQL
    user: process.env.MYSQL_USER, // Cambia esto por tu usuario de MySQL
    port: process.env.MYSQL_PORT, // Cambia esto por el puerto de tu servidor MySQL
    password: process.env.MYSQL_PASSWORD, // Cambia esto por tu contraseña de MySQL
    database: process.env.MYSQL_DATABASE, // Cambia esto por el nombre de tu base de datos
    waitForConnections: true,
    typeCast: function castField(field, useDefaultTypeCasting) {
        // Solo queremos convertir campos BIT que tengan un solo bit en ellos. Si el campo
        // tiene más de un bit, no podemos asumir que se trata de un valor booleano.
        if (field.type === "BIT" && field.length === 1) {
            var bytes = field.buffer();

            // Un Buffer en Node representa una colección de enteros sin signo de 8 bits.
            // Por lo tanto, nuestro "campo de bit" único se interpreta como los bits '0000 0001',
            // lo que es equivalente al número 1.
            return bytes[0] === 1;
        }

        return useDefaultTypeCasting();
    },
}).promise();

module.exports = {
    db,
};
