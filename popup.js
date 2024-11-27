const toggle = document.getElementById("darkModeToggle");

// Retrieve and set the toggle state on popup load
chrome.storage.sync.get(["darkModeEnabled"], (data) => {
  toggle.checked = data.darkModeEnabled || false;
});

// Add event listener for the toggle button
toggle.addEventListener("change", (event) => {
  const isEnabled = event.target.checked;

  // Save the state
  chrome.storage.sync.set({ darkModeEnabled: isEnabled });

  // Notify the content script to update the theme
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0].id) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "toggleDarkMode",
        enabled: isEnabled,
      });
    }
  });
});
