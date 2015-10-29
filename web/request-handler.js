var finalhandler = require('finalhandler')
var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelp = require('./http-helpers.js')
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  var actionFunction = httpHelp.makeActionHandler(actions);
  actionFunction(req,res);
  //res.end(archive.paths.list);
};

var actions = {
  'GET': function(req, res){
    var done = finalhandler(req, res);
    if (req.url === '/' || req.url === '/index.html') {
      httpHelp.serveIndex(req, res, done);
    } else {
      //httpHelp.serveAssets()
    }
  },
  'POST': function(req, res){
  },
  'OPTIONS': function(req, res){
    // httpHelp.sendResponse(res, null);
  }
};
