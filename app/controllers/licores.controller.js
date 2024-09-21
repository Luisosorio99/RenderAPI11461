const db = require('../config/db.config.js');
const licores = require('../models/licores.js');
const Licores = db.Licores;

exports.create = (req, res) => {
    let licor = {};

    try {
        // Construyendo el objeto Licor desde el cuerpo de la solicitud
        licor.Nombre_producto = req.body.Nombre_producto;
        licor.Marca = req.body.Marca;
        licor.Tipo = req.body.Tipo;
        licor.Contenido_ml = req.body.Contenido_ml;
        licor.Porcentaje_alcohol = req.body.Porcentaje_alcohol;
        licor.Precio = req.body.Precio;
        licor.Pais_origen = req.body.Pais_origen;
        licor.Fecha_importacion = req.body.Fecha_importacion;
        licor.stock = req.body.stock;
        licor.proveedor = req.body.proveedor;

        // Guardar en la base de datos
        Licores.create(licor).then(result => {
            res.status(200).json({
                message: "Licor agregado con éxito, con id = " + result.id,
                licor: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error!",
            error: error.message
        });
    }
}

exports.getLicorById = (req, res) => {
    let licorId = req.params.id;
    Licores.findByPk(licorId)
        .then(licor => {
            res.status(200).json({
                message: "Se obtuvo con éxito el licor con id = " + licorId,
                licor: licor,
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}

exports.updateById = async (req, res) => {
    try {
        let licorId = req.params.id;
        let licor = await Licores.findByPk(licorId);

        if (!licor) {
            res.status(404).json({
                message: "No se pudo actualizar el licor con id = " + licorId,
                licor: "",
                error: "404"
            });
        } else {
            // Actualizar con los nuevos datos
            let updatedObject = {
                Nombre_producto: req.body.Nombre_producto,
                Marca: req.body.Marca,
                Tipo: req.body.Tipo,
                Contenido_ml: req.body.Contenido_ml,
                Porcentaje_alcohol: req.body.Porcentaje_alcohol,
                Precio: req.body.Precio,
                Pais_origen: req.body.Pais_origen,
                Fecha_importacion: req.body.Fecha_importacion,
                stock: req.body.stock,
                proveedor: req.body.proveedor
            }
            let result = await Licores.update(updatedObject, { returning: true, where: { id: licorId } });

            if (!result) {
                res.status(500).json({
                    message: "Error -> No se pudo actualizar el licor con id = " + req.params.id,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Se actualizó el licor con id = " + licorId,
                licor: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo actualizar el licor con id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try {
        let licorId = req.params.id;
        let licor = await Licores.findByPk(licorId);

        if (!licor) {
            res.status(404).json({
                message: "No existe el licor con id = " + licorId,
                error: "404",
            });
        } else {
            await licor.destroy();
            res.status(200).json({
                message: "Licor eliminado con id = " + licorId,
                licor: licor,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se puede eliminar el licor con id = " + req.params.id,
            error: error.message,
        });
    }
}

exports.getAllLicores = (req, res) => {
    // Obtener toda la información de los licores
    Licores.findAll()
        .then(licoresInfos => {
            res.status(200).json({
                message: "Información de todos los licores obtenida con éxito!",
                licores: licoresInfos
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}