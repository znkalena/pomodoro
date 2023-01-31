import { alarm } from "./alarm.js";
import { state } from "./state.js";

const minutesElem = document.querySelector('.time__minutes');
const secondsElem = document.querySelector('.time__seconds');

const showTime = (seconds) => {
    if(seconds/60>9){
    minutesElem.textContent=Math.floor(seconds/60);
    }else{
    minutesElem.textContent='0'+Math.floor(seconds/60);   
    }
    
    secondsElem.textContent=seconds % 60;
};

export const startTimer = () => {
state.timeLeft--;
showTime(state.timeLeft);

if(state.timeLeft>0&&state.isActive){
state.timerId=setTimeout(startTimer,1000);
}
if(state.timeLeft <= 0){
    alarm();
}
};