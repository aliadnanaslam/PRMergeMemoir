(function(){
  'use strict';

  if (document.readyState === 'complete') {
    injectScriptInTab();
  } else {
    window.addEventListener('load', injectScriptInTab);
  }

  function injectScriptInTab() {
    console.log(' [+] Injecting script in the tab!');

    document.getElementsByClassName('js-merge-commit-button')[0].addEventListener('click', function(event) {
      console.log(' [+] Event Listener Hit!');
      let prDetails = `${window.location.href} (${document.getElementsByClassName('js-issue-title markdown-title')[0].innerText})`
      saveDataToStorage(new Date().getTime(), prDetails); // details will be stored against timestamp;
    });
  }
})();

// Save data to synchronized storage
function saveDataToStorage(key, value) {
  chrome.storage.sync.get('mergedPRsCache').then(data => {
    if (!data.mergedPRsCache) data.mergedPRsCache = {};

    // Precautionary check in case trigger gets hit multiple times
    const values = Object.values(data.mergedPRsCache);
    if (values.includes(value)) return;

    data.mergedPRsCache[key] = value;
    chrome.storage.sync.set(data, function() {
      console.log(' [+] Merged PRs Details:', data);
    });
  });
}