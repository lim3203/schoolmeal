const dDay1 = new Date("Jun 27, 2024"), // 내신
dDay2 = new Date("Jun 4, 2024"), // 모고
dDay3 = new Date("Nov 11, 2024"), // 수능
HTMLdDay1 = document.querySelector(".d1"),
HTMLdDay2 = document.querySelector(".d2"),
HTMLdDay3 = document.querySelector(".d3");

function getTimeRemaining(endtime) {
  const now = new Date().getTime();
  const t = endtime - now;
  const days = Math.floor(t / (1000 * 60 * 60 * 24));
  console.log(t,days);
  return {
    days
  };
}

function updateCountdown() {
  let time = getTimeRemaining(dDay1);
  HTMLdDay1.innerHTML = `${time.days + 1}일`;
  time = getTimeRemaining(dDay2);
  HTMLdDay2.innerHTML = `${time.days + 1}일`;
  time = getTimeRemaining(dDay3);
  HTMLdDay3.innerHTML = `${time.days + 1}일`;
  
}

updateCountdown();

//setInterval(updateCountdown, 1000); // updates the countdown every second
