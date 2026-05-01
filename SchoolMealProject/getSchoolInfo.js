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

let mealDate = new Date();
let API_DATE = "";
let schoolmealInfo_M = "";
let calInfo_M = "";
let morningButtonStatus = 0;

function formatApiDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}${month}${day}`;
}

function updateDateAndTitle() {
  if (mealDate.getHours() >= 19) {
    mealDate.setDate(mealDate.getDate() + 1);
    HTMLmenuTitle.innerHTML = "내일의 급식";
  }
  API_DATE = formatApiDate(mealDate);
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
        } else if (mealType === "중식") {
          HTMLschoolmeal_L.innerHTML = menu;
          HTMLtitle_L.innerHTML = `점심 | ${cal}`;
        } else if (mealType === "석식") {
          HTMLschoolmeal_D.innerHTML = menu;
          HTMLtitle_D.innerHTML = `저녁 | ${cal}`;
        }
      });
    } else {
      handleNoMeal();
    }
  } catch (error) {
    console.error("Failed to fetch meal info:", error);
    handleNoMeal();
  }
}

function handleNoMeal() {
  const message = isWeekend(API_DATE) ? "주말입니다!" : "급식 정보가 없습니다.";
  HTMLschoolmeal_L.innerHTML = message;
  HTMLschoolmeal_D.innerHTML = message;
  HTMLtitle_L.innerHTML = "점심";
  HTMLtitle_D.innerHTML = "저녁";
}

function setupEventListeners() {
  morningButton.addEventListener("click", () => {
    if (morningButtonStatus === 0) {
      morningButtonStatus = 1;
      HTMLschoolmeal_M.innerHTML = schoolmealInfo_M || "정보 없음";
      HTMLtitle_M.innerHTML = `아침 | ${calInfo_M || ""}`;
      morningButton.innerText = "CLOSE";
    } else {
      morningButtonStatus = 0;
      HTMLtitle_M.innerHTML = "아침";
      HTMLschoolmeal_M.innerHTML = "";
      morningButton.innerText = "OPEN";
    }
  });
}

function initMealApp() {
  updateDateAndTitle();
  getMenuAPI();
  setupEventListeners();
}

initMealApp();
