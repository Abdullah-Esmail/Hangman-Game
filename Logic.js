let letters = Array.from("abcdefghijklmnopqrstuvwxyz"),
  lettersContainer = document.querySelector(`.letters`),
  letterGuessed = document.querySelector(`.letters-guessed`),
  Hangmandraw = document.querySelector(`.draw`),
  wrongs = 0;

letters.forEach((letter) => {
  let letterSpan = document.createElement(`span`);
  letterSpan.className = `letter-box`;
  letterSpan.innerHTML = `${letter}`;
  lettersContainer.appendChild(letterSpan);
  // or one line, but no need to manipulte too much in dom
  // lettersContainer.innerHTML += `<span className="letter-box" >${letter}</span>`;
});

let words = {
  programming: [
    "php",
    "javascript",
    "mongo",
    "scale",
    "fortran",
    "react",
    "mysql",
    "python",
  ],
  movies: [
    "prestige",
    "inception",
    "parasite",
    "interstellar",
    "whiplash",
    "memento",
    "coco",
    "up",
  ],
  people: [
    "albert einstein",
    "hitchcock",
    "alexander",
    "cleopatra",
    "mahatma gandhi",
  ],
  countries: ["syria", "palestine", "yemen", "egypt", "bahrain", "qatar"],
};

let wordsKeys = Object.keys(words);
// let randCatgNum = Math.floor(Math.random() * wordsKeys.length),
randCatg = wordsKeys[Math.floor(Math.random() * wordsKeys.length)];

const wordsValues = words[randCatg];
// (randValNum = Math.floor(Math.random() * randCatg.length)),
const randVal = wordsValues[Math.floor(Math.random() * randCatg.length)];

//Make Array from the word
let randValArr = Array.from(randVal);

document.querySelector(`.game-info .categSpan`).innerHTML = randCatg;

//Make spans for letters
randValArr.forEach((letter) => {
  let span = document.createElement(`span`);
  if (letter == " ") {
    span.className = `with-space letterguess`;
    span.innerHTML = `-`;
  } else {
    span.className = `letterguess`;
  }
  letterGuessed.appendChild(span);
});

//now you can start game logic
document.addEventListener("click", (letterBoxEle) => {
  if (letterBoxEle.target.className === `letter-box`) {
    // letterBoxEle.target.classList.add('clicked');
    letterBoxEle.target.className = `letter-box clicked`;
    let condition = randValArr.filter(
        (e) => e == letterBoxEle.target.innerHTML
      ),
      spansArr = Array.from(document.querySelectorAll(`.letterguess`));

    if (condition.length >= 1) {
      //get indices of the letters
      let indices = randValArr
        .map((e, i) => (e === letterBoxEle.target.innerHTML ? i : ""))
        .filter(String);

      //enter the letters into there places
      for (let y = 0; y < indices.length; y++) {
        spansArr[indices[y]].innerHTML = `${letterBoxEle.target.innerHTML}`;
      }
    } else {
      wrongs++;

      if (wrongs == 8) {
        lettersContainer.classList.add(`finished`);
        setTimeout(() => {
          let div = document.createElement(`div`);
          div.className = `popup`;
          div.innerHTML = `Sorry you exceded the wrong attempts, the word is ${randVal}`;
          document.body.appendChild(div);
        }, 1000);
      } else {
        Hangmandraw.classList.add(`wrong-${wrongs}`);
      }
    }
  }
});
