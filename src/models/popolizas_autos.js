import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class popolizas_autos extends Model {
  static init(sequelize, DataTypes) {
  return sequelize.define('popolizas_autos', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_poliza: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ccedente: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    casegurado: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ctomador: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    xpoliza: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    id_inma: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    cano: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    cmarca: {
      type: DataTypes.CHAR(3),
      allowNull: true
    },
    cmodelo: {
      type: DataTypes.CHAR(3),
      allowNull: true
    },
    cversion: {
      type: DataTypes.CHAR(3),
      allowNull: true
    },
    npuestos: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    ccolor: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    xserialcarroceria: {
      type: DataTypes.STRING(17),
      allowNull: true
    },
    xserialmotor: {
      type: DataTypes.STRING(17),
      allowNull: true
    },
    xplaca: {
      type: DataTypes.STRING(7),
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
    tableName: 'popolizas_autos',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_popolizas_autos",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
