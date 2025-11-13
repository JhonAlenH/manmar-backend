import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class macoberturas extends Model {
  static init(sequelize, DataTypes) {
  return sequelize.define('macoberturas', {
    ccobertura: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    cramo: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    xcobertura: {
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
    tableName: 'macoberturas',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_macoberturas_2",
        unique: true,
        fields: [
          { name: "ccobertura" },
        ]
      },
    ]
  });
  }
}
