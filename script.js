const textInputField = document.querySelector("#text-input-field");
const addButton = document.querySelector("#add-button");
const todosContainer = document.querySelector(".todos-container");
const toDoText = document.getElementById("#todo-Text");

// reference from YouTube:https://www.youtube.com/watch?v=Ttf3CEsEwMQ&t=551s
//local storage done with help of chatGPT
const todoItems = JSON.parse(localStorage.getItem("todoItems")) || [];

function renderTodoItems() {
  todosContainer.innerHTML = "";

  // Rendering each todo item
  todoItems.forEach((item) => {
    const todoItemContainer = document.createElement("div");
    todoItemContainer.classList.add("todo-item-container");

    todosContainer.appendChild(todoItemContainer);
    const todoText = document.createElement("p");
    todoText.id = "todo-text";
    todoText.innerText = item.text;
    todoItemContainer.appendChild(todoText);

    // creating checked button
    const checkedButton = document.createElement("button");
    const checkedImage = document.createElement("img");
    checkedImage.src = "newc.png";
    checkedButton.appendChild(checkedImage);
    todoItemContainer.appendChild(checkedButton);

    if (item.completed) {
      checkedButton.style.backgroundColor = "rgb(255, 245, 214)";
    }

    checkedButton.addEventListener("click", () => {
      const parent = checkedButton.parentElement;
      checkedButton.style.backgroundColor = "rgb(255, 245, 214)";
      item.completed = true;
      saveTodoItems();
    });

    // creating delete button
    const deleteButton = document.createElement("button");
    deleteButton.id = "delete-button";
    deleteButton.style.marginLeft = "370px";

    const deleteImage = document.createElement("img");
    deleteImage.src = "newr.png";
    deleteButton.appendChild(deleteImage);
    todoItemContainer.appendChild(deleteButton);

    deleteButton.addEventListener("click", () => {
      const parent = deleteButton.parentElement;
      parent.parentElement.removeChild(parent);

      const index = todoItems.findIndex((i) => i.id === item.id);

      if (index !== -1) {
        todoItems.splice(index, 1);
        saveTodoItems();
      }
    });
  });
}

function saveTodoItems() {
  localStorage.setItem("todoItems", JSON.stringify(todoItems));
}

renderTodoItems();

addButton.addEventListener("click", () => {
  if (textInputField.value.trim().length == "") return;

  const newItem = {
    id: Date.now(),
    text: textInputField.value,
    completed: false,
  };

  todoItems.push(newItem);
  saveTodoItems();

  renderTodoItems();

  textInputField.value = "";
});
