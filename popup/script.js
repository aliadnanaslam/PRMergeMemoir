document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('copyBtn').addEventListener('click', copyList);
  document.getElementById('clearBtn').addEventListener('click', clearList);
});

function copyList() {
  var textToCopy = '';
  var itemList = document.getElementById('itemList');
  itemList.innerHTML = '';
  retrieveDataFromStorage("allData", function(allData) {
    if (Object.keys(allData).length < 2) {
      alert('Nothing to copy boss >_<');
      return;
    }
    for (const [key, value] of Object.entries(allData)) {
      if (!isNaN(parseInt(key)) && parseInt(key) % 1 === 0) {
        textToCopy += `${value}\n`;
        itemList.innerHTML += `<li>${value.substring(0, 100)}...</li>`;
      }
    }
    navigator.clipboard.writeText(textToCopy);
  });
}

function clearList() {
  var itemList = document.getElementById('itemList');
  itemList.innerHTML = '';
  clearStorage();
}

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

// Clear data from synchronized storage
function clearStorage() {
  chrome.storage.sync.set({ mergedPRsCache: {} });
}

// Retrieve data from synchronized storage
function retrieveDataFromStorage(key, callback) {
  chrome.storage.sync.get('mergedPRsCache', function(result) {
    const data = key === 'allData' ? result.mergedPRsCache : result.mergedPRsCache[key];
    callback(data);
  });
}