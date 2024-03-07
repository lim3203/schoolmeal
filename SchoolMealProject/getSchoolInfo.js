const API_KEY = "4fc5c967cc2d4ee0943aa17e3a78d7a7",
  API_EDUCODE = "Q10",
  API_SCHOOLCODE = "8490325",
  stGrade = "1",
  claNumber = localStorage.getItem("CLANUM"),
  subTitle =  document.querySelector(".subTitle"),
  cssDate = document.querySelector(".CSSdate"),
  HTMLschoolmeal_M = document.querySelector(".schoolmeal_M"),
  HTMLschoolmeal_L = document.querySelector(".schoolmeal_L"),
  HTMLschoolmeal_D = document.querySelector(".schoolmeal_D"),
  HTMLtitle_M = document.querySelector(".morningTitle"),
  HTMLtitle_L = document.querySelector(".lunchTitle"),
  HTMLtitle_D = document.querySelector(".dinnerTitle"),
  HTMLmenuTitle = document.querySelector(".menuTitle"),
  morningButton = document.querySelector(".morningButton"),
  date = new Date();

  
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
  morningButtonStatus = "0";

function getDateInfo(){
  if (date.getHours()<19){
    API_DATE =`${date.getFullYear()}${date.getMonth()+1 > 9 ? date.getMonth()+1 : `0${date.getMonth()+1}`}${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate() }`;
    console.log("today");
  } else {
    date.setDate(date.getDate()+1);
    API_DATE =`${date.getFullYear()}${date.getMonth()+1 > 9 ? date.getMonth()+1 : `0${date.getMonth()+1}`}${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate() }`;
    HTMLmenuTitle.innerHTML= `내일의 급식`;
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

function getMenuAPI(){
  fetch(`https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=${API_KEY}&Type=json&ATPT_OFCDC_SC_CODE=${API_EDUCODE}&SD_SCHUL_CODE=${API_SCHOOLCODE}&MMEAL_SC_NM=${API_MMEAL}&MLSV_YMD=${API_DATE}`)
  .then(function(response){
    return response.json();
  })
  .then(function(json){
    try {
		console.log(date.getDay());
      schoolmealInfo_M = json.mealServiceDietInfo[1].row[0].DDISH_NM;
      schoolmealInfo_L = json.mealServiceDietInfo[1].row[1].DDISH_NM;
	  calInfo_M = json.mealServiceDietInfo[1].row[0].CAL_INFO;
	  calInfo_L = json.mealServiceDietInfo[1].row[1].CAL_INFO;
	  HTMLtitle_L.innerHTML = `점심 | ${calInfo_L}`;
			HTMLschoolmeal_D.innerHTML = ``;
	  HTMLschoolmeal_L.innerHTML = schoolmealInfo_L;
	  schoolmealInfo_D = json.mealServiceDietInfo[1].row[2].DDISH_NM;
	  calInfo_D = json.mealServiceDietInfo[1].row[2].CAL_INFO;
      //console.log(json.mealServiceDietInfo);
	
	  //HTMLtitle_M.innerHTML = `아침 | ${calInfo_M}`;
	  HTMLtitle_D.innerHTML = `저녁 | ${calInfo_D}`;
      //HTMLschoolmeal_M.innerHTML = schoolmealInfo_M;
      HTMLschoolmeal_D.innerHTML = schoolmealInfo_D;
		
    } catch (e) {
      if (weekendCheck(API_DATE)) {
		  if(date.getDay() == 6){
			HTMLschoolmeal_L.innerHTML = schoolmealInfo_L;
			HTMLschoolmeal_D.innerHTML = '주말입니다!';
			HTMLtitle_D.innerHTML = `저녁`;
		  }	else {
			HTMLschoolmeal_L.innerHTML = '주말입니다!';
			HTMLschoolmeal_D.innerHTML = '주말입니다!';
			schoolmealInfo_M.innerHTML = '주말입니다!';
	    	HTMLtitle_M.innerHTML = `아침`;
	    	HTMLtitle_L.innerHTML = `점심`;
	    	HTMLtitle_D.innerHTML = `저녁`;
		  }
        
      } else {
        //HTMLschoolmeal_M.innerHTML = `${e.name}:<br>급식 정보를 불러오지 못했습니다 :(`;
      }
    }
	  //console.log(json.mealServiceDietInfo);
  });

  //cssDate.innerHTML = API_DATE;
}

function showMorningMenu(){
	morningButton.addEventListener('click', ()=>{
		console.log(morningButtonStatus);
		if (morningButtonStatus == 0){
			morningButtonStatus = 1;
			HTMLschoolmeal_M.innerHTML = schoolmealInfo_M;
			HTMLtitle_M.innerHTML = `아침 | ${calInfo_M}`;
		} else {
			morningButtonStatus = 0;
		    HTMLtitle_M.innerHTML = `아침`;
			HTMLschoolmeal_M.innerHTML = "";
		}
	})
  /*document.querySelector(".tomorrowButton").addEventListener('click', ()=>{
    if (tomorrowButtonStatus == 0){
      tomorrowButtonStatus = 1;
      getDateInfo();
      getMenuAPI();
    } else {
      tomorrowButtonStatus = 0;
      getDateInfo();
      getMenuAPI();
    }
    console.log(tomorrowButtonStatus);
  })*/
}

function init(){
  getDateInfo();
  getMenuAPI();
  showMorningMenu();
  
}

init();
