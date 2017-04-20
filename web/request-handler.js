var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs')
// require more modules/folders here!

exports.handleRequest = function (request, response) {
	if (request.method === "POST") {
		var newData = ""
		request.on('data', (data) => {

			newData += data
		})
		request.on('end', () => {
			newData = newData.slice(4)
			archive.addUrlToList(newData + "\n", function() {
				response.writeHead(302)
				response.end("Stored!")
			})
		})
	}
  if (request.method === "GET") {
			if (request.url === "/") {
				response.writeHead(200)
				var htmlFile = path.join(__dirname, "/public/index.html")
				fs.readFile(htmlFile, (error, data) => {
					response.write(data);
					response.end();

				})

			}
  		archive.isUrlArchived(request.url.slice(1), function(isTrue) {
				 if (!isTrue) {
				 	response.writeHead(404);
					response.end("TRY AGAIN");
				}
				else if (isTrue) {
					fs.readFile(path.join(archive.paths.archivedSites + request.url), function(error, data) {
						if (error) throw error;
						response.write(data);
						response.end();
					})
				}
			})


	}
  // res.end(archive.paths.list);
};
