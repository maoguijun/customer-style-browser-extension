/*
 * @Author: maoguijun
 * @Date: 2022-04-07 20:07:32
 * @LastEditors: zaric
 * @LastEditTime: 2022-05-01 00:44:04
 * @FilePath: \customer-style-browser-extension\popup\editorCus.js
 */

const editor = ace.edit("customStyle");
editor.session.setMode("ace/mode/css");
editor.setFontSize(18);
editor.setHighlightActiveLine(true);
try {
  editor.on("change", (e) => {
    const rowData = editor.session.getLine(e.end.row);
    console.log("e====", e);
    console.log("rowData====", rowData);

    if (rowData.indexOf(":") < 0) {
      getRecommandResult(rowData.trim());
    } else {
      if (
        rowData.indexOf(":") < rowData.length - 1 &&
        rowData[rowData.indexOf(":") + 1] != ";"
      ) {
        console.log(
          "there is some word inside ':' and ';' ,so cancel recommending"
        );
        setTimeout(() => {
          editor.focus();
        }, 50);
      } else {
        getAttributeValue(rowData.replace(/\s*/g, "").split(":")[0]);
      }
    }
    // editerChange(editor);
  });

  // 弹出输入框的时候，自动填充样式代码
  // chrome.storage.sync.get("customStyle", ({ customStyle }) => {
  //   // editor.value = customStyle;
  //   editor.setValue(customStyle);
  // });
} catch (error) {}
