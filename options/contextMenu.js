let page = document.getElementById("buttonDiv");
page.addEventListener("click", handleButtonClick);
const color = 'AliceBlue|AntiqueWhite|Aqua|Aquamarine|Azure|Beige|Bisque|Black|BlanchedAlmond|Blue|BlueViolet|Brown|BurlyWood|CadetBlue|Chartreuse|Chocolate|Coral|CornflowerBlue|Cornsilk|Crimson|Cyan|DarkBlue|DarkCyan|DarkGoldenRod|DarkGray|DarkGreen|DarkKhaki|DarkMagenta|DarkOliveGreen|DarkOrange|DarkOrchid|DarkRed|DarkSalmon|DarkSeaGreen|DarkSlateBlue|DarkSlateGray|DarkTurquoise|DarkViolet|DeepPink|DeepSkyBlue|DimGray|DodgerBlue|FireBrick|FloralWhite|ForestGreen|Fuchsia|Gainsboro|GhostWhite|Gold|GoldenRod|Gray|Green|GreenYellow|HoneyDew|HotPink|IndianRed |Indigo  |Ivory|Khaki|Lavender|LavenderBlush|LawnGreen|LemonChiffon|LightBlue|LightCoral|LightCyan|LightGoldenRodYellow|LightGray|LightGreen|LightPink|LightSalmon|LightSeaGreen|LightSkyBlue|LightSlateGray|LightSteelBlue|LightYellow|Lime|LimeGreen|Linen|Magenta|Maroon|MediumAquaMarine|MediumBlue|MediumOrchid|MediumPurple|MediumSeaGreen|MediumSlateBlue|MediumSpringGreen|MediumTurquoise|MediumVioletRed|MidnightBlue|MintCream|MistyRose|Moccasin|NavajoWhite|Navy|OldLace|Olive|OliveDrab|Orange|OrangeRed|Orchid|PaleGoldenRod|PaleGreen|PaleTurquoise|PaleVioletRed|PapayaWhip|PeachPuff|Peru|Pink|Plum|PowderBlue|Purple|Red|RosyBrown|RoyalBlue|SaddleBrown|Salmon|SandyBrown|SeaGreen|SeaShell|Sienna|Silver|SkyBlue|SlateBlue|SlateGray|Snow|SpringGreen|SteelBlue|Tan|Teal|Thistle|Tomato|Turquoise|Violet|Wheat|White|WhiteSmoke|Yellow|YellowGreen';
const length = '0%|0ch|0cm|0em|0ex|0fr|0in|0mm|0px|0pt|0px|0rem|0vh|0vw|0vmin|0vmax';
/**
 * TODOs：
 * 1. 添加滚动定位功能 保证选中的item永远在视野范围内
 * 2. 获取当前行中的输入，动态判断应该匹配的是csskey还是value，value匹配时忽略前方空格，仅从冒号前匹配\w，
 *    最好能获取左右键和点击的位置光标前方，不然推荐值可能有误（没法处理就移动或者点击后直接关掉context menu）
 * down----- 3. 菜单点击其他区域自动关闭，hover时动态添加active，点中后取值----down;
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
            removeClickListener();
            break;
        case 'Enter':
            e.preventDefault();
            e.stopImmediatePropagation();
            console.log('selected content  : ', document.querySelector('.active').innerText);
            contextMenuElement.style.display = 'none';
            removeKeyDownListener();
            removeClickListener();
            break;
        default:
            break;
    }
}
function clickListener(e) {
    console.log(e.target.innerText);
    removeClickListener();
    document.getElementById("contextMenuContainer").style.display = 'none';
}
function addClickListener() {
    // 点击其他区域消除菜单
    document.addEventListener('click',(e) => {
        if (e.path[2].id !== 'contextMenuContainer' && e.target.id !== 'buttonDiv') {
            document.getElementById("contextMenuContainer").style.display = 'none';
        }
    });
    document.querySelectorAll('#contextMenuContainer > div').forEach(item => {
        item.addEventListener('click', clickListener);
    });
}
function removeClickListener() {
    document.querySelectorAll('#contextMenuContainer > div').forEach(item => {
        item.addEventListener('click', clickListener);
    });
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
        addClickListener();
    } else if (contextMenuElement.style.display !== 'none') {
        console.log('close context menu');
        removeKeyDownListener();
        removeClickListener()
        contextMenuElement.style.display = 'none';
    } else {
        contextMenuElement.style.display = 'inline-block';
        addClickListener();
        addKeyDownListener();
    }
}

