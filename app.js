class Task {
    constructor(id, title) {
        this.id = id;
        this.title = title;
    }
}

class TaskListPage {
    constructor() {
        this.currEditId;
    }

    startEdit(id) {
        this.currEditId = id;
        const taskInputElement = document.getElementById("taskInput");

        document.getElementById("add-btn").innerText = "Save";
        console.log(taskInputElement.value);
        console.log(document.getElementById("add-btn").innerText);
    }
    updateTaskTitle(taskId, taskTitle) {

        const taskElement = document.getElementById("task-title-" + taskId);
        taskElement.innerHTML = taskTitle;

        document.getElementById("add-btn").innerText = "Add";
        var database = firebase.database();
        database.ref('task-list/' + taskId).set({
            title: taskTitle,
        });
        document.getElementById("taskInput").value = "";
    }
    listenDelete(id) {
        document.getElementById("delete-btn-" + id).addEventListener("click", (e) => {
            // Visually remove task from HTML page 
            const taskCard = document.getElementById("task-" + id);
            taskCard.remove();

            // Remove task from database 
            var database = firebase.database();
            database.ref('task-list/' + id).remove();

        });
    }
    addTask(title) {
        var database = firebase.database();
        const newTaskRef = database.ref('task-list/').push({
            title: title,
        });
        const taskId = newTaskRef.key;
        const task = new Task(taskId, title);

        var taskListElement = document.getElementById("taskList");
        const taskCardElement = document.createElement('div');
        const taskCardBodyElement = document.createElement('div');
        const rowElement = document.createElement('row');

        const taskCard = taskListElement.appendChild(taskCardElement);
        taskCard.setAttribute("class", "card bg-light m-2");
        taskCard.setAttribute("id", "task-" + taskId);

        const taskCardBody = taskCardElement.appendChild(taskCardBodyElement);
        taskCardBody.setAttribute("class", "card-body");

        console.log(taskCardBody.id);


        const row = taskCardBodyElement.appendChild(rowElement);
        row.setAttribute("class", "row");


        row.innerHTML = `
            <div class="col-4">
                <div id="task-title-${task.id}" class="btn bg-light">${task.title}</div>
            </div>
            <div class="col-4">
                <button id="edit-btn-${taskId}" data-task-id="${task.id}" action="edit" class="btn btn-primary"> Edit </button>
            </div>
            <div class="col-4">
                <button id="delete-btn-${taskId}" data-task-id="${task.id}" action="delete" class="btn btn-danger"> Delete </button>
            </div>
    `;


        this.listenDelete(taskId);
        document.getElementById("taskInput").value = "";
    }
}


const taskPage = new TaskListPage();

document.getElementById("add-btn").addEventListener("click", (e) => {
    var taskElement = document.getElementById("taskInput");
    var taskTitle = taskElement.value;

    if (taskTitle === "") {
        alert("Please type in a task so we can add it to your list.");
    } else if (document.getElementById("add-btn").innerText === "Add") {
        taskPage.addTask(taskTitle);
    } else if (document.getElementById("add-btn").innerText === "Save") {
        taskPage.updateTaskTitle(taskPage.currEditId, taskTitle);
    }
});

document.getElementById("taskList").addEventListener("click", (e) => {
    const action = e.target.getAttribute("action");
    console.log("Data Action: ", action);
    if (action !== "edit") return;

    const taskId = e.target.getAttribute("data-task-id");
    taskPage.startEdit(taskId);
});



// Debugging Tools 
// const highP = document.getElementById("H"); 
    // // console.log(highP);
    // const mediumP = document.getElementById("M");
    // const lowP = document.getElementById("L"); 

// // Task Element 
// const taskInputElement = document.getElementById("taskInput");
// console.log(taskInputElement);
// const taskTitle =  taskInputElement.value = "Call my Dad";
// console.log(taskTitle);

// // Priority Input Element Things 
// const priorityElement = document.getElementById("prioritySelect");
// console.log(priorityElement);
// const priorityBtnElement = document.getElementById("H");
// console.log(priorityBtnElement);
// const actionP = priorityBtnElement.getAttribute("value");
// if (actionP == "H"){
//     console.log("This is a high priority item.");
// }

// // Priority Task Assignment 
// const priorityL = document.getElementById("priority-level");
// console.log(priorityL);
// console.log(priorityL.innerHTML);
// console.log(priorityL.setAttribute("class", "btn bg-warning text-white"), priorityL.innerHTML = "Medium");
// console.log(priorityL.setAttribute("class", "btn bg-success text-white"), priorityL.innerHTML = "Low" );

// // Task Element Assignment 
// const taskElement = document.getElementById("task");
// console.log(taskElement);
// console.log(taskElement.innerHTML);
// console.log(taskElement.innerHTML = "Call Jeff");

// // Edit Button Element

// const editBtnElement = document.getElementById("edit-btn");
// console.log(editBtnElement);
// const action = editBtnElement.getAttribute("action");
// if (action == "edit"){
//     console.log("Woooo let's edit some tasks!");
// }

// // Delete Button Element 

// const deleteBtnElement = document.getElementById("delete-btn");
// console.log(deleteBtnElement);
// const actionDelete = deleteBtnElement.getAttribute("action");
// if (actionDelete == "delete"){
//     console.log("Woooo let's delete some tasks!");
// }

// Adding to list 
// var i;
// for (i = 0; i < this.tasks.length; i++){
//     if (this.tasks[i].id == id){
//         this.tasks[i].title = taskInputElement.value; 

//     }
// }