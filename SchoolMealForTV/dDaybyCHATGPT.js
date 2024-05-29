const dDay = new Date("May 29, 2024"); // D-Day date
const HTMLdDay = document.querySelector(".dDay3");

function getTimeRemaining(endtime) {
  const now = new Date().getTime();
  const t = endtime - now;
  if (t <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      //seconds: 0
    };
  }
  const minutes = Math.floor((t / 1000 / 60) % 60);
  const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  const days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    days,
    hours,
    minutes,
    //seconds
  };
}

function updateCountdown() {
  const time = getTimeRemaining(dDay);
  HTMLdDay.innerHTML = `D-${time.days}`;
}

setInterval(updateCountdown, 1000); // updates the countdown every second
