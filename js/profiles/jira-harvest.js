(function($){
    chrome.runtime.sendMessage(
        "", // No message content necessary
        function (response) {
            if (typeof response === "object" && typeof response.id === "string") {
                var note = response.id;
                if (typeof response.title === "string") {
                    note += " | " + response.title;
                }
                if ($.isArray(response.labels)) {
                    $.each(response.labels, function(i, label) {
                        note += " | " + label;
                    });
                }

                // Set the note field of the harvest iframe to contain our ticket details
                $('#notes').text(note);

            }
        }
    );
})(jQuery);
