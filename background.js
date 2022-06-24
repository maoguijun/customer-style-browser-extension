/*
 * @Author: maoguijun
 * @Date: 2022-04-07 14:14:04
 * @LastEditors: maoguijun
 * @LastEditTime: 2022-06-24 15:46:41
 * @FilePath: \customer-style-browser-extension\background.js
 */
// background.js

chrome.runtime.onInstalled.addListener(() => {
  // chrome.storage.sync.set({ customStyle });
  console.log(12222);
  // chrome.storage.sync.get("customStyle", ({ customStyle }) => {
  //   console.log(13, customStyle);
  //   const customStyleElement = document.getElementById("customStyleElement");
  //   if (!customStyleElement) {
  //     const style = document.createElement("style");
  //     style.id = "customStyleElement";
  //     style.innerHTML = customStyle;
  //     document.body.appendChild(style);
  //   } else {
  //     customStyleElement.innerHTML = customStyle;
  //   }
  // });
});
const onActivated = async () => {
  // chrome.storage.sync.set({ customStyle });
  console.log(12222);
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setCustomStyle,
  });
};

chrome.tabs.onActivated.addListener(onActivated);
chrome.tabs.onUpdated.addListener(onActivated);

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
