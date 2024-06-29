let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapCounter = 0;

const timeDisplay = document.getElementById('time');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const laps = document.getElementById('laps');

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', recordLap);

function startTimer() {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(getShowTime, 1);
        running = true;
    }
}

function pauseTimer() {
    if (running) {
        clearInterval(tInterval);
        difference = updatedTime;
        running = false;
    }
}

function resetTimer() {
    clearInterval(tInterval);
    running = false;
    timeDisplay.innerHTML = "00:00:00.000";
    difference = 0;
    lapCounter = 0;
    laps.innerHTML = '';
}

function getShowTime() {
    updatedTime = new Date().getTime() - startTime + (difference || 0);
    let hours = Math.floor((updatedTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((updatedTime % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((updatedTime % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((updatedTime % 1000) / 1);
    
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 100) ? "0" + milliseconds : milliseconds;
    milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;

    timeDisplay.innerHTML = hours + ':' + minutes + ':' + seconds + '.' + milliseconds;
}

function recordLap() {
    if (running) {
        lapCounter++;
        const lapTime = timeDisplay.innerHTML;
        const lapElement = document.createElement('div');
        lapElement.classList.add('lap');
        lapElement.innerHTML = `Lap ${lapCounter}: ${lapTime}`;
        laps.appendChild(lapElement);
    }
}
