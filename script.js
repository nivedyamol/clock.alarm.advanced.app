// script.js

// Store multiple alarms as objects: {time: "HH:MM", ringing: false}
let alarms = [];

const audio = document.getElementById("alarmSound");

// Show live clock
function updateClock() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  const timeString = `${hours}:${minutes}:${seconds}`;

  document.getElementById("clock").textContent = timeString;

  // Check all alarms
  alarms.forEach(alarm => {
    if (!alarm.ringing && alarm.time === `${hours}:${minutes}`) {
      playAlarm(alarm);
    }
  });
}

// Play alarm safely
function playAlarm(alarm) {
  alarm.ringing = true;
  document.getElementById("status").textContent = `⏰ Alarm ringing: ${alarm.time}`;
  audio.currentTime = 0;
  audio.play().catch(err => console.log("Audio play error:", err));
}

// Update clock every second
setInterval(updateClock, 1000);

// Set a new alarm
function setAlarm() {
  const input = document.getElementById("alarmTime").value;
  if (input) {
    // Prevent duplicates
    if (alarms.some(a => a.time === input)) {
      document.getElementById("status").textContent = `Alarm for ${input} already set!`;
      return;
    }

    const newAlarm = { time: input, ringing: false };
    alarms.push(newAlarm);
    updateAlarmList();
    document.getElementById("status").textContent = `Alarm set for ${input}`;

    // Unlock audio for autoplay restrictions
    audio.play().then(() => {
      audio.pause();
      audio.currentTime = 0;
    }).catch(err => console.log("Audio unlock error:", err));
  } else {
    document.getElementById("status").textContent = "Please choose a time!";
  }
}

// Stop a specific alarm
function stopAlarm(index) {
  alarms[index].ringing = false;
  audio.pause();
  audio.currentTime = 0;
  document.getElementById("status").textContent = `Alarm for ${alarms[index].time} stopped!`;
}

// Stop all alarms
function stopAllAlarms() {
  alarms.forEach(a => a.ringing = false);
  audio.pause();
  audio.currentTime = 0;
  document.getElementById("status").textContent = "All alarms stopped!";
}

// Display all alarms in a list with stop buttons
function updateAlarmList() {
  const alarmList = document.getElementById("alarmList");
  alarmList.innerHTML = "";
  alarms.forEach((alarm, index) => {
    const li = document.createElement("li");
    li.textContent = alarm.time + " ";
    const stopBtn = document.createElement("button");
    stopBtn.textContent = "Stop";
    stopBtn.onclick = () => stopAlarm(index);
    li.appendChild(stopBtn);
    alarmList.appendChild(li);
  });
}
