chrome.action.onClicked.addListener(() => {
    chrome.tabs.create({ url: "https://example.com" }); // Replace with your desired URL
    console.log("Service Worker: Browser Action button clicked 🔥🔥🔥⚡️");
});

chrome.tabs.onActivated.addListener((activeInfo) => {
    console.log("Active tab changed:", activeInfo);
    chrome.scripting.executeScript({
        target: { tabId: activeInfo.tabId },
        func: () => {
            console.log("Service Worker: Browser Action button clicked 🔥🔥🔥🍏");
            // open a new tab with the specified URL
            // const url = "https://example.com"; // Replace with your desired URL
            // chrome.tabs.create({ url });
        }
    });
});