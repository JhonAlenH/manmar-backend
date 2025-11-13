import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class matomadores extends Model {
  static init(sequelize, DataTypes) {
  return sequelize.define('matomadores', {
    ctomador: {
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
      type: DataTypes.INTEGER,
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
    tableName: 'matomadores',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "pk_matomadores",
        unique: true,
        fields: [
          { name: "ctomador" },
        ]
      },
    ]
  });
  }
}
