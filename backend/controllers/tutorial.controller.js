const db = require("../models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;
// Create and Save a new Tutorial
exports.create = async (req, res) => {
  console.log(req.body)
  try {
    const tutorial = await Tutorial.create(req.body)
    res.send(tutorial)
  } catch (err) {
    res.status(400).send({
        error: 'failed to create tutorial'
    })
  }
};
// Retrieve all Tutorials from the database.
exports.findAll =  (req, res) => {
  console.log('Searching....')
  try {
      Tutorial.findAll({ where: {deleted: null}}).then
      (data => {
          res.send(data)
      })
      .catch(err => {
          res.status(500).send({
              message: err.message || "Error could not retrive documents"
          })
      })
  } catch (err) {
      res.status(400).send({
          error: 'failed to retreive docs'
      })
  }
};
// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  console.log("looking for one")
  const id = req.params.id
  Tutorial.findByPk(id)
    .then(data => {
        console.log('data is ', data)
        if (data.deleted !== null) {
            res.send({
                message: "The record was deleted"
            })
        } else {
            res.send(data)
        }

    })
    .catch(err => {
        res.status(500).send({
            error: 'failed to retreive docs'
        })
    })
};
// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id
    Tutorial.update(req.body, {where: { id: id} })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Tutorial updated successfully."
                })
            } else {
                res.send({
                    message: `Could not update Tutorial with title ${req.body.title}`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error updaating tutorial with id= ${id}`
            })
        })
};
// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  
};
// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  
};
// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  
};

exports.batchDelete = (req, res) => {
    Tutorial.update({deleted: true }, {where: {deleted: null}})
        .then(data => {
            res.send({
                message: 'Tutorials deleted successfully'
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            })
        })
};