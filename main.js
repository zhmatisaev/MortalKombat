const arenas = document.querySelector(".arenas");
const randomButton = document.querySelector(".button");

const player1 = {
  player: 1,
  name: "liukang",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/liukang.gif",
  //   weapon: ["sword"],
  attack: function () {
    console.log(this.name + "Fight");
  },
};
player1.attack();

const player2 = {
  player: 2,
  name: "sub-zero",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/subzero.gif",
  weapon: ["spear"],
  attack: function () {
    console.log(this.name + "Fight");
  },
};
player2.attack();

function createElement(tag, className) {
  const tags = document.createElement(tag);
  if (className) {
    tags.classList.add(className);
  }
  return tags;
}

function createPlayer(classPlayer, playerObj) {
  const player = createElement("div", classPlayer);
  const progressbar = createElement("div", "progressbar");
  const character = createElement("div", "character");
  const life = createElement("div", "life");
  const name = createElement("div", "name");
  const img = createElement("img");

  function changeHP(player) {
    const playerLife = document.querySelector(
      ".player" + player.player + " .life"
    );

    player.hp -= Math.ceil(Math.random() * 10);
    playerLife.style.width = player.hp + "%";
  }

  function playerLose(name) {
    const $loseTitle = createElement("div", "loseTitle");
    $loseTitle.innerText = name + "lose";
    return $loseTitle;
  }

  randomButton.addEventListener("click", function () {
    console.log("click");
    changeHP(player1);
    changeHP(player2);
  });

  function hitPlayers() {
    changeHP(player1);
    changeHP(player2);
    if (isDraw()) {
      console.log("draw");
      arenas.appendChild(endBattle("Draw"));
    } else {
      const winner = hasWinner();
      console.log("winner is " + winner);
      if (winner) arenas.appendChild(endBattle(winner + "WINS"));
    }
    hitPlayers();
  }
  function hasWinner() {
    if (player1.hp == 0) return player2.name;
    if (player2.hp == 0) return player1.name;
  }

  function isDraw() {
    return !player1.hp && !player2.hp;
  }
  function endBattle(text) {
    const title = createElement("div");
    title.classList.add("loseTitle");
    title.innerText = text;
    randomButton.disabled = true;
    return title;
  }

  life.style.width = playerObj.hp + "%";
  name.innerText = playerObj.name;
  img.src = playerObj.img;

  progressbar.appendChild(name);
  progressbar.appendChild(life);

  character.appendChild(img);

  player.appendChild(progressbar);
  player.appendChild(character);

  return player;
}

arenas.appendChild(createPlayer("player1", player1));
arenas.appendChild(createPlayer("player2", player2));
