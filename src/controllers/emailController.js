const { request, response } = require("express");
const { db } = require("../db/dbConfig");

// CREATE ////////////////////////////////////////////////////////////////////////////////////////////////////
const postEmail = async (req = request, res = response) => {
    const { id } = req.params;
    const { email, email_type } = req.body;
    const query = `INSERT INTO email (student_id, email, email_type) VALUES (?, ?, ?)`;
    try {
        await db.query(query, [id, email, email_type]);
        res.status(201).json({
            msg: "Se agrego el email correctamente",
        });
    } catch (error) {
        console.error("Error al agregar el email:", error.message);
        res.status(500).json({
            msg: "Error al agregar el email",
        });
    }
};

// READ ////////////////////////////////////////////////////////////////////////////////////////////////////
const getEmail = async (req = request, res = response) => {
    const { id } = req.params;
    const query = "SELECT * FROM email WHERE student_id = ?";
    try {
        const [rows] = await db.query(query, [id]);

        res.status(200).json({
            msg: "Emails obtenidos correctamente",
            emails: rows,
        });
    } catch (error) {
        console.error("Error al leer emails:", error.message);
        res.status(500).json({
            msg: "Error al leer emails",
        });
    }
};

// UPDATE ////////////////////////////////////////////////////////////////////////////////////////////////////
const patchEmail = async (req = request, res = response) => {
    const { id } = req.params;
    const { email_type } = req.body;
    const query = "UPDATE email SET email_type = ? WHERE email = ?";

    try {
        await db.query(query, [email_type, id]);

        res.status(201).json({
            msg: "Email editado correctamente",
        });
    } catch (error) {
        console.error("Error al editar email:", error.message);
        res.status(500).json({
            msg: "Error al editar email",
        });
    }
};

// DELETE ////////////////////////////////////////////////////////////////////////////////////////////////////
const deleteEmail = async (req = request, res = response) => {
    const { id } = req.params;
    const query = `
  DELETE FROM email
  WHERE email = ?
`;
    try {
        await db.query(query, [id]);

        res.status(202).json({
            msg: "Email eliminada correctamente",
        });
    } catch (error) {
        console.error("Error al eliminar email:", error.message);
        res.status(500).json({
            msg: "Error al eliminar email",
        });
    }
};

module.exports = {
    postEmail,
    getEmail,
    patchEmail,
    deleteEmail,
};
