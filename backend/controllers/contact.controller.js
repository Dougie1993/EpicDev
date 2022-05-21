const db = require("../models");
const Contact = db.contacts;
const Op = db.Sequelize.Op;
const bcrypt = require("bcrypt");
// Create and Save a new Contact
exports.create = async (req, res) => {
  try {
    const saltContact = req.body
    console.log(saltContact.password)
    const salt = await bcrypt.genSalt(10);
    saltContact.password = await bcrypt.hash(saltContact.password, salt)
    const contact = await Contact.create(saltContact)
    res.send(contact)
  } catch (err) {
    res.status(400).send({
        error: 'failed to create contact'
    })
  }
};
// Retrieve all Contacts from the database.
exports.findAll =  (req, res) => {
  console.log('Searching....')
  try {
      Contact.findAll({ where: {deleted: null}}).then
      (data => {
          res.send(data)
      })
      .catch(err => {
          res.status(500).send({
              message: err.message || "Error could not retrive contacts"
          })
      })
  } catch (err) {
      res.status(400).send({
          error: 'failed to retreive contacts'
      })
  }
};
// Find a single Contact with an id
exports.findOne = (req, res) => {
  console.log("looking for one")
  const id = req.params.id
  Contact.findByPk(id)
    .then(data => {
        console.log('data is ', data)
        if (data.deleted !== null) {
            res.send({
                message: "The contact was deleted"
            })
        } else {
            res.send(data)
        }

    })
    .catch(err => {
        res.status(500).send({
            error: 'failed to retreive contact'
        })
    })
};
// Update a Contact by the id in the request
exports.update = (req, res) => {
    const id = req.params.id
    Contact.update(req.body, {where: { id: id} })
        .then(num => {
            if (num == 1) {
                if (req.body.deleted !== null) {
                    res.send({
                        message: "Contact deleted successfully."
                    })
                } else {
                    res.send({
                        message: "Contact updated successfully."
                    })        
                }
                
            } else {
                res.send({
                    message: `Could not update Contact with id ${req.body.id}`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error updaating contact with id= ${id}`
            })
        })
};
// Delete a Contact with the specified id in the request
exports.delete = (req, res) => {
  
};
// Delete all Contact from the database.
exports.deleteAll = (req, res) => {
  
};
// Find all published Contact
exports.findAllPublished = (req, res) => {
  
};

exports.batchDelete = (req, res) => {
    Contact.update({deleted: true }, {where: {deleted: null}})
        .then(data => {
            res.send({
                message: 'Contacts deleted successfully'
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            })
        })
};