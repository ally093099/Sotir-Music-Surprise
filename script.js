const SECRET_CODE = "0913";
const lockScreen = document.getElementById("lockScreen");
const mainContent = document.getElementById("mainContent");
const input = document.getElementById("secretCode");
const error = document.getElementById("errorMessage");
const music = document.getElementById("bgMusic");
const playBtn = document.getElementById("playBtn");
const replayBtn = document.getElementById("replayBtn");
const pauseBtn = document.getElementById("pauseBtn");
const musicPlayer = document.getElementById("musicPlayer");
const musicStatus = document.getElementById("musicStatus");

function unlock(){
  if(input.value.trim() !== SECRET_CODE){
    error.textContent = "Hmm... that's not the right code, lovelovee. 🤍";
    input.value = "";
    input.focus();
    return;
  }
  lockScreen.classList.remove("active");
  lockScreen.style.display = "none";
  mainContent.classList.remove("hidden");
  window.scrollTo({top:0,behavior:"instant"});
  spawnHearts(12);
}

document.getElementById("unlockBtn").addEventListener("click", unlock);
input.addEventListener("keydown", e => { if(e.key === "Enter") unlock(); });

async function startMusic(){
  try{
    // Make sure the browser reloads the local MP3 source.
    music.load();
    music.currentTime = 0;
    const playPromise = music.play();
    if (playPromise !== undefined) await playPromise;

    musicStatus.textContent = "Now playing ♡";
    playBtn.textContent = "♪ Music is playing";
    playBtn.disabled = true;
    musicPlayer.classList.remove("hidden");
    pauseBtn.textContent = "Ⅱ";
    spawnHearts(18);
  }catch(e){
    console.error("Music playback error:", e);
    musicStatus.textContent = "Music couldn't start. Check that the MP3 is inside the music folder and named exactly my-love-mine-all-mine.mp3.";
    playBtn.disabled = false;
  }
}
playBtn.addEventListener("click", startMusic);
replayBtn.addEventListener("click", startMusic);
pauseBtn.addEventListener("click", ()=>{
  if(music.paused){ music.play(); pauseBtn.textContent="Ⅱ"; musicStatus.textContent="Now playing ♡"; }
  else{ music.pause(); pauseBtn.textContent="▶"; musicStatus.textContent="Music paused"; }
});

const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{ if(entry.isIntersecting) entry.target.classList.add("visible"); });
},{threshold:.14});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

function spawnHearts(count){
  for(let i=0;i<count;i++){
    const heart=document.createElement("div");
    heart.className="floating-heart";
    heart.textContent=Math.random()>.25?"♡":"♥";
    heart.style.left=Math.random()*100+"vw";
    heart.style.animationDuration=(3+Math.random()*3)+"s";
    heart.style.fontSize=(12+Math.random()*18)+"px";
    document.getElementById("hearts").appendChild(heart);
    setTimeout(()=>heart.remove(),6500);
  }
}
