module.exports = (sequelize, Sequelize) => {
    const Contact = sequelize.define("contact", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING
      },
      surname: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      deleted: {
        type: Sequelize.BOOLEAN,
        default: false
      }
    },{
      timestamps: false
    });
    return Contact;
  };