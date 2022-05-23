const db = require("../models");
const Contact = db.contacts;
const Information = db.information;
const Note = db.note;
const Op = db.Sequelize.Op;
const bcrypt = require("bcrypt");

// Create and Save a new Contact
exports.create = async (req, res) => {
    contactObj = {
        name: req.body.name,
        surname: req.body.surname,
        username: req.body.username,
        password: req.body.password
    }
  try {
    const saltContact = contactObj
    const salt = await bcrypt.genSalt(10);
    saltContact.password = await bcrypt.hash(saltContact.password, salt)
    const contact = await Contact.create(saltContact)

    infoObj = {
        email: req.body.email,
        homeNumber: req.body.homeNumber,
        cellNumber: req.body.cellNumber,
        contactId: contact.id
    }
    try {
        const information = await Information.create(infoObj)
    } catch (err) {
        res.status(400).send({
            err: 'failed to create contact information'
        })
    }
    noteObj = {
        noteTitle: req.body.noteTitle,
        noteDescription: req.body.noteDescription,
        contactId: contact.id
    }
    try {
        const note = await Note.create(noteObj)
        res.send({
            message: 'Contact created successfully'
        })
    } catch (err) {
        res.status(400).send({
            err: 'failed to create contact note'
        })
    }
  } catch (err) {
    res.status(400).send({
        error: 'failed to create contact'
    })
  }
};
// Retrieve all Contacts from the database.
exports.findAll =  (req, res) => {
  try {
      Contact.findAll({where: { deleted: null}, include: ["information", "note"]}).then
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
  const id = req.params.id
  Contact.findOne({
      where: {id: id}, 
      include: ["information", "note"]
  })
    .then(data => {
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
    console.log(req.body)
    try {
        Contact.update(req.body, {where: { id: id},  include: ["information", "note"]})
        .then(num => {
            if (num == 1) {
                if (req.body.deleted !== null) {
                    res.send({
                        message: "Contact deleted successfully."
                    })
                } else {
                    // Update Information
                    try {
                        Information.update(req.body, {where: {contactId:id}})
                        .then(data => {
                          // Update Note
                          try {
                            Note.update(req.body, {where: {contactId:id}})
                          } catch (err) {
                            res.status(400).send(err.message)
                          }
                        })
                    } catch (err) {
                        res.status(400).send(err.message)
                    }
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
    } catch (err) {
        res.status(400).send({
            message: err.message
        })
    }

};

// batch delete
exports.batchDelete = (req, res) => {
    Contact.update({deleted: true }, {where: {deleted: null},  include: ["information", "note"]})
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
// Search Contact
exports.search = (req, res) => {
    let term = req.query.name;
    console.log('we checking whats in the query')
    console.log(term)
    try {
        Contact.findAll({ 
            where: { deleted: null,
                [Op.or]: [
                  { name: { [Op.like]: `%${term}%`} },
                  { surname: { [Op.like]: '%' + term + '%'} }
                ]
              },
              include: ["information", "note"]
        }).then(data => {
            if (data.length === 0) {
                try {
                    Information.findAll({
                        where: {
                            [Op.or]: [
                              { email: { [Op.like]: '%' + term + '%'} },
                              { cellNumber: { [Op.like]: '%' + term + '%'} }
                            ]
                          }
                    }).then(info => {
                        if (info.length === 0) {
                              try {
                                Note.findAll({
                                    where: {
                                        [Op.or]: [
                                          { noteTitle: { [Op.like]: '%' + term + '%'} },
                                          { noteDescription: { [Op.like]: '%' + term + '%'} }
                                        ]
                                      }, include: ["contact"]
                                }).then(note => {
                                    if (note.length === 0) {
                                        res.send({
                                            message: `No contact found that has ${term}`
                                        })
                                    } else {
                                       res.send(note)
                                        
                                    }
                                })
                              } catch (err) {
                                res.send({
                                    message: `No contact found that has ${term}`
                                })
                              }
                        } else {
                            console.log(info[0].contactId)
                            Contact.findOne({
                                where: {id: info[0].contactId}, 
                                include: ["information", "note"]
                            }).then(contact => {
                                res.send(contact)
                            }).catch(err => {
                                res.send({
                                    message: `No contact found that has ${term}`
                                })
                            })
                        }
                    })
                } catch (err) {
                    res.send({
                        message: `No contact found that has ${term}`
                    })
                }
            //   res.send({
            //       message: `No contact found that has ${term}`
            //   })
            } else {
              res.send(data)
            }
           
        }).catch(err => {
            res.send({
                message: `No contact found that has ${term}`
            })
        })
    } catch (err) {
        res.status(400).send({
            message: err.message || "Bad request"
        })
    } 

};
