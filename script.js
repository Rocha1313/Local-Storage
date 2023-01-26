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
    li.innerHTML = storage[i];
    const delButton = document.createElement("button");
    delButton.innerHTML = "x";
    delButton.setAttribute("class", "buttonStyle");
    list.appendChild(li);
    li.appendChild(delButton);
  }
}

const removeElement = (button) => {
  button.addEventListener("click", () => {
    const parent = button.parentElement;
    console.log(storage.indexOf(button));
    storage.slice(storage.indexOf(button), 1);
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
    delButton.setAttribute("id", "0");

    li.innerHTML = text.value;
    list.appendChild(li);
    li.appendChild(delButton);

    removeElement(delButton);
    return;
  }
  let index;

  for (let i = 0; i <= storage.length; i++) {
    for (let f = 0; f <= storage.length; f++) {
      if(!storage[i]){
        index = storage.length;
        break
      }
      if (f == parseInt(storage[i].id)) {
        break;
      }
    }
    if (index) {
      break;
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
