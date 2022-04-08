/*
 * @Author: maoguijun
 * @Date: 2022-04-07 20:07:32
 * @LastEditors: maoguijun
 * @LastEditTime: 2022-04-08 10:44:04
 * @FilePath: \customer-style-browser-extension\popup\editorCus.js
 */

try {
  const editor = ace.edit("customStyle");
  editor.session.setMode("ace/mode/css");
  editor.setFontSize(18);
  editor.setHighlightActiveLine(true);
  editor.on("change", (e) => {
    editerChange(editor);
  });

  // 弹出输入框的时候，自动填充样式代码
  chrome.storage.sync.get("customStyle", ({ customStyle }) => {
    // editor.value = customStyle;
    editor.setValue(customStyle);
  });
} catch (error) {}
