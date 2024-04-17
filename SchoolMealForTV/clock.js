let apiDate = 0;
let now = new Date();

function timeAPI(){
    fetch(`http://worldtimeapi.org/api/timezone/Asia/Seoul    `)
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

function updateClock() {

    now.setSeconds(now.getSeconds()+1);
    //console.log(n);
    //console.log(now.getSeconds());\
    let hours = String(now.getHours()).padStart(2, '0');
    let minutes = String(now.getMinutes()).padStart(2, '0');
    let seconds = String(now.getSeconds()).padStart(2, '0');
    

    // 시계에 표시
    const clockDisplay = document.querySelector('.Clock');
    clockDisplay.textContent = `${hours}시 ${minutes}분`;
    const clockDisplaySec = document.querySelector('.ClockSecond');
    clockDisplaySec.textContent = `${seconds}초`;
    if(now.getMinutes()%10 == 0){
        timeAPI();
    }
    if(now.getMinutes()==38){
        location.reload(true);
    }
}


timeAPI();
updateClock();
setInterval(updateClock, 1000); // 1초마다 시계 업데이트

