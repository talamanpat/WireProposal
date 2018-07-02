module.exports = function(app) {

    app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); 
    });

  let userController=require('./controllers/userController.js');
  app.use('/', userController);
  let setupController=require('./controllers/setupController.js');
  app.use('/setup', setupController);
  let propController=require('./controllers/proposalController.js');
  app.use('/api', propController);
};