document.getElementById('custom-code-form').addEventListener('submit', function (event) {
  event.preventDefault();
  const url = document.getElementById('url').value.trim();
  const css = document.getElementById('css').value.trim();
  const js = document.getElementById('js').value.trim();

  if (!url || !css && !js) {
    alert('Please enter a URL and at least one type of code.');
    return;
  }

  chrome.scripting.executeScript({
    target: { urlPattern: url },
    files: ['content-script.js']
  });

  chrome.scripting.insertCSS({
    target: { urlPattern: url },
    css: css
  });

  if (js) {
    const script = document.createElement('script');
    script.textContent = js;
    document.head.appendChild(script);
    setTimeout(() => document.head.removeChild(script), 100); // Remove the script after execution
  }

  alert('Code added to ' + url);
});