// CSS for the dark theme
const darkThemeCSS = `
  * {
    background-color: #121212 !important;
    color: #ffffff !important;
    border-color: #333333 !important;
  }
`;

// Toggles the dark theme
function toggleDarkMode(enable) {
  const existingStyle = document.getElementById("dark-theme-style");
  if (enable) {
    if (!existingStyle) {
      const style = document.createElement("style");
      style.id = "dark-theme-style";
      style.textContent = darkThemeCSS;
      document.head.appendChild(style);
    }
  } else {
    if (existingStyle) existingStyle.remove();
  }
}

// On script load, fetch the stored state and apply it
chrome.storage.sync.get(["darkModeEnabled"], (data) => {
  toggleDarkMode(data.darkModeEnabled || false);
});

// Listen for toggle messages from popup
chrome.runtime.onMessage.addListener((request) => {
  if (request.action === "toggleDarkMode") {
    toggleDarkMode(request.enabled);
  }
});
