import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class semenu extends Model {
  static init(sequelize, DataTypes) {
  return sequelize.define('semenu', {
    cmenu: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    xmenu: {
      type: DataTypes.STRING(70),
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
    tableName: 'semenu',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_semenu",
        unique: true,
        fields: [
          { name: "cmenu" },
        ]
      },
    ]
  });
  }
}
