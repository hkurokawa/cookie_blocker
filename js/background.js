var toggle = false;

function toggleBlock() {
    toggle = !toggle;
    update();
}

var listener = function(details) {
                for (var i = 0; i < details.requestHeaders.length; ++i) {
                    if (details.requestHeaders[i].name === 'Cookie') {
                        details.requestHeaders.splice(i, 1);
                        break;
                    }
                }
                return {requestHeaders: details.requestHeaders};
            };
function update() {
    if  (toggle) {
        chrome.webRequest.onBeforeSendHeaders.addListener(
            listener,
            {urls: ["<all_urls>"]},
            ["blocking", "requestHeaders"]);
        console.log("Added an listener.");
        chrome.browserAction.setBadgeText({"text": "Block"});
        chrome.browserAction.setBadgeBackgroundColor({"color": [255, 0, 0, 255]});
    } else {
        chrome.webRequest.onBeforeSendHeaders.removeListener(listener);
        console.log("Removed listener.");
        chrome.browserAction.setBadgeText({"text": "Allow"});
        chrome.browserAction.setBadgeBackgroundColor({"color": [0, 255, 0, 255]});
    }
    chrome.tabs.getSelected(null, function(tab) {
        chrome.tabs.reload(tab.id);
    });
}

chrome.browserAction.onClicked.addListener(toggleBlock);
update();
