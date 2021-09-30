import { TodoProjects, projectArray } from "./todolist";
import { projectForm, taskForm, taskInput, domLists, dateAdd, dateTime } from "./events"
import { circleShader, removeTask, removeProject } from "./priority";
import { savedProjects, saveListTasks, saveTodoList, saveAddedProject } from "./storage";
import { format, isEqual, isValid, isFuture } from "date-fns";

let tasks;

window.addEventListener("load", () => {
    const savedLists = JSON.parse(window.localStorage.getItem("todo"));
    
    for (let list in savedLists) {
        const filtered = savedLists.filter(item => item.title == savedLists[list].title)
        const filteredLength = savedLists.filter(item => item.title == savedLists[list].title).length
        const filteredIndex = filtered[1]

        addSavedLists(savedLists[list].title, savedLists[list].task, savedLists[list].date, savedLists[list].check, savedLists[list]);
            
        
        // ADD FILTERED LIST AND ADD THE LIST ITEM INTO THE PROJECT
        if (filtered.length > 1) {
            console.log(filtered.length, filtered)
            console.log(filteredIndex)
            
            // USE SPLICE TO REMOVE THE ITEMS savedLists.splice(filteredIndex, filteredLength)
        }
        

        projectArray.push(savedLists[list]);
    }
    
    console.log("SAVES", savedLists);
    console.log("PROJECTS", projectArray)
})

function addProjects(item) { 
    const div = document.createElement("div");
    const btn = document.createElement("button");
    const i = document.createElement("i");
    const iTimes = document.createElement("i")
    const divProject = document.createElement("div");
    const todoItem = new TodoProjects(item.value);
    
    if (item.value == "") {
        alert("Enter a valid name!");
        return;
    }
            
    div.className = `${item.value}`;
    document.querySelector(".project-btns").appendChild(div);
    btn.className = "btn list-btn project-btn";
    btn.value = `${item.value}`;
    i.className = "fas fa-list";
    iTimes.className = "fas fa-times";
    btn.innerText = `${item.value}`;
    document.querySelector(".project-btns").prepend(document.querySelector(".garden-project"), div)
    div.appendChild(btn);
    btn.append(i, iTimes);
    btn.prepend(i, btn.value, iTimes);
    btn.lastChild.remove();
    
    divProject.id = `${item.value}`;
    divProject.className = `${item.value} todo-list`;
    document.querySelector(".list-form").appendChild(divProject);
    document.querySelector(".list-form").prepend(document.querySelector(".list-head"), divProject)

    item.value = "";
    projectForm.style.display = "none";
    
    projectArray.push(todoItem)

    saveTodoList();
    saveAddedProject()

    console.log("ARRAY TEST", projectArray)

    iTimes.addEventListener("click", removeProject);
    btn.addEventListener("click", domLists);
}

function taskLocater() {
    const header = document.querySelector(".list-head");
    const todoList = document.querySelectorAll(".todo-list");
    const dateBtn = document.createElement("button");

    for (let j = 0; j < todoList.length; j++) { 
        if (todoList[j].id == header.innerText) {
            addTasks(taskInput, todoList[j], dateBtn);
        }
    }
}

function addTasks(item, locate, time) { 
    const divList = document.createElement("div");
    const p = document.createElement("p");
    const iCircle = document.createElement("i");
    const iTimes = document.createElement("i");
    const startDiv = document.createElement("div");
    const endDiv = document.createElement("div");
    const newProject = new TodoProjects(undefined, undefined);
    const listBtn = document.querySelectorAll(".list-btn");

    if (item.value == "") {
        return;
    }
    
    divList.className = "list-item items";
    startDiv.className = "start";
    endDiv.className = "end";
    
    locate.appendChild(divList);
    divList.appendChild(p);
    divList.append(startDiv, endDiv);
    
    time.classList.add("date-time");
    startDiv.append(iCircle, p);
    endDiv.append(time, iTimes);

    iCircle.className = `far fa-circle`;
    iTimes.className = `fas fa-times`;

    p.innerText = item.value;
    p.className = "task-name";
    time.innerText = "Date";

    document.querySelector(".date-input").value = "";
    tasks = item.value;
    time.value = false;
    item.value = "";
    taskForm.style.display = "none";
    time.addEventListener("click", dateAdd);
    iCircle.addEventListener("click", circleShader);
    iTimes.addEventListener("click", removeTask);
    
    projectArray.push(newProject);
    
    for (let i = 0; i < projectArray.length; i++) {
        for (let j = 0; j < listBtn.length; j++) {
            if (listBtn[j].style.background == "grey" && projectArray[i].title == listBtn[j].value &&
            !projectArray[i].task) {
                console.log("Task added to project");
                
                projectArray[i].task = tasks;
                saveTodoList();
                saveListTasks(tasks);
                
                console.log(projectArray);
                return
            }
            console.log("Loop test")
            if (listBtn[j].style.background == "grey" && projectArray[i].title == undefined &&
            projectArray[i].task == undefined) {
                console.log("ADD NEW TASK", projectArray);
                
                projectArray[i].title = listBtn[j].value;
                projectArray[i].task = tasks;
                saveTodoList();
                saveListTasks(tasks);
                return
            }
        }
    }
    
    

    console.log("After Saved", savedProjects)
}

