const playerName2 = document.querySelector('#name--1')
const player1 = document.querySelector('.player--0')
const player2 = document.querySelector('.player--1')

let player2_name = prompt("Ismingizni kiriting:")
playerName2.textContent = player2_name

// variable
const scoreAllPlayer1 = document.getElementById("score--0")
const scoreAllPlayer2 = document.getElementById("score--1")

const currentScore1 = document.getElementById("current--0")
const currentScore2 = document.getElementById("current--1")

const btnDisabled = document.querySelectorAll('.btn-disabled')

const imageUrl = document.querySelector('.dice')
let randomNumber = null
let activePlayer = false

let score1 = 0
let score2 = 0

function randomBtn (){
  randomNumber = Math.trunc(Math.random()*6+1)
  imageUrl.attributes.src.value = `dice-${randomNumber}.png`
  if(randomNumber === 1){
    takeTurn()
  }
  else{
    sumCurrentScore()
  }

}

function activePlayer2(){
  player1.classList.add('player--active')
  player2.classList.remove('player--active')
  activePlayer = false
  score2=0
  currentScore2.textContent = score2
}

function activePlayer1(){
  player1.classList.remove('player--active')
  player2.classList.add('player--active')
  activePlayer = true
  score1=0
  currentScore1.textContent = score1
}
function findActivePlayer(){
  if(activePlayer){
    scoreAllPlayer2.textContent = Number( scoreAllPlayer2.textContent) + score2
    activePlayer2()
  }
  else{
    scoreAllPlayer1.textContent = Number( scoreAllPlayer1.textContent) + score1
    activePlayer1()
  }
}

function takeTurn(){
  if(activePlayer){
    activePlayer2()
  }
  else{
    activePlayer1()
  }
}


function sumCurrentScore(){
  if(activePlayer){
    score2 += randomNumber
    currentScore2.textContent = score2
  }
  else{
    score1 += randomNumber
    currentScore1.textContent = score1
  }
}

function saveScore(){
  findActivePlayer()
  let res1 = Number(scoreAllPlayer1.textContent)
  let res2 = Number(scoreAllPlayer2.textContent)
  if(res1>=10 || res2>=10){
    finishedGame(res1,res2)
  }
}

let winPlayer = ""
function finishedGame(res1,res2){
  if(res1 >=10){
    player1.classList.add('win')
    winPlayer = "player1"
  }
  else if(res2 >= 10){
    player2.classList.add('win')
    winPlayer = "player2"
  }
  btnDisabled.forEach((el)=>{
   el.disabled=true
  })
}

function restartGame(){
  btnDisabled.forEach((el)=>{
    el.disabled=false
  })
  if(winPlayer === 'player1'){
    player1.classList.remove('win')
  }else{
    player2.classList.remove('win')
  }

  scoreAllPlayer1.textContent = +0;
  scoreAllPlayer2.textContent = +0
  currentScore1.textContent = +0
  currentScore2.textContent = +0
  activePlayer = true
  findActivePlayer()
}