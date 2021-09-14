import { TodoProjects, projectArray } from "./todolist";
import { projectForm, taskForm, taskInput, domLists, dateAdd, dateTime } from "./events"
import { circleShader, removeTask } from "./priority";
import { savedProjects, saveListTasks, saveListDates, saveTodoList } from "./storage";
import { format, isEqual, isValid, isFuture } from "date-fns";

let tasks;

window.addEventListener("load", () => {
    const inboxTodo = new TodoProjects("Inbox", "Pantry");
    const gardenTodo = new TodoProjects("Garden", "Water the plants");
    const gardenTodo2 = new TodoProjects("Garden", "Plant Flowers");

    projectArray.push(inboxTodo, gardenTodo, gardenTodo2);
    addSavedLists() // FINSIH ADDITION
})

function addProjects(item) { // ADD PROJECT SAVES
    const div = document.createElement("div");
    const btn = document.createElement("button");
    const i = document.createElement("i");
    const divProject = document.createElement("div");
    
    if (item.value == "") {
        alert("Enter a valid name!");
        return;
    }
            
    div.className = `${item.value}`;
    document.querySelector(".project-btns").appendChild(div);
    btn.className = "btn list-btn";
    btn.value = `${item.value}`;
    i.className = "fas fa-list";
    btn.innerText = `${item.value}`;
    document.querySelector(".project-btns").prepend(document.querySelector(".garden-project"), div)
    div.appendChild(btn);
    btn.appendChild(i);
    btn.prepend(i);
    
    divProject.id = `${item.value}`;
    divProject.className = `${item.value} todo-list`;
    document.querySelector(".list-form").appendChild(divProject);
    document.querySelector(".list-form").prepend(document.querySelector(".list-head"), divProject)

    item.value = "";
    projectForm.style.display = "none";
    
    btn.addEventListener("click", domLists);
}

function taskLocater() {
    const header = document.querySelector(".list-head");
    const todoList = document.querySelectorAll(".todo-list");
    const dateBtn = document.createElement("button");

    for (let j = 0; j < todoList.length; j++) { // WORKS
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
    const newProject = new TodoProjects(undefined, item.value);
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
            if (listBtn[j].style.background == "grey" && !(projectArray[i].task) &&
            projectArray[i].title == undefined) {
                console.log("Task added to project");
                projectArray[i].title = listBtn[j].value;
                projectArray[i].task = tasks;
                console.log(projectArray);
            } else if (listBtn[j].style.background == "grey" && projectArray[i].task == projectArray[i].task &&
            projectArray[i].title == undefined) {
                projectArray[i].title = listBtn[j].value;
                console.log("ADD NEW TASK", projectArray);
            }
        }
    }
    
    saveTodoList()
    saveListTasks()

    console.log("After Saved", savedProjects)
}

function dateCheck(element) {
    const today = format(new Date(), "MMM-dd-yyyy");
    
    if (isValid(new Date(element.innerText))) {
        const dateItem = element.parentElement.parentElement;
        const todayElement = document.getElementById("Today");
        const upcomingElement = document.getElementById("Upcoming");

        if (isEqual(new Date(today), new Date(element.innerText))) {   
            addDatedTasks(todayElement, dateItem);
        }
        if (isFuture(new Date(element.innerText))) {
            addDatedTasks(upcomingElement, dateItem);
        }
    }
}

function addDatedTasks(locate, element) {
    const divList = document.createElement("div");
    const p = document.createElement("p");
    const iCircle = document.createElement("i");
    const iTimes = document.createElement("i");
    const startDiv = document.createElement("div");
    const endDiv = document.createElement("div");
    const dateBtn = document.createElement("button");
    const listBtn = document.querySelectorAll(".list-btn");

    divList.className = "list-item items";
    divList.dataset.name = `${tasks}`;
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
    saveListDates(element, dateBtn)

    dateBtn.classList.add("date-time");
    startDiv.append(iCircle, p);
    endDiv.append(dateBtn, iTimes);

    iCircle.className = `far fa-circle`;
    iTimes.className = `fas fa-times`;
    locate.append(divList);
    tasks = "";
}

function addSavedLists() {
    const divList = document.createElement("div");
    const divProject = document.createElement("div");
    const p = document.createElement("p");
    const iCircle = document.createElement("i");
    const iTimes = document.createElement("i");
    const startDiv = document.createElement("div");
    const endDiv = document.createElement("div");
    const dateBtn = document.createElement("button");
    const listBtn = document.querySelectorAll(".list-btn");
    const savedLists = JSON.parse(window.localStorage.getItem("todo"))

    divList.className = "list-item items";
    startDiv.className = "start";
    endDiv.className = "end";
    
    console.log(savedLists)
}

export { taskLocater, addProjects, dateCheck }
