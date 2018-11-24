chrome.browserAction.onClicked.addListener(() => {
    chrome.windows.getAll({}, (windows) => {
        var focusedWindow = windows.filter((w) => w.focused)[0];

        chrome.tabs.query({}, (tabs) => {
            var pinnedTabs = tabs.filter((t) => t.pinned && t.windowId != focusedWindow.id);
            var tabIds = tabs.filter((t) => t.windowId != focusedWindow.id).map(t => t.id);
            chrome.tabs.move(tabIds, { windowId: focusedWindow.id, index: -1 });
            pinnedTabs.forEach((t) => chrome.tabs.update(t.id, { pinned: true }));
        });
    })
});