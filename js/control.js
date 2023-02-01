import { showTime, startTimer } from "./timer.js";
import { state } from "./state.js";


const btnStart = document.querySelector('.control__btn_start');
const btnStop = document.querySelector('.control__btn_stop');
const navigationBtns = document.querySelectorAll('.navigation__btn');
console.log(navigationBtns[0]);

navigationBtns[0].addEventListener('click', () => {
    state.status = 'work';
});
navigationBtns[1].addEventListener('click', () => {
    state.status = 'break';
});
navigationBtns[2].addEventListener('click', () => {
    state.status = 'relax'
});

export const changeActivBtn = (dataUse) => {

for(let i=0; i < navigationBtns.length; i++){
    if(navigationBtns[i].dataset.use===dataUse){
      navigationBtns[i].classList.add('navigation__btn_active');      
    }else{
      navigationBtns[i].classList.remove('navigation__btn_active');
    }   
}
};

const stop=() => {
    clearTimeout(state.timerId);
    state.isActive=false;
    btnStart.textContent='Старт';
    state.timeLeft =state[state.status]*60;
    showTime(state.timeLeft);
}

export const initControl=() => {
btnStart.addEventListener('click',()=>{
    if(state.isActive){
    clearTimeout(state.timerId);
    state.isActive=false;
    btnStart.textContent='Старт';
    
    }else{
        state.isActive=true;   
        startTimer();
        btnStart.textContent='Пауза'
    }
});
btnStop.addEventListener('click',stop);
showTime(state.timeLeft);
};

