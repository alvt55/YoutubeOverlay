

//listen for clicks on Open Side Panel button
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: 'openSidePanel',
      title: 'Open side panel',
      contexts: ['all']
    });
  });

  
  // Listen for clicks on the extension icon
chrome.action.onClicked.addListener((tab) => {
    chrome.sidePanel.isOpen((isOpen) => {
        if (isOpen) {
            chrome.sidePanel.close(); // Close if already open
        } else {
            chrome.sidePanel.open(); // Open the sidebar if closed
        }
    });
});
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === 'openSidePanel') {
      // This will open the panel in all the pages on the current window.
      chrome.sidePanel.open({ windowId: tab.windowId });
    }
  });