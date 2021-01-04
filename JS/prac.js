let todos = [];

const $todos = document.querySelector('.todos');
const $inputTodo = document.querySelector('.input-todo');
const $completeAll = document.getElementById('ck-complete-all');
const $clearCompleted = document.querySelector('.clear-completed>.btn');
const $completed = document.querySelector('.completed-todos');
const $active = document.querySelector('.active-todos');

console.log($completed);
const render = () => {
  // console.log('[todos]', todos);
  $todos.innerHTML = todos
    .map(
      ({ id, content, completed }) => `<li id="${id}" class="todo-item">
  <input id="${id}" class="checkbox" type="checkbox" 
  ${completed ? 'checked' : 'none'}>
  <label for="${id}">${content}</label>
  <i class="remove-todo far fa-times-circle"></i>
  </li>`
    )
    .join('');

  $completed.textContent = todos.filter((todo) => todo.completed).length;
  $active.textContent = todos.filter((todo) => !todo.completed).length;
};

const fetchTodos = () => {
  todos = [
    { id: 1, content: 'HTML', completed: false },
    { id: 2, content: 'CSS', completed: true },
    { id: 3, content: 'JavaScript', completed: false },
  ];
  todos = [...todos].sort((todo1, todo2) => todo2.id - todo1.id);
  render();
};

const generateId = () => {
  // console.log(todos);
  todos.length ? Math.max(...todos.map((todo) => todo.id)) + 1 : 1;
};

const addTodo = (content) => {
  todos = [{ id: generateId(), content, completed: false }, ...todos];
  render();
};

const toggleTodo = (id) => {
  todos = todos.map((todo) =>
    todo.id === +id ? { ...todo, completed: !todo.completed } : todo
  );
  render();
};
const removeTodo = (id) => {
  todos = todos.filter((todo) => todo.id !== id);
  render();
};

const $toggleCompleted = () => {
  todos = todos.map((todo) => ({ ...todo, completed: $completeAll.checked }));
  // console.log(todos);
  render();
};

// const $active = () => {
//   todos = todos.map((todo) => ({ ...todo, completed: !$completeAll.checked }));
//   console.log(todos);
//   render();
// };

const $removeCompletedAll = () => {
  todos = todos.filter((todo) => !todo.completed);
  render();
};

document.addEventListener('DOMContentLoaded', fetchTodos());

$inputTodo.onkeyup = (e) => {
  const content = $inputTodo.value;
  if (e.key !== 'Enter' || !content) return;
  addTodo(content);

  $inputTodo.value = '';
};

$todos.onclick = (e) => {
  if (!e.target.classList.contains('remove-todo')) return;
  // console.log(e.target.parentNode.id);
  removeTodo(+e.target.parentNode.id);
};

$todos.onclick = (e) => {
  const { id } = e.target.parentNode;
  toggleTodo(id);
};

$clearCompleted.onclick = $removeCompletedAll;
$completeAll.onchange = $toggleCompleted;
