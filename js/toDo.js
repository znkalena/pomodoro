import { state } from "./state.js";

const titleElem = document.querySelector('.title');
const countNum = document.querySelector('.count_num');
const liBtn = document.createElement('li');
const addTodoBtn =document.createElement('button');
const todoItems = document.querySelector('.todo__list');
    todoItems.textContent = '';

liBtn.classList.add('todo__item');
addTodoBtn.classList.add('todo__add');
addTodoBtn.textContent = 'Добавить новую задачу';
liBtn.append(addTodoBtn);

const getTodo = () => {
    const todolist = JSON.parse(localStorage.getItem('pomodoro') || '[]');    
        return todolist;        
};

const addTodo = (title) => {
 const todo ={
    title,
    pomodoro:0,
    id:Math.random().toString(16).substring(2,8),
 }
    const todoList = getTodo();
    todoList.push(todo);
    localStorage.setItem('pomodoro',JSON.stringify(todoList));
    return todo;
};
const createTodoListItem = todo => {
    
        if(todo.id !== 'default'){
        const todoItem = document.createElement('li');
        todoItems.classList.add('todo__item')
        todoItems.append(todoItem);
    
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo__item-wrapper')
        todoItem.appendChild(todoDiv);    
    
        const todoButton = document.createElement('button');
        todoButton.classList.add('todo__btn');
        todoDiv.appendChild(todoButton);
        todoButton.textContent = todo.title;
    
        const todoButtonEdit = document.createElement('button');
        todoButtonEdit.classList.add('todo__edit');
        todoDiv.appendChild(todoButtonEdit);
        todoButton.ariaLabel = 'Редактировать';
    
        const todoButtonDel = document.createElement('button');
        todoButtonDel.classList.add('todo__del');
        todoDiv.appendChild(todoButtonDel); 
        todoButton.ariaLabel = 'Удалить'; 
        todoItems.append(liBtn);   
       }};

const renderTodoList = (list) => { 
 list.forEach(createTodoListItem ); 
};
 

const showTodo = () => {
titleElem.textContent = state.activeTodo.title;
countNum.textContent = state.activeTodo.pomodoro;
};

export const initTodo = () => {
const todolist = getTodo();

if(!todolist.length){
 state.activeTodo = [{
    id:'default',
    pomodoro:0,
    title:'Помодоро',
    }]
} else{
  state.activeTodo = todolist[todolist.length-1];
}
  showTodo();

  renderTodoList(todolist);
  addTodoBtn.addEventListener('click' ,() => {
    const title = prompt('введите имя задачи');
    const toDo = addTodo(title);
    createTodoListItem(toDo);
  })
};