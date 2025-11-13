import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class semenuconfig extends Model {
  static init(sequelize, DataTypes) {
  return sequelize.define('semenuconfig', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    itipoconfig: {
      type: DataTypes.CHAR(1),
      allowNull: true
    },
    csubmenu: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'sesubmenu',
        key: 'csubmenu'
      }
    },
    cusuario: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'seusuarios',
        key: 'cusuario'
      }
    }
  }, {
    tableName: 'semenuconfig',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_semenuconfig",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
