const circles = document.querySelectorAll(".fa-circle");
const times = document.querySelectorAll(".fa-times");

const circleShader = event => {
    event.target.classList.toggle("green")
}
const removeTask = event => {
    event.target.parentElement.parentElement.remove()
}

circles.forEach(e => e.addEventListener("click", circleShader)) // ADD SAVES
times.forEach(e => e.addEventListener("click", removeTask)) // ADD SAVES


export { removeTask, circleShader, circles, times }
