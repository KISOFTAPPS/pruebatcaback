const { db } = require("../db/dbConfig");

const studentExistePorId = async (id) => {
    const query = `
  SELECT *
  FROM student
  WHERE student_id = ?
`;
    const [rows] = await db.query(query, [id]);

    if (rows.length <= 0) {
        throw new Error(
            `El estudiante con el ID: ${id} no existe en la base de datos`
        );
    }
};

const addressNoExiste = async (id) => {
    const query = "SELECT * FROM address WHERE student_id = ?";

    const [rows] = await db.query(query, [id]);

    if (rows.length > 0) {
        throw new Error(
            `Ya existe una dirección registrada para el estudiante con el ID: ${id}. Puede editar la ya existente o eliminarla para poder agregar otra`
        );
    }
};

const addressExiste = async (id) => {
    const query = "SELECT * FROM address WHERE address_id = ?";

    const [rows] = await db.query(query, [id]);

    if (rows.length <= 0) {
        throw new Error(
            `No existe una dirección registrada para el estudiante con el ID: ${id}`
        );
    }
};

const phoneNoExiste = async (id) => {
    const query = "SELECT * FROM phone WHERE phone_id = ?";

    const [rows] = await db.query(query, [id]);

    if (rows.length > 0) {
        throw new Error(
            `Ya existe un teléfono registrado para el estudiante con el ID: ${id}. Puede editar el ya existente o eliminarlo para poder agregar otro`
        );
    }
};

const phoneExiste = async (id) => {
    const query = "SELECT * FROM phone WHERE phone_id = ?";

    const [rows] = await db.query(query, [id]);

    if (rows.length <= 0) {
        throw new Error(
            `No existe un teléfono registrado para el estudiante con el ID: ${id}`
        );
    }
};

const emailNoExiste = async (email) => {
    const query = "SELECT * FROM email WHERE email = ?";

    const [rows] = await db.query(query, [email]);

    if (rows.length > 0) {
        throw new Error(`Ya existe un correo registrado con esa dirección`);
    }
};

const emailExiste = async (email) => {
    const query = "SELECT * FROM email WHERE email = ?";

    const [rows] = await db.query(query, [email]);

    if (rows.length < 1) {
        throw new Error(`No existe un correo registrado con esa dirección`);
    }
};

module.exports = {
    studentExistePorId,
    addressNoExiste,
    addressExiste,
    emailNoExiste,
    emailExiste,
    phoneNoExiste,
    phoneExiste,
};