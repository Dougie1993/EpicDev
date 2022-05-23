module.exports = (sequelize, Sequelize) => {
    const Note = sequelize.define("note", {
      noteTitle: {
        type: Sequelize.STRING
      },
      noteDescription: {
        type: Sequelize.STRING
      },
      noteDate: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW
      }
    },{
      timestamps: false
    });
    return Note;
  };