module.exports = (sequelize, Sequelize) => {
    const Tutorial = sequelize.define("tutorial", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      deleted: {
        type: Sequelize.BOOLEAN,
        default: false
      }
    });
    return Tutorial;
  };