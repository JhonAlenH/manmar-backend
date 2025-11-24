import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class mamonedas extends Model {
  static init(sequelize, DataTypes) {
  return sequelize.define('mamonedas', {
    cmoneda: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    xmoneda: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    xabreviatura: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    xrepresentacion: {
      type: DataTypes.CHAR(4),
      allowNull: true
    },
    bactivo: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    freacion: {
      type: DataTypes.DATE,
      allowNull: true
    },
    cusuario_creacion: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'mamonedas',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_mamonedas",
        unique: true,
        fields: [
          { name: "cmoneda" },
        ]
      },
    ]
  });
  }
}
