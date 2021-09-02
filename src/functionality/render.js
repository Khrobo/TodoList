import { todoArray, TodoProjects, TodoTasks, taskArray } from "./todolist";
import { projectForm, taskForm, projectInput, taskInput, domLists, dateAdd } from "./events"
import { circleShader, removeTask } from "./priority"
import { format, isEqual, isValid, isFuture} from "date-fns";

const savedProjects = [];
const savedTasks = [];


function addProjects(item) {
    const div = document.createElement("div");
    const btn = document.createElement("button");
    const i = document.createElement("i");
    const divProject = document.createElement("div");
    const project = new TodoProjects(item.value)
    
    if (item.value == "") {
        alert("Enter a valid name!");
        return;
    }
            
    div.className = `${item.value}`;
    document.querySelector(".project-btns").appendChild(div);
    btn.className = "btn list-btn"
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
    // Saves
    savedProjects.push(project)
    window.localStorage.setItem("project", JSON.stringify(savedProjects));       
    const getProject = window.localStorage.getItem("project");
    savedProjects.push(getProject)
    
    console.log("Saved project is here", savedProjects);
    btn.addEventListener("click", domLists);
}

function taskLocater() {
    const lists = document.querySelectorAll(".list-btn");
    const header = document.querySelector(".list-head");
    const todoList = document.querySelectorAll(".todo-list");
    const dateBtn = document.createElement("button");

    for (let i = 0; i < lists.length; i++) {
        
            for (let j = 0; j < todoList.length; j++) { // WORKS
                if (todoList[j].id == header.innerText) {
                    addTasks(taskInput, todoList[j], dateBtn)
                }
            }
        
    }

    
}

function addTasks(item, locate, time) { 
    const divList = document.createElement("div");
    const p = document.createElement("p");
    const iCircle = document.createElement("i");
    const iTimes = document.createElement("i");
    const startDiv = document.createElement("div");
    const endDiv = document.createElement("div")

    const task = new TodoTasks(item.value);

    if (item.value == "") {
        return;
    }
    
    divList.className = "list-item items";
    startDiv.className = "start";
    endDiv.className = "end";
    
    locate.appendChild(divList);
    divList.appendChild(p);
    divList.append(startDiv, endDiv); // ADD FINISHING ELEMENTS FOR OTHER APPENDS
    
    time.classList.add("date-time");
    startDiv.append(iCircle, p);
    endDiv.append(time, iTimes);

    iCircle.className = `far fa-circle`;
    iTimes.className = `fas fa-times`;

    p.innerText = item.value;
    p.className = "task-name";
    time.innerText = "Date";

    document.querySelector(".date-input").value = "";
    time.value = false
    item.value = "";
    taskForm.style.display = "none";
    time.addEventListener("click", dateAdd);
    iCircle.addEventListener("click", circleShader);
    iTimes.addEventListener("click", removeTask);

    taskArray.push(task); // Classes that holds the tasks and dates
    console.log(task); 
    console.log(taskArray);
}

function dateCheck(element) {
    const today = format(new Date(), "MMM-dd-yyyy");
    const timeLists = document.querySelectorAll(".time-list");

    console.log("Today Item", element)
    
        if (isValid(new Date(element.innerText))) {
            console.log("Valid started here!");
            console.log(isValid(new Date(element.innerText))) // SHOWS BOTH
            console.log(today)
                if (isEqual(new Date(today), new Date(element.innerText))) {
                    const todayItem = element.parentElement.parentElement.cloneNode(true);
                    const secondItem = element.parentElement.parentElement.cloneNode(false);
                    const listItems = document.querySelectorAll(".list-item");
                    console.log("Another test", todayItem);

                    for (let i = 0; i < listItems.length; i++) {
                        console.log(document.getElementById("Today").childNodes)
                        if (document.getElementById("Today").childNodes.length == 0) {
                            console.log("Does not exist, so add item")
                            todayItem.cloneNode(true).className = `list-item items time-list`;
                            document.getElementById("Today").appendChild(todayItem);
                            console.log("First", listItems[i].querySelector(".start").querySelector("p").innerText)
                            console.log("Middle", element.parentElement.parentElement.querySelector(".start").querySelector("p").innerText)
                            console.log("Last", todayItem.querySelector("p").innerText)
                        } else if (element.parentElement.parentElement.querySelector(".start").querySelector("p").innerText ==
                        todayItem.querySelector("p").innerText) {
                            console.log("If none are the same, then add");
                            console.log("MMiddle", element.parentElement.parentElement.querySelector(".start").querySelector("p").innerText, element.parentElement.parentElement);
                            console.log("LLast", todayItem.querySelector("p").innerText, todayItem);
                            todayItem.className = `list-item items time-list`;
                            document.getElementById("Today").appendChild(todayItem)
                        }
                    }
                    
                    
                // SAME DATES THAT ARE ALREADY HERE ARE BEING READDED
                
                }
                if (isFuture(new Date(element.innerText)) ) {
                    console.log("UPCOMING IS TRUE");
                    checkUpcomings(element);
                    
                }
        }
}

function checkTodays(item) {
    console.log("Today");
    const todayItem = item.parentElement.parentElement.cloneNode(true);

    todayItem.className = "list-item items time-list";
    document.getElementById("Today").appendChild(todayItem);
    
}

function checkUpcomings(item) {
    console.log("Upcoming");
    const upcomingItem = item.parentElement.parentElement.cloneNode(true);

    upcomingItem.className = "list-item items time-list";
    document.getElementById("Upcoming").appendChild(upcomingItem);
    
}




export { taskLocater, addProjects, dateCheck }