// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var cron = require('node-cron');

var helpers = require('./../web/request-handler.js');


cron.schedule('1-10 * * * *', function() { 
	var listofUrls
	helpers.readListOfUrls(function(data) {
		listofUrls = data
	})
	var notArchived = []
	for (var i = 0; i < listofUrls.length; i++) {
		helpers.isUrlArchived(listofUrls[i], function(boolean) {
			if (false) {
				notArchived.push(listofUrls[i])
			}
		})
	}
	helpers.downloadUrls(notArchived);
}