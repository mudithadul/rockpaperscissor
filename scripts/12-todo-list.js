const todoList = [];

function addTodoList() {
  const nameInput = document.querySelector('.js-todo-input');
  const dateInput = document.querySelector('.js-date-input');

  if (!nameInput.value) {
    return;
  }
  todoList.push({name: nameInput.value, date: dateInput.value});
  nameInput.value = ''; 

  renderTodoList();
}

function renderTodoList() {
  let displayTodoList = '';

  todoList.forEach((todo, index) => {
    const { name, date } = todo;
    displayTodoList += `
    <div>${name}</div>
    <div>${date}</div>
    <button 
        class="delete-button" 
        onclick="
        todoList.splice(${index}, 1);
        renderTodoList();
        "
        >Delete
        </button>
    `;
  });   
  document.querySelector('.js-todo-list').innerHTML = displayTodoList; 
}