import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class madatos_poliza extends Model {
  static init(sequelize, DataTypes) {
  return sequelize.define('madatos_poliza', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    xpoliza: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    casegurado: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'mapersonas',
        key: 'id'
      }
    },
    ccedente: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'macedentes',
        key: 'ccedente'
      }
    },
    cproductor: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'maproductores',
        key: 'cproductor'
      }
    },
    ctomador: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'mapersonas',
        key: 'id'
      }
    },
    cramo: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'maramos',
        key: 'id'
      }
    },
    fcreacion: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    iestado: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    cusuario_creacion: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'madatos_poliza',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_madatos_poliza",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
