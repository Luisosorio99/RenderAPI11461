module.exports = (sequelize, Sequelize) => {
const Licores = sequelize.define('licores', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    Nombre_producto: {
      type: Sequelize.STRING
    },
    Marca: {
      type: Sequelize.STRING
    },
    Tipo: {
      type: Sequelize.STRING // Ejemplo: vino, cerveza, tequila, etc.
    },
    Contenido_ml: {
      type: Sequelize.INTEGER // Mililitros de contenido
    },
    Porcentaje_alcohol: {
      type: Sequelize.FLOAT // Ejemplo: 40.0 para 40% de alcohol
    },
    Precio: {
      type: Sequelize.STRING
    },
    Pais_origen: {
      type: Sequelize.STRING
    },
    Fecha_importacion: {
      type: Sequelize.DATE
    },
    stock: {
      type: Sequelize.INTEGER, // Cantidad en stock
      defaultValue: 0 // Valor por defecto
    },
    proveedor: {
      type: Sequelize.STRING // Nombre del proveedor
    }
  });

  return Licores;
};