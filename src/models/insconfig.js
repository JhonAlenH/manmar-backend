import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class insconfig extends Model {
  static init(sequelize, DataTypes) {
  return sequelize.define('insconfig', {
    cconfig: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    cproductor: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'maproductores',
        key: 'cproductor'
      }
    },
    xnombre_sistema: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    xslogan: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    xlogo: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    xcolor_pri: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    xcolor_sec: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    xcolor_ter: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    imodo_oscuro: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    ximagen_fondo: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    ximagen_login: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    tableName: 'insconfig',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_insconfig",
        unique: true,
        fields: [
          { name: "cconfig" },
        ]
      },
    ]
  });
  }
}
