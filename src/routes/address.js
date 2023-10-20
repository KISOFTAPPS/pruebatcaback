const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validarCampos");
const {
    studentExistePorId,
    addressExiste,
} = require("../helpers/dbValidators");
const {
    postAddress,
    getAddress,
    patchAddress,
    deleteAddress,
} = require("../controllers/addressController");

const router = Router();

// Ruta para agregar una nueva dirección a un estudiante.
router.post(
    "/:id/address",
    [
        // Validación del campo "id".
        check("id")
            .isNumeric()
            .withMessage("El ID solo debe contener números")
            .custom(studentExistePorId) // Verifica si el estudiante existe
            .notEmpty()
            .withMessage("El ID del estudiante es obligatorio"),
        // Validación del campo "address_line".
        check("address_line")
            .isString()
            .notEmpty()
            .withMessage("La dirección es requerida"),
        // Validación del campo "city".
        check("city")
            .isString()
            .notEmpty()
            .withMessage("La ciudad es requerida"),
        // Validación del campo "zip_postcode".
        check("zip_postcode")
            .isNumeric()
            .withMessage("Valor inválido")
            .notEmpty()
            .withMessage("El código postal es requerido")
            .isLength({ min: 5, max: 5 })
            .withMessage("Debe contener exactamente 5 dígitos")
            .matches(/^[0-9]+$/)
            .withMessage("Solo se permiten números"),
        // Validación del campo "state".
        check("state")
            .isString()
            .notEmpty()
            .withMessage("El estado es requerido"),
        // Middleware para validar los campos.
        validarCampos,
    ],
    postAddress
);

// Ruta para obtener la dirección de un estudiante.
router.get(
    "/:id/address",
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
    getAddress
);

// Ruta para actualizar la dirección de un estudiante.
router.patch(
    "/:id/address",
    [
        // Validación del campo "id".
        check("id")
            .isNumeric()
            .withMessage("El ID solo debe contener números")
            .custom(addressExiste) // Verifica si la dirección existe
            .notEmpty()
            .withMessage("El ID de la dirección es obligatorio"),
        // Validación del campo "address_line".
        check("address_line")
            .isString()
            .matches(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9\s]+$/i)
            .withMessage("La dirección solo admite letras, números y espacios")
            .notEmpty()
            .withMessage("La dirección es requerida"),
        // Validación del campo "city".
        check("city")
            .isString()
            .matches(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/i)
            .withMessage("El nombre de la ciudad solo admite letras y espacios")
            .notEmpty()
            .withMessage("La ciudad es requerida"),
        // Validación del campo "zip_postcode".
        check("zip_postcode")
            .isString()
            .isLength({ min: 5, max: 5 })
            .notEmpty()
            .withMessage("El código postal es requerido")
            .matches(/^[0-9]+$/)
            .withMessage("Solo se permiten números"),
        // Validación del campo "state".
        check("state")
            .isString()
            .matches(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/i)
            .withMessage("El nombre del estado solo admite letras y espacios")
            .notEmpty()
            .withMessage("El nombre del estado es requerido"),
        // Middleware para validar los campos.
        validarCampos,
    ],
    patchAddress
);

// Ruta para eliminar la dirección de un estudiante.
router.delete(
    "/:id/address",
    [
        // Validación del campo "id".
        check("id")
            .isNumeric()
            .withMessage("El ID solo debe contener números")
            .custom(addressExiste)
            .notEmpty()
            .withMessage("El ID de la dirección es obligatorio"),
        // Middleware para validar los campos.
        validarCampos,
    ],
    deleteAddress
);

// Exporta el enrutador para su uso en otras partes de la aplicación.
module.exports = router;
