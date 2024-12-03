chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'injectCSS') {
    const css = request.css;
    chrome.scripting.executeScript({
      target: { tabId: sender.tab.id },
      function: applyCSS,
      args: [css]
    });
  } else if (request.action === 'injectJS') {
    const js = request.js;
    chrome.scripting.executeScript({
      target: { tabId: sender.tab.id },
      function: applyJavaScript,
      args: [js]
    });
  }
});

function applyCSS(css) {
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
}

function applyJavaScript(js) {
  eval(js); // Use eval for simplicity, but be cautious with this approach
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('Background script loaded!');
  
});