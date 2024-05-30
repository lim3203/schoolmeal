let apiDate = 0;
let now = new Date();

function timeAPI(){
    fetch(`https://worldtimeapi.org/api/timezone/Asia/Seoul`)
    .then(function(response){
        return response.json();
    })
    .then(function(json){
        //console.log(json);
        apiDate = json.utc_datetime;
        now = new Date(apiDate);
    })
}


let n = 0;
//let am_pm = 0;

function updateClock() {
    now.setSeconds(now.getSeconds()+1);
    //console.log(n);
    //console.log(now.getSeconds());\
    let hours;
    if (now.getHours()>12){
        hours = String(now.getHours()-12).padStart(2, '0');
        //am_pm = "오후";
    } else {
        hours = String(now.getHours()).padStart(2, '0');
        //am_pm = "오전";
    }
    let minutes = String(now.getMinutes()).padStart(2, '0');
    let seconds = String(now.getSeconds());
    

    // 시계에 표시
    const clockDisplay = document.querySelector('.Clock');
    clockDisplay.textContent = `${hours}시 ${minutes}분`;
    const ampm_indicator = document.querySelector('.ampm');
    ampm_indicator.textContent = `${am_pm}`;
    const clockDisplaySec = document.querySelector('.secProgress');
    clockDisplaySec.value = `${seconds}`;
    //clockDisplaySec.textContent = `${seconds}초`;
}


timeAPI();
updateClock();
setInterval(updateClock, 1000); // 1초마다 시계 업데이트
