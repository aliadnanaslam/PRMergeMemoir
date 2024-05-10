chrome.tabs.onActivated.addListener(async ({ tabId }) => {
  saveDataToStorage("currentTabId", tabId);
  console.log(chrome.storage.sync.get('mergedPRsCache'));
});

// Save data to synchronized storage
function saveDataToStorage(key, value) {
  chrome.storage.sync.get('mergedPRsCache').then(data => {
    if (!data.mergedPRsCache) data.mergedPRsCache = {};
    data.mergedPRsCache[key] = value;
    chrome.storage.sync.set(data, function() {
      console.log('Data saved:', data);
    });
  });
}

// Retrieve data from synchronized storage
function retrieveDataFromStorage(key, callback) {
  chrome.storage.sync.get('mergedPRsCache', function(result) {
    const data = result.mergedPRsCache[key];
    callback(data);
  });
}