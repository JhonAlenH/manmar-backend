import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class cbmovimientos extends Model {
  static init(sequelize, DataTypes) {
  return sequelize.define('cbmovimientos', {
    cmovimiento: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ctomador: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'mapersonas',
        key: 'cpersona'
      }
    },
    itipomov: {
      type: DataTypes.CHAR(1),
      allowNull: true
    },
    fmovimiento: {
      type: DataTypes.DATE,
      allowNull: true
    },
    mmonto: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: true
    },
    mmonto_ext: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: true
    },
    ptasamon: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: true
    },
    cmoneda: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    cbanco: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    xreferencia: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    xruta_p: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    iestado: {
      type: DataTypes.CHAR(2),
      allowNull: true
    },
    cusuario_creacion: {
      type: DataTypes.CHAR(10),
      allowNull: true
    },
    fcreacion: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'cbmovimientos',
    schema: 'dbo',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "PK_cbmovimientos",
        unique: true,
        fields: [
          { name: "cmovimiento" },
        ]
      },
    ]
  });
  }
}
