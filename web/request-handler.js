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
    var url = req.url.length > 1 ? req.url : '';
      httpHelp.serveAssets(res, url + '/index.html',function(data){
        res.writeHead(200,httpHelp.headers);
        res.end(JSON.stringify(data));
      });
    // } else {


    //   //httpHelp.serveAssets()
    // }
  },
  'POST': function(req, res){
  },
  'OPTIONS': function(req, res){
    // httpHelp.sendResponse(res, null);
  }
};
