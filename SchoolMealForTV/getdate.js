const date1 = new Date(),
	  dateHtml = document.querySelector(".CSSdate");

let Ndate = "0";


function init(){
	 Ndate = `${date.getMonth()+1 > 9 ? date.getMonth()+1 : `0${date.getMonth()+1}`}월 ${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate() }일`;
	console.log(Ndate);
	dateHtml.innerHTML = Ndate;
}




init();