let basecss = `:root {
    --light-primary-color: #0f8fd1 !important;
    --dark-primary-color: #0e3e85 !important;
}

.ed-menu-eleve-seul .active .ed-menu-image-wrapper div::before {
    background: linear-gradient(rgba(13,79,147,0), var(--dark-primary-color)) !important;
}`;

chrome.tabs.onUpdated.addListener(function(tabId, chageInfo, tab) {
    if (tab.url.startsWith('https://www.ecoledirecte.com') && tab.status == "complete") {
        let css = basecss;
        chrome.storage.local.get(null, function (obj){
            console.log(JSON.stringify(obj));
            if (!obj.active) return;
            
            if (obj.light) css = css.replace('#0f8fd1', obj.light);
            if (obj.dark) css = css.replace('#0e3e85', obj.dark);

            chrome.tabs.insertCSS(tabId, {code: css });
        });
    }
})