var config = require('./config')
  , Nedb = require('nedb')
  , db = new Nedb(config.db)
  ;
  
// Interface
module.exports = db;