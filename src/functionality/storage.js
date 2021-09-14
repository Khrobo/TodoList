import { projectArray } from "./todolist";

const savedProjects = []; 



function saveTodoList() {
    window.localStorage.setItem("todo", JSON.stringify(projectArray));
}

function saveListTasks() {
    const savedList = JSON.parse(window.localStorage.getItem("todo"));

    for (let list in savedList) {
        if (!savedProjects[list]) {
            savedProjects.push(savedList[list])
        }
        console.log(savedProjects);
        console.log(savedProjects[list])
    }
}

function saveListDates(item, btn) {
    const savedList = JSON.parse(window.localStorage.getItem("todo"));

    for (let list in savedList) {
        if (savedProjects[list] && item.querySelector(".start").querySelector(".task-name").innerText ==
        savedProjects[list].task) {
            console.log("Date Changed")
            savedProjects[list].date = btn.innerText
        }
        console.log(savedProjects);
        console.log(savedProjects[list])
    }
}

function saveListChecks(element) {
    for (let list in savedProjects) {
        if (savedProjects[list] && element == savedProjects[list].task &&
        !(savedProjects[list].check)) {
            savedProjects[list].check = true;
            console.log("Saved Checks", savedProjects[list])
            console.log("Check all", savedProjects)
        } else if (savedProjects[list] && element == savedProjects[list].task &&
        savedProjects[list].check == true) {
            savedProjects[list].check = false;
            console.log("Saved checks false", savedProjects[list])
            console.log("Check all false", savedProjects);
        }
    }
}

function saveRemovedLists(element) {
    for (let list in savedProjects) {
        if (savedProjects[list].task == element) {
            const findIndex = savedProjects.indexOf(savedProjects[list]);

            savedProjects.splice(findIndex, 1);
            console.log("Saved spliced array", savedProjects)
        }
    }
}

export { savedProjects, saveListTasks, saveListDates, saveTodoList, saveListChecks, saveRemovedLists }
