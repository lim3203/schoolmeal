const HTMLtextInput = document.querySelector(".gSearch"),
HTMLgSearchButton = document.querySelector(".gSearchButton");

let HTMLinput = 0;

function init(){
	HTMLgSearchButton.addEventListener("click", () => {
		HTMLinput = HTMLtextInput.value;
		const url = `https://www.google.com/search?q=${HTMLinput}`;
		window.open(url, "_blank");		
	});
	
	HTMLgSearchButton.addEventListener("keydown", evt => {
  		if (evt.code === "Enter") evt.preventDefault();
	});
}

init();