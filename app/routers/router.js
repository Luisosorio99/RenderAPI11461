let express = require('express');
let router = express.Router();

const Licores = require('../controllers/licores.controller.js');

// Rutas para Licores
router.post('/api/licor/crear', Licores.create); // Crear un nuevo licor
router.get('/api/licor/:id', Licores.getLicorById); // Obtener un licor por su ID
router.put('/api/licor/actualizar/:id', Licores.updateById); // Actualizar un licor por su ID
router.delete('/api/licor/eliminar/:id', Licores.deleteById); // Eliminar un licor por su ID
router.get('/api/licores', Licores.getAllLicores); // Obtener todos los licores

module.exports = router;