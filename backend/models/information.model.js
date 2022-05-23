// Information table/Model
module.exports = (sequelize, Sequelize) => {
    const Information = sequelize.define("information", {
      email: {
        type: Sequelize.STRING
      },
      homeNumber: {
        type: Sequelize.STRING
      },
      cellNumber: {
        type: Sequelize.STRING
      }
    },{
      timestamps: false
    });
    return Information;
  };