import { alarm } from "./alarm.js";
import { changeActivBtn } from "./control.js";
import { state } from "./state.js";
import { addZero } from "./util.js";

const minutesElem = document.querySelector('.time__minutes');
const secondsElem = document.querySelector('.time__seconds');



export const showTime = (seconds) => {     
     minutesElem.textContent=addZero(Math.floor(seconds/60));
     secondsElem.textContent=addZero(seconds%60);    
};

export const startTimer = () => {
state.timeLeft -= 1;
showTime(state.timeLeft);

if(state.timeLeft>0&&state.isActive){
state.timerId=setTimeout(startTimer,1000);
}
if(state.timeLeft <= 0){    
    
    if(state.status==='work'){
        state.activTodo.pomodoro++;
        if(state.activTodo.pomodoro % state.count){
            state.status= 'break';
        }else{
            state.status==='relax'
        }        
    }else{
        state.status='work';
    }
    alarm();
    state.timeLeft=state[state.status] * 60;
    changeActivBtn(state.status);
    startTimer();
}};