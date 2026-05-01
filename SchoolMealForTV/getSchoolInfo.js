const PROXY_URL = "https://schoolmealproject.sunglim3203.workers.dev";
const API_EDUCODE = "Q10";
const API_SCHOOLCODE = "8490325";
const stGrade = "1";
const claNumber = localStorage.getItem("CLANUM");
const subTitle =  document.querySelector(".subTitle");
const cssDate = document.querySelector(".CSSdate");
const HTMLschoolmeal_M = document.querySelector(".schoolmeal_M");
const HTMLschoolmeal_L = document.querySelector(".schoolmeal_L");
const HTMLschoolmeal_D = document.querySelector(".schoolmeal_D");
const HTMLtitle_M = document.querySelector(".morningTitle");
const HTMLtitle_L = document.querySelector(".lunchTitle");
const HTMLtitle_D = document.querySelector(".dinnerT");
const HTMLmenuTitle = document.querySelector(".menuTitle");
const morningButton = document.querySelector(".morningButton");
const date = new Date();

  
let API_DATE = "20210319",
  schoolmealInfo_M = "",
  schoolmealInfo_L = 0,
  schoolmealInfo_D = 0,
  calInfo_M = "",
  calInfo_L = 0,
  calInfo_D = 0,
  API_MMEAL = "중식",
  koScName = '0',
  dayOfWeek = '',
  tomorrowButtonStatus = 0,
  morningButtonStatus = "1";

function getDateInfo(){
  if (date.getHours()<19){
    API_DATE =`${date.getFullYear()}${date.getMonth()+1 > 9 ? date.getMonth()+1 : `0${date.getMonth()+1}`}${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate() }`;
    console.log("today");
  } else {
    date.setDate(date.getDate()+1);
    API_DATE =`${date.getFullYear()}${date.getMonth()+1 > 9 ? date.getMonth()+1 : `0${date.getMonth()+1}`}${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate() }`;
    //HTMLmenuTitle.innerHTML= `내일의 급식`;
    console.log("tomorrow");
  }
  console.log(API_DATE);
}

function to_date(date_str)
{
    var yyyyMMdd = String(date_str);
    var sYear = yyyyMMdd.substring(0,4);
    var sMonth = yyyyMMdd.substring(4,6);
    var sDate = yyyyMMdd.substring(6,8);

    return new Date(Number(sYear), Number(sMonth)-1, Number(sDate));
}

function weekendCheck(date){
  console.log(to_date(date))
  const day = to_date(date).getDay()
  if  (day == 0 || day == 6){
    return true;
  } else {
    console.log(day)
    return false;
  }
}

async function getMenuAPI(){
  const url = `${PROXY_URL}?date=${API_DATE}`;
  
  try {
    const response = await fetch(url);
    const json = await response.json();
    
    if (json.mealServiceDietInfo) {
      const rows = json.mealServiceDietInfo[1].row;
      
      // Reset displays
      HTMLschoolmeal_M.innerHTML = "";
      HTMLschoolmeal_L.innerHTML = "정보 없음";
      HTMLschoolmeal_D.innerHTML = "정보 없음";

      rows.forEach(row => {
        const mealType = row.MMEAL_SC_NM; // 조식, 중식, 석식
        const menu = row.DDISH_NM;
        const cal = row.CAL_INFO;

        if (mealType === "조식") {
          schoolmealInfo_M = menu;
          calInfo_M = cal;
          HTMLschoolmeal_M.innerHTML = schoolmealInfo_M;
          HTMLtitle_M.innerHTML = `아침 | ${calInfo_M}`;
        } else if (mealType === "중식") {
          schoolmealInfo_L = menu;
          calInfo_L = cal;
          HTMLschoolmeal_L.innerHTML = schoolmealInfo_L;
          HTMLtitle_L.innerHTML = `점심 | ${calInfo_L}`;
        } else if (mealType === "석식") {
          schoolmealInfo_D = menu;
          HTMLschoolmeal_D.innerHTML = schoolmealInfo_D;
          HTMLtitle_D.innerHTML = `저녁 | ${row.CAL_INFO}`;
        }
      });
    } else {
      handleNoMeal();
    }
  } catch (e) {
    handleNoMeal();
  }
}

function handleNoMeal() {
  if (weekendCheck(API_DATE)) {
    if(date.getDay() == 6){
      HTMLschoolmeal_L.innerHTML = "주말입니다!";
      HTMLschoolmeal_D.innerHTML = '주말입니다!';
      HTMLtitle_D.innerHTML = `저녁`;
    } else {
      HTMLschoolmeal_L.innerHTML = '주말입니다!';
      HTMLschoolmeal_D.innerHTML = '주말입니다!';
      HTMLschoolmeal_M.innerHTML = '주말입니다!';
      HTMLtitle_M.innerHTML = `아침`;
      HTMLtitle_L.innerHTML = `점심`;
      HTMLtitle_D.innerHTML = `저녁`;
    }
  } else {
    HTMLschoolmeal_L.innerHTML = "급식 정보가 없습니다.";
    HTMLschoolmeal_D.innerHTML = "급식 정보가 없습니다.";
  }
}


function init(){
  getDateInfo();
  getMenuAPI();
}

init();
