const taskInput = document.querySelector(".task-input input"),
taskBox = document.querySelector(".task-box");

let todos = JSON.parse(localStorage.getItem("todo-list"));

function showTodo() {
    let li = "";
    if(todos) {
        todos.forEach((todo, id) => {
            li += `<li class="task">
                <label for="${id}">
                    <input onclick="updateStatus(this)" type="checkbox" id="${id}">
                    <p>${todo.name}</p>
                </label>
                <div class="settings">
                    <i class="fa fa-ellipsis-h"></i>
                    <ul class="task-menu">
                        <li><i class="fa fa-pencil"></i>Edit</li>
                        <li><i class="fa fa-trash"></i>Delete</li>
                    </ul>
                </div>
            </li>`;
        });
    }
    taskBox.innerHTML = li;
}

showTodo();

function updateStatus(selectedTask) {
    let taskName = selectedTask.parentElement.lastElementChild;
    if(selectedTask.checked) {
        taskName.classList.add("checked");
    }else {
        taskName.classList.remove("checked");
    }
}

taskInput.addEventListener("keyup", e => {
    let userTask = taskInput.value.trim();

    if (e.key === "Enter" && userTask) {
        taskInput.value = "";
        let taskInfo = { name: userTask, status: "pending" };
        todos.push(taskInfo);
        localStorage.setItem("todo-list", JSON.stringify(todos));
        showTodo();
    }
});
