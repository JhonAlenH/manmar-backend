import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class maasegurados extends Model {
  static init(sequelize, DataTypes) {
  return sequelize.define('maasegurados', {
    casegurado: {
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
        key: 'id'
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
    tableName: 'maasegurados',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "ids_pk",
        unique: true,
        fields: [
          { name: "casegurado" },
        ]
      },
    ]
  });
  }
}
