// Song list
const songs = [
  { title: "Worthy of my praise", artist: "Dunsin Oyekan", src: "songs/Dunsin-Oyekan-Worthy-of-My-Praise-.mp3", cover: "coverpicture/1900x1900-000000-81-0-0.jpg" },
  { title: "Tare", artist: "Kae-Strings", src: "songs/Kaestrings_-_Tare_CeeNaija.com_.mp3", cover: "coverpicture/0x1900-000000-80-0-0.jpg" },
  { title: "Joy on my account", artist: "Lawrence Oyor", src: "songs/Lawrence_Oyor_-_JOY_ON_MY_ACCOUNT_Tunesloaded.com.mp3", cover: "coverpicture/1900x1900-000000-81-0-0 (1).jpg" }
];

// Elements
const titleEl = document.getElementById("title");
const artistEl = document.getElementById("artist");
const coverEl = document.querySelector(".cover");
const progressEl = document.getElementById("progress");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const playlistEl = document.getElementById("playlist");

let currentSong = 0;
let isPlaying = false;
const audio = new Audio(songs[currentSong].src);

// Load a song into the player
function loadSong(index) {
  const song = songs[index];
  titleEl.textContent = song.title;
  artistEl.textContent = song.artist;
  coverEl.src = song.cover;
  audio.src = song.src;
  highlightActiveSong();
}

// Play or pause
function togglePlay() {
  if (isPlaying) {
    audio.pause();
  } else {
    audio.play();
  }
}

// Update play button icon
function updatePlayButton() {
  playBtn.innerHTML = isPlaying
    ? `<svg viewBox="0 0 24 24" fill="white"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`
    : `<svg viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>`;
}

// Next / Prev
function nextSong() {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(currentSong);
  audio.play();
}

function prevSong() {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong);
  audio.play();
}

// Progress bar update
audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    progressEl.value = (audio.currentTime / audio.duration) * 100;
  }
});

// Seek
progressEl.addEventListener("input", () => {
  audio.currentTime = (progressEl.value / 100) * audio.duration;
});

// Handle play / pause state
audio.addEventListener("play", () => {
  isPlaying = true;
  updatePlayButton();
});
audio.addEventListener("pause", () => {
  isPlaying = false;
  updatePlayButton();
});
audio.addEventListener("ended", nextSong);

// Event listeners
playBtn.addEventListener("click", togglePlay);
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

// Build playlist UI
songs.forEach((song, index) => {
  const li = document.createElement("li");
  li.textContent = `${song.title} - ${song.artist}`;
  li.addEventListener("click", () => {
    currentSong = index;
    loadSong(currentSong);
    audio.play();
  });
  playlistEl.appendChild(li);
});

// Highlight current song in playlist
function highlightActiveSong() {
  [...playlistEl.children].forEach((li, i) => {
    li.classList.toggle("active", i === currentSong);
  });
}

// Init
loadSong(currentSong);
