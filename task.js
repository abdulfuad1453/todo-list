// declaration
const sortBtn = document.querySelector('.sorting-container button');
const sortIcon = document.querySelector('.sorting-container button i');
const sortContainer = document.querySelector('.sorting-container')
const btn = document.querySelector('.btn');
const plusBtn = document.querySelector('.plus-btn');
const taskInside = document.querySelector('.task-inside');
const inputField = document.querySelector('.input-field');
const taskInput = document.querySelector('.task-input');
const firstremovebtn = document.querySelector('.x-btn');
// hover of input field remove btn
const purpleIcon = () => {
    firstremovebtn.setAttribute("src", "images/xBtn-purple.svg")
}
const whiteIcon = () => {
    firstremovebtn.setAttribute("src", "images/x-btn.svg")
}
firstremovebtn.addEventListener("mouseenter", purpleIcon);
firstremovebtn.addEventListener("mouseleave", whiteIcon);

// Hover of Add button
const changeEnter = () => {
    plusBtn.style.backgroundColor = "#AA68FE";
    btn.style.backgroundColor = "#9953F1"
}
const changeLeave = () => {
    plusBtn.style.backgroundColor = "#9953F1";
    btn.style.backgroundColor = "#833AE0"
}
btn.addEventListener("mouseenter", changeEnter);
btn.addEventListener("mouseleave", changeLeave);

// area where all tasks are 
const area = document.createElement('div');
taskInside.insertBefore(area, inputField);
// initial area display is none
area.style.display = "none";
area.classList.add('area');
// areaAndİnput where task list and input filed are
let areaAndİnput = document.createElement('div');
taskInside.insertBefore(areaAndİnput, btn);
areaAndİnput.classList.add('areaAndİnput');
areaAndİnput.appendChild(inputField);
areaAndİnput.insertBefore(area, inputField);
// initial areaAndİnput display is none
areaAndİnput.style.border = "none"
// Actions
// when enter key entered events
document.addEventListener('keyup', (event) => {
    if (event.keyCode == 13) {
        areaAndİnput.style.border = "none";
        const createListElement = (task) => {
            // Each task
            let newDiv = document.createElement('div');
            // Attribute and class for drag and drop
            newDiv.setAttribute("draggable", "true")
            newDiv.classList.add('task', "draggable");
            // In task div there are remove button and p tag that contains task text
            let newxBtn = document.createElement('img');
            newxBtn.setAttribute("src", "images/x-btn.svg");
            newxBtn.classList.add('x-btn', 'btns');
            let newPelement = document.createElement('p');
            newDiv.appendChild(newPelement);
            newDiv.appendChild(newxBtn);
            newPelement.textContent = task;
            newPelement.classList.add('text');
            return newDiv
        };
        if (taskInput.value == "") {
            alert("Task daxil edin")
        }
        if (taskInput.value != "") {
            area.style.display = "block";
            area.style.border = "1px solid #c4c4c4";
            area.style.borderRadius = "10px"
            area.appendChild(createListElement(taskInput.value));
        }
        // for scroll
        if (area.offsetHeight >= 200) {
            area.style.overflowY = "scroll";
            area.scrollTop = area.scrollHeight;
        }
        if (area.offsetHeight < 200) {
            area.style.overflow = "hidden";
        }
        if (area.childNodes.length == 1) {
            area.style.border = "1px solid #c4c4c4";
            area.style.borderRadius = "10px"
        }
        // hover for each task remove button
        const areaRemoveBtns = document.querySelectorAll('.x-btn');
        areaRemoveBtns.forEach((item) => {
            // hover
            const purpleIcon = () => {
                item.setAttribute("src", "images/xBtn-purple.svg")
            }
            const whiteIcon = () => {
                item.setAttribute("src", "images/x-btn.svg")
            }
            const removeItem = () => {
                if (item.parentNode.classList.contains('input-field')) {
                    item.parentNode.style.display = "none";
                }
                else if (area.childNodes.length > 0) {
                    item.parentNode.remove();
                }
                if (area.childNodes.length == 0) {
                    area.style.display = "none";
                    areaAndİnput.style.border = "none"
                    inputField.style.display = "block";
                    inputField.style.border = "1px solid #c4c4c4";
                    inputField.style.borderRadius = "10px";
                }
                if (area.offsetHeight < 200) {
                    area.style.overflow = "hidden";
                }
            }
            // remove task action
            item.addEventListener("mouseenter", purpleIcon);
            item.addEventListener("mouseleave", whiteIcon);
            item.addEventListener('click', removeItem)
        })
        // Drag and drop
        const allTaskarea = document.querySelectorAll('.area');
        const allTasks = document.querySelectorAll(".task");

        allTasks.forEach(draggable => {
            draggable.addEventListener('dragstart', () => {
                draggable.classList.add('dragging')
            })

            draggable.addEventListener('dragend', () => {
                draggable.classList.remove('dragging')
            })
        })

        allTaskarea.forEach(container => {
            container.addEventListener('dragover', e => {
                e.preventDefault()
                const afterElement = getDragAfterElement(container, e.clientY)
                const draggable = document.querySelector('.dragging')
                if (afterElement == null) {
                    container.appendChild(draggable)
                } else {
                    container.insertBefore(draggable, afterElement)
                }
            })
        })

        function getDragAfterElement(container, y) {
            const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

            return draggableElements.reduce((closest, child) => {
                const box = child.getBoundingClientRect()
                const offset = y - box.top - box.height / 2
                if (offset < 0 && offset > closest.offset) {
                    return { offset: offset, element: child }
                } else {
                    return closest
                }
            }, { offset: Number.NEGATIVE_INFINITY }).element
        }
        // after enter input field not display
        inputField.style.display = "none";
        taskInput.value = "";
    }
});
// add Button on click input field display property
const inputDisplay = () => {
    inputField.style.display = "block";
    inputField.style.border = "none";
    area.style.border = "none";
    areaAndİnput.style.border = "1px solid #c4c4c4";
    inputField.style.marginTop = "0px";
    taskInput.focus();
    area.scrollTop = area.scrollHeight;
    if (area.offsetHeight >= 200) {
        console.log(area.offsetHeight)
        console.log(">=200")
        inputField.querySelector('.x-btn').style.right = "2.188rem"
    }
    else if (area.offsetHeight < 200) {
        console.log(area.offsetHeight)
        console.log("<200")
        inputField.querySelector('.x-btn').style.right = "1.563rem"
    }
}
btn.addEventListener("click", inputDisplay);
// when sort button clicked event
const sortFunction = () => {
    let i, switching, b, shouldSwitch, dir, switchcount = 0;
    switching = true;
    dir = "asc";
    while (switching) {
        switching = false;
        b = document.querySelectorAll('.task');
        for (i = 0; i < (b.length - 1); i++) {
            shouldSwitch = false;
            if (dir == "asc") {
                if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (b[i].innerHTML.toLowerCase() < b[i + 1].innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            b[i].parentNode.insertBefore(b[i + 1], b[i]);
            switching = true;
            switchcount++;
        } else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}
sortBtn.addEventListener('click', sortFunction);
const changeIcon = () => {
    if (click >= 1) {
        sortIcon.classList.toggle("fa-arrow-up-wide-short");
    }
    click++;
}
let click = 0;
sortBtn.addEventListener('click', changeIcon);








