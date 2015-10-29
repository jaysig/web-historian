var finalhandler = require('finalhandler');
var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var serveStatic = require('serve-static');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveIndex = serveStatic(archive.paths.siteAssets, { 'index' : 'index.html'});


exports.serveAssets = function(req, res, asset, callback) {

  var serveArchive = serveStatic(archive.paths.archivedSites, { 'index' : asset});


  // fs.readFile(asset, 'utf', function(err, data) {
  //    exports.sendResponse(res, data, 200);
  // })

  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
};

exports.sendResponse = function(response, data, statusCode){
  statusCode = statusCode || 200;
  response.writeHead(statusCode, exports.headers);
  response.end(JSON.stringify(data));
};

exports.makeActionHandler = function(actionMap){
  var actionMap = actionMap;
  return function(request, response) {
    var action = actionMap[request.method];
    if (action) {
      action(request, response);
    } else {
      exports.sendResponse(response, '', 404);
    }
  }
};

//Router to serve files
//Use archive helpers

// As you progress, keep thinking about what helper functions you can put here!
