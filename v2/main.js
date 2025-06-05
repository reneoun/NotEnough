const sayHello = async() => {
    let [tab] = await chrome.tabs.query({ active: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
            console.log("Hello from the main script! 👋");
            // Using global 'document' is the one of the current tab !
        }
    });
};

document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('toggleButton');
    if (button) {
        button.addEventListener('click', sayHello);
    } else {
        console.error("Button with ID 'sayHelloButton' not found.");
    }
});