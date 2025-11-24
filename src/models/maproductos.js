import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class maproductos extends Model {
  static init(sequelize, DataTypes) {
  return sequelize.define('maproductos', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    xproducto: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    cmoneda: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'mamonedas',
        key: 'cmoneda'
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
    cproductor: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'maproductores',
        key: 'cproductor'
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
    pcomision: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: true
    },
    bactivo: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    fcreacion: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    cusuario_creacion: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'maproductos',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_maproductos",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
