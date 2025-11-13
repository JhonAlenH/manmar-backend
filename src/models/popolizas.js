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
        model: 'maasegurados',
        key: 'casegurado'
      }
    },
    ctomador: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'matomadores',
        key: 'ctomador'
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
    ccobertura: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    fdesde_pol: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    fhasta_pol: {
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
    ptasa_cambio: {
      type: DataTypes.DECIMAL(17,2),
      allowNull: true
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
    cprod_rel: {
      type: DataTypes.STRING(70),
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
