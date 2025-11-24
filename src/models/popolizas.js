import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class popolizas extends Model {
  static init(sequelize, DataTypes) {
  return sequelize.define('popolizas', {
    id: {
      type: DataTypes.DECIMAL(18,0),
      allowNull: false,
      primaryKey: true
    },
    ccedente: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'macedentes',
        key: 'ccedente'
      }
    },
    casegurado: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'mapersonas',
        key: 'id'
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
    cproductor: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'maproductores',
        key: 'cproductor'
      }
    },
    cproductor_emisor: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'maproductores',
        key: 'cproductor'
      }
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
    xpoliza: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    cproducto: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'maproductos',
        key: 'id'
      }
    },
    fdesde: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    fhasta: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    femision: {
      type: DataTypes.DATE,
      allowNull: true
    },
    cmetodologiapago: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'mametodologiapago',
        key: 'cmetodologiapago'
      }
    },
    iestado: {
      type: DataTypes.CHAR(1),
      allowNull: true
    },
    msuma: {
      type: DataTypes.DECIMAL(17,2),
      allowNull: true
    },
    msumaext: {
      type: DataTypes.DECIMAL(17,2),
      allowNull: true
    },
    mprima: {
      type: DataTypes.DECIMAL(17,2),
      allowNull: true
    },
    mprimaext: {
      type: DataTypes.DECIMAL(17,2),
      allowNull: true
    },
    cusuario: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'popolizas',
    schema: 'dbo',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "popolizas_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
