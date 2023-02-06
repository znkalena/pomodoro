import { changeActivBtn, stop } from "./control.js";
import { state } from "./state.js";

const titleElem = document.querySelector('.title');
const countNum = document.querySelector('.count_num');
const todoItems = document.querySelector('.todo__list');

const getTodo = () =>JSON.parse(localStorage.getItem('pomodoro') || '[]'); 

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
export const updateTodo = (todo) => {
  const todoList = getTodo();
  if(!todoList.length){
    return;
  }  
  const todoItem = todoList.find((item) => item.id === todo.id);   
  todoItem.title = todo.title;
  todoItem.pomodoro = todo.pomodoro;
  localStorage.setItem('pomodoro',JSON.stringify(todoList));
};

const deleteTodo =(todo ) => {  
  const todoList = getTodo();
  const newTodoList = todoList.filter((item) => item.id !== todo.id);
  if( todo.id === state.activeTodo.id){
    state.activeTodo = newTodoList[newTodoList.length-1]; 
  }   
   localStorage.setItem('pomodoro',JSON.stringify(newTodoList));
 
};
const createTodoListItem = todo => { 
        if(todo.id !== 'default'){
        const todoItem = document.createElement('li');
        todoItems.classList.add('todo__item');        
    
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo__item-wrapper');
        todoItem.append(todoDiv);    
    
        const todoButton = document.createElement('button');
        todoButton.classList.add('todo__btn');        
        todoButton.textContent = todo.title;         
    
        const todoButtonEdit = document.createElement('button');
        todoButtonEdit.classList.add('todo__edit');        
        todoButtonEdit.ariaLabel = 'Редактировать';
    
        const todoButtonDel = document.createElement('button');
        todoButtonDel.classList.add('todo__del');         
        todoButtonDel.ariaLabel = 'Удалить'; 

        todoDiv.append(todoButton,todoButtonEdit,todoButtonDel);
        todoItems.prepend(todoItem);
        
        todoButton.addEventListener('click',() => {
          state.activeTodo = todo;
          showTodo();
          changeActivBtn('work');
          stop();
        });

        todoButtonDel.addEventListener('click',() => {
          deleteTodo(todo);        
          showTodo();     
          todoItem.remove();                  
        });

        todoButtonEdit.addEventListener('click',() => {
          todo.title =  prompt('название задачи',todo.title);
          todoButton.textContent = todo.title; 
          if(todo.id === state.activeTodo.id){
          state.activeTodo.title === todo.title;  
          } 
           
          updateTodo(todo);
          showTodo();  
        });
       }};

const renderTodoList = (list) => { 
  todoItems.textContent = '';  
 list.forEach(createTodoListItem );  
};

const createBtnAddTodo = () => {
  const liBtn = document.createElement('li');
  const addTodoBtn =document.createElement('button');   
  liBtn.classList.add('todo__item');
  addTodoBtn.classList.add('todo__add');
  addTodoBtn.textContent = 'Добавить новую задачу';
  liBtn.append(addTodoBtn);
   
  addTodoBtn.addEventListener('click' ,() => {
    const title = prompt('введите имя задачи');
    if(title){
      const todo = addTodo(title);
      createTodoListItem(todo);
      state.activeTodo = todo;
      showTodo();
    } else{
      console.log('введите коректные данные');
    }   
  })
  return liBtn;
  };   

export const showTodo = () => {
  if(state.activeTodo){
    titleElem.textContent = state.activeTodo.title;
    countNum.textContent = state.activeTodo.pomodoro;
  }else{
    titleElem.textContent = '';
    countNum.textContent = 0;
  }
};

export const initTodo = () => {
const todoList = getTodo();

if(!todoList.length){
 state.activeTodo = {
    id:'default',
    pomodoro:0,
    title:'Помодоро',
    };
} else{
  state.activeTodo = todoList[todoList.length-1];
}
  showTodo();
  renderTodoList(todoList);
  const btnCreateTodo =createBtnAddTodo();
  todoItems.append(btnCreateTodo);  
};