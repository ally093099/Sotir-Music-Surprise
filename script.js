const SECRET_CODE = "0913";
const lockScreen = document.getElementById("lockScreen");
const mainContent = document.getElementById("mainContent");
const input = document.getElementById("secretCode");
const error = document.getElementById("errorMessage");
const music = document.getElementById("bgMusic");
const playBtn = document.getElementById("playBtn");
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
  window.scrollTo({top:0, behavior:"instant"});
  spawnHearts(12);
}

document.getElementById("unlockBtn").addEventListener("click", unlock);

input.addEventListener("keydown", e => {
  if(e.key === "Enter") unlock();
});

async function startMusic(){
  try{
    await music.play();

    musicStatus.textContent = "Now playing ♡";
    playBtn.textContent = "♪ Music is playing";
    playBtn.disabled = true;
    musicPlayer.classList.remove("hidden");
    spawnHearts(18);

  }catch(e){
    console.error("Music playback error:", e);
    musicStatus.textContent = "Music couldn't start. Please use the audio player below.";
    playBtn.disabled = false;
  }
}

playBtn.addEventListener("click", startMusic);

const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting) entry.target.classList.add("visible");
  });
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
