

function updateClock() {
    // 현재 시간을 가져옴
    const now = new Date();

    // 시, 분, 초를 가져와서 형식에 맞게 문자열로 변환
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    // 시계에 표시
    const clockDisplay = document.querySelector('.Clock');
    clockDisplay.textContent = `${hours}시 ${minutes}분`;
    const clockDisplaySec = document.querySelector('.ClockSecond');
    clockDisplaySec.textContent = `${seconds}초`;
}

// 페이지가 로드될 때마다 시계 업데이트
updateClock();
setInterval(updateClock, 1000); // 1초마다 시계 업데이트