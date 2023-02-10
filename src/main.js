//DOM
const resultContainer = document.getElementById("result");
const lengthContainer = document.getElementById("length");
const uppercaseContainer = document.getElementById("uppercase");
const lowercaseContainer = document.getElementById("lowercase");
const numbersContainer = document.getElementById("numbers");
const symbolsContainer = document.getElementById("symbols");
const generateContainer = document.getElementById("generate");
const clipboardContainer = document.getElementById("clipboard");

const randFunction = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

//copy password to clipboard

clipboardContainer.addEventListener("click", () => {
  const textarea = document.createElement("textarea");
  const password = resultContainer.innerText;

  if (!password) {
    return;
  }
  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  alert("password copied to clipboard");
});

//generate event listner
generateContainer.addEventListener("click", () => {
  const length = +lengthContainer.value;
  const yesLower = lowercaseContainer.checked;
  const yesUpper = uppercaseContainer.checked;
  const yesNumber = numbersContainer.checked;
  const yesSymbol = symbolsContainer.checked;

  resultContainer.innerText = generatePassword(
    yesLower,
    yesUpper,
    yesNumber,
    yesSymbol,
    length
  );
});

//generate password function
function generatePassword(lower, upper, number, symbol, length) {
  let generatedPassword = "";

  const checkCount = lower + upper + number + symbol;

  const checkArr = [{ lower }, { upper }, { number }, { symbol }].filter(
    (item) => Object.values(item)[0]
  );

  if (checkCount === 0) {
    return "";
  }
  for (let i = 0; i < length; i += checkCount) {
    checkArr.forEach((check) => {
      const funcName = Object.keys(check)[0];

      generatedPassword += randFunction[funcName]();
    });
  }

  const finalPassword = generatedPassword.slice(0, length);
  return finalPassword;
}

//Generator functions... character set (http://www.net-comber.com/charset.html)

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
  const symbols = "!@#$%^&*(){}[]=<>?.,";
  return symbols[Math.floor(Math.random() * symbols.length)];
}
