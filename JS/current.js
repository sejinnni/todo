//Global state
let todos = [];

//DOM nodes 
//< class = "todos">
const $todos = document.querySelector('.todos');
const $inputTodo = document.querySelector('.todos');
const $completeAll = document.getElementById('ck-complete-all');
const $clearCompleted= document.querySelector('.clear-completed > .btn');
const $completed= document.getElementById('.completed-todos');
const $active= document.getElementById('active-todos');
// <!-- <li id="1" class="todo-item">
// <input id="ck-1" class="checkbox" type="checkbox">
// <label for="ck-1">HTML</label>
// <i class="remove-todo far fa-times-circle"></i>
// </li> -->
const render = ()=>{
  //디버깅 용
console.log('[todos]',todos);
  $todos.innerHTML =todos.map(({id,content,completed}) =>`<li id="${id}" class="todo-item">
  <input id="${id}" class="checkbox" type="checkbox" ${completed ? 'checked' : 'none'}>
  <label for="${id}">${content}</label>
  <i class="remove-todo far fa-times-circle"></i>
  </li>` ).join('');

  $completed.textContent = todos.filter(todo => todo.completed).length;
  $active.textContent = todos.filter(todo => !todo.completed).length;
  // const countCompleted = todos.filter(todo => todo.completed).length;
  // const countActive = todos.filter(todo => !todo.completed).length;
  //console.log(countCompleted,countActive);
};

const fetchTodos ()=>{
  // TODO : //서버로부터 todos데이터 취득한다.
  todos = [
    {id:1,content : 'HTML',completed:false},
    {id:2,content : 'CSS',completed:true},
    {id:3,content : 'JavaScript',completed:false},
  ];
  todos = [...todos].sort((todo1, todo2) => todo2.id - todo1.id);
  render();
};
const generateId = ()=> (todos.length ? Math.max(...todos.map(todo.id => todo.id))+1 : 1);

const addTodo = content => {
  todos = [{id: generateId(),content, completed:false},...todos];
  render();
};

const toggleTodo = id => {
   todos.map(todo => todo.id === +id ? {...todo, completed : !todo.completed} :todo);
   render();
};
const removeTodo = id => {
  todo = todos.filter(todo => todo.id !== id);
  render();
};

const toggleCompleted = () => {
  todos = todos.map(todo => {...todo,completed : $completeAll.checked});
  render();
};


const $removeCompletedAll = () =>{
  todos = todos.filter(todo => !todo.completed);
  render();
};

document.addEventListener('DOMcontentLoaded', fetchTodos());

//키보드 이벤트 발생 => 이벤트 객체 : 키보드 관련 이벤트 
$inputTodo.onkeyup = ()=>{ 
  //{id:? ,content ,completed:false}
  const content = $inputTodo.value;

  if(e.key !== 'Enter' || !content) return;
  //console.log($inputTodo.value);
  addTodo(content);

  $inputTodo.value= '';
};

$todos.onchange = e =>{ 
  const {id} = e.target.parentNode.id;
  toggleTodo(id);
};

$todos.onclick = e =>{
  console.log(e.target);
  if(!e.target.classList.contains('remove-todo')) return;
  //console.log(e.target.parentNode.id);
  removeTodo(+e.target.parentNode.id);
  
};

$completeAll.onchange =  toggleCompleted();

$clearCompleted.onclick = $removeCompletedAll;

