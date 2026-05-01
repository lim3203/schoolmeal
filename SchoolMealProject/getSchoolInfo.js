const PROXY_URL = "https://schoolmealproject.sunglim3203.workers.dev";
const API_EDUCODE = "Q10";
const API_SCHOOLCODE = "8490325";

const HTMLmenuTitle = document.querySelector(".menuTitle");
const HTMLschoolmeal_M = document.querySelector(".schoolmeal_M");
const HTMLschoolmeal_L = document.querySelector(".schoolmeal_L");
const HTMLschoolmeal_D = document.querySelector(".schoolmeal_D");
const HTMLtitle_M = document.querySelector(".morningTitle");
const HTMLtitle_L = document.querySelector(".lunchTitle");
const HTMLtitle_D = document.querySelector(".dinnerTitle");
const morningButton = document.querySelector(".morningButton");
const HTMLcssDate = document.querySelector(".CSSdate");
const dayButtons = document.querySelectorAll(".day-btn");

let mealDate = new Date(); 
let morningButtonStatus = 0; // 변수 선언 확인

function formatApiDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}${month}${day}`;
}

function updateDateAndTitle() {
  const realToday = new Date();
  const d1 = new Date(mealDate.getFullYear(), mealDate.getMonth(), mealDate.getDate());
  const d2 = new Date(realToday.getFullYear(), realToday.getMonth(), realToday.getDate());
  
  const diffTime = d1 - d2;
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    HTMLmenuTitle.innerHTML = "오늘의 급식";
  } else if (diffDays === 1) {
    HTMLmenuTitle.innerHTML = "내일의 급식";
  } else if (diffDays === -1) {
    HTMLmenuTitle.innerHTML = "어제의 급식";
  } else {
    HTMLmenuTitle.innerHTML = `${mealDate.getMonth() + 1}월 ${mealDate.getDate()}일 급식`;
  }

  const API_DATE = formatApiDate(mealDate);
  HTMLcssDate.innerHTML = `${mealDate.getMonth() + 1}월 ${mealDate.getDate()}일`;
  
  dayButtons.forEach(btn => {
    btn.classList.toggle("active", parseInt(btn.dataset.day) === mealDate.getDay());
  });
  
  return API_DATE;
}

function isWeekend(dateStr) {
  const y = dateStr.substring(0, 4);
  const m = dateStr.substring(4, 6);
  const d = dateStr.substring(6, 8);
  const date = new Date(Number(y), Number(m) - 1, Number(d));
  const day = date.getDay();
  return day === 0 || day === 6;
}

async function getMenuAPI() {
  const API_DATE = formatApiDate(mealDate);
  const url = `${PROXY_URL}?date=${API_DATE}`;
  
  HTMLschoolmeal_L.innerHTML = "LOADING...";
  HTMLschoolmeal_D.innerHTML = "LOADING...";

  try {
    const response = await fetch(url);
    const json = await response.json();

    if (json.mealServiceDietInfo) {
      const rows = json.mealServiceDietInfo[1].row;
      
      let schoolmealInfo_M = "";
      let calInfo_M = "";
      HTMLschoolmeal_L.innerHTML = "정보 없음";
      HTMLschoolmeal_D.innerHTML = "정보 없음";

      rows.forEach(row => {
        const mealType = row.MMEAL_SC_NM;
        const menu = row.DDISH_NM;
        const cal = row.CAL_INFO;

        if (mealType === "조식") {
          schoolmealInfo_M = menu;
          calInfo_M = cal;
        } else if (mealType === "중식") {
          HTMLschoolmeal_L.innerHTML = menu;
          HTMLtitle_L.innerHTML = `점심 | ${cal}`;
        } else if (mealType === "석식") {
          HTMLschoolmeal_D.innerHTML = menu;
          HTMLtitle_D.innerHTML = `저녁 | ${cal}`;
        }
      });
      
      if (morningButtonStatus === 1) {
        HTMLschoolmeal_M.innerHTML = schoolmealInfo_M || "정보 없음";
        HTMLtitle_M.innerHTML = `아침 | ${calInfo_M || ""}`;
      } else {
        HTMLschoolmeal_M.innerHTML = "";
        HTMLtitle_M.innerHTML = "아침";
      }

      // 전역 변수 업데이트 (아침 버튼용)
      window.currentSchoolmealInfo_M = schoolmealInfo_M;
      window.currentCalInfo_M = calInfo_M;

    } else {
      handleNoMeal();
    }
  } catch (error) {
    console.error("Failed to fetch meal info:", error);
    handleNoMeal();
  }
}

function handleNoMeal() {
  const API_DATE = formatApiDate(mealDate);
  const message = isWeekend(API_DATE) ? "주말입니다!" : "급식 정보가 없습니다.";
  HTMLschoolmeal_L.innerHTML = message;
  HTMLschoolmeal_D.innerHTML = message;
  HTMLtitle_L.innerHTML = "점심";
  HTMLtitle_D.innerHTML = "저녁";
  HTMLschoolmeal_M.innerHTML = "";
  HTMLtitle_M.innerHTML = "아침";
  window.currentSchoolmealInfo_M = "";
  window.currentCalInfo_M = "";
}

function setupEventListeners() {
  morningButton.addEventListener("click", () => {
    morningButtonStatus = (morningButtonStatus === 0) ? 1 : 0;
    if (morningButtonStatus === 1) {
      HTMLschoolmeal_M.innerHTML = window.currentSchoolmealInfo_M || "정보 없음";
      HTMLtitle_M.innerHTML = `아침 | ${window.currentCalInfo_M || ""}`;
      morningButton.innerText = "CLOSE";
    } else {
      HTMLtitle_M.innerHTML = "아침";
      HTMLschoolmeal_M.innerHTML = "";
      morningButton.innerText = "OPEN";
    }
  });

  dayButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const now = new Date();
      let targetDay = parseInt(btn.dataset.day);
      let currentDay = now.getDay();
      
      if (targetDay === 0) targetDay = 7;
      if (currentDay === 0) currentDay = 7;
      
      const diff = targetDay - currentDay;
      mealDate = new Date(now);
      mealDate.setDate(now.getDate() + diff);

      updateDateAndTitle();
      getMenuAPI();
    });
  });
}

function initMealApp() {
  const now = new Date();
  if (now.getHours() >= 19) {
    mealDate.setDate(now.getDate() + 1);
  }
  
  updateDateAndTitle();
  getMenuAPI();
  setupEventListeners();
}

initMealApp();
