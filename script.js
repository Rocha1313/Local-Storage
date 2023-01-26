console.log();

document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();
});

const text = document.getElementById("input");
const add = document.getElementById("add");
const remAll = document.getElementById("remAll");
const allButtons = document.getElementsByClassName("buttonStyle");
let list = document.getElementById("list");

let storage = JSON.parse(localStorage.getItem("toDoList"));

if (storage) {
  for (let i = 0; i < storage.length; i++) {
    let li = document.createElement("li");
    li.innerHTML = storage[i];
    const delButton = document.createElement("button");
    delButton.innerHTML = "x";
    delButton.setAttribute("class", "buttonStyle");
    list.appendChild(li);
    li.appendChild(delButton);
  }
}

for (let i = 0; i < allButtons.length; i++) {
  allButtons[i].addEventListener("click", () => {
    console.log("yo");
    const buttonRem = allButtons[i];
    const parent = buttonRem.parentElement();
    parent.remove();
  });
}

add.addEventListener("click", () => {
  storage = JSON.parse(localStorage.getItem("toDoList"));
  list = document.getElementById("list");
  if (!storage) {
    localStorage.setItem("toDoList", JSON.stringify([text.value]));
    const li = document.createElement("li");
    const delButton = document.createElement("button");
    delButton.innerHTML = "x";
    delButton.setAttribute("class", "buttonStyle");

    li.innerHTML = text.value;
    list.appendChild(li);
    li.appendChild(delButton);
    return;
  }
  storage.push(text.value);
  localStorage.setItem("toDoList", JSON.stringify(storage));

  let li = document.createElement("li");
  const delButton = document.createElement("button");
  delButton.innerHTML = "x";
  delButton.setAttribute("class", "buttonStyle");

  li.innerHTML = text.value;
  list.appendChild(li);
  li.appendChild(delButton);
});

remAll.addEventListener("click", () => {
  list = document.getElementById("list");
  if (list.firstChild) {
    list.remove();
    const ul = document.createElement("ul");
    ul.setAttribute("id", "list");
    const divList = document.getElementById("listDiv");
    divList.appendChild(ul);
    localStorage.clear();
  }
});
