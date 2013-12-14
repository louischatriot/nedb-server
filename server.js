var config = require('./lib/config')
  , express = require('express')
  , expressApp = express()
  , db = require('./lib/db')
  ;
  
expressApp.use(express.bodyParser());
expressApp.use(function(req, res, next) {   // Prevent any problem with CORS
  res.header('Access-Control-Allow-Origin', '*');
  return next();
});
expressApp.use(function(req, res, next) {   // Parse query string parameters
  if (req.method !== "GET") { return next(); }
  
  req.parsedParameters = {};
  if (req.query.query) {
    try {
      req.parsedParameters.query = JSON.parse(req.query.query);
    } catch(e) {
      return res.json(403, { error: "Badly formed JSON in the query parameter" });
    }
  }
  
  return next();
});
expressApp.use(expressApp.router);

/**
 * Finding documents
 */
expressApp.get('/find', function (req, res, next) {
  db.find(req.parsedParameters.query, function (err, docs) {
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