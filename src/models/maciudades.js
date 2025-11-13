import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class maciudades extends Model {
  static init(sequelize, DataTypes) {
  return sequelize.define('maciudades', {
    cciudad: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    cestado: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      references: {
        model: 'maestados',
        key: 'cestado'
      }
    },
    xciudad: {
      type: DataTypes.STRING(250),
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
    cusuario_creacion: {
      type: DataTypes.DECIMAL(11,0),
      allowNull: true
    },
    fmodificacion: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'maciudades',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_maciudades",
        unique: true,
        fields: [
          { name: "cciudad" },
        ]
      },
    ]
  });
  }
}
