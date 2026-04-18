//https://www.youtube.com/watch?v=kAiX0itnonM
//https://www.youtube.com/watch?v=lfmg-EJ8gm4
//https://www.youtube.com/watch?v=xKOyDDuQSVY



// Get all the element that I need to use from the page getElementbyId
const taskInput = document.getElementById("taskInput");
const dateInput = document.getElementById("dateInput");
const priorityInput = document.getElementById("priorityInput");
const categoryInput = document.getElementById("categoryInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const progressText = document.getElementById("progressText");

// Store all tasks
let tasks = [];

// Load saved tasks when the page opens
window.onload = function () {
    const savedTasks = localStorage.getItem("plannerTasks");

    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        displayTasks();
    }
};

// Add task when button is clicked
addBtn.addEventListener("click", function () {
    const taskName = taskInput.value.trim();
    const dueDate = dateInput.value;
    const priority = priorityInput.value;
    const category = categoryInput.value;

    // Make sure the task is not empty
    if (taskName === "") {
        alert("Please enter a task.");
        return;
    }

    // Create a new task object
    const task = {
        name: taskName,
        date: dueDate,
        priority: priority,
        category: category,
        completed: false
    };

    // Add the task to the array
    tasks.push(task);

    // Save and update screen
    saveTasks();
    displayTasks();

    // Clear the form after adding
    taskInput.value = "";
    dateInput.value = "";
    priorityInput.value = "Low";
    categoryInput.value = "School";
});


// Function to show all tasks on the page
function displayTasks() {
    taskList.innerHTML = "";

    // Loop through each task
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];

        const li = document.createElement("li");
        li.classList.add("task-item");

        // Add color based on priority
        if (task.priority === "High") {
            li.classList.add("high");
        } else if (task.priority === "Medium") {
            li.classList.add("medium");
        } else {
            li.classList.add("low");
        }

        const infoDiv = document.createElement("div");
        infoDiv.classList.add("task-info");

        // If completed, add completed style
        if (task.completed) {
            infoDiv.classList.add("completed");
        }

        infoDiv.innerHTML = `
            <p><strong>${task.name}</strong></p>
            <p>Due: ${task.date || "No date set"}</p>
            <p>Priority: ${task.priority}</p>
            <p>Category: ${task.category}</p>
        `;

        const buttonDiv = document.createElement("div");
        buttonDiv.classList.add("task-buttons");

        const completeBtn = document.createElement("button");
        completeBtn.textContent = "Complete";
        completeBtn.classList.add("complete-btn");
        completeBtn.addEventListener("click", function () {
            toggleComplete(i);
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", function () {
            deleteTask(i);
        });

        buttonDiv.appendChild(completeBtn);
        buttonDiv.appendChild(deleteBtn);

        li.appendChild(infoDiv);
        li.appendChild(buttonDiv);

        taskList.appendChild(li);
    }

    updateProgress();
}

// Function to mark a task as complete or incomplete
function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    displayTasks();
}

// Function to delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    displayTasks();
}

// Save tasks into local storage
function saveTasks() {
    localStorage.setItem("plannerTasks", JSON.stringify(tasks));
}

// Update the progress text
function updateProgress() {
    let completedCount = 0;

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].completed) {
            completedCount++;
        }
    }

    progressText.textContent = `${completedCount} of ${tasks.length} tasks completed`;
}