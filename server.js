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

/**
 * Finding documents
 */
expressApp.get('/find', function (req, res, next) {
  var query = {};

  if (req.query.q) {
    try {
      query = JSON.parse(req.query.q);
    } catch(e) {
      return res.json(403, { error: "Badly formed JSON" });
    }
  }
  
  console.log(query);

  db.find(query, function (err, docs) {
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