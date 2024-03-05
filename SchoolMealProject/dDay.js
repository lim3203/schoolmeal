/*const HTMLdDay = document.querySelector(".dDay"),
	  HTMLclock = document.querySelector(".clock"),
	  dDayDate = new Date(2022, 06, 10);

let   dDayMin = 0,
	  dDaySec = 0,
	  dDayDay = 0,
	  dDayHour = 0;


function init(){
	const tDay = new Date();
	const dDay = dDayDate - tDay;
	dDaySec = Math.floor(dDay/1000%60); 
	dDayMin = 59 - tDay.getMinutes();
	dDayHour = 23 - tDay.getHours();
	dDayDay = Math.floor(dDay/(1000*60*60*24));
	//dDayMin = Math.floor(dDay/(1000*60)%60);
	//dDayHour = Math.floor(dDay/1000*60*60) % 24;
	/*console.log(dDayDate);
	console.log(dDaySec);*/
	//HTMLdDay.innerHTML = `${dDayDay}일 ${dDayHour}시간 ${dDayMin}분 ${dDaySec}초 남음`;


/*



	if(tDay.getHours()>12){
		const pmtDayHours = tDay.getHours() - 12;
		//console.log(pmtDayHours);
		HTMLclock.innerHTML = `오후 ${pmtDayHours}시 ${tDay.getMinutes()}분 ${tDay.getSeconds()}초`;
		
}   else   {
	HTMLclock.innerHTML = `오전 ${tDay.getHours()}시 ${tDay.getMinutes()}분 ${tDay.getSeconds()}초`;
}
	
}

init();
setInterval(init,1000);


