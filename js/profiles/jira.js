(function($){
	$( document ).ready( function(){
		var labels = [];

			// Get the ticket labels
			$('.labels .lozenge').each(function(i, elem) {
				labels.push($(elem).text());
			});

			// Parse window.location.hash to get our URI
			var hash_parameters = {};
			window.location.hash.substr(1).split("&").forEach(
				function(item) {
					hash_parameters[item.split("=")[0]] = item.split("=")[1];
				}
			);

			var data = {
				isTicket: true,
				ticket: {
					hash_parameters: hash_parameters,
					id: $('#key-val').text(),
					labels: labels,
					title: $('#summary-val').text()
				}
			};
			chrome.runtime.sendMessage(
				data
			);
	});

})(jQuery);
