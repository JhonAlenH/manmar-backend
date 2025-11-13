import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class mametodologiapago extends Model {
  static init(sequelize, DataTypes) {
  return sequelize.define('mametodologiapago', {
    cmetodologiapago: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    xmetodologiapago: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    ndias: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ncuotas: {
      type: DataTypes.TINYINT,
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
    tableName: 'mametodologiapago',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "pk_mametodologiapago",
        unique: true,
        fields: [
          { name: "cmetodologiapago" },
        ]
      },
    ]
  });
  }
}
