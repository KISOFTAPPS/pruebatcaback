const { request, response } = require("express");
const { db } = require("../db/dbConfig");

// CREATE ////////////////////////////////////////////////////////////////////////////////////////////////////
const postEstudiante = async (req = request, res = response) => {
    const { last_name, middle_name, first_name, gender } = req.body;
    const query = `INSERT INTO student (last_name, middle_name, first_name, gender) VALUES (?, ?, ?, ?)`;
    try {
        const [result] = await db.query(query, [
            last_name,
            middle_name,
            first_name,
            gender,
        ]);
        res.status(201).json({
            msg: "Estudiantes registrado correctamente",
            estudiante: `${last_name} ${first_name}${
                !middle_name ? "" : " " + middle_name
            }`,
            estudianteId: result.insertId,
        });
    } catch (error) {
        console.error("Error al crear estudiante:", error.message);
        res.status(500).json({
            msg: "Error al crear estudiante",
        });
    }
};

// READ ////////////////////////////////////////////////////////////////////////////////////////////////////
const getEstudiante = async (req = request, res = response) => {
    const query = "SELECT * FROM student";
    try {
        const [rows] = await db.query(query);

        res.status(200).json({
            msg: "Estudiantes obtenidos correctamente",
            estudiantes: rows,
        });
    } catch (error) {
        console.error("Error al leer estudiantes:", error.message);
        res.status(500).json({
            msg: "Error al leer estudiantes",
        });
    }
};

// READ ////////////////////////////////////////////////////////////////////////////////////////////////////
const getEstudianteById = async (req = request, res = response) => {
    const { id } = req.params;
    const query = "SELECT * FROM student WHERE student_id = ?";
    try {
        const [rows] = await db.query(query, [id]);

        res.status(200).json({
            msg: "Estudiante obtenido correctamente",
            estudiante: rows[0],
        });
    } catch (error) {
        console.error("Error al leer estudiante:", error.message);
        res.status(500).json({
            msg: "Error al leer estudiante",
        });
    }
};

// READ ////////////////////////////////////////////////////////////////////////////////////////////////////
const patchEstudiante = async (req = request, res = response) => {
    const { id } = req.params;
    const { last_name, middle_name, first_name, gender, active } = req.body;
    const query = `
  UPDATE student
  SET
    last_name = ?,
    middle_name = ?,
    first_name = ?,
    gender = ?,
    active = ?
  WHERE student_id = ?
`;
    const activeCon = active === "true" ? 1 : 0;

    try {
        await db.query(query, [
            last_name,
            middle_name,
            first_name,
            gender,
            activeCon,
            id,
        ]);

        res.status(201).json({
            msg: "Estudiantes editado correctamente",
        });
    } catch (error) {
        console.error("Error al editar estudiante:", error.message);
        res.status(500).json({
            msg: "Error al editar estudiante",
        });
    }
};

// DELETE ////////////////////////////////////////////////////////////////////////////////////////////////////
const deleteEstudiante = async (req = request, res = response) => {
    const { id } = req.params;
    const query = `
    DELETE FROM student WHERE student_id = ?
`;
    try {
        await db.query(query, [id]);

        res.status(202).json({
            msg: "Estudiante eliminado correctamente",
        });
    } catch (error) {
        console.error("Error al eliminar estudiante:", error.message);
        res.status(500).json({
            msg: "Error al eliminar estudiante",
        });
    }
};

module.exports = {
    postEstudiante,
    getEstudiante,
    getEstudianteById,
    patchEstudiante,
    deleteEstudiante,
};
