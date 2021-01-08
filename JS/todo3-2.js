let todos = [];

const $todos = document.querySelector('.todos');
const $todo = document.querySelector('.todo-item');
const $inputTodo = document.querySelector('.input-todo');
const $completedAll = document.querySelector('#ck-complete-all');
const $clearCompleted = document.querySelector('.clear-completed>.btn');
const $completedTodos = document.querySelector('.completed-todos');
const $active = document.querySelector('.active-todos');
const $nav = document.querySelector('.nav');
const $navAll = document.querySelector('#all');
const $navActive = document.querySelector('#active');
const $navCompleted = document.querySelector('#completed');

const navHTML = (renderTodo) => {
  $todos.innerHTML = renderTodo
    .map(
      ({ id, content, completed }) => ` <li id="${id}" class="todo-item">
        <input id="ck-${id}" class="checkbox" type="checkbox"
        ${completed ? 'checked' : ''}>
        <label for="ck-${id}" ${
        completed ? 'style =text-decoration:line-through' : ''
      }>${content}</label>
        <i class="remove-todo far fa-times-circle"></i>
      </li>`
    )
    .join('');
};

const render = () => {
  if ($navAll.classList.contains('active')) {
    todos = todos.sort((todo1, todo2) => todo2.id - todo1.id);
    navHTML(todos);
  } else if ($navActive.classList.contains('active')) {
    const activeTodos = [...todos].filter((todo) => !todo.completed);
    navHTML(activeTodos);
  } else if ($navCompleted.classList.contains('active')) {
    const CompleteTodos = [...todos].filter((todo) => todo.completed);
    navHTML(CompleteTodos);
  }
  // $todos.innerHTML = todos
  //   .map(
  //     ({ id, content, completed }) => ` <li id="${id}" class="todo-item">
  //       <input id="ck-${id}" class="checkbox" type="checkbox"
  //       ${completed ? 'checked' : ''}>
  //       <label for="ck-${id}" ${
  //       completed ? 'style =text-decoration:line-through' : ''
  //     }>${content}</label>
  //       <i class="remove-todo far fa-times-circle"></i>
  //     </li>`
  //   )
  //   .join('');

  $completedTodos.textContent = todos.filter((todo) => todo.completed).length;
  $active.textContent = todos.filter((todo) => todo.completed).length;
};

const fetchTodos = () => {
  todos = [
    { id: 1, content: 'HTML', completed: false },
    { id: 2, content: 'CSS', completed: true },
    { id: 3, content: 'JavaScript', completed: false },
  ];
  todos = todos.sort((todo1, todo2) => todo2.id - todo1.id);

  render();
};

const generateId = () => {
  return todos.length ? Math.max(...todos.map((todo) => todo.id)) + 1 : 1;
};

const addTodo = (content) => {
  todos = [{ id: generateId(), content, completed: false }, ...todos];
  render();
};

const removeTodo = (id) => {
  todos = todos.filter((todo) => todo.id !== id);
  render();
};

const toggleTodo = () => {
  todos = todos.map((todo) => ({ ...todo, completed: $completedAll.checked }));
  render();
};

document.addEventListener('DOMContentLoaded', fetchTodos);

$inputTodo.onkeyup = (e) => {
  const content = $inputTodo.value;
  if (e.key !== 'Enter' || !content) return;
  addTodo(content);
  $inputTodo.value = '';
};

$todos.onclick = (e) => {
  if (!e.target.matches('.remove-todo')) return;
  removeTodo(+e.target.parentNode.id);
};

$todos.onchange = (e) => {
  todos = todos.map((todo) => {
    return todo.id === +e.target.parentNode.id
      ? { id: todo.id, content: todo.content, completed: e.target.checked }
      : todo;
  });
  render();
};
$completedAll.onchange = (e) => {
  toggleTodo();
};

$clearCompleted.onclick = (e) => {
  todos = todos.filter((todo) => !todo.completed);
  render();
};

$nav.onclick = (e) => {
  [...$nav.children].forEach((v) => {
    v.classList.toggle('active', e.target === v);
  });
  render();
};
