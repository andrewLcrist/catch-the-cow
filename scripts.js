const spots = document.querySelectorAll('.spot')
const scoreBoard = document.querySelector('.score')
const startGameScreen = document.querySelector('.start-game-screen')
let lastSpot
let timeUp = false
let score = 0

function peep() {
  const time = randomTime(400, 1500)
  const spot = randomSpot(spots)
  spot.classList.add('show')
  setTimeout(() => {
    spot.classList.remove('show');
    if (!timeUp) peep();
  }, time);
}

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomSpot(spots) {
  const idx = Math.floor(Math.random() * spots.length);
  const spot = spots[idx]
  if(spot == lastSpot){
    console.log('Same spot as last time');
    return randomSpot(spots)
  }
  lastSpot = spot
  return spot
}

function capture(e) {
  if(!e.isTrusted) return;
  score++;
  this.classList.remove('show');
  scoreBoard.textContent = score;
}

function startGame() {
  scoreBoard.textContent = score;
  startGameScreen.style.display = 'none'
  timeUp = false;
  score = 0;
  peep();
  setTimeout(() => {
    timeUp = true,
    startGameScreen.style.display = 'block'
  }, 10000)
}

spots.forEach(spot => spot.addEventListener('click', capture))
