// Importa los módulos necesarios de Express y express-validator.
const { Router } = require("express");
const { check } = require("express-validator");

// Importa funciones personalizadas y controladores desde archivos locales.
const { validarCampos } = require("../middlewares/validarCampos");
const { studentExistePorId, phoneExiste } = require("../helpers/dbValidators");
const {
    postPhone,
    getPhones,
    patchPhone,
    deletePhone,
} = require("../controllers/phoneController");

// Crea una instancia del enrutador de Express.
const router = Router();

// Define la ruta para agregar un teléfono a un estudiante.
router.post(
    "/:id/phone",
    [
        // Realiza la validación de los campos de entrada utilizando express-validator.
        // Verifica que "id" sea numérico y que el estudiante exista.
        check("id")
            .isNumeric()
            .withMessage("El ID solo debe contener números")
            .custom(studentExistePorId) // Verifica si el estudiante existe
            .notEmpty()
            .withMessage("El ID del estudiante es obligatorio"),
        // Valida el número de teléfono.
        check("phone")
            .isString()
            .matches(/^[0-9]+$/)
            .isLength({ min: 7, max: 7 })
            .withMessage("Debe contener exactamente 7 dígitos")
            .notEmpty()
            .withMessage("El teléfono es requerido"),
        // Valida el tipo de teléfono.
        check("phone_type")
            .isString()
            .matches(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/i)
            .withMessage("Solo admite letras sin espacios")
            .isIn(["Mobile", "Home", "Work", "Other"])
            .withMessage("Debe ser un valor válido")
            .notEmpty()
            .withMessage("El tipo de teléfono es requerido"),
        // Valida el código de país.
        check("country_code")
            .isString()
            .matches(/^[0-9]+$/)
            .isLength({ min: 1, max: 3 })
            .withMessage("Debe contener un máximo de 3 dígitos")
            .notEmpty()
            .withMessage("El código de país es requerido"),
        // Valida el código de área.
        check("area_code")
            .isString()
            .matches(/^[0-9]+$/)
            .isLength({ min: 1, max: 3 })
            .withMessage("Debe contener un máximo de 3 dígitos")
            .notEmpty()
            .withMessage("El código de área es requerido"),
        // Middleware para validar los campos.
        validarCampos,
    ],
    // Controlador para agregar un teléfono.
    postPhone
);

// Define la ruta para obtener los teléfonos de un estudiante.
router.get(
    "/:id/phone",
    [
        // Realiza la validación de los campos de entrada utilizando express-validator.
        // Verifica que "id" sea numérico y que el estudiante exista.
        check("id")
            .isNumeric()
            .withMessage("El ID solo debe contener números")
            .custom(studentExistePorId) // Verifica si el estudiante existe
            .notEmpty()
            .withMessage("El ID del estudiante es obligatorio"),
        // Middleware para validar los campos.
        validarCampos,
    ],
    // Controlador para obtener los teléfonos de un estudiante.
    getPhones
);

// Define la ruta para actualizar un teléfono de un estudiante.
router.patch(
    "/:id/phone",
    [
        // Realiza la validación de los campos de entrada utilizando express-validator.
        // Verifica que "id" sea numérico y que el teléfono exista.
        check("id")
            .isNumeric()
            .withMessage("El ID solo debe contener números")
            .custom(phoneExiste)
            .notEmpty()
            .withMessage("El ID del teléfono es obligatorio"),
        // Valida el número de teléfono.
        check("phone")
            .isString()
            .matches(/^[0-9]+$/)
            .isLength({ min: 7, max: 7 })
            .withMessage("Debe contener exactamente 7 dígitos")
            .notEmpty()
            .withMessage("El teléfono es requerido"),
        // Valida el tipo de teléfono.
        check("phone_type")
            .isString()
            .matches(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/i)
            .withMessage("Solo admite letras sin espacios")
            .isIn(["Mobile", "Home", "Work", "Other"])
            .withMessage("Debe ser un valor válido")
            .notEmpty()
            .withMessage("El tipo de teléfono es requerido"),
        // Valida el código de país.
        check("country_code")
            .isString()
            .matches(/^[0-9]+$/)
            .isLength({ min: 1, max: 3 })
            .withMessage("Debe contener un máximo de 3 dígitos")
            .notEmpty()
            .withMessage("El código de país es requerido"),
        // Valida el código de área.
        check("area_code")
            .isString()
            .matches(/^[0-9]+$/)
            .isLength({ min: 1, max: 3 })
            .withMessage("Debe contener un máximo de 3 dígitos")
            .notEmpty()
            .withMessage("El código de área es requerido"),
        // Middleware para validar los campos.
        validarCampos,
    ],
    // Controlador para actualizar un teléfono.
    patchPhone
);

// Define la ruta para eliminar un teléfono de un estudiante.
router.delete(
    "/:id/phone",
    [
        // Realiza la validación de los campos de entrada utilizando express-validator.
        // Verifica que "id" sea numérico y que el teléfono exista.
        check("id")
            .isNumeric()
            .withMessage("El ID solo debe contener números")
            .custom(phoneExiste)
            .notEmpty()
            .withMessage("El ID de la dirección es obligatorio"),
        // Middleware para validar los campos.
        validarCampos,
    ],
    // Controlador para eliminar un teléfono.
    deletePhone
);

// Exporta el enrutador para su uso en otras partes de la aplicación.
module.exports = router;
