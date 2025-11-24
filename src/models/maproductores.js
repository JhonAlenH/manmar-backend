import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class maproductores extends Model {
  static init(sequelize, DataTypes) {
  return sequelize.define('maproductores', {
    cproductor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ctipo_productor: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'matipo_produc',
        key: 'id'
      }
    },
    cusuario: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'seusuarios',
        key: 'cusuario'
      }
    },
    bactivo: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    cdatos_bancarios: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'madatos_bancarios',
        key: 'id'
      }
    },
    fcreacion: {
      type: DataTypes.DATE,
      allowNull: true
    },
    cusuario_creacion: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'maproductores',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_maproductores_1",
        unique: true,
        fields: [
          { name: "cproductor" },
        ]
      },
    ]
  });
  }
}
