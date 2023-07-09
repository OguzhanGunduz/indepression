var audio = new Audio("audio.mp3");
audio.volume = 0.1; // Set the volume level to 0.2
audio.loop = true; // Loop the audio
var isAudioPlaying = false;

function playAudio() {
  if (!isAudioPlaying) {
    audio.play();
    isAudioPlaying = true;
  }
}

document.addEventListener("click", playAudio);

var volumeBar = document.querySelector(".volume-bar");
var progressBar = document.querySelector(".progress");
var handle = document.querySelector(".handle");

volumeBar.addEventListener("click", function(event) {
  var barWidth = volumeBar.offsetWidth;
  var clickPosition = event.clientX - volumeBar.getBoundingClientRect().left;
  var volume = clickPosition / barWidth;
  audio.volume = volume;
  progressBar.style.width = (volume * 100) + "%";
  handle.style.left = (clickPosition - handle.offsetWidth / 2) + "px";
});

// İsteğe bağlı: Fareyle tutup sürüklemeyle ses seviyesini ayarlama
handle.addEventListener("mousedown", function(event) {
  event.preventDefault(); // Seçim yapmayı engelle
  window.addEventListener("mousemove", moveHandle);
  window.addEventListener("mouseup", releaseHandle);
});

function moveHandle(event) {
  var barWidth = volumeBar.offsetWidth;
  var newPosition = event.clientX - volumeBar.getBoundingClientRect().left;
  var volume = newPosition / barWidth;
  audio.volume = volume;
  progressBar.style.width = (volume * 100) + "%";
  handle.style.left = (newPosition - handle.offsetWidth / 2) + "px";
}

function releaseHandle() {
  window.removeEventListener("mousemove", moveHandle);
  window.removeEventListener("mouseup", releaseHandle);
}

