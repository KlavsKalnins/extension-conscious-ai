chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "SCAN_PAGE") {
    const pageText = document.body.innerText || "";
    sendResponse({ text: pageText });
  }
});
