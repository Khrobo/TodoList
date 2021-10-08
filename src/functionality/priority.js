import { projectArray } from "./todolist";
import { TodoProjects } from "./todolist";
import { saveTodoList, saveListChecks, saveRemovedLists, saveRemovedProjects } from "./storage";

const circles = document.querySelectorAll(".fa-circle");
const times = document.querySelectorAll(".fa-times");
let savedName;

const circleShader = event => {
    const listBtn = document.querySelectorAll(".list-btn");
    const findElement = event.target.parentElement.parentElement.querySelector(".start").querySelector(".task-name").innerText;
    
    event.target.classList.toggle("green");
    for (let k = 0; k < projectArray.length; k++) {
        for (let j = 0; j < listBtn.length; j++) {
            if (listBtn[j].style.background == "grey" && 
            listBtn[j].value == projectArray[k].title && 
            findElement == projectArray[k].task && !(projectArray[k].check)) {
                projectArray[k].check = true;
                saveTodoList();
                saveListChecks(findElement);
                return;
            } else if (listBtn[j].style.background == "grey" &&
            listBtn[j].value == projectArray[k].title && 
            findElement == projectArray[k].task && projectArray[k].check == true) {
                projectArray[k].check = false;
                saveTodoList();
                saveListChecks(findElement);
                return;
            }
        }
    }
}
const removeTask = event => {
    const findElement = event.target.parentElement.parentElement.querySelector(".start").querySelector(".task-name").innerText;
    const todoList = document.querySelectorAll(".todo-list");
    const items = document.querySelectorAll(".list-item");
    const counts = [];
    
    for (let i = 0; i < items.length; i++) {
        const itemText = event.target.parentElement.parentElement.querySelector(".start").querySelector("p").innerText
        
        if (items[i].parentElement.id == "Today" && items[i].querySelector(".start").querySelector("p").innerText == itemText) {
            items[i].remove();
        } else if (items[i].parentElement.id == "Upcoming") items[i].remove();
        
    }
    event.target.parentElement.parentElement.remove();
    
    for (let i = 0; i < projectArray.length; i++) {
        if (projectArray[i].task == findElement) {
            const findIndex = projectArray.indexOf(projectArray[i]);
                
            projectArray.splice(findIndex, 1);
            saveTodoList();
            saveRemovedLists(findElement);
        }
    }
    for (let j = 0; j < todoList.length; j++) {
        if (todoList[j].id == document.querySelector(".list-head").innerText && todoList[j].hasChildNodes()) {
            counts.push(todoList[j]);

            for (let i = 0; i < counts.length; i++) {
                if (counts[i].childNodes.length == 1) {
                    savedName = counts[i].id;
                    return
                }
            }
        } else if (counts.length == 0 && savedName) {
            const addProject = new TodoProjects(savedName);

            projectArray.push(addProject);
            for (let i = 0; i < projectArray.length; i++) {
                if (!projectArray[i].title && !projectArray[i].task) {
                    const index = projectArray.indexOf(projectArray[i])
        
                    projectArray.splice(index, 1)
                    saveTodoList();
                }
            }
            saveTodoList();
            return
        } 
    }
}

const removeProject = event => {
    const findProject = event.target.parentElement.parentElement.className;
    const todoLists = document.querySelectorAll(".todo-list");
    const items = document.querySelectorAll(".list-item");
    const header = document.querySelector(".list-head");
    const projectCounts = [];
    let projectNums;
    
    for (let i = 0; i < projectArray.length; i++) {
        if (projectArray[i].title == findProject) {
            projectCounts.push(projectArray[i]);
            projectNums = projectCounts.length;
        }
    }
    for (let i = 0; i < projectArray.length; i++) {
        if (projectArray[i].title == findProject && header.innerText == findProject) {
            const findIndex = projectArray.indexOf(projectArray[i]);

            for (let k = 0; k < items.length; k++) {
                if (items[k].parentElement.id == "Today" && items[k].querySelector(".start").querySelector("p").innerText == projectArray[i].task) {
                    items[k].remove()
                } else if (items[k].parentElement.id == "Upcoming") items[k].remove()
            }
            for (let j = 0; j < todoLists.length; j++) {
                if (todoLists[j].id == findProject) todoLists[j].remove()
            }
                    
            event.target.parentElement.remove();
            projectArray.splice(findIndex, projectNums);

            saveTodoList();
            saveRemovedProjects(findProject);
            document.querySelector(".list-head").innerText = "";
        }
    }
}

circles.forEach(e => e.addEventListener("click", circleShader)) 
times.forEach(e => e.addEventListener("click", removeTask)) 

export { removeTask, circleShader, removeProject, circles, times }
