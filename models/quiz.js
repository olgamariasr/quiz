// Definicion del modelo de Quiz con validación

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'Quiz',
    { pregunta: {
        type: DataTypes.STRING,
        validate: { notEmpty: {msg: "-> Falta Pregunta"}}
      },
      respuesta: {
        type: DataTypes.STRING,
        validate: { notEmpty: {msg: "-> Falta Respuesta"}}
      },
      tema:{
        type: DataTypes.STRING,
        default: "",
        validate: { isIn: {args: [["", "otro", "humanidades", "ocio", "ciencia","tecnologia"]], msg: "-> Falta Respuesta"}}
      }
    }
  ); 
}