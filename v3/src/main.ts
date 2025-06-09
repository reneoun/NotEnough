if (sessionStorage.getItem('neCommandPanelInitialized') !== 'true') {
  const NECommandPanel = () => {
    // Initialize the command panel
    const init = async () => {
      document.addEventListener('keydown', shiftKeyListener);
    }

    const initElementBindings = async () => {
        initExcuteCommandInputs(); // Initialize the input field
        initModelSelect();
        initSubActionsBtnEvents(); // Initialize the sub actions buttons
    }

    const initModelSelect = async () => {
      const modelSelect = document.getElementById('ne-model-select') as HTMLSelectElement;
      if (!modelSelect) return;

      const modelSelectExistsOptions = modelSelect.querySelectorAll('option');
      const selectedModel = JSON.parse(localStorage.getItem('neCommandPanelSelectedModel') || '{}');
      modelSelect.addEventListener('change', (event) => {
        localStorage.setItem('neCommandPanelSelectedModel', (event.target as HTMLSelectElement).value);
      });

      const response = await fetch('http://localhost:11434/api/tags', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (!data.models || data.models.length === 0) {
        const option = document.createElement('option');
        option.value = 'no-models';
        option.textContent = 'No models available';
        modelSelect.appendChild(option);
        return;
      }

      let existingModelNames = [];
      if (modelSelectExistsOptions.length > 0) {
        existingModelNames = Array.from(modelSelectExistsOptions).map(option => JSON.parse(option.value).name);
      }
      data.models.forEach((model: any) => {
        const option = document.createElement('option');
        option.value = JSON.stringify(model);
        option.textContent = model.name;
        if (selectedModel && selectedModel.name === model.name) {
          option.selected = true; // Select the model if it matches the stored selection
        }
        if (existingModelNames.includes(model.name)) return; // Skip if the model already exists in the select options
        modelSelect.appendChild(option);
      });
    }

    const initSubActionsBtnEvents = () => {
      const closeBtn = document.getElementById('ne-close-btn');
      const settingsBtn = document.getElementById('ne-settings-btn');

      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          toggleCommandPanel(true); // force close the command panel
        });
      }

      if (settingsBtn) {
        settingsBtn.addEventListener('click', () => {
          console.log("Command Panel: Settings button clicked, opening settings 🔥🔥🔥");
          // Here you can add the logic to open the settings panel
        });
      }
    }

    // Listener for showing the command panel
    const shiftKeyListener = (event: KeyboardEvent) => {
      // console.log("Command Panel: Key pressed", event.key, event.detail);
      let shiftKeyPressedTimeoutId: any = sessionStorage.getItem('shiftKeyPressedTimeoutId') || null;

      // double tap shift key to open the command panel
      if (event.key === 'Shift') {
        if (!shiftKeyPressedTimeoutId) {
          shiftKeyPressedTimeoutId = setTimeout(() => {
            shiftKeyPressedTimeoutId = null; // reset the timeout ID
            sessionStorage.removeItem('shiftKeyPressedTimeoutId'); // Clear the timeout ID from session storage
          }, 300); // reset after 300ms
          sessionStorage.setItem('shiftKeyPressedTimeoutId', shiftKeyPressedTimeoutId);
          return;
        }

        clearTimeout(shiftKeyPressedTimeoutId);
        shiftKeyPressedTimeoutId = null; // reset the timeout ID
        sessionStorage.removeItem('shiftKeyPressedTimeoutId'); // Clear the timeout ID from session storage

        // toggle the command panel visibility
        toggleCommandPanel();
      }

      // escape key to close the command panel
      if (event.key === 'Escape') {
        toggleCommandPanel(true); // force close the command panel
      }
    }

    // Function to toggle the command panel visibility
    const toggleCommandPanel = (forceClose = false) => {
      const cmdPanel = document.getElementById('cmd-ne-container');
      const conversationOutput = document.getElementById('conversation-ne-output');
      if (!cmdPanel || !conversationOutput) return;

      if (forceClose) {
        if (!cmdPanel.classList.contains('ne-hidden')) {
          cmdPanel.classList.add('ne-hidden');
          conversationOutput.classList.add('ne-hidden'); // Hide the conversation output as well
          setTimeout(() => {
            cmdPanel.style.display = 'none'; // Hide it after the transition
          }, 300); // Match the transition duration
        }

        return;
      }

      if (cmdPanel.classList.contains('ne-hidden')) {
        cmdPanel.style.display = 'flex'; // Ensure it is displayed
        cmdPanel.classList.remove('ne-hidden');
        let messages = JSON.parse(localStorage.getItem('neCommandPanelMessages') || '[]');
        if (messages.length > 0) conversationOutput.classList.remove('ne-hidden'); // Show the conversation output
        let cmdInput = document.querySelector('#cmd-ne-panel input') as HTMLInputElement;
        if (cmdInput) {
          cmdInput.focus(); // Focus the input when the panel is shown
        }
        initElementBindings();

      } else {
        cmdPanel.classList.add('ne-hidden');
        conversationOutput.classList.add('ne-hidden'); // Hide the conversation output as well
        setTimeout(() => {
          cmdPanel.style.display = 'none'; // Hide it after the transition
        }, 300); // Match the transition duration
      }
    }

    const closeIconSvgString = `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
      <svg width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10"/>
      <path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke-linecap="round"/>
      </svg>`;

    const settingsIconSvgString = `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="3"/>
      <path d="M13.7654 2.15224C13.3978 2 12.9319 2 12 2C11.0681 2 10.6022 2 10.2346 2.15224C9.74457 2.35523 9.35522 2.74458 9.15223 3.23463C9.05957 3.45834 9.0233 3.7185 9.00911 4.09799C8.98826 4.65568 8.70226 5.17189 8.21894 5.45093C7.73564 5.72996 7.14559 5.71954 6.65219 5.45876C6.31645 5.2813 6.07301 5.18262 5.83294 5.15102C5.30704 5.08178 4.77518 5.22429 4.35436 5.5472C4.03874 5.78938 3.80577 6.1929 3.33983 6.99993C2.87389 7.80697 2.64092 8.21048 2.58899 8.60491C2.51976 9.1308 2.66227 9.66266 2.98518 10.0835C3.13256 10.2756 3.3397 10.437 3.66119 10.639C4.1338 10.936 4.43789 11.4419 4.43786 12C4.43783 12.5581 4.13375 13.0639 3.66118 13.3608C3.33965 13.5629 3.13248 13.7244 2.98508 13.9165C2.66217 14.3373 2.51966 14.8691 2.5889 15.395C2.64082 15.7894 2.87379 16.193 3.33973 17C3.80568 17.807 4.03865 18.2106 4.35426 18.4527C4.77508 18.7756 5.30694 18.9181 5.83284 18.8489C6.07289 18.8173 6.31632 18.7186 6.65204 18.5412C7.14547 18.2804 7.73556 18.27 8.2189 18.549C8.70224 18.8281 8.98826 19.3443 9.00911 19.9021C9.02331 20.2815 9.05957 20.5417 9.15223 20.7654C9.35522 21.2554 9.74457 21.6448 10.2346 21.8478C10.6022 22 11.0681 22 12 22C12.9319 22 13.3978 22 13.7654 21.8478C14.2554 21.6448 14.6448 21.2554 14.8477 20.7654C14.9404 20.5417 14.9767 20.2815 14.9909 19.902C15.0117 19.3443 15.2977 18.8281 15.781 18.549C16.2643 18.2699 16.8544 18.2804 17.3479 18.5412C17.6836 18.7186 17.927 18.8172 18.167 18.8488C18.6929 18.9181 19.2248 18.7756 19.6456 18.4527C19.9612 18.2105 20.1942 17.807 20.6601 16.9999C21.1261 16.1929 21.3591 15.7894 21.411 15.395C21.4802 14.8691 21.3377 14.3372 21.0148 13.9164C20.8674 13.7243 20.6602 13.5628 20.3387 13.3608C19.8662 13.0639 19.5621 12.558 19.5621 11.9999C19.5621 11.4418 19.8662 10.9361 20.3387 10.6392C20.6603 10.4371 20.8675 10.2757 21.0149 10.0835C21.3378 9.66273 21.4803 9.13087 21.4111 8.60497C21.3592 8.21055 21.1262 7.80703 20.6602 7C20.1943 6.19297 19.9613 5.78945 19.6457 5.54727C19.2249 5.22436 18.693 5.08185 18.1671 5.15109C17.9271 5.18269 17.6837 5.28136 17.3479 5.4588C16.8545 5.71959 16.2644 5.73002 15.7811 5.45096C15.2977 5.17191 15.0117 4.65566 14.9909 4.09794C14.9767 3.71848 14.9404 3.45833 14.8477 3.23463C14.6448 2.74458 14.2554 2.35523 13.7654 2.15224Z"/>
      </svg>`;
    const render = (container: HTMLElement, hidden = true) => {
      if (!container) return;
      container.innerHTML = `
            <style>
                h2#ne-h2 {
                    margin: 0 !important;
                    font-size: 24px !important;
                    font-family: Roboto, sans-serif !important;
                    line-height: 1 !important;
                }

                #main-ne-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;

                    pointer-events: none;
                }

                #main-ne-overlay * {
                    pointer-events: auto;
                }

                #conversation-ne-output {
                    position: absolute;
                    top: 20%;
                    left: 50%;
                    min-width: 50vw;
                    overflow-y: auto;
                    max-height: 30vh;
                    display: flex;
                    flex-direction: column;

                    background: rgba(255, 255, 255, 0.25);
                    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
                    backdrop-filter: blur(4px);
                    -webkit-backdrop-filter: blur(4px);
                    border-radius: 10px;
                    border: 1px solid rgba(255, 255, 255, 0.18);

                    transform: translate(-50%, -50%);
                    transition: opacity 0.3s ease-in-out;
                }

                .ne-message {
                    padding: 8px;
                    margin: 4px;
                    border-radius: 4px;
                    font-family: Roboto, sans-serif;
                    font-size: 14px;
                    border: 1px solid rgba(255, 255, 255, 0.2);

                    background: rgba(255, 255, 255, 0.1);
                }

                #conversation-ne-output.ne-hidden,
                #conversation-ne-output.ne-hidden *,
                #cmd-ne-container.ne-hidden,
                #cmd-ne-container.ne-hidden * {
                    opacity: 0;
                    pointer-events: none;
                    transition: opacity 0.3s ease-in-out;
                }
                #cmd-ne-container {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    min-width: 400px;
                    padding-inline: 32px;
                    padding-block: 16px;

                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: stretch;
                    text-align: center;
                    gap: 8px;

                    background: rgba(255, 255, 255, 0.25);
                    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
                    backdrop-filter: blur(4px);
                    -webkit-backdrop-filter: blur(4px);
                    border-radius: 10px;
                    border: 1px solid rgba(255, 255, 255, 0.18);

                    transition: opacity  0.3s ease-in-out;
                }

                #cmd-ne-panel {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                }

                #cmd-ne-panel button:hover {
                    background-color: rgba(255, 255, 255, 0.1);
                    cursor: pointer;
                }
                #cmd-ne-panel button {
                    padding: 8px 16px;
                    color: #555;
                    font-size: 12px;
                    font-family: Roboto, sans-serif;

                    background: rgba(255, 255, 255, 0.25);
                    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
                    backdrop-filter: blur(4px);
                    -webkit-backdrop-filter: blur(4px);
                    border-radius: 4px;
                    border: 1px solid rgba(255, 255, 255, 0.18);
                }
                #cmd-ne-panel input {
                    width: 100%;
                    height: 32px;
                    padding-inline: 8px;
                }
                
                #sub-actions {
                    display: flex;
                    position: absolute;
                    right: 0px;
                    top: -36px;
                    width: 100%;
                    justify-content: space-between;
                    align-items: center;
                    gap: 8px;
                }
                #sub-actions button:hover {
                    cursor: pointer;
                }
                #sub-actions button#ne-close-btn:hover svg > * {
                  stroke: red;
                }
                #sub-actions button#ne-settings-btn:hover svg > * {
                  stroke: grey;
                }
                #sub-actions button svg > * {
                  stroke: #fff;
                  stroke-width: 2px;
                }
                #sub-actions button {
                  background: transparent;
                  border: none;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                }

                #sub-actions .ne-action-btns {
                  display: flex;
                  gap: 8px;
                }

                #ne-model-select {
                  padding: 4px 8px;
                }

                #cmd-ne-panel.loading input::after {
                  content: '';
                  position: absolute;
                  width: 100%;
                  height: 100%;
                  top: 0;
                  left: 0;
                  z-index: -10;
                  background: red;
                }

                @property --angle {
                  syntax: '<angle>';
                  initial-value: 0deg;
                  inherits: false;
                }

                .cmd-input-border {
                  flex: 1;
                  padding: 3px;
                  border-radius: 4px;
                  animation: spin 3s linear infinite;
                }

                .cmd-input-border.loading {
                  background: conic-gradient(from var(--angle), transparent 66.67%,rgb(60, 222, 81),rgb(44, 159, 35));
                }

                span[ne-think] {
                  color: #888;
                  font-style: italic;
                }

                @keyframes spin {
                  from {
                    --angle: 0deg;
                  }
                  to {
                    --angle: 360deg;
                  }
                }
            </style>
            <div id="main-ne-overlay">
                <div id="conversation-ne-output" class="ne-hidden">
                </div>
                <div id="cmd-ne-container" class="${hidden ? 'ne-hidden' : ''}">
                    <div id="sub-actions">
                        <select id="ne-model-select">
                        </select>
                        <div class="ne-action-btns">
                          <button id="ne-settings-btn">
                            ${settingsIconSvgString}
                          </button>
                          <button id="ne-close-btn">
                            ${closeIconSvgString}
                          </button>
                        </div>
                    </div>
                    <h2 id="ne-h2">Not Enough UI 🔥</h2>
                    <div id="cmd-ne-panel">
                        <div class="cmd-input-border">
                          <input type="text" placeholder="Type a command..." />
                        </div>
                        <button>Fire me!</button>
                    </div>
                </div>
            </div>
        `;
      init();
      if (!hidden) {
        initElementBindings(); // Initialize the input field and model select if the panel is not hidden
      }
    };

    const unload = () => {
      document.removeEventListener('keydown', shiftKeyListener);
      const cmdPanel = document.getElementById('cmd-ne-container');
      if (cmdPanel) {
        cmdPanel.remove();
      }
      sessionStorage.removeItem('shiftKeyPressedTimeoutId'); // Clear the timeout ID
      localStorage.removeItem('neCommandPanelMessages'); // Clear the messages
    };

    const initExcuteCommandInputs = () => {
      const cmdButton = document.querySelector('#cmd-ne-panel button') as HTMLButtonElement;
      const cmdInput = document.querySelector('#cmd-ne-panel input') as HTMLInputElement;
      if (!cmdButton || !cmdInput) return;
      cmdInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          // focus the button when Enter is pressed
          event.preventDefault(); // Prevent form submission if inside a form
          cmdButton.focus(); // Trigger the button click
        }
      });

      cmdButton.addEventListener('click', async () => {
        const command = cmdInput.value.trim();
        const modelSelect = document.getElementById('ne-model-select') as HTMLSelectElement;
        const selectedModel = JSON.parse(modelSelect.value || '{}');
        if (command) {
          if (command.startsWith('/')) {
            window.open("https://www.google.com/search?q=" + command.substring(1), "_blank"); // Open the URL in a new", '_blank'); // Open the command in a new tab
          }
          else {
            fetchAIResponse(command, selectedModel.name); // Call the function to fetch AI response
          }

          // Here you can add the logic to execute the command
          cmdInput.value = ''; // Clear the input after execution
        } else {
          console.log("Command input is empty. ❌");
        }
        cmdInput.focus(); // Keep the input focused after execution
      });
    }

    const insertOutputToContainer = (source:string, msg:string, id?: string, emoji:string="", stream?: boolean, thinking?:boolean) => {
      const outputElement = document.querySelector('#conversation-ne-output') as HTMLElement;
      if (!outputElement) {
        return;
      }
      const lastChild = outputElement.lastElementChild;
      
      if (outputElement.classList.contains('ne-hidden')) {
        outputElement.classList.remove('ne-hidden');
      }
      
      if (stream && lastChild && lastChild.classList.contains(`ne-${source}`)) {
        const lastMessage = lastChild as HTMLElement;
        lastMessage.innerHTML += `<span ${thinking ? "ne-think" : ""}>${msg}</span>`;
        lastMessage.scrollIntoView({ behavior: 'smooth', block: 'end' });
        return; // If it's a stream, just append to the last message
      }
      const messageElement = document.createElement('div');
      messageElement.className = 'ne-message '+ "ne-"+source;
      messageElement.innerHTML = `<strong>${source}-${emoji}:</strong><span>${msg}</span>`;
      if (id) {
        messageElement.id = id;
      }

      outputElement.appendChild(messageElement);
      outputElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }

    const fetchAIResponse = async (commandIn: string = "", modelIn:string = "") => {
      const command = commandIn.trim();
      const model = modelIn.trim();
      if (!command || !model) {
        console.log("Command or model is empty. ❌");
        return;
      }
      const cmdInputContainer = document.querySelector('.cmd-input-border') as HTMLElement;
      if (cmdInputContainer) {
        cmdInputContainer.classList.add('loading');
      }

      let messages = JSON.parse(localStorage.getItem('neCommandPanelMessages') || '[]');

      messages.push({ role: 'user', content: command });
      insertOutputToContainer('user', command, 'ne-user-message', '👤');

      const response = await fetch('http://localhost:11434/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: model,
          messages: messages,
          stream: true
        })
      });

      const reader = response?.body?.getReader();
      
      if (!reader) {
        console.log("Failed to get reader from response body. ❌");
        return;
      }
      
      const decoder = new TextDecoder();
      let fullText = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        // let thinking = false;
        
        let thinking = sessionStorage.getItem('neCommandPanelThinking') === 'true';
        for (const line of chunk.trim().split('\n')) {
          if (!line) continue;
          const json = JSON.parse(line);
          const content = json.message?.content || '';
          if (content.includes('<think>')) {
            thinking = true;
            sessionStorage.setItem('neCommandPanelThinking', 'true');
          }
          if (content.includes('</think>')) {
            thinking = false;
            sessionStorage.setItem('neCommandPanelThinking', 'false');
          }
          thinking = sessionStorage.getItem('neCommandPanelThinking') === 'true' ;
          fullText += content;
          insertOutputToContainer('assistant', content, 'ne-assistant-message', '🤖', true, thinking);
        }

      }
      if (cmdInputContainer) {
        cmdInputContainer.classList.remove('loading');
      }
      messages.push({ role: 'assistant', content: fullText });
      localStorage.setItem('neCommandPanelMessages', JSON.stringify(messages));
    }

    return {
      render,
      unload
    }
  }
  const NotEnoughtUI = NECommandPanel();
  if (location.hostname.includes('localhost') || location.hostname.includes('127.0.0.1')) {
    window.addEventListener('DOMContentLoaded', () => {
      console.log("NECommandPanel: DOMContentLoaded event fired, command panel is ready to use. 🔥🔥🔥");
      sessionStorage.setItem('neCommandPanelInitialized', 'true');
      const app = document.getElementById('app');
      if (app) {
        NotEnoughtUI.render(app, false);
      }
    });
    window.addEventListener('beforeunload', () => {
      console.log("NECommandPanel: Unloading command panel 🔥🔥🔥");
      sessionStorage.removeItem('neCommandPanelInitialized');
      NotEnoughtUI.unload();
    });
  } else {
    const notEnough = document.createElement('div');
    NotEnoughtUI.render(notEnough);
    document.body.appendChild(notEnough);
    console.log("NECommandPanel initialized and ready to use. 🔥🔥🔥");

    // beforeunload event to unload the command panel
    window.addEventListener('beforeunload', () => {
      console.log("NECommandPanel: Unloading command panel 🔥🔥🔥");
      sessionStorage.removeItem('neCommandPanelInitialized');
      NotEnoughtUI.unload();
    });
  }

  sessionStorage.setItem('neCommandPanelInitialized', 'true');
}
