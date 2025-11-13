import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class macolores extends Model {
  static init(sequelize, DataTypes) {
  return sequelize.define('macolores', {
    ccolor: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    xcolor: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    cpais: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    bactivo: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    fcreacion: {
      type: DataTypes.DATE,
      allowNull: true
    },
    cusuario: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    fmodificacion: {
      type: DataTypes.DATE,
      allowNull: true
    },
    cusuariomod: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'macolores',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "pk_macolores",
        unique: true,
        fields: [
          { name: "ccolor" },
        ]
      },
    ]
  });
  }
}
