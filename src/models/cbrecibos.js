import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class cbrecibos extends Model {
  static init(sequelize, DataTypes) {
  return sequelize.define('cbrecibos', {
    crecibo: {
      type: DataTypes.DECIMAL(18,0),
      allowNull: false,
      primaryKey: true
    },
    ncuota: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    id_poliza: {
      type: DataTypes.DECIMAL(18,0),
      allowNull: true,
      references: {
        model: 'popolizas',
        key: 'id'
      }
    },
    ctomador: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    cramo: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    cmoneda: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    fdesde_rec: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    fhasta_rec: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    ptasamon: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: true
    },
    msumaaseg: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: true
    },
    msumaasegext: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: true
    },
    mprima: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: true
    },
    mprimaext: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: true
    },
    pcomision: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: true
    },
    mcomision: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: true
    },
    mcomisionext: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: true
    },
    mimpuesto: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: true
    },
    mimpuestoext: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: true
    },
    mcomision_n: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: true
    },
    mcomision_next: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: true
    },
    fcobro: {
      type: DataTypes.DATE,
      allowNull: true
    },
    fcierre: {
      type: DataTypes.DATE,
      allowNull: true
    },
    iestadorec: {
      type: DataTypes.CHAR(1),
      allowNull: true
    },
    iestado: {
      type: DataTypes.CHAR(2),
      allowNull: true
    }
  }, {
    tableName: 'cbrecibos',
    schema: 'dbo',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "PK_cbrecibos",
        unique: true,
        fields: [
          { name: "crecibo" },
        ]
      },
    ]
  });
  }
}
