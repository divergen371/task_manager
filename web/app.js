document
  .getElementById("taskForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    addTask();
  });

function fetchTasks() {
  fetch("get_tasks.php")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((tasks) => {
      const taskList = document.getElementById("taskList");
      taskList.innerHTML = "";
      tasks.forEach((task) => {
        const li = document.createElement("li");
        li.className = task.completed ? "completed" : "";

        const taskHeader = document.createElement("div");
        taskHeader.className = "task-header";

        const taskTitle = document.createElement("span");
        taskTitle.className = "task-title";
        taskTitle.textContent = task.title;

        const taskActions = document.createElement("div");
        taskActions.className = "task-actions";

        const completedCheckbox = document.createElement("input");
        completedCheckbox.type = "checkbox";
        completedCheckbox.checked = task.completed;
        completedCheckbox.addEventListener("change", () => {
          updateTask(task.id, completedCheckbox.checked);
        });

        taskActions.appendChild(completedCheckbox);
        taskHeader.appendChild(taskTitle);
        taskHeader.appendChild(taskActions);

        const taskDescription = document.createElement("p");
        taskDescription.textContent = task.description;

        li.appendChild(taskHeader);
        li.appendChild(taskDescription);
        taskList.appendChild(li);
      });
    })
    .catch((error) => {
      console.error("Error fetching tasks:", error);
      alert("Error fetching tasks: " + error.message);
    });
}

function addTask() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;

  fetch("add_task.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `title=${encodeURIComponent(title)}&description=${encodeURIComponent(
      description
    )}`,
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => {
          throw new Error(
            `HTTP error! status: ${response.status}, message: ${err.message}`
          );
        });
      }
      return response.json();
    })
    .then((result) => {
      if (result.status === "success") {
        fetchTasks();
      } else {
        throw new Error(result.message);
      }
    })
    .catch((error) => {
      console.error("Error adding task:", error);
      alert("Error adding task: " + error.message);
    });
}

function updateTask(id, completed) {
  console.log(`Updating task id=${id}, completed=${completed}`); // デバッグ用にログを追加
  fetch("update_task.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `id=${encodeURIComponent(id)}&completed=${encodeURIComponent(
      completed ? "true" : "false"
    )}`,
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => {
          throw new Error(
            `HTTP error! status: ${response.status}, message: ${err.message}`
          );
        });
      }
      return response.json();
    })
    .then((result) => {
      if (result.status !== "success") {
        throw new Error(result.message);
      }
      fetchTasks(); // タスクを更新後、再取得して表示を更新
    })
    .catch((error) => {
      console.error("Error updating task:", error);
      alert("Error updating task: " + error.message);
    });
}

fetchTasks();
