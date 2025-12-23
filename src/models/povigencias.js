import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class povigencias extends Model {
  static init(sequelize, DataTypes) {
  return sequelize.define('povigencias', {
    cvigencia: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    cpoliza: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'popolizas',
        key: 'cpoliza'
      }
    },
    cproductor_convenio: {
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
    xpoliza: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    cproducto: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'maproductos',
        key: 'cproducto'
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
      type: DataTypes.DATEONLY,
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
    tableName: 'povigencias',
    schema: 'dbo',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "popolizas_pk",
        unique: true,
        fields: [
          { name: "cvigencia" },
        ]
      },
    ]
  });
  }
}
