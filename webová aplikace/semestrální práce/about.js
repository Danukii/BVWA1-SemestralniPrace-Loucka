const header = "O aplikaci";
const config = {
  transform: { x: -5, y: -5, z: 1000 },
  rotate: { x: 0, y: 0 },
  shadow: { pos: { x: 5, y: 5 }, blur: 2, color: ["#02feff", "#fd00fb"] },
};

function getLetters(lettersArr) {
  return lettersArr.split("");
}

function addTitle() {
  let el = document.querySelector("#firstname");
  let offset = 0;
  const callback = (letter, i) => {
    const letterFrameEl = document.createElement("span");
    const letterEl = document.createElement("span");
    letterEl.innerText = letter;
    letterEl.style.animationDelay = `${(i + offset) * 150}ms`;
    letterFrameEl.appendChild(letterEl);
    el.appendChild(letterFrameEl);
    letterFrameEl.classList.add("letter-frame");
    letterEl.classList.add("letter");
  };
  getLetters(firstname).forEach(callback);
  el = document.querySelector("#lastname");
  offset = firstname.length;
  getLetters(lastname).forEach(callback);
}

function applyStyle(element, pos) {
  element.style.filter = `drop-shadow(${config.shadow.pos.x * -pos.x}px ${
    config.shadow.pos.y * pos.y
  }px ${config.shadow.blur}px ${config.shadow.color[0]}) drop-shadow(${
    config.shadow.pos.x * -pos.x
  }px ${config.shadow.pos.y * pos.y}px ${config.shadow.blur}px ${
    config.shadow.color[1]
  })`;
  element.style.transform = `translate3d(${config.transform.x * -pos.x}px, ${
    config.transform.y * pos.y
  }px, ${config.transform.z * pos.z}px) rotateX(${
    config.rotate.x * pos.y
  }deg) rotateY(${config.rotate.y * pos.x}deg)`;
  element.style.transition = "none";
}

function clearStyle(event) {
  const element = event.target;
  element.style.filter = `none`;
  element.style.transform = `none`;
  element.style.transition = "all 0.75s ease";
}

function mouseMove(event) {
  const el = event.target.parentElement;
  const rect = el.getBoundingClientRect();
  let a1 = rect.left;
  let a2 = a1 + rect.width;
  let b1 = -1;
  let b2 = 1;
  const x = mapRange(a1, a2, b1, b2, event.x);
  a1 = rect.top;
  a2 = a1 + rect.height;
  b1 = 1;
  b2 = -1;
  const y = mapRange(a1, a2, b1, b2, event.y);

  if (x <= 1 && x >= -1 && y <= 1 && y >= -1) {
    applyStyle(el, { x, y, z: 1 });
  }
}

function mapRange(a1, a2, b1, b2, value) {
  return b1 + ((value - a1) * (b2 - b1)) / (a2 - a1);
}

function addEventHandlers() {
  const elements = document.querySelectorAll(".letter-frame");
  const elArr = Array.from(elements);
  console.log(elArr);
  elArr.forEach((el) => {
    el.addEventListener("mousemove", mouseMove);
    el.addEventListener("mouseleave", clearStyle);
  });
}

addTitle();
addEventHandlers();