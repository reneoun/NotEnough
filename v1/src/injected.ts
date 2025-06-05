import { marked } from "marked";

declare var chrome: any;

const getOverlay = () => {
  return document.querySelector(".NE-overlay");
};
const getCMDInput = () => {
  return document.querySelector(".NE-command");
};
const getCMDOutput = () => {
  return document.querySelector(".NE-chat");
};
document.addEventListener("DOMContentLoaded", function () {
  const preTags = document.querySelectorAll("pre");

  preTags.forEach((preTag) => {
    const copyBtn = document.createElement("button");
    copyBtn.textContent = "Copy";
    copyBtn.classList.add("copy-btn");

    copyBtn.addEventListener("click", () => {
      // Create a temporary textarea element to hold the text
      const tempTextarea = document.createElement("textarea");
      tempTextarea.value = preTag.textContent;
      document.body.appendChild(tempTextarea);

      // Select the text inside the textarea and copy it
      tempTextarea.select();
      tempTextarea.setSelectionRange(0, 99999); // For mobile devices
      document.execCommand("copy");

      // Remove the temporary textarea
      document.body.removeChild(tempTextarea);

      alert("Code copied to clipboard!");
    });

    preTag.appendChild(copyBtn);
  });
});

let shiftTimeoutId;
document.addEventListener("keydown", async (e) => {
  if (e.key === "Shift") {
    if (shiftTimeoutId) {
      // double shift
      clearTimeout(shiftTimeoutId);
      shiftTimeoutId = null;

      const classList = getOverlay()?.classList;
      classList?.toggle("show");

      if (classList.contains("show")) {
        getCMDInput().focus();
      }

      return;
    }
    shiftTimeoutId = setTimeout(() => {
      shiftTimeoutId = null;
    }, 500);
  }

  const input = getCMDInput();
  if (!input || !getOverlay().classList.contains("show")) {
    return;
  }

  if (e.key === "Enter") {
    const command = input.value;
    input.value = "";

    if (command === "exit") {
      getOverlay().classList.remove("show");
      return;
    }

    console.log("Command in Injected:", command);
    const newLine = document.createElement("div");
    newLine.textContent = `[${new Date().toLocaleTimeString()}]-Master > ${command}`;
    getCMDOutput().appendChild(newLine);
    newLine.scrollIntoView();

    chrome.runtime.sendMessage({ command }, async (response) => {
      console.log(response);
      const newLine = document.createElement("div");
      newLine.innerHTML = await marked.parse(
        `[${new Date().toLocaleTimeString()}]-🤖🧠 > ${response.response}`,
      );
      getCMDOutput().appendChild(newLine);
      newLine.scrollIntoView();
    });
  }

  if (e.key === "Escape") {
    getOverlay().classList.remove("show");
  }
});

document.addEventListener("click", (e) => {
  if (e.target === getOverlay()) {
    getOverlay().classList.remove("show");
  }
});

fetch(chrome.runtime.getURL("/dist/overlay.html"))
  .then((r) => r.text())
  .then((html) => {
    document.body.insertAdjacentHTML("beforeend", html);
    // not using innerHTML as it would break js event listeners of the page
  });

const onMessageBack = (response) => {};
