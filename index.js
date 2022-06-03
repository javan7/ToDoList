const inp = document.querySelector(".inp");
const btn = document.querySelector(".btn");
const list = document.querySelector(".list");
const find = document.querySelector(".find");
const findbtn = document.querySelector(".findbtn");

const myStorage = window.localStorage;

/** data block **/
let inputText = "";
let inputFindText = "";
let arrData = JSON.parse(myStorage.getItem("taskSaver")) || [];
let filtredData = [...arrData];
let id = 3;

/** business block **/

// получаем текст из инпута и добавляем его в переменную
const getText = (event) => {
  inputText = event.target.value;
};
// получаем текст из инпута и добавляем его в переменную
const getFindText = (event) => {
  inputFindText = event.target.value;
};

// пушим в arrData(проверяем что не пустая строка)
const changeData = (data, text) => {
  if (text) {
    data.push({ id: id++, value: text, edit: false });
  }
  filtredArr(arrData, inputFindText);
  inp.value = "";
  addTask();
};

// удаление
const removeTask = (id) => {
  const index = arrData.findIndex((elem) => elem.id === id);
  arrData.splice(index, 1);
  filtredArr(arrData, inputFindText);
  addTask();
};

//редактирование
const editTask = (id) => {
  const index = arrData.findIndex((elem) => elem.id === id);
  if (arrData[index].edit) {
    arrData[index].edit = false;
  } else {
    arrData[index].edit = true;
  }
  addTask();
};

// сохранение при редактировании
const saveTask = (id, text) => {
  const index = arrData.findIndex((elem) => elem.id === id);
  arrData[index].value = text;
};

//фильтрация
const filtredArr = (arr, filtredText) => {
  filtredData = arr.filter((elem) => elem.value.includes(filtredText));
  console.log(filtredData);
  addTask();
};

/** render block **/

//отрисовываем элементы
const render = (element) => {
  const li = document.createElement("li");
  const button = document.createElement("button");
  const buttonEdit = document.createElement("button");
  let taskText = null;

  if (element.edit) {
    taskText = document.createElement("input");
    taskText.value = element.value;
    taskText.addEventListener("keyup", (event) =>
      saveTask(element.id, event.target.value)
    );
    taskText.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        editTask(element.id);
      }
    });
    buttonEdit.innerHTML = `${"&#10004;"}`;
  } else {
    taskText = document.createElement("span");
    taskText.innerHTML = element.value;
    buttonEdit.innerHTML = `${"&#9998;"}`;
  }
  taskText.style.outline = "none";
  taskText.style.border = "none";
  taskText.style.borderRadius = "15px";
  taskText.style.background = "rgba(209, 42, 30, 0)";
  taskText.style.fontSize = "20px";
  taskText.style.fontWeight = "bold";
  taskText.style.color = "darkslategray";
  taskText.style.maxWidth = "150px";
  button.innerHTML = `${"&#10006;"}`;
  button.addEventListener("click", () => removeTask(element.id));
  buttonEdit.addEventListener("click", () => editTask(element.id));
  buttonEdit.style.marginLeft = "15px";
  button.style.marginLeft = "15px";
  buttonEdit.style.background = "green";
  button.style.background = "red ";
  buttonEdit.style.color = "white";
  button.style.color = "white";
  button.style.outline = "none";
  button.style.border = "none";
  buttonEdit.style.outline = "none";
  buttonEdit.style.border = "none";
  button.style.borderRadius = "50%";
  buttonEdit.style.borderRadius = "50%";
  li.append(taskText);
  li.append(buttonEdit);
  li.append(button);
  list.append(li);
};

// нажатие на кнопку
const addTask = () => {
  list.innerHTML = "";
  if (filtredArr.length) {
    filtredData.forEach((item) => {
      render(item);
    });
  } else {
    arrData.forEach((item) => {
      render(item);
    });
  }
  if (arrData.length == 0) {
    list.classList.add("none");
  } else {
    list.classList.remove("none");
  }
  myStorage.setItem("taskSaver", JSON.stringify(arrData));
};

addTask();

/** listeners **/
inp.addEventListener("keyup", getText);
inp.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    changeData(arrData, inputText);
  }
});
btn.addEventListener("click", () => changeData(arrData, inputText));
find.addEventListener("keyup", getFindText);
findbtn.addEventListener("click", () => filtredArr(arrData, inputFindText));
