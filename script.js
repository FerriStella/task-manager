const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
const counter = document.getElementById("counter");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function updateCounter() {

  const total = tasks.length;

  const completed = tasks.filter(function (task) {
    return task.concluida;
  }).length;

  const pending = total - completed;

  counter.textContent = 
    `Total: ${total} | Concluídas: ${completed} | Pendentes: ${pending}`;

}

function createTask(task) {
  const newTask = document.createElement("li");

  const deleteButton = document.createElement("button");

  const editButton = document.createElement("button");

  deleteButton.classList.add("delete-btn");

  editButton.classList.add("edit-btn");

  const taskSpan = document.createElement("span");

  const checkBox = document.createElement("input");

checkBox.type = "checkbox";

  taskSpan.textContent = task.texto;

if (task.concluida) {
  taskSpan.classList.add("completed");
  checkBox.checked = true;
}

  newTask.appendChild(checkBox);

  newTask.appendChild(taskSpan);

  checkBox.addEventListener("change", function () {

  task.concluida = checkBox.checked;

  taskSpan.classList.toggle("completed");

  localStorage.setItem("tasks", JSON.stringify(tasks));

  updateCounter();

});

  deleteButton.textContent = "Excluir";

  editButton.textContent = "Editar";

  editButton.addEventListener("click", function (event) {
  event.stopPropagation();

  const newText = prompt("Edite sua tarefa:", task.texto);

  if (newText === null || newText.trim() === "") {
  return;
}

  task.texto = newText.trim();

  taskSpan.textContent = task.texto;

  localStorage.setItem("tasks", JSON.stringify(tasks));
});

  deleteButton.addEventListener("click", function (event) {
  event.stopPropagation();

  tasks = tasks.filter(function (item) {
  return item !== task;
});

  localStorage.setItem("tasks", JSON.stringify(tasks));

  newTask.remove();

  updateCounter();
});

  newTask.appendChild(editButton);

  newTask.appendChild(deleteButton);

  taskList.appendChild(newTask);
}

tasks.forEach(function (task) {
  createTask(task);
});
updateCounter();

addButton.addEventListener("click", function () {
  const taskText = taskInput.value;

  if (taskText.trim() === "") {
  return;
}

  tasks.push({
  texto: taskText.trim(),
  concluida: false
});
  localStorage.setItem("tasks", JSON.stringify(tasks));

  createTask(tasks[tasks.length - 1]);

  updateCounter();

  taskInput.value = "";
});

taskInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addButton.click();
  }
});