function dateCheck(element, savedElement) {
    const today = format(new Date(), "MMM-dd-yyyy");
    const todayElement = document.getElementById("Today");
    const upcomingElement = document.getElementById("Upcoming");
    
    if (element) {
        if (isValid(new Date(element.innerText))) {
            const dateItem = element.parentElement.parentElement;
            if (isEqual(new Date(today), new Date(element.innerText))) {
                console.log("TODAY EQUAL?", dateItem)
                addDatedTasks(todayElement, dateItem, upcomingElement);
            }
            if (isFuture(new Date(element.innerText))) {
                addDatedTasks(upcomingElement, dateItem, todayElement);
                
            }
        }
    }
    if (savedElement) {
        if (isValid(new Date(savedElement.innerText)) && savedElement) {
            if (isEqual(new Date(today), new Date(savedElement.innerText))) {
                console.log("Saved Equal")
                addLoadedDates(todayElement, savedElement);
            }
            if (isFuture(new Date(savedElement.innerText))) {
                addLoadedDates(upcomingElement, savedElement);
            }
        }
    }
}

function addDatedTasks(locate, element, locateCopy) {
    const divList = document.createElement("div");
    const p = document.createElement("p");
    const iCircle = document.createElement("i");
    const iTimes = document.createElement("i");
    const startDiv = document.createElement("div");
    const endDiv = document.createElement("div");
    const dateBtn = document.createElement("button");
    const listBtn = document.querySelectorAll(".list-btn");
    const today = format(new Date(), "MMM-dd-yyyy");

    divList.className = "list-item items";
    startDiv.className = "start";
    endDiv.className = "end";
    
    tasks = element.querySelector("p").innerText;
    p.innerText = `${tasks}`;
    dateBtn.innerText = format(dateTime, "MMM-dd-yyyy");
    
    divList.appendChild(p);
    divList.append(startDiv, endDiv);
    
    for (let i = 0; i < projectArray.length; i++) {
        for (let j = 0; j < listBtn.length; j++) {
            if (listBtn[j].style.background == "grey" && 
                listBtn[j].value == projectArray[i].title &&
                element.querySelector(".start").querySelector(".task-name").innerText == 
                projectArray[i].task) {
                console.log("Date added to project");
                projectArray[i].date = dateBtn.innerText;
                console.log(projectArray);
            }
        }
    }

    saveTodoList() 
    
    dateBtn.classList.add("date-time");
    startDiv.append(iCircle, p);
    endDiv.append(dateBtn, iTimes);

    iCircle.className = `far fa-circle`;
    iTimes.className = `fas fa-times`;
    console.log("Find copied", dateBtn.parentElement.parentElement.querySelector(".start"), locateCopy.children[0])
    locate.append(divList);
    for (let i = 0; locateCopy.childNodes.length; i++) {
        console.log("Children", locateCopy.childNodes, tasks)
        if (isEqual(new Date(today), new Date(dateBtn.innerText))) {
            console.log("Check UPCOMING DELETE", locateCopy.childNodes[i])
            if (locateCopy.childNodes[i].querySelector(".start").querySelector("p").innerText == tasks) {
                locateCopy.childNodes[i].remove()
            } else return
            
        }
        if (isFuture(new Date(dateBtn.innerText))) {
            console.log("Check TODAY DELETE", locateCopy.childNodes[i])
            if (locateCopy.childNodes[i].querySelector(".start").querySelector("p").innerText == tasks) {
                locateCopy.childNodes[i].remove();
            } else return
        }
    }
    tasks = "";
}

