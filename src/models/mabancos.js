import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class mabancos extends Model {
  static init(sequelize, DataTypes) {
  return sequelize.define('mabancos', {
    cbanco: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    xbanco: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    cod_bancario: {
      type: DataTypes.CHAR(10),
      allowNull: true
    },
    cmoneda: {
      type: DataTypes.INTEGER,
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
    cusuario_creacion: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'mabancos',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_MABANCO",
        unique: true,
        fields: [
          { name: "cbanco" },
        ]
      },
    ]
  });
  }
}
