const dark = document.getElementById('dark');
const light = document.getElementById('light');
const btn = document.getElementById('btn');
const reset = document.getElementById('reset');

const regex = "^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$";

chrome.storage.local.get(null, (obj) => {
    if (obj.dark) dark.value = obj.dark;
    if (obj.light) light.value = obj.light;
})

btn.addEventListener('click', () => {
    if (dark.value) {
        if ((dark.value).match(regex)) chrome.storage.local.set({"dark":dark.value});
    }
    if (light.value) {
        if ((light.value).match(regex)) chrome.storage.local.set({"light":light.value});
    }

    chrome.storage.local.set({"active": true});
})

reset.addEventListener('click', () => {
    let basicJson = {
        "active": false,
        "light": "#0f8fd1",
        "dark": "#0e3e85"
    };

    chrome.storage.local.set(basicJson);
})