import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class sesubmenu extends Model {
  static init(sequelize, DataTypes) {
  return sequelize.define('sesubmenu', {
    csubmenu: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    cmenu: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'semenu',
        key: 'cmenu'
      }
    },
    xsubmenu: {
      type: DataTypes.STRING(70),
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
    tableName: 'sesubmenu',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_sesubmenu",
        unique: true,
        fields: [
          { name: "csubmenu" },
        ]
      },
    ]
  });
  }
}
