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
          todoButton.classList.add('active');
        });
        todoButtonDel.addEventListener('click',() => {
          todoItem.textContent = '';
          todoButton.textContent='';
          todoButtonDel.textContent='';
          todoButtonEdit.textContent = '';
        });
        todoButtonEdit.addEventListener('click',() => {
          todoItem.textContent =  prompt(`${todoButton.textContent}`);
            
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
      const toDo = addTodo(title);
      createTodoListItem(toDo);
      state.activeTodo = toDo;
      showTodo();
    } else{
      console.log('введите коректные данные');
    }   
  })
  return liBtn;
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
  const btnCreateTodo =createBtnAddTodo();
  todoItems.append(btnCreateTodo);  
};