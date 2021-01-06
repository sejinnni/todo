let todos = [];

const $todos = document.querySelector('.todos');
const $inputTodo = document.querySelector('.input-todo');
const $clearCompleted = document.querySelector('.clear-completed>.btn');
const $completeAll = document.querySelector('#ck-complete-all');
const $completed = document.querySelector('.completed-todos');
const $active = document.querySelector('.active-todos');
const $nav = document.querySelector('ul');
const $navAll = document.querySelector('#all');
const $navActive = document.querySelector('#active');
const $navCompleted = document.querySelector('#completed');

const navHTML = (todo) => {
  $todos.innerHTML = todo
    .map(
      ({ id, content, completed }) => `<li id="${id}" class="todo-item">
  <input id="ck-${id}" class="checkbox" type="checkbox" ${
        completed ? 'checked' : ''
      }>
  <label for="ck-${id}">${content}</label>
  <i class="remove-todo far fa-times-circle"></i>
</li> `
    )
    .join('');
};

const render = () => {
  if ($navAll.classList.contains('active')) {
    todos = [...todos].sort((todo1, todo2) => todo2.id - todo1.id);
    navHTML(todos);
  } else if ($navActive.classList.contains('active')) {
    const todo1 = [...todos].filter((todo) => !todo.completed);
    navHTML(todo1);
  } else if ($navCompleted.classList.contains('active')) {
    const todo2 = [...todos].filter((todo) => todo.completed);
    navHTML(todo2);
  }

  // $todos.innerHTML = todos
  //   .map(
  //     ({ id, content, completed }) => `<li id="${id}" class="todo-item">
  //   <input id="ck-${id}" class="checkbox" type="checkbox" ${
  //       completed ? 'checked' : 'none'
  //     }>
  //   <label for="ck-${id}">${content}</label>
  //   <i class="remove-todo far fa-times-circle"></i>
  // </li> `
  //   )
  //   .join('');

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

const generateId = () =>
  todos.length ? Math.max(...todos.map((todo) => todo.id)) + 1 : 1;

const addTodo = (content) => {
  todos = [{ id: generateId(), content, completed: false }, ...todos];
  console.log(todos);
  render();
};

const removeTodo = (id) => {
  todos = [...todos].filter((todo) => todo.id !== id);
  render();
};

const toggleTodo = (id) => {
  todos = todos.map((todo) =>
    todo.id === +id ? { ...todo, completed: !todo.completed } : todo
  );
  render();
};

const $removeCompletedAll = () => {
  todos = todos.filter((todo) => !todo.completed);
  render();
};

const $toggleCompleted = () => {
  todos = todos.map((todo) => ({ ...todo, completed: $completeAll.checked }));
  // console.log(todos);
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
  //if(!e.target.classList.contains('.remove-todo')) return;
  //요소노드가 클래스를 가지고 있는지 확인하고자 할때 : matches/contains메서드 쓰자
  if (!e.target.matches('.remove-todo')) return;
  removeTodo(+e.target.parentNode.id);
};

$todos.onchange = (e) => {
  const { id } = e.target.parentNode;
  toggleTodo(id);
};

$clearCompleted.onclick = $removeCompletedAll;
$completeAll.onchange = $toggleCompleted;

$nav.onclick = (e) => {
  [...$nav.children].forEach((v) => {
    v.classList.toggle('active', e.target === v);
  });
  render();
};
