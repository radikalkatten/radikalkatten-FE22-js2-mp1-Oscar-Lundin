// sten = 1, sax = 2, påse = 3

const nameButton = document.getElementById('nameButton');
const nameInput = document.getElementById('nameInput');
const username = document.querySelector('h1');
let userName = ""
const yourPoints = document.getElementById('yourPoints')
const computerPoints = document.getElementById('computerPoints')
const userChoice = document.getElementById('userChoice')
const computerChoice = document.getElementById('computerChoice')
const highscoresdiv = document.getElementById('highscoresdiv')
let userScore = 0;
let computerScore = 0;

const winner = document.getElementById('result')
const header = {
  "Content-type": "application/json; charset=UTF-8"
}

computerPoints.innerText = "Datorns poäng: " + computerScore
yourPoints.innerText = "Dina poäng: " + userScore
function changeh1(event){
  event.preventDefault();
  username.innerText = 'Hej, '+ nameInput.value;
  
  userName = nameInput.value
  startGame.classList.remove("inactiveGame")
  
}
let highscoresarray = []
const dataBaseURLget = "https://sten-26b2a-default-rtdb.europe-west1.firebasedatabase.app/highscores/.json"
async function highScores(){
  const fetchScores = await fetch(dataBaseURLget)
  const data = await fetchScores.json()
  
  let postID = Object.keys(data)
  console.log(postID)
  for(let i = 0; i < postID.length; i++){
    const databaseURLpost = `https://sten-26b2a-default-rtdb.europe-west1.firebasedatabase.app/highscores/${postID[i]}.json`
    const fetchPost = await fetch(databaseURLpost)
    const postData = await fetchPost.json()
    highscoresarray.push(postData)
    highscoresarray.sort((h1, h2) => (h1.userScore < h2.userScore) ? 1 : (h1.userScore > h2.userScore) ? -1 : 0);
  }
  for(let i = 0; i < 5; i++){
    let postScore = `${i+1}: ` + highscoresarray[i].userName + highscoresarray[i].userScore
    let createPost = document.createElement('h1')
    createPost.innerText = postScore 
    highscoresdiv.appendChild(createPost)
  }
  
}
highScores()
console.log(highscoresarray)
async function saveName(userName, userScore){
  const bodyContent = {
    userName,
    userScore
  }
  const nameSave = {
    method: "post",
    body: JSON.stringify(bodyContent),
    headers: header,
  }
  await fetch(dataBaseURLget, nameSave)
  .then(response => response.json())
  .then(data => console.log(data))
}


function showGame(event){
  event.preventDefault();
  buttonContainer.classList.remove("inactiveGame");
  startGame.classList.add("inactiveGame")
  yourPoints.classList.remove("inactiveGame")
  computerPoints.classList.toggle("inactiveGame")
}

nameButton.addEventListener('click', changeh1);

function compInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function roundEnd(result){
  // 0 = draw, 1 = vinst, 2 = förlust
  let resultMessage = "";
  if(result === 0){
    resultMessage = "Det blev lika!"
  }
  if(result === 1){
    userScore++
    resultMessage = "Du vann!"
    yourPoints.innerText = "Dina poäng: " + userScore
  }
  if(result === 2){
    computerScore++
    resultMessage = "Du förlorade! sopa"
    computerPoints.innerText = "Datorns poäng: " + computerScore
  }
  let resultText = document.querySelector("#roundWinner")
  resultText.innerText = resultMessage;
  gameOver(computerScore, userScore)
}

function resetGame(){
  location.reload();
}

function gameOver(computerScore, userScore){
  if(computerScore >= 1){
    document.getElementById('userSten').disabled = true;
    document.getElementById('userSax').disabled = true;
    document.getElementById('userPåse').disabled = true;
    resetButton.classList.remove('inactiveGame')
    saveName(userName, userScore)
    
  }
 
}

const stenButton = document.getElementById('userSten')
stenButton.addEventListener('click', ()=>{
  const rndInt = compInt(1, 3)
  if(rndInt === 1){
    roundEnd(0)
    userChoice.innerText = "Du valde sten"
    computerChoice.innerText = "Elon Musk valde sten"
  }else if(rndInt=== 2){
    roundEnd(1)
    userChoice.innerText = "Du valde sten"
    computerChoice.innerText = "Elon Musk valde sax"
  }else{
    roundEnd(2)
    userChoice.innerText = "Du valde sten"
    computerChoice.innerText = "Elon Musk valde påse"
  }
})
const saxButton = document.getElementById('userSax')
saxButton.addEventListener('click', ()=>{
  const rndInt = compInt(1, 3)
  if(rndInt === 1){
    roundEnd(2)
    userChoice.innerText = "Du valde sax"
    computerChoice.innerText = "Elon Musk valde sten"
  }else if(rndInt=== 2){
    roundEnd(0)
    userChoice.innerText = "Du valde sax"
    computerChoice.innerText = "Elon Musk valde sax"
  }else{
    roundEnd(1)
    userChoice.innerText = "Du valde sax"
    computerChoice.innerText = "Elon Musk valde påse"
  }
})
const påseButton = document.getElementById('userPåse')
påseButton.addEventListener('click', ()=>{
  const rndInt = compInt(1, 3)
  if(rndInt === 1){
    roundEnd(1)
    userChoice.innerText = "Du valde påse"
    computerChoice.innerText = "Elon Musk valde sten"
  }else if(rndInt=== 2){
    roundEnd(2)
    userChoice.innerText = "Du valde påse"
    computerChoice.innerText = "Elon Musk valde sax"
  }else{
    roundEnd(0)
    userChoice.innerText = "Du valde påse"
    computerChoice.innerText = "Elon Musk valde påse"
  }
})
const startGame = document.getElementById('startGame')
const buttonContainer = document.getElementById('buttonContainer')
startGame.addEventListener('click', showGame,)

const resetButton = document.querySelector('#resetButton')
resetButton.addEventListener('click', resetGame)