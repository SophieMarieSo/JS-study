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
let tabs = document.querySelectorAll('.task-tabs div');
let mode = 'all';
let filteredList = [];
const underline = document.getElementById('underline');

for (let i = 1; tabs.length; i++) {
  tabs[i].addEventListener('click', function (e) {
    filter(e);
  });
}

function generateID() {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return '_' + Math.random().toString(36).substr(2, 9);
}

function addTask() {
  const value = taskInput.value.trim();
  if (value === '') return;

  const task = {
    id: generateID(),
    taskValue: value,
    isComplete: false,
  };

  taskList.push(task);
  taskInput.value = '';
  render();
}

function render() {
  let list = [];
  if (mode === 'all') {
    list = taskList;
  } else {
    list = filteredList;
  }

  let resultHTML = '';
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete) {
      resultHTML += `<div class="task">
            <div class='done'>${list[i].taskValue}</div>
            <div class='task-btn'>
              <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-rotate-right"></i></button>
              <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
            </div>
          </div>`;
    }

    if (list[i].isComplete == false) {
      resultHTML += `<div class="task">
            <div class='task-content'>${list[i].taskValue}</div>
            <div class='task-btn'>
              <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-check"></i></button>
              <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
            </div>
          </div>`;
    }
  }

  document.getElementById('task-board').innerHTML = resultHTML;
}

function toggleComplete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  filter();
}

function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id === id) {
      taskList.splice(i, 1);
    }
  }
  filter();
}

function filter(e) {
  if (e) {
    mode = e.target.id;
    underline.style.width = e.target.offsetWidth + 'px';
    underline.style.left = e.target.offsetLeft + 'px';
    underline.style.top =
      e.target.offsetTop + (e.target.offsetHeight - 4) + 'px';
  }

  filteredList = [];
  if (mode === 'onGoing') {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == false) {
        filteredList.push(taskList[i]);
      }
    }
  } else if (mode === 'done') {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete) {
        filteredList.push(taskList[i]);
      }
    }
  }
  render();
}
