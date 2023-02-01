import { initControl } from "./control.js";
import { state } from "./state.js";

const initPomodoro=()=>{
initControl();

state.activTodo={
id:'default',
pomodoro:3,
title:'Помодоро',
}
};
initPomodoro();