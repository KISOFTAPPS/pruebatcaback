const { request, response } = require("express");
const { db } = require("../db/dbConfig");

// CREATE ////////////////////////////////////////////////////////////////////////////////////////////////////
const postPhone = async (req = request, res = response) => {
    const { id } = req.params;
    const { phone, phone_type, country_code, area_code } = req.body;
    const query = `INSERT INTO phone (student_id, phone, phone_type, country_code, area_code) VALUES (?, ?, ?, ?, ?)`;
    try {
        await db.query(query, [id, phone, phone_type, country_code, area_code]);
        res.status(201).json({
            msg: "Se agrego el telefono correctamente",
        });
    } catch (error) {
        console.error("Error al agregar el telefono:", error.message);
        res.status(500).json({
            msg: "Error al agregar el telefono",
        });
    }
};

// READ ////////////////////////////////////////////////////////////////////////////////////////////////////
const getPhones = async (req = request, res = response) => {
    const { id } = req.params;
    const query = "SELECT * FROM phone WHERE student_id = ?";
    try {
        const [rows] = await db.query(query, [id]);

        res.status(200).json({
            msg: "Teléfonos obtenidos correctamente",
            telefonos: rows,
        });
    } catch (error) {
        console.error("Error al leer teléfonos:", error.message);
        res.status(500).json({
            msg: "Error al leer teléfonos",
        });
    }
};

// UPDATE ////////////////////////////////////////////////////////////////////////////////////////////////////
const patchPhone = async (req = request, res = response) => {
    const { id } = req.params;
    const { phone, phone_type, country_code, area_code } = req.body;
    const query = `
  UPDATE phone
  SET
  phone = ?,
  phone_type = ?,
  country_code = ?,
  area_code = ?
  WHERE phone_id = ?
`;
    try {
        await db.query(query, [phone, phone_type, country_code, area_code, id]);

        res.status(201).json({
            msg: "Teléfono editado correctamente",
        });
    } catch (error) {
        console.error("Error al editar teléfono:", error.message);
        res.status(500).json({
            msg: "Error al editar teléfono",
        });
    }
};

// DELETE ////////////////////////////////////////////////////////////////////////////////////////////////////
const deletePhone = async (req = request, res = response) => {
    const { id } = req.params;
    const query = `
  DELETE FROM phone
  WHERE phone_id = ?
`;
    try {
        await db.query(query, [id]);

        res.status(202).json({
            msg: "Teléfono eliminado correctamente",
        });
    } catch (error) {
        console.error("Error al eliminar teléfono:", error.message);
        res.status(500).json({
            msg: "Error al eliminar teléfono",
        });
    }
};

module.exports = {
    postPhone,
    getPhones,
    patchPhone,
    deletePhone,
};
