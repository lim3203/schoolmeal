(function() {
  const targetDate = new Date("Nov 19, 2026 00:00:00");
  const displayElement = document.querySelector(".dDay");

  function getTimeRemaining(endtime) {
    const total = endtime - new Date();
    if (total <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));

    return { days, hours, minutes, seconds };
  }

  function updateCountdown() {
    const t = getTimeRemaining(targetDate);
    displayElement.innerHTML = `11.19 2027학년도 대학수학능력시험까지<br/>${t.days}일 ${t.hours}시간 ${t.minutes}분 ${t.seconds}초 남았습니다!`;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
})();
