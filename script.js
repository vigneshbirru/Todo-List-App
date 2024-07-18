const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

document.addEventListener("DOMContentLoaded", getLocalTodos); //store local todos history
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("change", filterTodo);

function addTodo(event) {
    event.preventDefault(); // ? loaderrepeat
    const todoDiv = document.createElement("div"); //creating new div <div></div>
    todoDiv.classList.add("todo"); //adding todos
    const newTodo = document.createElement("li"); //creating new li <li></li>
    newTodo.innerText = todoInput.value;  // input ka text ka value copying to newtodo
    newTodo.classList.add("todo-item"); //new add li todos
    todoDiv.appendChild(newTodo); // div inside append child
    //ADDING TO LOCAL STORAGE 
    saveLocalTodos(todoInput.value); //local storage save
    
    const completedButton = document.createElement("button"); //create button <button></button>
    completedButton.innerHTML = '<i class="fas fa-check-circle"></li>'; //yes button
    completedButton.classList.add("complete-btn"); //add yes button
    todoDiv.appendChild(completedButton); //append  inside div 

    const trashButton = document.createElement("button"); //create button <button></button>
    trashButton.innerHTML = '<i class="fas fa-trash"></li>';// for trashbutton
    trashButton.classList.add("trash-btn");//add
    todoDiv.appendChild(trashButton);// append inside div
    
    todoList.appendChild(todoDiv); //frontend mai ul todo-list add todo div
    todoInput.value = ""; // input field empty
}

function deleteCheck(e) { 

    const item = e.target;
    // console.log(item);
    if(item.classList[0] === "complete-btn") { //if yes button e.target  
        const todo = item.parentElement; //todoDiv inside todo
        todo.classList.toggle("completed"); //line -through
    }

    if(item.classList[0] === "trash-btn") { //if btn trash-btn
        const todo = item.parentElement;
        todo.classList.add("slide"); //CSS will remove temporary basis

        removeLocalTodos(todo); //main remove function
        todo.addEventListener("transitionend", function() {
            todo.remove();
        });
    }

   
}

function filterTodo(e) {
    const todos = todoList.childNodes; //Retrieve All To-Do Items
    todos.forEach(function(todo) {//  loop that goes through each todo item in the todos array.
        switch(e.target.value) { //Filter To-Dos
            case "all": //Show All To-Dos:
                todo.style.display = "flex";
                break;
            case "completed": //Show completed todos
                if(todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none"; 
                }
                break;
            case "incomplete":
                if(!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function saveLocalTodos(todo) {
    let todos;
    if(localStorage.getItem("todos") === null) { //Check Local Storage for Existing Todos:
        todos = []; // nothing is present then empty
    } else {
        todos = JSON.parse(localStorage.getItem("todos")); //if yes then storing inside todos
    }
    todos.push(todo); //Add New Todo to Array:
    localStorage.setItem("todos", JSON.stringify(todos)); //Update Local Storage
}

    function getLocalTodos() {
        let todos;
        if(localStorage.getItem("todos") === null) { //Check Local Storage for Existing Todos
            todos = [];
        } else {
            todos = JSON.parse(localStorage.getItem("todos")); //if yes then storing inside todos
        }
        todos.forEach(function(todo) {  //Iterate Over Each Todo
            const todoDiv = document.createElement("div"); //Create Todo Div
            todoDiv.classList.add("todo"); //add todo
            const newTodo = document.createElement("li");//Create Todo List Item
            newTodo.innerText = todo; // sets its text to the current todo
            newTodo.classList.add("todo-item"); //  li add newtodo
            todoDiv.appendChild(newTodo); // appends it to the todoDiv

            const completedButton = document.createElement("button");
            completedButton.innerHTML = '<i class="fas fa-check-circle"></li>';
            completedButton.classList.add("complete-btn");
            todoDiv.appendChild(completedButton);

            const trashButton = document.createElement("button");
            trashButton.innerHTML = '<i class="fas fa-trash"></li>';
            trashButton.classList.add("trash-btn");
            todoDiv.appendChild(trashButton);

            todoList.appendChild(todoDiv);
        });
    }

function removeLocalTodos(todo) {
    let todos; // new variable todos
    if(localStorage.getItem("todos") === null) { //if null 
        todos = []; //empty display
    } else {
        todos = JSON.parse(localStorage.getItem("todos")); //if there any todos store in toods
    }

    const todoIndex = todo.children[0].innerText; //Retrieve the Index:
    todos.splice(todos.indexOf(todoIndex), 1);//Remove the Item from the Array
    localStorage.setItem("todos", JSON.stringify(todos));//Update Local Storage
}