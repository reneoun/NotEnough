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

chrome.tabs.onUpdated.addListener((tabId, changeInfo, _) => {
    if (changeInfo.status === 'complete') {
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ['assets/index.js']
        });
    }
});

chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
    console.log("Service Worker: Received message", request);
    
    if (request.action === "set") {
        localStorage.setItem(request.key, request.value);
        sendResponse({ status: "success" });
        return;
    } 
    if (request.action === "get") {
        const value = localStorage.getItem(request.key);
        sendResponse({ status: "success", value: value });
        return;
    }
});