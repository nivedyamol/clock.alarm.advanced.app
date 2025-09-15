 " // Alarm variables
let alarmTime = null;
let alarmRinging = false;

// Get audio element
const audio = document.getElementById("alarmSound");

// Show live clock
function updateClock() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  const timeString = ${hours}:${minutes}:${seconds};

  document.getElementById("clock").textContent = timeString;

  // Check alarm (match HH:MM)
  if (!alarmRinging && alarmTime && ${hours}:${minutes} === alarmTime) {
    playAlarm();
  }
}

// Play alarm safely
function playAlarm() {
  alarmRinging = true;
  document.getElementById("status").textContent = "⏰ Alarm ringing!";
  audio.currentTime = 0;
  audio.loop = true; // keep ringing until stopped
  audio.play().catch(err => {
    console.log("Audio play error:", err);
  });
}

// Update clock every second
setInterval(updateClock, 1000);

// Set Alarm
function setAlarm() {
  const input = document.getElementById("alarmTime").value;
  if (input) {
    alarmTime = input;
    alarmRinging = false;
    document.getElementById("status").textContent = Alarm set for ${input};

    // Unlock audio for autoplay restrictions
    audio.play().then(() => {
      audio.pause();
      audio.currentTime = 0;
    }).catch(err => console.log("Audio unlock error:", err));
  } else {
    document.getElementById("status").textContent = "Please choose a time!";
  }
}

// Stop Alarm
function stopAlarm() {
  audio.pause();
  audio.currentTime = 0;
  alarmRinging = false;
  alarmTime = null; // clear alarm so it won’t restart
  document.getElementById("status).textContent = "Alarm stopped!";
}
