import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class mapersonas extends Model {
  static init(sequelize, DataTypes) {
  return sequelize.define('mapersonas', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    cci_rif: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    xnombre: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    xapellido: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    fnacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    xcorreo: {
      type: DataTypes.STRING(70),
      allowNull: true
    },
    xtelefono: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    xdireccion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    isexo: {
      type: DataTypes.CHAR(1),
      allowNull: true
    },
    iestado_civil: {
      type: DataTypes.CHAR(1),
      allowNull: true
    },
    itipo_persona: {
      type: DataTypes.CHAR(1),
      allowNull: true
    },
    cciudad: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'maciudades',
        key: 'cciudad'
      }
    },
    fcreacion: {
      type: DataTypes.DATE,
      allowNull: true
    },
    bactivo: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    cusuario_creacion: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'mapersonas',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_mapersonas",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
