import { TodoProjects, TodoTasks } from "./todolist";
import { saveProject } from "./render";

const storage = [];
const object = {
    name: "Food"
}

const title = window.localStorage.setItem("objects", JSON.stringify(object))
const getName = window.localStorage.getItem("objects")

console.log(getName)

export {storage}