const { validationResult } = require("express-validator");

const validarCampos = (req, res, next) => {
    // Obtiene los errores de validación en el objeto de solicitud
    const errors = validationResult(req);
    // Si hay errores, responde con un código de estado 400 y los errores
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    // Si no hay errores, llama a la siguiente función en la pila de middlewaredhbDiHidroBoldenona
    next();
};

module.exports = {
    validarCampos,
};
