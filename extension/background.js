chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "SCAN_PAGE") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0].id;
      if (tabId) {
        chrome.tabs.sendMessage(tabId, { type: "SCAN_PAGE" }, (response) => {
          sendResponse(response);
        });
      }
    });

    return true; // VERY IMPORTANT: Tell Chrome you will respond asynchronously
  }
});
