import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class mapaises extends Model {
  static init(sequelize, DataTypes) {
  return sequelize.define('mapaises', {
    cpais: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    xpais: {
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
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'mapaises',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_mapaises",
        unique: true,
        fields: [
          { name: "cpais" },
        ]
      },
    ]
  });
  }
}
