export class NECommandPanel {
    private shiftKeyPressedTimeoutId:any = null;

    constructor() {
        // this.attachShadow({ mode: 'open' });
    }

    // connectedCallback() {
    //     this.render();
    //     this.init();
    // }

    // disconnectedCallback() {
    //     // Clean up when the element is removed from the DOM
    //     document.removeEventListener('keydown', this.shiftKeyListener.bind(this));
    // }

    // Add Listener for showing the command panel
    async init() {
        document.addEventListener('keydown', this.shiftKeyListener.bind(this));
    }

    shiftKeyListener(event: KeyboardEvent) {
        // console.log("Command Panel: Key pressed", event.key, event.detail);
        
        // double tap shift key to open the command panel
        if (event.key === 'Shift') {
            if (!this.shiftKeyPressedTimeoutId) {
                this.shiftKeyPressedTimeoutId = setTimeout(() => {
                    this.shiftKeyPressedTimeoutId = null; // reset the timeout ID
                }, 300); // reset after 300ms
                return;
            }
            
            clearTimeout(this.shiftKeyPressedTimeoutId);
            this.shiftKeyPressedTimeoutId = null; // reset the timeout ID
            console.log("Command Panel: Shift key 2x pressed, opening panel 🔥🔥🔥");

            // toggle the command panel visibility
            this.toggleCommandPanel();
        }

        // escape key to close the command panel
        if (event.key === 'Escape') {
            console.log("Command Panel: Escape key pressed, closing panel 🔥🔥🔥");
            this.toggleCommandPanel(true); // force close the command panel
        }
    }

    // Toggle visibility of the command panel
    toggleCommandPanel(forceClose = false) {
        const cmdPanel = document.getElementById('cmd-ne-container');
        if (!cmdPanel) return;

        if (forceClose) {
            if (!cmdPanel.classList.contains('ne-hidden')) {
                cmdPanel.classList.add('ne-hidden');
                setTimeout(() => {
                    cmdPanel.style.display = 'none'; // Hide it after the transition
                }, 300); // Match the transition duration
            }
            return;
        }

        if (cmdPanel.classList.contains('ne-hidden')) {
            cmdPanel.style.display = 'flex'; // Ensure it is displayed
            cmdPanel.classList.remove('ne-hidden');
        } else {
            cmdPanel.classList.add('ne-hidden');
            setTimeout(() => {
                cmdPanel.style.display = 'none'; // Hide it after the transition
            }, 300); // Match the transition duration
        }
    }

    render(htmlElement: HTMLElement | null = null) {
        if (!htmlElement) return;
        htmlElement.innerHTML = `
            <style>
                h2#ne-h2 {
                    margin: 0;
                    font-size: 24px;
                    font-family: Roboto, sans-serif;
                }

                #main-ne-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                }
                
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
                    flex: 1;
                    height: 32px;
                    padding-inline: 8px;
                }
            </style>
            <div id="main-ne-overlay">
                <div id="cmd-ne-container">
                    <h2 id="ne-h2">Not Enough UI 🔥</h2>
                    <div id="cmd-ne-panel">
                        <input type="text" placeholder="Type a command..." />
                        <button>Execute</button>
                    </div>
                </div>
            </div>
        `;
        this.init();
    }
}
