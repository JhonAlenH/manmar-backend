import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class adpresupuesto extends Model {
  static init(sequelize, DataTypes) {
  return sequelize.define('adpresupuesto', {
    cpresupuesto: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ccobertura: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    qano: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    mpresup_ene: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: true
    },
    mpresup_feb: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: true
    },
    mpresup_mar: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: true
    },
    mpresup_abr: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: true
    },
    mpresup_may: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: true
    },
    mpresup_jun: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: true
    },
    mpresup_jul: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: true
    },
    mpresup_ago: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: true
    },
    mpresup_sep: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: true
    },
    mpresup_oct: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: true
    },
    mpresup_nov: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: true
    },
    mpresup_dic: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: true
    },
    norden: {
      type: DataTypes.SMALLINT,
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
    cusuario: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    fmodificacion: {
      type: DataTypes.DATE,
      allowNull: true
    },
    cusuariomod: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'adpresupuesto',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_prpresupuesto",
        unique: true,
        fields: [
          { name: "cpresupuesto" },
        ]
      },
    ]
  });
  }
}
