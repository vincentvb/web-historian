var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var request = require('request');

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
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
	fs.readFile(exports.paths.list, (err, data) => {
		if (err) throw err;
    data = data.toString('utf8').split("\n");
    callback(data);
	})
};

exports.isUrlInList = function(url, callback) {
  fs.readFile(exports.paths.list, (err, data) => {
    if (err) throw err;
    data = data.toString('utf8').split("\n");
    var isInList = false;
    // for (var i = 0; i < data.length; i++) {
      if (data.indexOf(url) !== -1) {
        isInList = true;
      }
    // }
    callback(isInList);
  })
};

exports.addUrlToList = function(url, callback) {
  fs.appendFile(exports.paths.list, url, (err) => {
    if (err) throw err;
    callback(url);
  })
};

exports.isUrlArchived = function(url, callback) {
  fs.stat(exports.paths.archivedSites + "/" + url, function(error, stats) {
    if (error) {
      callback(false);
    }
    if (stats) {
      callback(true);
    }
  });
};

exports.downloadUrls = function(urls) {
  for (var i = 0; i < urls.length; i++) {
    exports.scrapeFunc(urls[i], (html, url) => {
      console.log(url)
      fs.writeFile(exports.paths.archivedSites + "/" + url, html, (error) => {
      if (error) throw error;
      })
    })
  };
};

exports.scrapeFunc = function(url, callback) {
  request("http://" + url, (error, response, body) => {
    callback(body, url)
  });
}; 

    // request("http://" + urls[i], (error, response, body) => {
    //   fs.writeFile(exports.paths.archivedSites + "/" + urls[i], body, (error) => {
    //   if (error) throw error;
    //   })
    // });
