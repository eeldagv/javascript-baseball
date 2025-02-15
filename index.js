const readLine = require("readline");

const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function getRandomNumber() {
  let number = new Set();
  while (number.size < 3) {
    number.add(Math.floor(Math.random() * 9) + 1);
  }
  let randomResult = Array.from(number);
  console.log(randomResult);
  return randomResult;
}

function getHint(computer, user) {
  const strike = computer.filter((num, idx) => num === user[idx]).length;
  const ball = user.filter((num) => computer.includes(num)).length - strike;

  return { strike, ball };
}

function restartGame() {
  rl.question("게임을 새로 시작하려면 1, 종료하려면 9", (input) => {
    if (input == "1") {
      playGame();
    } else if (input == "9") {
      console.log("게임이 종료되었습니다.");
      rl.close();
    } else {
      console.log("잘못된 입력입니다.");
      restartGame();
    }
  });
}

function playGame() {
  console.log("컴퓨터가 숫자를 뽑았습니다.");
  const computerNumbers = getRandomNumber();

  function askForNumber() {
    rl.question("숫자를 입력해주세요.", (input) => {
      if (!/^[1-9]{3}$/.test(input) || new Set(input).size !== 3) {
        console.log("1 ~ 9 까지 서로 다른 세 자리 숫자를 입력하세요.");
        return askForNumber;
      }
      const userNumber = input.split("").map(Number);
      const { strike, ball } = getHint(computerNumbers, userNumber);
      if (strike == 3) {
        console.log("3 스트라이크 / 3개의 숫자를 모두 맞히셨습니다.");
        console.log("게임 종료");
        return restartGame();
      }
      console.log(`${strike}스트라이크 ${ball}볼`);
      askForNumber();
    });
  }
  askForNumber();
}

function start() {
  rl.question("게임을 시작하려면 1, 종료하려면 9를 입력하세요.", (input) => {
    if (input == 1) {
      playGame();
    } else if (input == 9) {
      console.log("애플리케이션이 종료되었습니다.");
      rl.close();
    } else {
      console.log("잘못된 입력입니다. 1 또는 9를 입력하세요.");
      start();
    }
  });
}
start();
