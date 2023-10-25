const { Router } = require("express");
const { check } = require("express-validator");
const {
    getEstudiante,
    postEstudiante,
    patchEstudiante,
    deleteEstudiante,
    getEstudianteById,
} = require("../controllers/estudianteController");
const { validarCampos } = require("../middlewares/validarCampos");
const { studentExistePorId } = require("../helpers/dbValidators");

const router = Router();

// Ruta para crear un nuevo estudiante.
router.post(
    "/",
    [
        // Validación del campo "last_name".
        check("last_name")
            .isString()
            .toUpperCase()
            .notEmpty()
            .withMessage("El apellido es requerido")
            .matches(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/i)
            .withMessage("El apellido solo admite letras y espacios"),
        // Validación del campo "middle_name" (opcional).
        check("middle_name")
            .isString()
            .toUpperCase()
            .matches(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/i)
            .withMessage("El segundo nombre solo admite letras y espacios")
            .optional({ nullable: true, checkFalsy: true }),
        // Validación del campo "first_name".
        check("first_name")
            .isString()
            .toUpperCase()
            .notEmpty()
            .withMessage("El nombre es requerido")
            .matches(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/i)
            .withMessage("El nombre solo admite letras y espacios"),
        // Validación del campo "gender".
        check("gender")
            .notEmpty()
            .isIn(["MALE", "FEMALE", "OTHER"])
            .withMessage("Tiene que ser un valor válido"),
        // Middleware para validar los campos.
        validarCampos,
    ],
    postEstudiante
);

// Ruta para obtener todos los estudiantes.
router.get("/", [validarCampos], getEstudiante);

// Ruta para obtener un estudiante por ID.
router.get(
    "/:id",
    [
        // Validación del campo "id".
        check("id")
            .isNumeric()
            .withMessage("Solo números")
            .custom(studentExistePorId)
            .notEmpty()
            .withMessage("Dato obligatorio"),
        // Middleware para validar los campos.
        validarCampos,
    ],
    getEstudianteById
);

// Ruta para actualizar un estudiante por ID.
router.patch(
    "/:id",
    [
        // Validación del campo "id".
        check("id")
            .custom(studentExistePorId)
            .notEmpty()
            .withMessage("Dato obligatorio"),
        // Validación del campo "last_name".
        check("last_name")
            .isString()
            .toUpperCase()
            .notEmpty()
            .withMessage("El apellido es requerido")
            .matches(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/i)
            .withMessage("El apellido solo admite letras y espacios"),
        // Validación del campo "middle_name" (opcional).
        check("middle_name")
            .isString()
            .toUpperCase()
            .matches(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/i)
            .withMessage("El segundo nombre solo admite letras y espacios")
            .optional({ nullable: true, checkFalsy: true }),
        // Validación del campo "first_name".
        check("first_name")
            .isString()
            .toUpperCase()
            .notEmpty()
            .withMessage("El nombre es requerido")
            .matches(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/i)
            .withMessage("El nombre solo admite letras y espacios"),
        // Validación del campo "gender".
        check("gender")
            .isIn(["MALE", "FEMALE", "OTHER"])
            .withMessage("Tiene que ser un valor válido"),
        check("active")
            .trim()
            .isIn(["true", "false"])
            .toLowerCase()
            .isBoolean("Solo booleanos")
            .withMessage("Tiene que ser un valor válido"),
        // Middleware para validar los campos.
        validarCampos,
    ],
    patchEstudiante
);

// Ruta para eliminar un estudiante por ID.
router.delete(
    "/:id",
    [
        // Validación del campo "id".
        check("id")
            .isNumeric()
            .withMessage("Solo números")
            .custom(studentExistePorId)
            .notEmpty()
            .withMessage("Dato obligatorio"),
        // Middleware para validar los campos.
        validarCampos,
    ],
    deleteEstudiante
);

// Exporta el enrutador para su uso en otras partes de la aplicación.
module.exports = router;
