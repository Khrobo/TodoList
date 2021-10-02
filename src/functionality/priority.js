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
    const counts = [];
    
    event.target.parentElement.parentElement.remove();

    
    
    for (let i = 0; i < projectArray.length; i++) {
        
            if (projectArray[i].task == findElement) {
                const findIndex = projectArray.indexOf(projectArray[i]);
                
                
                projectArray.splice(findIndex, 1);
                saveTodoList();
                saveRemovedLists(findElement);
                console.log("Spliced array", projectArray);
                
            } 
        
    }
    for (let j = 0; j < todoList.length; j++) {
        if (todoList[j].id == document.querySelector(".list-head").innerText && todoList[j].hasChildNodes()) {
            console.log("NODES", todoList[j])
            counts.push(todoList[j])

            console.log("Counts", counts)
            for (let i = 0; i < counts.length; i++) {
                console.log("Child Nodes", counts[i].childNodes, counts.length)
                if (counts[i].childNodes.length == 1) {
                    console.log("FINALLLYYYYYY", counts[i]);
                    savedName = counts[i].id;
                    console.log(savedName)
                    return
                }
            }
        } else if (counts.length == 0) {
            console.log("WAA WAA", counts);
            const addTodo = new TodoProjects(savedName);
            // LOOK AT PROJECT AFTER YOU REMOVE THE ITEM
            projectArray.push(addTodo);
            console.log("Projector", projectArray);
            saveTodoList();
            return
        }
    }
}
const removeProject = event => {
    const findProject = event.target.parentElement.parentElement.className;
    const todoLists = document.querySelectorAll(".todo-list");

    event.target.parentElement.remove();
    for (let i = 0; i < projectArray.length; i++) {
        if (projectArray[i].title == findProject) {
            const findIndex = projectArray.indexOf(projectArray[i]);
            
            projectArray.splice(findIndex, i);
            projectArray.splice(findIndex, 1);
                
            saveTodoList();
            saveRemovedProjects(findProject);

            document.querySelector(".list-head").innerText = "";
        } 
    }
    for (let j = 0; j < todoLists.length; j++) {
        if (todoLists[j].id == findProject) todoLists[j].remove()
    }
}

circles.forEach(e => e.addEventListener("click", circleShader)) 
times.forEach(e => e.addEventListener("click", removeTask)) 

export { removeTask, circleShader, removeProject, circles, times }
