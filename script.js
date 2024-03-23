const image = document.getElementById("cover");
const title = document.getElementById("music-title");
const artist = document.getElementById("music-artist");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const playerProgress = document.getElementById("player-progress");
const progress = document.getElementById("progress");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const playBtn = document.getElementById("play");
const background = document.getElementById("bg-img");

// Yeni bir audio nesnesi olustur
const music = new Audio();

// Muzik Listesi
const songs = [
  {
    path: "assets/bm1.mp3",
    displayName: "Dönence",
    cover: "assets/bm2.jpg",
  },

  {
    path: "assets/ck1.mp3",
    displayName: "Bu Son Olsun",
    cover: "assets/ck2.jpeg",
  },

  {
    path: "assets/ek1.mp3",
    displayName: "Seni Her Gördüğümde",
    cover: "assets/ek2.webp",
  },

  {
    path: "assets/m1.mp3",
    displayName: "Hardwired",
    cover: "assets/m2.jpeg",
  },
];

let musicIndex = 0; // Calinan sarkiyi takip etmek icin index
let isPlaying = false; // Sarki caliyor mu? Kontrol.

// Oynat veya Duraklat Fonksiyonu
function togglePlay() {
  if (isPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
}

// Sarkiyi Baslat
function playMusic() {
  isPlaying = true;
  // Oynatma butonunun simgesini degistir
  playBtn.classList.replace("fa-play", "fa-pause");
  // Oynatma butonu uzerine gelindiginde gorunen metin
  playBtn.setAttribute("title", "Duraklat");
  music.play();
}

// Sarkiyi Duraklat
function pauseMusic() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Oynat");
  music.pause();
}

// Sarkiyi Yukle
function loadMusic(songs) {
  music.src = songs.path;
  title.textContent = songs.displayName;
  artist.textContent = songs.artist;
  image.src = songs.cover;
  background.src = songs.cover;
}

// Sarki Degistirme (onceki-sonraki)
function changeMusic(direction) {
  musicIndex = (musicIndex + direction + songs.length) % songs.length;
  loadMusic(songs[musicIndex]);
  playMusic();
}

// Ilerleme Cubugunu Guncelle
function updateProgressBar() {
  const { duration, currentTime } = music;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;

  const formatTime = (time) => String(Math.floor(time)).padStart(2, "0");
  durationEl.textContent = `${formatTime(duration / 60)}: ${formatTime(
    duration % 60
  )}`;
  currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(
    currentTime % 60
  )}`;
}

// İlerleme Cubugunu tiklandigi yere ayarla
function setProgressBar(e) {
  const width = playerProgress.clientWidth;
  const clickX = e.offsetX;
  music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener("click", togglePlay);

prevBtn.addEventListener("click", () => changeMusic(-1));
nextBtn.addEventListener("click", () => changeMusic(1));

music.addEventListener("ended", () => changeMusic(1));

music.addEventListener("timeupdate", updateProgressBar);

playerProgress.addEventListener("click", setProgressBar);

loadMusic(songs[musicIndex]);
