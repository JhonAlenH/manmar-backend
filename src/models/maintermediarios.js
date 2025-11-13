import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class maintermediarios extends Model {
  static init(sequelize, DataTypes) {
  return sequelize.define('maintermediarios', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    cprod_rel: {
      type: DataTypes.STRING(70),
      allowNull: false,
      unique: "IX_maintermediarios"
    },
    ctipo: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'matipo_intermediario',
        key: 'id'
      }
    },
    csuper: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    cdatos_bancarios: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'madatos_bancarios',
        key: 'id'
      }
    },
    pcomision: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: true
    },
    cusuario: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'seusuarios',
        key: 'cusuario'
      }
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
    tableName: 'maintermediarios',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "IX_maintermediarios",
        unique: true,
        fields: [
          { name: "cprod_rel" },
        ]
      },
      {
        name: "PK_maintermediarios",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
