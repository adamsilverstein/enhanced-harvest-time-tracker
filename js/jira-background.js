var tickets = {};

// Receive ticket details from js/profiles/jira.js
// Send them to js/profiles/jira-harvest.js when requested.

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        var key = sender.tab.id;
        // Receiving from the jira page, we set the ticket.
        if (request.isTicket && typeof request.ticket === "object" && typeof request.ticket.id === "string") {
            tickets[key] = request.ticket;
        } else if (typeof tickets[key] === "object") {
            // Receiving from the harvest page, we already have the ticket, so we respond with it
            sendResponse(tickets[key]);
        }
    }
);
