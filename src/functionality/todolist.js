class TodoProjects {
    constructor(title, task, date, check) {
        this.title = title;
        this.task = task;
        this.date = date;
        this.check = check;
    }
}

class MiscTodo {
    constructor(title, task, date, check) {
        this.title = title;
        this.task = task;
        this.date = date;
        this.check = check;
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

export { TodoProjects, TodoTasks, taskArray, projectArray, miscArray, MiscTodo }
