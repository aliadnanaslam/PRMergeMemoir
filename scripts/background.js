chrome.webNavigation.onHistoryStateUpdated.addListener(details => {
  tabId = details.tabId;
});

chrome.webRequest.onCompleted.addListener(function(details) {
  chrome.tabs.sendMessage(tabId, { type: 'newRenderingDetected'});
}, { urls: ['*://*.github.com/*'] });
