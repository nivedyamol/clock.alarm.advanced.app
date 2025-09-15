 // Alarm variables
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
  const timeString = `${hours}:${minutes}:${seconds}`;

  document.getElementById("clock").textContent = timeString;

  // Check alarm (match HH:MM only)
  if (!alarmRinging && alarmTime && `${hours}:${minutes}` === alarmTime) {
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
  const input = document.getEleme
