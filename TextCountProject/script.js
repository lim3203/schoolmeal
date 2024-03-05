const calButton = document.querySelector(".calButton"),
  textInput = document.querySelector('.textInput'),
  calResult = document.querySelector('.result'),
  calProgressR = document.querySelector('.progress');

/*function calculate() {
  calButton.addEventListener('click', () => {
    const text = textInput.value;
    const byteSize = new Blob([text]).size;
    console.log('Byte size: ', byteSize);
    calResult.innerHTML = `${byteSize} 바이트`;
    calProgress(byteSize);
  });;
}*/

function calculate() {
  textInput.addEventListener('input', () => {
    const text = textInput.value;
    const byteSize = new Blob([text]).size;
    //console.log('Byte size: ', byteSize);
    calResult.innerHTML = `${byteSize} 바이트`;
    calProgress(byteSize);
  });;
}

function calProgress(byteSize) {
  let percentR = byteSize / 1500 * 100;
  if (byteSize < 1500) {
    calProgressR.innerHTML = `${(percentR).toFixed(2)}% 진행됨, ${1500 - byteSize}바이트 작성가능`;
  } else if (byteSize == 1500) {
    calProgressR.innerHTML = `축하합니다! 100% 완료됨`;
  } else if (byteSize > 1500) {
    calProgressR.innerHTML = `${(percentR - 100).toFixed(2)}% 초과됨, ${byteSize - 1500}바이트 초과됨`;
  }
  changeText();
  //calProgressR.innerHTML = `${(percentR).toFixed(2)}% 진행됨, ${1500-byteSize}바이트 작성가능`;
}

function changeText() {
  // 텍스트의 색상을 붉은색으로 변경
  calResult.style.color = '#2ed573';

  // 500 밀리초 후에 원래 색상으로 변경
  setTimeout(() => {
    calResult.style.color = ''; // 또는 원래의 색상으로 변경하세요.
  }, 500);
}



function init() {
  console.log("hello world");
  calculate();
  //autoResize(textInput);
}

init();