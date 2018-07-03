var path = require('path');

module.exports = function(app) {

   /* app.get('*', function(req, res) {
        //        res.sendfile('./public/index.html'); 
                res.sendFile(path.join(__dirname, '../public', 'other.html'));
            });*/
    app.get('/', function(req, res) {
//        res.sendfile('./public/index.html'); 
        res.sendFile(path.join(__dirname, '../public', 'index.html'));
    });
    app.get('/login', function(req, res) {
        //        res.sendfile('./public/index.html'); 
        res.sendFile(path.join(__dirname, '../public', 'login.html'));
            });
        
  let userController=require('./controllers/userController.js');
  app.use('/', userController);
  let setupController=require('./controllers/setupController.js');
  app.use('/setup', setupController);
  let propController=require('./controllers/proposalController.js');
  app.use('/api', propController);
};