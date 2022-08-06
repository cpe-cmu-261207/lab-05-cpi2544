const inputAdd = document.getElementById("input-add-todo");
const todoCtn = document.getElementById("todo-container");

inputAdd.onkeyup = (event) => {
  if (event.key !== "Enter") return;
  if (inputAdd.value === "") {
    alert("Todo cannot be empty");
  } else {
    addTodo(inputAdd.value, false);
    saveTodo();
    inputAdd.value = "";
  }
};

function addTodo(title, completed) {
  //create a div that holds todo title, done button, delete button
  const div = document.createElement("div");
  div.className = "border-bottom p-1 py-2 fs-2 d-flex";

  //create span for showing title
  const span = document.createElement("span");
  span.innerText = title;
  span.style.textDecoration = completed ? "line-through" : "";
  span.className = "me-3";

  //create done button
  const doneBtn = document.createElement("button");
  doneBtn.innerText = "Done";
  doneBtn.className = "btn btn-success me-2";

  doneBtn.style.display = "none";
  div.onmouseover = () => {
    doneBtn.style.display = "";
    deleteBtn.style.display = "";
  };

  doneBtn.onclick = () => {
    completed = !completed;
    span.style.textDecoration = completed ? "line-through" : "";
    saveTodo();
  };

  //create delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.className = "btn btn-danger";

  deleteBtn.style.display = "none";

  div.onmouseout = () => {
    doneBtn.style.display = "none";
    deleteBtn.style.display = "none";
  };

  deleteBtn.onclick = () => {
    todoCtn.removeChild(div);
    saveTodo();
  };

  //your code here
  div.appendChild(span);
  div.appendChild(doneBtn);
  div.appendChild(deleteBtn);
  todoCtn.prepend(div);

  //append todo to HTML...
  //define buttons event...
}

function saveTodo() {
  const data = [];
  for (const todoDiv of todoCtn.children) {
    const todoObj = {};
    todoObj.title = todoDiv.children[0].innerText;
    todoObj.completed =
      todoDiv.children[0].style.textDecoration === "line-through";
    data.push(todoObj);
  }
  localStorage.setItem("key1", JSON.stringify(data));
}

function loadTodo() {
  const data = JSON.parse(localStorage.getItem("key1"));
  for (const load of data.reverse()) {
    addTodo(load.title, load.completed);
  }
}

loadTodo();
