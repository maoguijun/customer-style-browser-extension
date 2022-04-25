// import cssProperties from './assets/cssproperties';
let page = document.getElementById("buttonDiv");
// page.addEventListener("click", handleButtonClick);
const inputDom = document.querySelector('.input');
inputDom.addEventListener("input", (e) => { 
    console.log('e.target.value   ',e.target.value,e.target.value.trim())
    if(e.target.value.indexOf(':') < 0)
    {
        getRecommandResult(e.target.value.trim())
    }else{
        getAttributeValue(e.target.value.replace(/\s*/g,'').split(':')[0])
    }
 })
const colorAttr = 'AliceBlue|AntiqueWhite|Aqua|Aquamarine|Azure|Beige|Bisque|Black|BlanchedAlmond|Blue|BlueViolet|Brown|BurlyWood|CadetBlue|Chartreuse|Chocolate|Coral|CornflowerBlue|Cornsilk|Crimson|Cyan|DarkBlue|DarkCyan|DarkGoldenRod|DarkGray|DarkGreen|DarkKhaki|DarkMagenta|DarkOliveGreen|DarkOrange|DarkOrchid|DarkRed|DarkSalmon|DarkSeaGreen|DarkSlateBlue|DarkSlateGray|DarkTurquoise|DarkViolet|DeepPink|DeepSkyBlue|DimGray|DodgerBlue|FireBrick|FloralWhite|ForestGreen|Fuchsia|Gainsboro|GhostWhite|Gold|GoldenRod|Gray|Green|GreenYellow|HoneyDew|HotPink|IndianRed |Indigo  |Ivory|Khaki|Lavender|LavenderBlush|LawnGreen|LemonChiffon|LightBlue|LightCoral|LightCyan|LightGoldenRodYellow|LightGray|LightGreen|LightPink|LightSalmon|LightSeaGreen|LightSkyBlue|LightSlateGray|LightSteelBlue|LightYellow|Lime|LimeGreen|Linen|Magenta|Maroon|MediumAquaMarine|MediumBlue|MediumOrchid|MediumPurple|MediumSeaGreen|MediumSlateBlue|MediumSpringGreen|MediumTurquoise|MediumVioletRed|MidnightBlue|MintCream|MistyRose|Moccasin|NavajoWhite|Navy|OldLace|Olive|OliveDrab|Orange|OrangeRed|Orchid|PaleGoldenRod|PaleGreen|PaleTurquoise|PaleVioletRed|PapayaWhip|PeachPuff|Peru|Pink|Plum|PowderBlue|Purple|Red|RosyBrown|RoyalBlue|SaddleBrown|Salmon|SandyBrown|SeaGreen|SeaShell|Sienna|Silver|SkyBlue|SlateBlue|SlateGray|Snow|SpringGreen|SteelBlue|Tan|Teal|Thistle|Tomato|Turquoise|Violet|Wheat|White|WhiteSmoke|Yellow|YellowGreen'.split('|');
const lengthAttr = '0%|0ch|0cm|0em|0ex|0fr|0in|0mm|0px|0pt|0px|0rem|0vh|0vw|0vmin|0vmax'.split('|');
/**
 * TODOs：
 * down----- 1.添加滚动定位功能 保证选中的item永远在视野范围内----down
 * down----- 2. 获取当前行中的输入，动态判断应该匹配的是csskey还是value，value匹配时忽略前方空格，仅从冒号前匹配\w，
 *    最好能获取左右键和点击的位置光标前方，不然推荐值可能有误（没法处理就移动或者点击后直接关掉context menu）----down
 * down----- 3. 菜单点击其他区域自动关闭，hover时动态添加active，点中后取值----down;
 * down----- 4. 输入时的模糊搜索，比如输入wi 匹配 width ..... white-space 按照 wi_,w_i,_w_i_来推荐，value同理,
 *    最后用一个set去存要显示的推荐内容，避免重复----down
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
            e.preventDefault();
            e.stopImmediatePropagation();
            current = document.querySelector('.active');
            let pre = document.querySelector('.active').previousElementSibling;
            if (!!pre) {
                current.classList.toggle("active");
                pre.classList.toggle("active");
                if (pre.offsetTop > 129) {
                    contextMenuElement.scrollTo({
                        top: pre.offsetTop - 129,
                        left: 0,
                        behavior: "auto"
                    })
                } else {
                    contextMenuElement.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "auto"
                    })
                }
            } else {
                current.classList.toggle("active");
                let last = document.getElementById("contextMenuContainer").lastElementChild;
                last && last.classList.toggle("active");
                contextMenuElement.scrollTo({
                    top: last.offsetTop,
                    left: 0,
                    behavior: "auto"
                })
            }
            break;
        case 'ArrowDown':
            console.log('press down');
            e.preventDefault();
            e.stopImmediatePropagation();
            current = document.querySelector('.active');
            let next = document.querySelector('.active').nextElementSibling;
            if (!!next) {
                current.classList.toggle("active");
                next.classList.toggle("active");
                console.log('distance from top :', next.offsetTop)
                if (next.offsetTop > 129) {
                    contextMenuElement.scrollTo({
                        top: next.offsetTop - 129,
                        left: 0,
                        behavior: "auto"
                    })
                }
            } else {
                current.classList.toggle("active");
                let first = document.getElementById("contextMenuContainer").firstElementChild;
                first && first.classList.toggle("active");
                contextMenuElement.scrollTo({
                    top: first.offsetTop,
                    left: 0,
                    behavior: "auto"
                })
            }
            break;
        case 'Tab':
            e.preventDefault();
            e.stopImmediatePropagation();
            if(inputDom.value.includes(":")){
                inputDom.value += (document.querySelector('.active').innerText + ';');
            }else{
                inputDom.value = inputDom.value.replace(inputDom.value.trim(),document.querySelector('.active').innerText)
            }
            console.log('selected content  : ', document.querySelector('.active').innerText);
            contextMenuElement.remove();
            removeKeyDownListener();
            removeClickListener();
            break;
        case 'Enter':
            e.preventDefault();
            e.stopImmediatePropagation();
            if(inputDom.value.includes(":")){
                inputDom.value += (document.querySelector('.active').innerText + ';');
            }else{
                inputDom.value = inputDom.value.replace(inputDom.value.trim(),document.querySelector('.active').innerText)
            }
            console.log('selected content  : ', document.querySelector('.active').innerText);
            contextMenuElement.remove();
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
    document.getElementById("contextMenuContainer").remove();
}

function cancleMenuClick(event) {
    event.stopPropagation();
    if (event.path[2].id !== 'contextMenuContainer' && event.target.id !== 'buttonDiv') {
        document.getElementById("contextMenuContainer") && document.getElementById("contextMenuContainer").remove();
        console.log('close menu')
    }
}

function addClickListener() {
    // 点击其他区域消除菜单
    document.addEventListener('click', cancleMenuClick);
    document.querySelectorAll('#contextMenuContainer > div').forEach(item => {
        item.addEventListener('click', clickListener);
    });
}

function removeClickListener() {
    document.querySelectorAll('#contextMenuContainer > div').forEach(item => {
        item.removeEventListener('click', clickListener);
    });
    document.removeEventListener('click', cancleMenuClick);
}

function addKeyDownListener() {
    window.addEventListener("keydown", keyLinstener)
}

function removeKeyDownListener() {
    window.removeEventListener('keydown', keyLinstener);
}

function showContextMenu(recommandList) {
    let count = 0;
    const contextMenuElement = document.getElementById("contextMenuContainer");
    if (!contextMenuElement) {
        const contextMenu = document.createElement("div");
        contextMenu.id = 'contextMenuContainer';
        contextMenu.style['overflowY'] = 'scroll';

        recommandList.forEach((item) => {
            const itemDom = document.createElement("div");
            if (count === 0) {
                itemDom.className = 'active';
            }
            itemDom.innerText = item;
            contextMenu.appendChild(itemDom);
            count++;
        })
        document.body.appendChild(contextMenu)
        addKeyDownListener();
        addClickListener();
    } else {
        contextMenuElement.remove();
        removeClickListener();
        removeKeyDownListener();
        showContextMenu(recommandList);
    }
}

function getRecommandResult(value) {
    const contextMenuElement = document.getElementById("contextMenuContainer");
    if (value.length === 0) {
        contextMenuElement && contextMenuElement.remove();
        removeClickListener();
        removeKeyDownListener();
        return;
    }
    let a = value; //用户输入的字符串
    let str_exact = ['^' + a, ''].join('.*'); //转化成正则格式的字符串
    let str_mid = '^' + [...a, ''].join('.*'); //转化成正则格式的字符串
    let str_casual = ['', ...a, ''].join('.*'); //转化成正则格式的字符串
    const temp = [];
    const temp1 = [];
    const temp2 = [];
    let reg_exact = new RegExp(str_exact);
    let reg_mid = new RegExp(str_mid);
    let reg_casual = new RegExp(str_casual);
    for (let key in cssProperties) {
        if (reg_exact.test(key)) {
            if (!temp.includes(key)) {
                // console.log('%c 111', 'background:rgba(250,50,50,0.5)', key, cssProperties[key], str_exact);
                temp.push(key)
            }
        }
        if (reg_mid.test(key)) {
            if (!temp.includes(key)) {
                // console.log('%c 222', 'background:rgba(50,250,50,0.5)', key, cssProperties[key], str_mid);
                temp1.push(key)
            }
        }
        if (reg_casual.test(key)) {
            if (!temp1.includes(key)) {
                // console.log('%c 333', 'background:rgba(50,50,250,0.5)', key, cssProperties[key], str_casual);
                temp2.push(key)
            }
        }
    }
    let recommandRes = new Set(temp.concat(temp1).concat(temp2));
    console.log('res============', recommandRes);
    if (recommandRes.size === 0) {
        contextMenuElement && contextMenuElement.remove();
        removeClickListener();
        removeKeyDownListener();
        return;
    }
    showContextMenu(recommandRes);
}

function getAttributeValue(attr){
    let count = 0;
    let LENGTH_POS = cssProperties[attr].indexOf('length');
    let COLOR_POS = cssProperties[attr].indexOf('color');
    const contextMenuElement = document.getElementById("contextMenuContainer");
    if(cssProperties[attr].length < 1 || !attr){
        contextMenuElement && contextMenuElement.remove();
        removeClickListener();
        removeKeyDownListener();
        return;
    }
    if ( LENGTH_POS != -1){
        cssProperties[attr].splice(LENGTH_POS,1,...lengthAttr);
    }
    if ( COLOR_POS != -1){
        cssProperties[attr].splice(COLOR_POS,1,...colorAttr);
    }
    if (!contextMenuElement) {
        const contextMenu = document.createElement("div");
        contextMenu.id = 'contextMenuContainer';
        contextMenu.style['overflowY'] = 'scroll';

        for(let item of cssProperties[attr]){
            const itemDom = document.createElement("div");
            if (count === 0) {
                itemDom.className = 'active';
            }
            itemDom.innerText = item;
            contextMenu.appendChild(itemDom);
            count++;
        }
        document.body.appendChild(contextMenu)
        addKeyDownListener();
        addClickListener();
    } else {
        contextMenuElement.remove();
        removeClickListener();
        removeKeyDownListener();
        getAttributeValue(attr);
    }

}