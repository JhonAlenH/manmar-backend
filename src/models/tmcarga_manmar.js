import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class tmcarga_manmar extends Model {
  static init(sequelize, DataTypes) {
  return sequelize.define('tmcarga_manmar', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    xnombre_t: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    xapellido_t: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    cid_t: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    f_nac_t: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    xprof_t: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    xdireccion_t: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    xnombre_a: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    xapellido_a: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    cid_a: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    xtelefono_a: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    xcorreo_a: {
      type: DataTypes.STRING(70),
      allowNull: true
    },
    xcedente: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    xramo: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    xproducto: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    xpoliza: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    xestatus: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    sum_aseg: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    xcoberturas: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    xfrecuencia: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    mprima_total: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    femision: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    fdesde: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    fhasta: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    fcobro: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    xejecutivo: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    xasesor: {
      type: DataTypes.STRING(200),
      allowNull: true
    }
  }, {
    tableName: 'tmcarga_manmar',
    schema: 'dbo',
    timestamps: false
  });
  }
}
