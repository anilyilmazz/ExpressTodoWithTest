const appconfig = require('../config')
const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize({
  database: appconfig.dbconfig.database,
  username: appconfig.dbconfig.user,
  password: appconfig.dbconfig.password,
  host:  appconfig.dbconfig.host,
  port: appconfig.dbconfig.port,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
});

class ToDo extends Model {}

ToDo.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.BOOLEAN
  }
}, {
  sequelize,
  modelName: 'ToDo',
  tableName: 'ToDo',
  freezeTableName: true,
});

console.log(ToDo === sequelize.models.ToDo); // true

module.exports = ToDo;