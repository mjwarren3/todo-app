// Selectors (Creates JS objects out of our HTML objects)
const todoInput = document.querySelector(".todo-input"); // Shift + Alt + Down to copy
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");


// Event Listeners
todoButton.addEventListener("click", addToDo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);
document.addEventListener("DOMContentLoaded", getTodos());

// Functions

function addToDo(event){
    event.preventDefault(); // Prevents form submit on hitting enter
    // To do Div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");
    // To do LI
    const newToDo = document.createElement('li');
    newToDo.innerText = todoInput.value;
    newToDo.classList.add('todo-item');
    todoDiv.appendChild(newToDo); // Adds under the div
    // Save to do to local storage
    saveLocalTodos(todoInput.value);
    // Check button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>'; // Adds button icon
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    // Trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'; // Adds button icon
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    // Append to original list
    todoList.appendChild(todoDiv);
    // Clear input value
    todoInput.value = "";
}

// Reference of what we're trying to create in HTML (through JS)
{/* <div class="todo">
<li>List item</li>
<button></button>
<button>Checked</button>
</div> */}

function deleteCheck(event) {
    console.log(event.target); // Outputs the item that was clicked, can do different functionality based on click
    const item = event.target;
    // Delete ToDo
    if(item.classList[0] === 'trash-btn'){
        // item.remove(); // Only removes the button
        const todo = item.parentElement; // Selects the parent element
        removeLocalTodos(todo);
        // Animation
        todo.classList.add("fall");
        addEventListener("transitionend", function(){ // Waits for transition to end
            todo.remove();
        });
        
    }

    // Check mark
    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement; // Selects the parent element
        todo.classList.toggle("completed"); // Changes class to completed / not completed
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    console.log(todos);
    todos.forEach(function(todo) {
      switch (e.target.value) {
        case "all":
          todo.style.display = "flex";
          break;
        case "complete":
          if (todo.classList.contains("completed")) {
            todo.style.display = "flex";
          } else {
            todo.style.display = "none";
          }
          break;
        case "incomplete":
          if (!todo.classList.contains("completed")) {
            todo.style.display = "flex";
          } else {
            todo.style.display = "none";
          }
      }
    });
  }

//   Save to dos on local storage
function saveLocalTodos(todo) {
    // Check if we have to dos already
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Get from local stroage
function getTodos() {
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        const todoDiv = document.createElement('div');
        todoDiv.classList.add("todo");
        // To do LI
        const newToDo = document.createElement('li');
        newToDo.innerText = todo;
        newToDo.classList.add('todo-item');
        todoDiv.appendChild(newToDo); // Adds under the div
        // Check button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>'; // Adds button icon
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        // Trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>'; // Adds button icon
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        // Append to original list
        todoList.appendChild(todoDiv);

    })
}

function removeLocalTodos(todo) {
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    
    // Remove the position of the element we are clicking on
    console.log(todo.children[0].innerText);
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1); // Finds where the text is (index) and removes that element --> 1 signifies only  element removed
    localStorage.setItem("todos", JSON.stringify(todos));   
}