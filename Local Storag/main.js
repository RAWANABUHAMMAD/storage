

function displayUserInfo() {

    const username = localStorage.getItem("username") || "Guest";
    document.getElementById("usernameDisplay").textContent =`Welcome ,${username} `;
}

window.onload = function() {
    displayUserInfo(); 
    initializeToDoList(); 
};

function initializeToDoList() {
    let taskInput = document.getElementById("taskinput");
    let addBtn = document.getElementById("addTask");
    let taskList = document.getElementById("taskList");
    let deleteAllBtn = document.getElementById("deleteAllBtn");
    let selectAll = document.getElementById("selectAll");

    addBtn.addEventListener("click", addTask);
    taskInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            addTask();
        }
    });
    deleteAllBtn.addEventListener("click", deleteAll);
    selectAll.addEventListener("click", selectAllTasks);

    function addTask() {
        const inputTask = taskInput.value.trim();

        if (inputTask === "") {
            alert("Please enter a task.");
            return;
        }

        deleteAllBtn.removeAttribute("disabled");

        const listItem = document.createElement("li");
        const inputSpan = document.createElement("span");
        const completedBtn = document.createElement("button");
        const deleteBtn = document.createElement("button");
        const editBtn = document.createElement("button");
        const checkbox = document.createElement("input");

        checkbox.setAttribute("type", "checkbox");
        completedBtn.textContent = "Complete";
        deleteBtn.textContent = "Delete";
        editBtn.textContent = "Edit";

        completedBtn.classList.add("btn", "btn-success", "me-2");
        deleteBtn.classList.add("btn", "btn-danger", "me-2");
        editBtn.classList.add("btn", "btn-warning", "me-2");
        listItem.classList.add("mb-3");

        inputSpan.textContent = inputTask;

        completedBtn.addEventListener("click", () => toggleComplete(inputSpan));
        deleteBtn.addEventListener("click", () => deleteTask(listItem));
        editBtn.addEventListener("click", () => editTask(listItem));

        listItem.appendChild(checkbox);
        listItem.appendChild(inputSpan);
        listItem.appendChild(completedBtn);
        listItem.appendChild(editBtn);
        listItem.appendChild(deleteBtn);

        taskList.appendChild(listItem);
        taskInput.value = "";

        if (taskList.childElementCount > 0) {
            deleteAllBtn.removeAttribute("disabled");
        }
    }

    function toggleComplete(task) {
        task.classList.toggle("completed");
    }

    function deleteTask(task) {
        task.remove();
        if (taskList.childElementCount === 0) {
            deleteAllBtn.setAttribute("disabled", "true");
        }
    }

    function editTask(task) {
        const oldText = task.querySelector("span").innerText;
        taskInput.value = oldText;
        task.remove();
        if (taskList.childElementCount === 0) {
            deleteAllBtn.setAttribute("disabled", "true");
        }
    }

    function deleteAll() {
        const allTasks = document.querySelectorAll("#taskList li input[type='checkbox']:checked");
        allTasks.forEach((checkbox) => checkbox.closest("li").remove());
        if (taskList.childElementCount === 0) {
            deleteAllBtn.setAttribute("disabled", "true");
        }
    }

    function selectAllTasks() {
        const allTasks = document.querySelectorAll("#taskList li input[type='checkbox']");
        allTasks.forEach((checkbox) => {
            checkbox.checked = true;
        });
    }
}

  
