(function($){
    var labels = [];

    // Get the ticket labels
    $('.labels .lozenge').each(function(i, elem) { 
        labels.push($(elem).text());
    });

    var data = {
        isTicket: true,
        ticket: {
            id: $('#key-val').text(),
            title: $('#summary-val').text(),
            labels: labels
        }
    };

    chrome.runtime.sendMessage(
        data
    );
})(jQuery);
