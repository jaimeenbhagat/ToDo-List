document.getElementById("add-task-button").addEventListener("click", addTask);
document.getElementById("new-task").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        addTask();
    }
});

window.onload = loadTasks;

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        addTaskToDOM(task.text, task.completed);
    });
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll(".task-item").forEach(taskItem => {
        tasks.push({
            text: taskItem.querySelector("span").textContent,
            completed: taskItem.querySelector("span").classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    const taskInput = document.getElementById("new-task");
    const taskText = taskInput.value.trim();
    
    if (taskText === "") return;
    
    addTaskToDOM(taskText);
    saveTasks();
    taskInput.value = "";
}

function addTaskToDOM(taskText, completed = false) {



    const taskItem = document.createElement("li");
    taskItem.className = "task-item";
    const taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;
    taskItem.appendChild(taskSpan);
    if (completed) {
        taskSpan.classList.add("completed");
    }
    

    
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.className = "edit";
    editButton.onclick = () => editTask(taskItem);
    taskItem.appendChild(editButton);
    
    const completeButton = document.createElement("button");
    completeButton.textContent = "Complete";
    completeButton.className = "complete";
    completeButton.onclick = () => completeTask(taskSpan);
    taskItem.appendChild(completeButton);
    
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = () => {
        taskItem.remove();
        saveTasks();
    };
    taskItem.appendChild(deleteButton);
    
    document.getElementById("task-list").appendChild(taskItem);
}

function editTask(taskItem) {
    const taskSpan = taskItem.querySelector("span");
    const newTaskText = prompt("Edit task:", taskSpan.textContent);
    if (newTaskText) {
        taskSpan.textContent = newTaskText.trim();
        saveTasks();
    }
}

function completeTask(taskItem) {
    taskItem.classList.toggle("completed");
    saveTasks();
}
