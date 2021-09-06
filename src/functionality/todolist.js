class TodoProjects {
    constructor(title, task, date) {
        this.title = title;
        this.task = task;
        this.date = date;
    }
}

class MiscTodo {
    constructor(title, task, date) {
        this.title = title;
        this.task = task;
        this.date = date;
    }
}

class TodoTasks {
    constructor(task, date) {
        this.task = task;
        this.date = date;
    }
}

const projectArray = [];
const taskArray = [];
const miscArray = [];

export { TodoProjects, TodoTasks, taskArray, projectArray, miscArray }
