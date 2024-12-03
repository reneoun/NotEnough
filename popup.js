// document.getElementById('apply-css').addEventListener('click', () => {
//   const css = document.getElementById('css-input').value;
//   chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//     chrome.runtime.sendMessage(tabs[0].id, { action: 'injectCSS', css }, null);
//   });
// });

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('apply-js').addEventListener('click', () => {
    // chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      //   chrome.runtime.sendMessage(tabs[0].id, { action: 'injectJS', js }, null);
      // });
    const js = document.getElementById('js-input').value;
  
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
        
      function printTitle(code) {
        const title = document.title + code;
        console.log(title);
      };
  
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: printTitle,
        args: [ js ],
        //        files: ['contentScript.js'],  // To call external file instead
      }).then(() => console.log('Injected a function!'));
    });
  });

  console.log('Popup script loaded!');
});
