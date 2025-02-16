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
const playBtn = document.getElementById('play-btn');
const resetBtn = document.getElementById('reset-btn');
const userNum = document.getElementById('user-number');
const resultArea = document.getElementById('result-area');
const answerArea = document.getElementById('answer-area');
const chanceArea = document.getElementById('chance-area');

playBtn.addEventListener('click', play);
resetBtn.addEventListener('click', reset);

const pickRandomNumber = () => {
  computerNum = Math.floor(Math.random() * 100) + 1;
};

function play() {
  const userValue = userNum.value;
  chance--;

  if (chance < 1) gameOver = true;
  if (chance > 0) chanceArea.textContent = `${chance}회 기회가 남았습니다😮`;
  if (gameOver) {
    chanceArea.textContent = `${chance}회 기회가 남았습니다😮`;
    resultArea.textContent = 'GAME OVER🤣';
    playBtn.disabled = true;
  } else {
    if (userValue < computerNum) {
      resultArea.textContent = '결과: UP🔼';
    } else if (userValue > computerNum) {
      resultArea.textContent = '결과: DOWN🔽';
    } else if (userValue == computerNum) {
      resultArea.textContent = '결과: 정답🎉';
    }
  }
}

function reset() {
  pickRandomNumber();
  chance = 3;
  userNum.value = '';
  answerArea.textContent = `정답: ${computerNum}`;
  resultArea.textContent = '결과';
  chanceArea.textContent = `${chance}회 기회가 남았습니다😮`;
}

reset();
