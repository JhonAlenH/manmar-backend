import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class macedentes extends Model {
  static init(sequelize, DataTypes) {
  return sequelize.define('macedentes', {
    ccedente: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    csuper: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    cpersona: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'mapersonas',
        key: 'cpersona'
      }
    },
    crepresentante: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ivalor: {
      type: DataTypes.CHAR(1),
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
    tableName: 'macedentes',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "macedentes_pk",
        unique: true,
        fields: [
          { name: "ccedente" },
        ]
      },
    ]
  });
  }
}
