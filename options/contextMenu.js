let page = document.getElementById("buttonDiv");
page.addEventListener("click", handleButtonClick);
/**
 * TODOs：
 * 1. 添加滚动定位功能 保证选中的item永远在视野范围内
 * 2. 获取当前行中的输入，动态判断应该匹配的是csskey还是value，value匹配时忽略前方空格，仅从冒号前匹配\w
 * 3. 菜单点击其他区域自动关闭，hover时动态添加active，点中后取值
 * 4. 输入时的模糊搜索，比如输入wi 匹配 width ..... white-space 按照 wi_,w_i,_w_i_来推荐，value同理,
 *    最后用一个set去存要显示的推荐内容，避免重复
 * 5. 菜单显示位置跟随输入时光标位置
 * 6. 跟随窗口大小适配菜单栏大小，最小不小于12px的字体，如果窗口太小装不下，用一个confirm提示一次，
 *    是否再次显示存在chrome.storage中，并在插件右上角显示感叹号可以再次打开这个confirm
 */
function keyLinstener(e) {
    const contextMenuElement = document.getElementById("contextMenuContainer");
    let current;
    switch (e.key) {
        case 'ArrowUp':
            console.log('press up');
            current = document.querySelector('.active');
            let pre = document.querySelector('.active').previousElementSibling;
            if (!!pre) {
                current.classList.toggle("active");
                pre.classList.toggle("active");
            } else {
                current.classList.toggle("active");
                let last = document.getElementById("contextMenuContainer").lastElementChild;
                last && last.classList.toggle("active");
            }
            break;
        case 'ArrowDown':
            console.log('press down');
            current = document.querySelector('.active');
            let next = document.querySelector('.active').nextElementSibling;
            if (!!next) {
                current.classList.toggle("active");
                next.classList.toggle("active");
            } else {
                current.classList.toggle("active");
                let first = document.getElementById("contextMenuContainer").firstElementChild;
                first && first.classList.toggle("active");
            }
            break;
        case 'Tab':
            e.preventDefault();
            e.stopImmediatePropagation();
            console.log('selected content  : ', document.querySelector('.active').innerText);
            contextMenuElement.style.display = 'none';
            removeKeyDownListener();
            break;
        case 'Enter':
            e.preventDefault();
            e.stopImmediatePropagation();
            console.log('selected content  : ', document.querySelector('.active').innerText);
            contextMenuElement.style.display = 'none';
            removeKeyDownListener();
            break;
        default:
            break;
    }
}

function addKeyDownListener() {
    window.addEventListener("keydown", keyLinstener)
}
function removeKeyDownListener() {
    window.removeEventListener('keydown', keyLinstener);
}

function handleButtonClick() {
    const contextMenuElement = document.getElementById("contextMenuContainer");
    if (!contextMenuElement) {
        const contextMenu = document.createElement("div");
        contextMenu.id = 'contextMenuContainer';
        const item1 = document.createElement("div");
        item1.className = 'active';
        item1.innerText = 'item 1 \'s content';
        const item2 = document.createElement("div");
        item2.innerText = 'item 2 \'s content';
        const item3 = document.createElement("div");
        item3.innerText = 'item 3 \'s content';
        const item4 = document.createElement("div");
        item4.innerText = 'item 4 \'s content';
        contextMenu.appendChild(item1);
        contextMenu.appendChild(item2);
        contextMenu.appendChild(item3);
        contextMenu.appendChild(item4);
        document.body.appendChild(contextMenu)
        addKeyDownListener();
    } else if (contextMenuElement.style.display !== 'none') {
        console.log('close context menu');
        removeKeyDownListener();
        contextMenuElement.style.display = 'none';
    } else {
        contextMenuElement.style.display = 'inline-block';
        addKeyDownListener();
    }
}

