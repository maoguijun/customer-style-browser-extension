let page = document.getElementById("buttonDiv");
page.addEventListener("click", handleButtonClick);

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
        console.log('关闭菜单---');
        removeKeyDownListener();
        // contextMenuElement.style.display = 'none';
    } else {
        contextMenuElement.style.display = 'inline-block';
        addKeyDownListener();
    }
}

