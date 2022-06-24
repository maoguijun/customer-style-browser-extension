/*
 * @Author: maoguijun
 * @Date: 2022-04-07 14:18:46
 * @LastEditors: maoguijun
 * @LastEditTime: 2022-06-24 15:16:04
 * @FilePath: \customer-style-browser-extension\popup\popup.js
 */
// When the button is clicked, inject setPageBackgroundColor into current page

const editerChange = async (editor) => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const customStyle = editor.getValue();
  chrome.storage.sync.set({ customStyle });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setCustomStyle,
  });
};

// The body of this function will be executed as a content script inside the
// current page
function setCustomStyle() {
  chrome.storage.sync.get("customStyle", ({ customStyle }) => {
    const customStyleElement = document.getElementById("customStyleElement");
    if (!customStyleElement) {
      const style = document.createElement("style");
      style.id = "customStyleElement";
      style.innerHTML = customStyle;
      document.body.appendChild(style);
    } else {
      customStyleElement.innerHTML = customStyle;
    }
  });
}
