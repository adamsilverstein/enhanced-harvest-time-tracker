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

                if (response.hash_parameters.note) {
                    note += " | " + decodeURIComponent(response.hash_parameters.note);
                }
                var enteredNote = prompt('Add a note');
                note += " | " + ( ( null == enteredNote ) ? '' : enteredNote );

                // Set the note field of the harvest iframe to contain our ticket details
	            $( '.entry-notes' ).text( note );

            }
        }
    );
})(jQuery);
