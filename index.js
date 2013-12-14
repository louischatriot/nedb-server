/**
 * Main application entry point
 */
var expressApp = require('./server')
  , db = require('./lib/db')
  ;

db.loadDatabase(function(err) {
  if (err) {
    console.log("FATAL - Could't load the database, error: " + err);
    process.exit(1);
  }
  
  expressApp.launchServer();
});