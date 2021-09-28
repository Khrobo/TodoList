import { projectArray } from "./todolist";

const savedProjects = []; 

function saveTodoList() {
    window.localStorage.setItem("todo", JSON.stringify(projectArray));
}

function saveAddedProject() {
    const savedList = JSON.parse(window.localStorage.getItem("todo"));

    for (let list in savedList) {
        if (!savedProjects[list]) savedProjects.push(savedList[list]);
    }
}

function saveListTasks(taskName) {
    const savedList = JSON.parse(window.localStorage.getItem("todo"));

    for (let list in savedList) {
        if (savedProjects[list] && !savedList[list].task) savedProjects[list].task = taskName;
    }
}

function saveListChecks(element) {
    for (let list in savedProjects) {
        if (savedProjects[list] && element == savedProjects[list].task &&
        !(savedProjects[list].check)) {
            savedProjects[list].check = true;
        } else if (savedProjects[list] && element == savedProjects[list].task &&
        savedProjects[list].check == true) {
            savedProjects[list].check = false;
        }
    }
}

function saveRemovedLists(element) {
    for (let list in savedProjects) {
        if (savedProjects[list].task == element) {
            const findIndex = savedProjects.indexOf(savedProjects[list]);

            savedProjects.splice(findIndex, 1);
        }
    }
}

function saveRemovedProjects(targetProject) {
    for(let list in savedProjects) {
        if (savedProjects[list].title == targetProject) {
            const findIndex = savedProjects.indexOf(savedProjects[list]);

            savedProjects.splice(findIndex, 1);
        }
    }
}

export { savedProjects, saveListTasks, saveTodoList, saveListChecks, saveRemovedLists, saveRemovedProjects, saveAddedProject }
