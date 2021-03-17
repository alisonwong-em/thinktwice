chrome.runtime.onMessage.addListener((msg, sender, response) => {
    switch (msg.type) {
        case 'popupInit':
            response(msg.tabUrl);
            break;
        default:
            response('unknown request');
            break;
    }
});