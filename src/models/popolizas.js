import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class popolizas extends Model {
  static init(sequelize, DataTypes) {
  return sequelize.define('popolizas', {
    cpoliza: {
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
        key: 'cpersona'
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
        key: 'cpersona'
      }
    },
    cramo: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'maramos',
        key: 'cramo'
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
    tableName: 'popolizas',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_madatos_poliza",
        unique: true,
        fields: [
          { name: "cpoliza" },
        ]
      },
    ]
  });
  }
}
