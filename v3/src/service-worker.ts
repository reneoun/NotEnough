chrome.action.onClicked.addListener(() => {
    chrome.tabs.create({ url: "https://example.com" }); // Replace with your desired URL
    console.log("Service Worker: Browser Action button clicked 🔥🔥🔥⚡️");
});

chrome.tabs.onActivated.addListener((activeInfo) => {
    chrome.scripting.executeScript({
        target: { tabId: activeInfo.tabId },
        files: ['assets/index.js']
    });
});