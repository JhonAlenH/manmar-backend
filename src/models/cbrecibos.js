import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class cbrecibos extends Model {
  static init(sequelize, DataTypes) {
  return sequelize.define('cbrecibos', {
    crecibo: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ncuota: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    id_poliza: {
      type: DataTypes.INTEGER,
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
    cmovimiento: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'cbmovimientos',
        key: 'id'
      }
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
