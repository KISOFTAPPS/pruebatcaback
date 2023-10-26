const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validarCampos");
const {
    studentExistePorId,
    emailNoExiste,
    emailExiste,
} = require("../helpers/dbValidators");

const {
    postEmail,
    getEmail,
    patchEmail,
    deleteEmail,
} = require("../controllers/emailController");

const router = Router();

// Ruta para agregar una nueva dirección de correo electrónico a un estudiante.
router.post(
    "/:id/email",
    [
        // Validación del campo "id".
        check("id")
            .isNumeric()
            .withMessage("El ID solo debe contener números")
            .custom(studentExistePorId) // Verifica si el estudiante existe
            .notEmpty()
            .withMessage("El ID del estudiante es obligatorio"),

        // Validación del campo "email".
        check("email")
            .isEmail()
            .toUpperCase()
            .withMessage("No es un correo válido")
            .custom(emailNoExiste) // Verifica si el correo electrónico no existe
            .notEmpty()
            .withMessage("La dirección es requerida"),
        // Validación del campo "email_type".
        check("email_type")
            .isIn(["PERSONAL", "WORK", "OTHER"])
            .notEmpty()
            .withMessage("Tiene que ser un valor válido"),
        // Middleware para validar los campos.
        validarCampos,
    ],
    postEmail
);

// Ruta para obtener la dirección de correo electrónico de un estudiante.
router.get(
    "/:id/email",
    [
        // Validación del campo "id".
        check("id")
            .isNumeric()
            .withMessage("El ID solo debe contener números")
            .custom(studentExistePorId) // Verifica si el estudiante existe
            .notEmpty()
            .withMessage("El ID del estudiante es obligatorio"),
        // Middleware para validar los campos.
        validarCampos,
    ],
    getEmail
);

// Ruta para actualizar la dirección de correo electrónico de un estudiante.
router.patch(
    "/:id/email",
    [
        // Validación del campo "id".
        check("id")
            .isEmail()
            .withMessage("No es un correo válido")
            .custom(emailExiste) // Verifica si el correo electrónico existe
            .notEmpty()
            .withMessage("La dirección es requerida"),
        // Validación del campo "email_type".
        check("email_type")
            .isIn(["PERSONAL", "WORK", "OTHER"])
            .notEmpty()
            .withMessage("Tiene que ser un valor válido"),
        // Middleware para validar los campos.
        validarCampos,
    ],
    patchEmail
);

// Ruta para eliminar la dirección de correo electrónico de un estudiante.
router.delete(
    "/:id/email",
    [
        // Validación del campo "id".
        check("id")
            .isEmail()
            .withMessage("No es un correo válido")
            .custom(emailExiste)
            .notEmpty()
            .withMessage("La dirección es requerida"),
        // Middleware para validar los campos.
        validarCampos,
    ],
    deleteEmail
);

// Exporta el enrutador para su uso en otras partes de la aplicación.
module.exports = router;
