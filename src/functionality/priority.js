import { projectArray } from "./todolist";
import { saveTodoList, saveListChecks, saveRemovedLists } from "./storage";

const circles = document.querySelectorAll(".fa-circle");
const times = document.querySelectorAll(".fa-times");

const circleShader = event => {
    const listBtn = document.querySelectorAll(".list-btn");
    const findElement = event.target.parentElement.parentElement.querySelector(".start").querySelector(".task-name").innerText;
    
    event.target.classList.toggle("green");
    saveTodoList();
    saveListChecks(findElement);

    for (let k = 0; k < projectArray.length; k++) {
        for (let j = 0; j < listBtn.length; j++) {
            if (listBtn[j].style.background == "grey" && 
            listBtn[j].value == projectArray[k].title && 
            findElement == projectArray[k].task && !(projectArray[k].check)) {
                projectArray[k].check = true;
                console.log(projectArray);
                return;
            } else if (listBtn[j].style.background == "grey" &&
            listBtn[j].value == projectArray[k].title && 
            findElement == projectArray[k].task && projectArray[k].check == true) {
                projectArray[k].check = false;
                console.log("False check", projectArray)
                return;
            }
        }
    }
}
const removeTask = event => {
    const findElement = event.target.parentElement.parentElement.querySelector(".start").querySelector(".task-name").innerText;
    
    event.target.parentElement.parentElement.remove();
    saveTodoList();
    saveRemovedLists(findElement);

    for (let i = 0; i < projectArray.length; i++) {
        if (projectArray[i].task == findElement) {
            const findIndex = projectArray.indexOf(projectArray[i]);
            
            projectArray.splice(findIndex, 1);
            console.log("Spliced array", projectArray);
            return;
        }
    } 
}

circles.forEach(e => e.addEventListener("click", circleShader)) 
times.forEach(e => e.addEventListener("click", removeTask)) 

export { removeTask, circleShader, circles, times }
