class TodoProjects {
    constructor(title) {
        this.title = title;
    }
}

class TodoTasks {
    constructor(task, date) {
        this.task = task;
        this.date = date;
    }
}


const projects = new TodoProjects()
const todoArray = [];
const tasks = new TodoTasks()
const taskArray = [];

export {todoArray, TodoProjects, TodoTasks, taskArray}
