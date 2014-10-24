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

                note += " | " + prompt('Add a note');

                // Set the note field of the harvest iframe to contain our ticket details
                $('#notes').text(note);
                if (response.hash_parameters.note) {

                    $('option').removeAttr('selected');
                    // Note is added, we came from helpscout. Select the KO items.
                    $('option:contains(CocaCola Support)').attr('selected', 'selected');
                    $('.chzn-single span:first').text("CocaCola Support");
                    $('#task_id_chzn').trigger('mousedown');
                    $('.chzn-single span:last').text("Development");
                    $('.chzn-container:last').addClass('chzn-with-drop');
                    $('.chzn-search input:last').val('Development');
                    $('.chzn-search input:last').trigger('focus');
                    $('.chzn-search input:last').trigger('mousedown');
                    window.setTimeout(function() { 
                        // $('.chzn-container:last').removeClass('chzn-with-drop');
                        // This works if you open the iframe in a new tab to trigger the dropdown from where we can select the Development item, but not when the iframe is loaded in the JIRA page. Someone smarter than me have any suggestions?
                        $('#task_id_chzn').trigger('mousedown');
                    }, 500);
                }

            }
        }
    );
})(jQuery);
