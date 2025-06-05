chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
            console.log("Service Worker: Action button clicked 🔥");
        }
    });
});