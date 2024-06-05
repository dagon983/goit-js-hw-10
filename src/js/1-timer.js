import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

let userSelectedDate;
const btnStart = document.querySelector("button");
const input = document.querySelector("#datetime-picker")
const now = new Date();
const timerDayFace = document.querySelector("[data-days]");
const timerHourFace = document.querySelector("[data-hours]");
const timerMinuteFace = document.querySelector("[data-minutes]");
const timerSecondsFace = document.querySelector("[data-seconds]");
input.disabled = false;
btnStart.disabled = true;

btnStart.addEventListener("click", startTimer);

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);
      userSelectedDate = selectedDates[0];
      if ( userSelectedDate < now ) {
        iziToast.error({
            title: 'Error',
            message: "Please choose a date in the future",
            position: 'topRight'
        });
        } else { btnStart.disabled = false;}
        
    },
};

function startTimer() {
    input.disabled = true;
    btnStart.disabled = true;

    const userSelectedTime = userSelectedDate.getTime();
    const nowTime = now.getTime();
    let delta = userSelectedTime - nowTime;
    

    const intervalId = setInterval(() => {
        delta -= 1000;
        const convertedTime = convertMs(delta);

        updateTimer(convertedTime);
        if ( delta < 1000 ) {
            clearInterval(intervalId);
            input.disabled = false;
        }
        
    }, 1000)
};

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    const days = addLeadingZero(Math.floor(ms / day));
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
};

function addLeadingZero(value) {
    return String(value).padStart(2, 0);
};

function updateTimer({ days, hours, minutes, seconds }) {
   timerSecondsFace.textContent = `${seconds}`;
   timerMinuteFace.textContent = `${minutes}`;
   timerHourFace.textContent = `${hours}`;
   timerDayFace.textContent = `${days}`;
};
 
flatpickr("#datetime-picker", options);











