import { projectArray } from "./todolist";

const circles = document.querySelectorAll(".fa-circle");
const times = document.querySelectorAll(".fa-times");

const circleShader = event => {
    event.target.classList.toggle("green")
}
const removeTask = event => {
    event.target.parentElement.parentElement.remove();
    const findElement = event.target.parentElement.parentElement.querySelector(".start").querySelector(".task-name").innerText;

    // DELETING ITEMS THROUGH ARRAYS WORKS NOW
    
    for (let i = 0; i < projectArray.length; i++) {
        console.log(projectArray)
        if (projectArray[i].task == findElement) {
            const findIndex = projectArray.indexOf(projectArray[i])
            console.log(projectArray[i], findIndex);
            projectArray.splice(findIndex, 1);
            console.log(projectArray);
        }
    }
    
    
}

circles.forEach(e => e.addEventListener("click", circleShader)) // ADD SAVES
times.forEach(e => e.addEventListener("click", removeTask)) // ADD SAVES


export { removeTask, circleShader, circles, times }
