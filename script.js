const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const speakButton = document.querySelector("#speak");
const stopButton = document.querySelector("#stop");
const textArea = document.querySelector("#textbox");

// const speech=window.speechSynthesis;

window.onload = function () {
  msg.text = textArea.value;
};

populateVoices = () => {
  voices = speechSynthesis.getVoices();
  // console.log(voices);
  populateList(voices);
};

populateList = (voices) => {
  voicesDropdown.innerHTML += voices
    .map((voice) => {
      return `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`;
    })
    .join("");
};

changeVoice = (event) => {
  speechSynthesis.cancel();

  // console.log(event.target.value);

  let voice1 = voices.find((voice) => voice.name === event.target.value);
  console.log(voice1);
  msg.voice = voice1;
  speechSynthesis.speak(msg);

  getText();
};

getText = () => {
  speechSynthesis.cancel();

  msg.text = textArea.value;
  console.log(textArea.value);
  speechSynthesis.speak(msg);
};

changeRange = (event) => {
  speechSynthesis.cancel();

  // console.log(event.target.value);

  if (event.target.name === "rate") {
    msg.rate = event.target.value;
  } else {
    msg.pitch = event.target.value;
  }
  getText();
};

speakButton.addEventListener("click", getText);
stopButton.addEventListener("click", () => speechSynthesis.cancel());

voicesDropdown.addEventListener("change", changeVoice);
speechSynthesis.addEventListener("voiceschanged", populateVoices);

document
  .querySelectorAll('[type="range"]')
  .forEach((slider) => slider.addEventListener("change", changeRange));
