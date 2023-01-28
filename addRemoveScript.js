console.clear();

document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();
});

const text = document.getElementById("input");
const add = document.getElementById("add");
const remAll = document.getElementById("remAll");
let allButtons = document.getElementsByClassName("buttonStyle");
let list = document.getElementById("list");

let storage = JSON.parse(localStorage.getItem("toDoList"));

if (storage) {
  for (let i = 0; i < storage.length; i++) {
    let li = document.createElement("li");
    li.innerHTML = storage[i].text;
    const delButton = document.createElement("button");
    delButton.innerHTML = "x";
    delButton.setAttribute("class", "buttonStyle");
    li.setAttribute("id", storage[i].id);
    list.appendChild(li);
    li.appendChild(delButton);
  }
}

const removeElement = (button) => {
  button.addEventListener("click", () => {
    storage = JSON.parse(localStorage.getItem("toDoList"));
    const parent = button.parentElement;

    console.log(storage);

    for (let i = 0; i < storage.length; i++) {
      if (parent.id == storage[i].id) {
        console.log("entrei");
        storage.splice(i, 1);
      }
    }

    console.log(storage);

    localStorage.setItem("toDoList", JSON.stringify(storage));
    parent.remove();
  });
};

for (let i = 0; i < allButtons.length; i++) {
  removeElement(allButtons[i]);
}

add.addEventListener("click", () => {
  storage = JSON.parse(localStorage.getItem("toDoList"));
  list = document.getElementById("list");

  if (!storage) {
    localStorage.setItem(
      "toDoList",
      JSON.stringify([
        {
          id: "0",
          text: text.value,
        },
      ])
    );
    const li = document.createElement("li");
    const delButton = document.createElement("button");
    delButton.innerHTML = "x";
    delButton.setAttribute("class", "buttonStyle");
    li.setAttribute("id", "0");

    li.innerHTML = text.value;
    list.appendChild(li);
    li.appendChild(delButton);

    removeElement(delButton);
    return;
  }

  let index = Number.MIN_SAFE_INTEGER;

  for (let i = 0; i < storage.length; i++) {
    if (+index <= +storage[i].id) {
      const number = +storage[i].id + 1;
      index = "" + number;
    }
  }

  storage.push({
    id: "" + index,
    text: text.value,
  });

  localStorage.setItem("toDoList", JSON.stringify(storage));

  let li = document.createElement("li");
  const delButton = document.createElement("button");
  delButton.innerHTML = "x";
  delButton.setAttribute("class", "buttonStyle");
  li.setAttribute("id", "" + index);
  li.innerHTML = text.value;
  list.appendChild(li);
  li.appendChild(delButton);

  removeElement(delButton);
});

remAll.addEventListener("click", () => {
  list = document.getElementById("list");
  list.innerHTML = "";
  localStorage.clear();
});
