var config = require('./lib/config')
  , express = require('express')
  , expressApp = express()
  , db = require('./lib/db')
  ;
  
expressApp.use(express.bodyParser());
expressApp.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  return next();
});
expressApp.use(expressApp.router);


expressApp.get('/find', function (req, res, next) {
  db.find({}, function (err, docs) {
    if (err) {
      return res.json(403, { error: err });
    } else {
      return res.json(200, docs);
    }
  });
});



/**
 * Launch the server on the configured port
 */
expressApp.launchServer = function() {
  expressApp.listen(config.server.port);
};


  
// Interface
module.exports = expressApp;