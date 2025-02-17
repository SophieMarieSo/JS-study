// 랜덤번호 지정
// 유저가 번호를 입력 후 go 버튼 클릭
// 유저가 랜덤번호를 맞추면, "맞췄습니다!"
// 랜덤번호 < 유저 번호, "DOWN!"
// 랜덤번호 < 유저 번호, "UP!"
// 리셋 버튼을 누으면 게임이 reset
// 3번의 기회를 다 쓰면, 게임 종료 (더 이상 입력불가, 버튼 disabled)
// 1~100 범위 밖의 숫자를 입력하면, 경고 메시지 표시 (기회는 그대로)
// 이미 입력한 숫자를 또 입력하면, 경고 메시지 표시 (기회는 그대로)

let computerNum = 0;
let chance = 3;
let gameOver = false;
let isAnswer = false;
let history = [];
const playBtn = document.getElementById('play-btn');
const resetBtn = document.getElementById('reset-btn');
const userInput = document.getElementById('user-input');
const resultArea = document.getElementById('result-area');
const answerArea = document.getElementById('answer-area');
const chanceArea = document.getElementById('chance-area');

playBtn.addEventListener('click', play);
resetBtn.addEventListener('click', reset);
userInput.addEventListener('focus', clearInput);

const pickRandomNumber = () => {
  computerNum = Math.floor(Math.random() * 100) + 1;
  answerArea.textContent = `정답: ${computerNum}`;
};

function clearInput() {
  userInput.value = '';
}

function play() {
  const userValue = userInput.value;

  if (userValue < 1 || userValue > 100) {
    resultArea.textContent = '1과 100 사이 숫자를 입력하시오😎';
    chanceArea.textContent = `${chance}번의 기회가 남았습니다😮`;
    return;
  }

  if (history.includes(userValue)) {
    resultArea.textContent =
      '이미 입력한 숫자입니다. 다른 숫자를 입력해 주세요';
    chanceArea.textContent = `${chance}번의 기회가 남았습니다😮`;
    return;
  }

  chance--;
  chanceArea.textContent = `${chance}번의 기회가 남았습니다😮`;

  if (userValue < computerNum) {
    resultArea.textContent = '결과: UP🔼';
  } else if (userValue > computerNum) {
    resultArea.textContent = '결과: DOWN🔽';
  } else if (userValue == computerNum) {
    gameOver = true;
    isAnswer = true;
  }

  history.push(userValue);

  if (chance === 0) gameOver = true;
  if (gameOver) {
    playBtn.disabled = true;
    resultArea.textContent = isAnswer ? '결과: 정답🎉' : 'GAME OVER😥';
  }
}

function reset() {
  pickRandomNumber();
  chance = 3;
  userInput.value = '';
  resultArea.textContent = '결과';
  chanceArea.textContent = `${chance}번의 기회가 남았습니다😮`;
  gameOver = false;
  isAnswer = false;
  playBtn.disabled = false;
}

pickRandomNumber();
