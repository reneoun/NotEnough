declare const chrome: any;
// window.addEventListener("DOMContentLoaded", () => {
  console.log("Background started.");

  // Check for tab change
  chrome.tabs?.onActivated.addListener(async function (activeInfo) {
    console.log("Tab Change:", activeInfo);
    const scripts = await chrome.scripting.getRegisteredContentScripts();
    const scriptsIds = scripts.map((script) => script.id);

    if (scriptsIds.includes("contentScript")) {
      return;
    }

    chrome.scripting
      .registerContentScripts([
        {
          id: "contentScript",
          matches: ["<all_urls>"],
          js: ["/dist/injected.js"],
          runAt: "document_start",
        },
      ])
      .then(() => {
        console.log("Content Script injected");
      })
      .catch((err) => {
        console.log(err);
      });
  });

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const { command } = request;

    console.log("Command:", command);

    const ollamaHost = "http://localhost:8080/api/generate";
    fetch(ollamaHost, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "qwen2.5-coder:7b",
        prompt: command,
        stream: false,
      }),
    }).then(async (res) => {
      if (!res.ok || res.body === null) {
        console.error("Error:", res.statusText);
        return false;
      }

      const dataBody = res.body.getReader();
      let responseValue = await dataBody.read();
      let responseText = "";
      while (!responseValue.done) {
        const textDecoder = new TextDecoder("utf-8");
        const dataStr = textDecoder.decode(responseValue.value);
        const dataObj = JSON.parse(dataStr);

        responseText += dataObj.response;
        responseValue = await dataBody.read();
      }

      console.log("Response:", responseText);
      sendResponse({ response: responseText });
    });

    return true;
  });

// });

export interface OllamaResponse {
  model: string;
  created_at: string;
  response: string;
  done: boolean;
  done_reason: string;
  context: number[];
  total_duration: number;
  load_duration: number;
  prompt_eval_count: number;
  prompt_eval_duration: number;
  eval_count: number;
  eval_duration: number;
}
