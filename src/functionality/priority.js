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
        console.log("Parent element", items[i].parentElement)
        const itemText = event.target.parentElement.parentElement.querySelector(".start").querySelector("p").innerText
        if (items[i].parentElement.id == "Today" && items[i].querySelector(".start").querySelector("p").innerText == itemText) {
            console.log("Found it")
            items[i].remove();

        }
    }
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
        } else if (counts.length == 0 && savedName) {
            console.log("WAA WAA", counts);
            const addProject = new TodoProjects(savedName);
            // LOOK AT PROJECT AFTER YOU REMOVE THE ITEM
            projectArray.push(addProject);
            console.log("Projector", projectArray);
            saveTodoList();
            return
        } else {
            console.log("ALT works");
            const header = document.querySelector(".list-head");
            const addProject = new TodoProjects(header.innerText);

            projectArray.push(addProject)
            console.log("ALT project", projectArray);
            saveTodoList()
            return
        }
        
    }
}
const removeProject = event => {
    const findProject = event.target.parentElement.parentElement.className;
    const todoLists = document.querySelectorAll(".todo-list");
    const listBtn = document.querySelectorAll(".list-btn");
    const header = document.querySelector(".list-head");
    const projectCounts = [];
    
    // ADD FINISHING TOUCHES
    for (let i = 0; i < projectArray.length; i++) {
        for (let j = 0; j < listBtn.length; j++) {
            
            if (projectArray[i].title == findProject) {
                projectCounts.push(projectArray[i])
                console.log("Project Counts", projectCounts)
            }
           
            if (projectArray[i].title == findProject && listBtn[j].style.background == "grey" &&
            header.innerText == findProject) {
                const findIndex = projectArray.indexOf(projectArray[i]);
                
               
                for (let j = 0; j < todoLists.length; j++) {
                    if (todoLists[j].id == findProject) todoLists[j].remove()
                }
                event.target.parentElement.remove();

                
                projectArray.splice(findIndex, i);

                
                console.log("Removed project", projectArray);
                    
                saveTodoList();
                saveRemovedProjects(findProject);

                document.querySelector(".list-head").innerText = "";
                return
            } else {
                console.log("NO")

            }
        }
    }
    
}

circles.forEach(e => e.addEventListener("click", circleShader)) 
times.forEach(e => e.addEventListener("click", removeTask)) 

export { removeTask, circleShader, removeProject, circles, times }
