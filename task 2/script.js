document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("task-input");
  const dueDateInput = document.getElementById("due-date-input");
  const priorityInput = document.getElementById("priority-input");
  const addTaskBtn = document.getElementById("add-task-btn");
  const tasksList = document.getElementById("tasks");

  let tasks = [];

  addTaskBtn.addEventListener("click", addTask);

  function addTask() {
    const taskText = taskInput.value.trim();
    const dueDate = dueDateInput.value;
    const priority = priorityInput.value;

    if (taskText === "" || dueDate === "") {
      alert("Please enter a task and a due date");
      return;
    }

    const task = {
      text: taskText,
      dueDate: new Date(dueDate),
      priority: priority,
      completed: false,
    };

    tasks.push(task);
    tasks.sort((a, b) => a.dueDate - b.dueDate);
    renderTasks();

    taskInput.value = "";
    dueDateInput.value = "";
    priorityInput.value = "low";
  }

  function renderTasks() {
    tasksList.innerHTML = "";

    tasks.forEach((task, index) => {
      const taskItem = document.createElement("li");
      taskItem.classList.add(task.priority);
      if (task.completed) {
        taskItem.classList.add("completed");
      }

      const taskContent = document.createElement("span");
      taskContent.textContent = `${task.text} (Due: ${
        task.dueDate.toISOString().split("T")[0]
      })`;
      taskItem.appendChild(taskContent);

      const buttons = document.createElement("div");
      buttons.classList.add("buttons");

      const completeBtn = document.createElement("button");
      completeBtn.textContent = "Complete";
      completeBtn.classList.add("complete-btn");
      completeBtn.addEventListener("click", () => {
        task.completed = !task.completed;
        renderTasks();
      });

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.classList.add("delete-btn");
      deleteBtn.addEventListener("click", () => {
        tasks.splice(index, 1);
        renderTasks();
      });

      buttons.appendChild(completeBtn);
      buttons.appendChild(deleteBtn);
      taskItem.appendChild(buttons);
      tasksList.appendChild(taskItem);
    });
  }
});
