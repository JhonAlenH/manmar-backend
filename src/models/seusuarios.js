import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class seusuarios extends Model {
  static init(sequelize, DataTypes) {
  return sequelize.define('seusuarios', {
    cusuario: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    cpersona: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'mapersonas',
        key: 'cpersona'
      }
    },
    xusuario: {
      type: DataTypes.STRING(35),
      allowNull: true
    },
    xcontrasena: {
      type: DataTypes.STRING(35),
      allowNull: true
    },
    xobservacion: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    cproductor: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'maproductores',
        key: 'cproductor'
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
    istatus: {
      type: DataTypes.CHAR(1),
      allowNull: true
    },
    cusuario_creacion: {
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
    }
  }, {
    tableName: 'seusuarios',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_seusuariosweb",
        unique: true,
        fields: [
          { name: "cusuario" },
        ]
      },
    ]
  });
  }
}
