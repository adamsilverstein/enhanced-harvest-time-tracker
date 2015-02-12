(function($){
    // Wait until we have the #harvest-dialog element
    if ( $('#harvest-dialog').length )  {

        // define a new observer to look for dom element changes
        var obs = new MutationObserver(function(mutations, observer) {
            // look through all mutations that just occured
            for(var i=0; i<mutations.length; ++i) {
                // look through all added nodes of this mutation
                for(var j=0; j<mutations[i].addedNodes.length; ++j) {
                    // Look for .form-container on an element, that cointains our Notes(optional) element
                    if(typeof mutations[i].addedNodes[j].classList !== 'undefined' &&  mutations[i].addedNodes[j].classList.contains('form-container') ) {
                        // Form exists, let's get the #notes param by contacting our listening frame
                        chrome.runtime.sendMessage(
                            "", // No message content necessary
                            function (response) {
                                if (typeof response === "object" && typeof response.id === "string") {
                                    var note = $('#harvest-notes').val();

                                    if ($.isArray(response.labels)) {
                                        $.each(response.labels, function(i, label) {
                                            note += " | " + label;
                                        });
                                    }

                                    if (response.hash_parameters.note) {
                                        note += " | " + decodeURIComponent(response.hash_parameters.note);
                                    }

                                    var enteredNote = prompt('Add a note');

                                    note += " | " + ( ( null === enteredNote ) ? '' : enteredNote );

                                    // Set the note field of the harvest iframe to contain our ticket details

                                    $('#harvest-notes').val(note);

                                }
                            }
                        );
                    }
                }
            }
        });

        obs.observe($("#harvest-dialog").get(0), {
            childList: true,
            subtree: true
        });

    }
})(jQuery);
