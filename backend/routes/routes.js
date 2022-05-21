const TutorialController = require('../controllers/tutorial.controller')

module.exports = (app) => {
    app.post('/tutorial', 
    TutorialController.create),

    app.get('/tutorial',
    TutorialController.findAll),

    app.get('/tutorial/:id', 
    TutorialController.findOne),

    app.put('/tutorial/:id', 
    TutorialController.update),

    app.put('/tutorial',
    TutorialController.batchDelete)

    // app.post('/login',
    // AuthenticationController.login)
}