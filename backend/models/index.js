const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.contacts = require("./contact.model.js")(sequelize, Sequelize);
db.information = require("./information.model")(sequelize, Sequelize);
db.note = require("./note.model")(sequelize, Sequelize);

db.contacts.hasMany(db.information, {as: "information"});
db.contacts.hasMany(db.note, {as: "note"});

db.information.belongsTo(db.contacts, {
  foreignKey: "contactId",
  as: "contact"
});
db.note.belongsTo(db.contacts,{
  foreignKey: "contactId",
  as: "contact"
});

module.exports = db;