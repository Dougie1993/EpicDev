const ContactController = require('../controllers/contact.controller')

module.exports = (app) => {
    // Create Contact
    app.post('/contact', 
    ContactController.create),
    // Get all contacts
    app.get('/contact',
    ContactController.findAll),
    // Get contact by id
    app.get('/contact/:id', 
    ContactController.findOne),
    // Update contact by id or soft delete contact
    app.put('/contact/:id', 
    ContactController.update),
    // Soft delete all contacts
    app.put('/contact',
    ContactController.batchDelete)
    // Search function
    app.get('/search',
    ContactController.search)

}