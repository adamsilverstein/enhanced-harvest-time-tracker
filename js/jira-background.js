var ticket = null;

// Receive ticket details from js/profiles/jira.js
// Send them to js/profiles/jira-harvest.js when requested.

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        // Receiving from the jira page, we set the ticket.
        if (request.isTicket && typeof request.ticket === "object" && typeof request.ticket.id === "string") {
            ticket = request.ticket;
        } else if (typeof ticket === "object") {
            // Receiving from the harvest page, we already have the ticket, so we respond with it
            sendResponse(ticket);
        }
    }
);
