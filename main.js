// 유저가 값을 입력한다
// + 버튼을 클릭하면, 할일이 추가된다
// 삭제 버튼을 클릭하면, 할일이 삭제된다
// 체크 버튼을 클릭하면, 할일이 끝나고 밑줄이 생긴다
// 진행중, 끝남 탭을 누르면 언더바가 이동한다
// 완료 탭은 완료된 일들만, 진행중 탭은 진행중인 일들만 나타난다
// 전체 탭은 전체 할일이 나타난다

const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
addBtn.addEventListener('click', addTask);
let taskList = [];

function addTask() {
  const taskValue = taskInput.value.trim();
  if (taskValue === '') return;

  taskList.push(taskValue);
  taskInput.value = '';
  render();
}

function render() {
  let resultHTML = '';
  for (let i = 0; i < taskList.length; i++) {
    resultHTML += `<div class="task">
            <div>${taskList[i]}</div>
            <div>
              <button>Check</button>
              <button>Delete</button>
            </div>
          </div>`;
  }
  document.getElementById('task-board').innerHTML = resultHTML;
}