function addLoadedDates(locate, dateElement) {
    const divList = document.createElement("div");
    const p = document.createElement("p");
    const iCircle = document.createElement("i");
    const iTimes = document.createElement("i");
    const startDiv = document.createElement("div");
    const endDiv = document.createElement("div");
    const dateBtn = document.createElement("button");

    divList.className = "list-item items";
    startDiv.className = "start";
    endDiv.className = "end";
    
    console.log("DATE ELEMENT", dateElement)
    tasks = dateElement.parentElement.parentElement.querySelector(".start").querySelector("p").innerText;
    p.innerText = `${tasks}`;
    dateBtn.innerText = format(new Date(dateElement.innerText), "MMM-dd-yyyy");

    divList.appendChild(p);
    divList.append(startDiv, endDiv);
    startDiv.append(iCircle, p);
    endDiv.append(dateBtn, iTimes);
    
    dateBtn.classList.add("date-time");
    iCircle.className = `far fa-circle`;
    iTimes.className = `fas fa-times`;
    locate.append(divList);
    tasks = "";
}

function addSavedLists(title, task, time, check, listItem) {
    const divProject = document.createElement("div");
    const div = document.createElement("div");
    const divList = document.createElement("div");
    const btn = document.createElement("button")
    const p = document.createElement("p");
    const i = document.createElement("i");
    const iCircle = document.createElement("i");
    const iTimes = document.createElement("i");
    const timesProject = document.createElement("i");
    const startDiv = document.createElement("div");
    const endDiv = document.createElement("div");
    const dateBtn = document.createElement("button");
    const listForm = document.querySelector(".list-form");
    const projectBtns = document.querySelector(".project-btns");
    const singleProjects = document.querySelectorAll(".project-btn");
    const savedLists = JSON.parse(window.localStorage.getItem("todo"));

    // Project Button
    div.className = `${title}`; //PROJECT TITLE BTN DIV
    if (div.className != title) return
    projectBtns.appendChild(div); 
    btn.className = "btn list-btn project-btn";
    btn.value = `${title}`; // PROJECT TITLE
    i.className = "fas fa-list";
    timesProject.className = "fas fa-times"
    btn.innerText = `${title}`; // PROJECT TITLE
    projectBtns.prepend(document.querySelector(".garden-project"), div)

    div.appendChild(btn);
    btn.append(i, timesProject);
    btn.prepend(i, btn.value, timesProject);
    btn.lastChild.remove();
    
    // Task classes
    divList.className = "list-item items";
    startDiv.className = "start";
    endDiv.className = "end";
    
    listForm.appendChild(divProject);
    divList.appendChild(p);
    divList.append(startDiv, endDiv);
    startDiv.append(iCircle, p);
    endDiv.append(dateBtn, iTimes);
    
    dateBtn.classList.add("date-time");
    iCircle.className = `far fa-circle`;
    iTimes.className = `fas fa-times`;

    // Project Form here
    for (let i = 0; i < listForm.children.length; i++) {
        for (let j = 0; j < projectBtns.children.length; j++) {
            for (let k = 0; k < singleProjects.length; k++) {
                const filtered = savedLists.filter(item => item.title == listItem.title)

                if (title != listForm.children[i].id) {
                    divProject.id = `${title}` // PROJECT TITLE, DIV PROJECT IS IN LIST FORM
                    divProject.className = `${title} todo-list`; 
                } else if (!listForm.children[i].hasChildNodes()) {
                    listForm.children[i].remove(); 
                    divProject.style.display = "none";
                    listForm.appendChild(divProject);
                    divProject.append(divList);
                }
                if (!projectBtns.children[j].hasChildNodes()) projectBtns.children[j].remove();
                if (projectBtns.children[j] != null && singleProjects[k].value == filtered[0].title && singleProjects[k].value != "Inbox") {
                    singleProjects[k].remove();
                }
                if (projectBtns.children[j].className == "Inbox") projectBtns.children[j].remove()
                if (projectBtns.children[j].className == undefined) projectBtns.children[j].remove()
            }
        }
    }
    
    listForm.prepend(document.querySelector(".list-head"), divProject);
    listForm.querySelector("#Inbox").style.display = "block";
    
    p.innerText = task;
    p.className = "task-name";
    
    if (task == undefined) divList.remove()
    if (time == undefined) dateBtn.innerText = "Date";
    else if (time != undefined) {
        const dateText = new Date(time);
        
        dateBtn.innerText = format(dateText, "MMM-dd-yyyy")
        dateCheck(undefined, dateBtn) 
    }
    if (p.innerText == task && check == true) iCircle.classList.toggle("green")
    else if (p.innerText == task && check == false) iCircle.classList.remove("green")
    
    btn.addEventListener("click", domLists);
    iCircle.addEventListener("click", circleShader);
    iTimes.addEventListener("click", removeTask);
    timesProject.addEventListener("click", removeProject);
    dateBtn.addEventListener("click", dateAdd);
}

export { taskLocater, addProjects, dateCheck }
