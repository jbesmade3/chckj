document.addEventListener("DOMContentLoaded",()=>{
    document.getElementById("copier").addEventListener("click",async()=>{
        const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
        const response = await chrome.tabs.sendMessage(tab.id, {signal: "Copy"});
    })

    document.getElementById("pastier").addEventListener("click",async()=>{
        const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
        const response = await chrome.tabs.sendMessage(tab.id, {signal: "Paste"});
    })
    chrome.runtime.onMessage.addListener(async (e)=>{
        console.log(e)
    })
})