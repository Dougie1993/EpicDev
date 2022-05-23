try {
    Contact.findAll({ 
        where: {name: { [Op.like]: '%' + term + '%'}}, 
        include: ["information", "note"]
    }).then(data => {
        if (!data) {
          res.send({
              message: `No contact found that has ${term}`
          })
        } else {
          res.send(data)
        }
       
    }).catch(err => {
      res.status(500).send({
          message: err.message || "Error could not retrive contacts"
      })
    })
} catch (err) {
    res.status(400).send({
        message: err.message || "Bad request"
    })
} 