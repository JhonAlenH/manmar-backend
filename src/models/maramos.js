import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class maramos extends Model {
  static init(sequelize, DataTypes) {
  return sequelize.define('maramos', {
    cramo: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    xramo: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    bactivo: {
      type: DataTypes.CHAR(1),
      allowNull: true
    },
    fcreacion: {
      type: DataTypes.DATE,
      allowNull: true
    },
    cusuario_creacion: {
      type: DataTypes.DECIMAL(11,0),
      allowNull: true
    }
  }, {
    tableName: 'maramos',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "maramos_pk",
        unique: true,
        fields: [
          { name: "cramo" },
        ]
      },
    ]
  });
  }
}
