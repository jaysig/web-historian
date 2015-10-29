var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var fetch = require('../workers/htmlfetcher.js');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback){
  var file = this.paths.list;
  var sites = [];
  fs.readFile(file, "utf8", function(err,data){
    if(err) throw err;
    sites = data.split("\n");
    callback(sites); //callback on whole array
  });
};

exports.isUrlInList = function(site, callback){ //Data is in the argument
  var file = this.paths.list;
  var sites = [];
  fs.readFile(file, "utf8", function(err,data){
    if(err) throw err;
    sites = data.split("\n");
    callback(sites[sites.indexOf(site)]); //Callback on the individual site
  });
};

exports.addUrlToList = function(site, callback){
  var file = this.paths.list;
  fs.appendFile(file, site, 'utf8', function (err) {
    if(err) throw err
    callback(site);
  });
};

exports.isUrlArchived = function(site, callback){
  var siteLoc = this.paths.archivedSites + "/" + site;
  fs.stat(siteLoc, function (err, data) { //Check if the file is there archieved
    callback(siteLoc);
  });
};

exports.downloadUrls = function(collection){
  // var file = this.paths.list;
  // var sites = [];
  // fs.readFile(file, "utf8", function(err,data){
  //   if(err) throw err;
  //   sites = data.split("\n");
  //   _.each(sites, function (val) {
  //     callback(val);
  //   });
  // });
  //run htmlfetcher
  _.each(collection, function (val) {
    fetch(val);
  })
};
