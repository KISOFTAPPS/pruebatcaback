const { request, response } = require("express");
const { db } = require("../db/dbConfig");

// CREATE ////////////////////////////////////////////////////////////////////////////////////////////////////
const postAddress = async (req = request, res = response) => {
    const { id } = req.params;
    const { address_line, city, zip_postcode, state, address_type } = req.body;
    const query = `INSERT INTO address (student_id, address_line, city, zip_postcode, state, address_type) VALUES (?, ?, ?, ?, ?, ?)`;
    try {
        await db.query(query, [
            id,
            address_line,
            city,
            zip_postcode,
            state,
            address_type,
        ]);
        res.status(201).json({
            msg: "Se agrego la direccion correctamente",
        });
    } catch (error) {
        console.error("Error al agregar la direccion:", error.message);
        res.status(500).json({
            msg: "Error al agregar la direccion",
        });
    }
};

// READ ////////////////////////////////////////////////////////////////////////////////////////////////////
const getAddress = async (req = request, res = response) => {
    const { id } = req.params;
    const query = "SELECT * FROM address WHERE student_id = ?";
    try {
        const [rows] = await db.query(query, [id]);

        res.status(200).json({
            msg: "Direcciones obtenidas correctamente",
            direcciones: rows,
        });
    } catch (error) {
        console.error("Error al leer direcciones:", error.message);
        res.status(500).json({
            msg: "Error al leer direcciones",
        });
    }
};

// UPDATE ////////////////////////////////////////////////////////////////////////////////////////////////////
const patchAddress = async (req = request, res = response) => {
    const { id } = req.params;
    const { address_line, city, zip_postcode, state, address_type } = req.body;
    const query = `
  UPDATE address
  SET
  address_line = ?,
  city = ?,
  zip_postcode = ?, 
  state = ?,
  address_type = ?
  WHERE address_id = ?
`;
    try {
        await db.query(query, [
            address_line,
            city,
            zip_postcode,
            state,
            address_type,
            id,
        ]);

        res.status(201).json({
            msg: "Direccion editada correctamente",
        });
    } catch (error) {
        console.error("Error al editar direccion:", error.message);
        res.status(500).json({
            msg: "Error al editar direccion",
        });
    }
};

// DELETE ////////////////////////////////////////////////////////////////////////////////////////////////////
const deleteAddress = async (req = request, res = response) => {
    const { id } = req.params;
    const query = `
  DELETE FROM address
  WHERE address_id = ?
`;
    try {
        await db.query(query, [id]);

        res.status(202).json({
            msg: "Direccion eliminada correctamente",
        });
    } catch (error) {
        console.error("Error al eliminar direccion:", error.message);
        res.status(500).json({
            msg: "Error al eliminar direccion",
        });
    }
};

module.exports = {
    postAddress,
    getAddress,
    patchAddress,
    deleteAddress,
};
