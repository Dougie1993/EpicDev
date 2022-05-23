const ContactController = require('../controllers/contact.controller')

module.exports = (app) => {
    app.post('/contact', 
    ContactController.create),

    app.get('/contact',
    ContactController.findAll),

    app.get('/contact/:id', 
    ContactController.findOne),

    app.put('/contact/:id', 
    ContactController.update),

    app.put('/contact',
    ContactController.batchDelete)

    app.get('/search',
    ContactController.search)

}