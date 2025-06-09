(function(){const c=document.createElement("link").relList;if(c&&c.supports&&c.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))g(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const u of a.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&g(u)}).observe(document,{childList:!0,subtree:!0});function d(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function g(s){if(s.ep)return;s.ep=!0;const a=d(s);fetch(s.href,a)}})();if(sessionStorage.getItem("neCommandPanelInitialized")!=="true"){const c=(()=>{const d=async()=>{document.addEventListener("keydown",u)},g=async()=>{P(),s(),a()},s=async()=>{const n=document.getElementById("ne-model-select");if(!n)return;const e=n.querySelectorAll("option"),o=JSON.parse(localStorage.getItem("neCommandPanelSelectedModel")||"{}");n.addEventListener("change",t=>{localStorage.setItem("neCommandPanelSelectedModel",t.target.value)});const i=await(await fetch("http://localhost:11434/api/tags",{method:"GET",headers:{"Content-Type":"application/json"}})).json();if(!i.models||i.models.length===0){const t=document.createElement("option");t.value="no-models",t.textContent="No models available",n.appendChild(t);return}let l=[];e.length>0&&(l=Array.from(e).map(t=>JSON.parse(t.value).name)),i.models.forEach(t=>{const r=document.createElement("option");r.value=JSON.stringify(t),r.textContent=t.name,o&&o.name===t.name&&(r.selected=!0),!l.includes(t.name)&&n.appendChild(r)})},a=()=>{const n=document.getElementById("ne-close-btn"),e=document.getElementById("ne-settings-btn");n&&n.addEventListener("click",()=>{y(!0)}),e&&e.addEventListener("click",()=>{console.log("Command Panel: Settings button clicked, opening settings 🔥🔥🔥")})},u=n=>{let e=sessionStorage.getItem("shiftKeyPressedTimeoutId")||null;if(n.key==="Shift"){if(!e){e=setTimeout(()=>{e=null,sessionStorage.removeItem("shiftKeyPressedTimeoutId")},300),sessionStorage.setItem("shiftKeyPressedTimeoutId",e);return}clearTimeout(e),e=null,sessionStorage.removeItem("shiftKeyPressedTimeoutId"),y()}n.key==="Escape"&&y(!0)},y=(n=!1)=>{const e=document.getElementById("cmd-ne-container"),o=document.getElementById("conversation-ne-output");if(!(!e||!o)){if(n){e.classList.contains("ne-hidden")||(e.classList.add("ne-hidden"),o.classList.add("ne-hidden"),setTimeout(()=>{e.style.display="none"},300));return}if(e.classList.contains("ne-hidden")){e.style.display="flex",e.classList.remove("ne-hidden"),JSON.parse(localStorage.getItem("neCommandPanelMessages")||"[]").length>0&&o.classList.remove("ne-hidden");let i=document.querySelector("#cmd-ne-panel input");i&&i.focus(),g()}else e.classList.add("ne-hidden"),o.classList.add("ne-hidden"),setTimeout(()=>{e.style.display="none"},300)}},I=`<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
      <svg width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10"/>
      <path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke-linecap="round"/>
      </svg>`,k=`<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="3"/>
      <path d="M13.7654 2.15224C13.3978 2 12.9319 2 12 2C11.0681 2 10.6022 2 10.2346 2.15224C9.74457 2.35523 9.35522 2.74458 9.15223 3.23463C9.05957 3.45834 9.0233 3.7185 9.00911 4.09799C8.98826 4.65568 8.70226 5.17189 8.21894 5.45093C7.73564 5.72996 7.14559 5.71954 6.65219 5.45876C6.31645 5.2813 6.07301 5.18262 5.83294 5.15102C5.30704 5.08178 4.77518 5.22429 4.35436 5.5472C4.03874 5.78938 3.80577 6.1929 3.33983 6.99993C2.87389 7.80697 2.64092 8.21048 2.58899 8.60491C2.51976 9.1308 2.66227 9.66266 2.98518 10.0835C3.13256 10.2756 3.3397 10.437 3.66119 10.639C4.1338 10.936 4.43789 11.4419 4.43786 12C4.43783 12.5581 4.13375 13.0639 3.66118 13.3608C3.33965 13.5629 3.13248 13.7244 2.98508 13.9165C2.66217 14.3373 2.51966 14.8691 2.5889 15.395C2.64082 15.7894 2.87379 16.193 3.33973 17C3.80568 17.807 4.03865 18.2106 4.35426 18.4527C4.77508 18.7756 5.30694 18.9181 5.83284 18.8489C6.07289 18.8173 6.31632 18.7186 6.65204 18.5412C7.14547 18.2804 7.73556 18.27 8.2189 18.549C8.70224 18.8281 8.98826 19.3443 9.00911 19.9021C9.02331 20.2815 9.05957 20.5417 9.15223 20.7654C9.35522 21.2554 9.74457 21.6448 10.2346 21.8478C10.6022 22 11.0681 22 12 22C12.9319 22 13.3978 22 13.7654 21.8478C14.2554 21.6448 14.6448 21.2554 14.8477 20.7654C14.9404 20.5417 14.9767 20.2815 14.9909 19.902C15.0117 19.3443 15.2977 18.8281 15.781 18.549C16.2643 18.2699 16.8544 18.2804 17.3479 18.5412C17.6836 18.7186 17.927 18.8172 18.167 18.8488C18.6929 18.9181 19.2248 18.7756 19.6456 18.4527C19.9612 18.2105 20.1942 17.807 20.6601 16.9999C21.1261 16.1929 21.3591 15.7894 21.411 15.395C21.4802 14.8691 21.3377 14.3372 21.0148 13.9164C20.8674 13.7243 20.6602 13.5628 20.3387 13.3608C19.8662 13.0639 19.5621 12.558 19.5621 11.9999C19.5621 11.4418 19.8662 10.9361 20.3387 10.6392C20.6603 10.4371 20.8675 10.2757 21.0149 10.0835C21.3378 9.66273 21.4803 9.13087 21.4111 8.60497C21.3592 8.21055 21.1262 7.80703 20.6602 7C20.1943 6.19297 19.9613 5.78945 19.6457 5.54727C19.2249 5.22436 18.693 5.08185 18.1671 5.15109C17.9271 5.18269 17.6837 5.28136 17.3479 5.4588C16.8545 5.71959 16.2644 5.73002 15.7811 5.45096C15.2977 5.17191 15.0117 4.65566 14.9909 4.09794C14.9767 3.71848 14.9404 3.45833 14.8477 3.23463C14.6448 2.74458 14.2554 2.35523 13.7654 2.15224Z"/>
      </svg>`,E=(n,e=!0)=>{n&&(n.innerHTML=`
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
                <div id="cmd-ne-container" class="${e?"ne-hidden":""}">
                    <div id="sub-actions">
                        <select id="ne-model-select">
                        </select>
                        <div class="ne-action-btns">
                          <button id="ne-settings-btn">
                            ${k}
                          </button>
                          <button id="ne-close-btn">
                            ${I}
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
        `,d(),e||g())},L=()=>{document.removeEventListener("keydown",u);const n=document.getElementById("cmd-ne-container");n&&n.remove(),sessionStorage.removeItem("shiftKeyPressedTimeoutId"),localStorage.removeItem("neCommandPanelMessages")},P=()=>{const n=document.querySelector("#cmd-ne-panel button"),e=document.querySelector("#cmd-ne-panel input");!n||!e||(e.addEventListener("keydown",o=>{o.key==="Enter"&&(o.preventDefault(),n.focus())}),n.addEventListener("click",async()=>{const o=e.value.trim(),m=document.getElementById("ne-model-select"),i=JSON.parse(m.value||"{}");o?(o.startsWith("/")?window.open("https://www.google.com/search?q="+o.substring(1),"_blank"):T(o,i.name),e.value=""):console.log("Command input is empty. ❌"),e.focus()}))},v=(n,e,o,m="",i,l)=>{const t=document.querySelector("#conversation-ne-output");if(!t)return;const r=t.lastElementChild;if(t.classList.contains("ne-hidden")&&t.classList.remove("ne-hidden"),i&&r&&r.classList.contains(`ne-${n}`)){const f=r;f.innerHTML+=`<span ${l?"ne-think":""}>${e}</span>`,f.scrollIntoView({behavior:"smooth",block:"end"});return}const p=document.createElement("div");p.className="ne-message ne-"+n,p.innerHTML=`<strong>${n}-${m}:</strong><span>${e}</span>`,o&&(p.id=o),t.appendChild(p),t.scrollIntoView({behavior:"smooth",block:"end"})},T=async(n="",e="")=>{var C,x;const o=n.trim(),m=e.trim();if(!o||!m){console.log("Command or model is empty. ❌");return}const i=document.querySelector(".cmd-input-border");i&&i.classList.add("loading");let l=JSON.parse(localStorage.getItem("neCommandPanelMessages")||"[]");l.push({role:"user",content:o}),v("user",o,"ne-user-message","👤");const t=await fetch("http://localhost:11434/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:m,messages:l,stream:!0})}),r=(C=t==null?void 0:t.body)==null?void 0:C.getReader();if(!r){console.log("Failed to get reader from response body. ❌");return}const p=new TextDecoder;let f="";for(;;){const{done:N,value:M}=await r.read();if(N)break;const O=p.decode(M,{stream:!0});let h=sessionStorage.getItem("neCommandPanelThinking")==="true";for(const w of O.trim().split(`
`)){if(!w)continue;const b=((x=JSON.parse(w).message)==null?void 0:x.content)||"";b.includes("<think>")&&(h=!0,sessionStorage.setItem("neCommandPanelThinking","true")),b.includes("</think>")&&(h=!1,sessionStorage.setItem("neCommandPanelThinking","false")),h=sessionStorage.getItem("neCommandPanelThinking")==="true",f+=b,v("assistant",b,"ne-assistant-message","🤖",!0,h)}}i&&i.classList.remove("loading"),l.push({role:"assistant",content:f}),localStorage.setItem("neCommandPanelMessages",JSON.stringify(l))};return{render:E,unload:L}})();if(location.hostname.includes("localhost")||location.hostname.includes("127.0.0.1"))window.addEventListener("DOMContentLoaded",()=>{console.log("NECommandPanel: DOMContentLoaded event fired, command panel is ready to use. 🔥🔥🔥"),sessionStorage.setItem("neCommandPanelInitialized","true");const d=document.getElementById("app");d&&c.render(d,!1)}),window.addEventListener("beforeunload",()=>{console.log("NECommandPanel: Unloading command panel 🔥🔥🔥"),sessionStorage.removeItem("neCommandPanelInitialized"),c.unload()});else{const d=document.createElement("div");c.render(d),document.body.appendChild(d),console.log("NECommandPanel initialized and ready to use. 🔥🔥🔥"),window.addEventListener("beforeunload",()=>{console.log("NECommandPanel: Unloading command panel 🔥🔥🔥"),sessionStorage.removeItem("neCommandPanelInitialized"),c.unload()})}sessionStorage.setItem("neCommandPanelInitialized","true")}
