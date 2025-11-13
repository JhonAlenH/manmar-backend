import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class serol_sesubmenu extends Model {
  static init(sequelize, DataTypes) {
  return sequelize.define('serol_sesubmenu', {
    id: {
      type: DataTypes.CHAR(10),
      allowNull: false,
      primaryKey: true
    },
    csubmenu: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'sesubmenu',
        key: 'csubmenu'
      }
    },
    crol: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'serol',
        key: 'crol'
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
    tableName: 'serol_sesubmenu',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_serol_sesubmenu",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
