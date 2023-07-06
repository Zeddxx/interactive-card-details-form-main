// Cache DOM elements
const holderName = document.getElementById("holderName");
const cardOwnerName = document.querySelector(".card-owner");
const errorName = document.querySelector(".name-div .error");
const cardHolderNumber = document.getElementById("cardNumber");
const cardNumber = document.getElementById("number");
const expMonthInput = document.getElementById("expMonth");
const cardExpMonth = document.querySelector(".exp-month");
const expYearInput = document.getElementById("expYear");
const cardExpYear = document.querySelector(".exp-year");
const cvvInput = document.getElementById("cvv-number");
const cvvOutput = document.querySelector(".cvv-number");
const validateBtn = document.getElementById("btnMain");
const cardSuccess = document.querySelector('.successfull-msg');
// Attach event listeners
holderName.addEventListener("input", handleHolderNameInput);
cardHolderNumber.addEventListener("input", handleCardNumberInput);
expMonthInput.addEventListener("input", handleExpMonthInput);
expYearInput.addEventListener("input", handleExpYearInput);
cvvInput.addEventListener("input", handleCvvInput);
validateBtn.addEventListener("click", validateInputs);

function handleHolderNameInput() {
  if (holderName.value === "") {
    cardOwnerName.innerText = "Jane Appleseed";
    errorName.textContent = "Required";
    holderName.style.border = "2px solid red";
    holderName.style.color = "";
  } else if (!/\d/.test(holderName.value)) {
    cardOwnerName.innerText = holderName.value;
    errorName.textContent = "";
    holderName.style.border = "2px solid";
    holderName.style.color = "";
  } else {
    cardOwnerName.innerText = "xxxxx xxxxx";
    errorName.textContent = "Invalid input";
    holderName.style.color = "red";
    holderName.classList.add("whenError");
  }
}

function handleCardNumberInput(event) {
  const key = event.key;

  if (key === 'Backspace') {
    return; // Allow the user to delete characters
  }

  const formattedNumber = cardHolderNumber.value
    .replace(/\s/g, "")
    .replace(/(\d{4})/g, "$1 ");
  cardHolderNumber.value = formattedNumber.trim();
  showNumber();
}

let previousCardNumber = "";

cardHolderNumber.addEventListener("input", function(event) {
  if (cardHolderNumber.value !== previousCardNumber) {
    previousCardNumber = cardHolderNumber.value;
    handleCardNumberInput(event);
  }
});

function showNumber() {
  var errorNumber = document.querySelector(".errorNumber");
  if (cardHolderNumber.value === "") {
    cardNumber.innerText = "0000 0000 0000 0000";
    errorNumber.innerText = "Must provide card number";
    cardHolderNumber.style.border = `2px solid var(--error-red)`;
    cardHolderNumber.style.color = "red";
  } else if (/^[\d\s]+$/.test(cardHolderNumber.value)) {
    cardNumber.innerText = cardHolderNumber.value;
    errorNumber.innerText = "";
    cardHolderNumber.style.color = "";
    cardHolderNumber.style.border = `2px solid `;
  } else {
    cardNumber.innerText = "0000 0000 0000 0000";
    cardHolderNumber.style.border = `2px solid var(--error-red)`;
    cardHolderNumber.style.color = "red";
    errorNumber.innerText = "Wrong format, numbers only";
  }
}






function handleExpMonthInput() {
  let errorElement = document.querySelector(".exp-error");

  if (expMonthInput.value === "") {
    cardExpMonth.innerText = "00";
    expMonthInput.style.border = "2px solid var(--error-red)";
    errorElement.innerText = "Can't be blank";
    expMonthInput.style.color = "red";
  } else if (/^\d+$/.test(expMonthInput.value)) {
    var monthValue = parseInt(expMonthInput.value);
    if (monthValue > 12 || monthValue <= 0) {
      cardExpMonth.innerText = "00";
      expMonthInput.style.border = "2px solid red";
      errorElement.innerText = "Enter valid month";
      expMonthInput.style.color = "red";
    } else if(monthValue < 10){
      cardExpMonth.innerText = `0${parseInt(expMonthInput.value)}`;
      expMonthInput.style.border = "2px solid";
      errorElement.innerText = "";
      expMonthInput.style.color = "";
    }
    else {
      cardExpMonth.innerText = expMonthInput.value;
      expMonthInput.style.border = "2px solid";
      errorElement.innerText = "";
      expMonthInput.style.color = "";
    }
  } else {
    cardExpMonth.innerText = "00";
    expMonthInput.style.border = "2px solid red";
    errorElement.innerText = "Only numbers";
    expMonthInput.style.color = "red";
  }
}

function handleExpYearInput() {
  let errorElement = document.querySelector(".exp-error");

  if (expYearInput.value === "") {
    cardExpYear.innerText = "00";
    expYearInput.style.border = "2px solid var(--error-red)";
    expYearInput.style.color = "";
    errorElement.innerText = "Can't be blank";
  } else if (/^\d+$/.test(expYearInput.value)) {
    var yearValue = parseInt(expYearInput.value, 10);
    if (yearValue <= 0 || yearValue > 42 || yearValue < 23) {
      cardExpYear.innerText = "00";
      expYearInput.style.border = "2px solid var(--error-red)";
      expYearInput.style.color = "red";
      errorElement.innerText = "Invalid year";
    } else {
      cardExpYear.innerText = yearValue.toString().padStart(2, "0");
      expYearInput.style.border = "2px solid";
      expYearInput.style.color = "";
      errorElement.innerText = "";
    }
  } else {
    cardExpYear.innerText = "00";
    expYearInput.style.border = "2px solid var(--error-red)";
    expYearInput.style.color = " var(--error-red)";
    errorElement.innerText = "Only numbers";
  }
}

function handleCvvInput() {
  let errorElement = document.querySelector(".cvv-error");

  if (cvvInput.value === "") {
    cvvOutput.innerText = "000";
    cvvInput.style.border = "2px solid var(--error-red)";
    errorElement.innerText = "Can't be blank";
  } else if (/^\d+$/.test(cvvInput.value)) {
    cvvOutput.innerText = cvvInput.value;
    cvvInput.style.border = "2px solid ";
    errorElement.innerText = "";
    cvvInput.style.color = ''
  } else {
    cvvOutput.innerText = "000";
    cvvInput.style.border = "2px solid  var(--error-red)";
    errorElement.innerText = "Only numbers";
    cvvInput.style.color = "red";
  }
}

function validateInputs() {
  handleHolderNameInput();
  handleCardNumberInput(event);
  handleExpMonthInput();
  handleExpYearInput();
  handleCvvInput();

  if (
    errorName.textContent === "" &&
    expMonthInput.value !== "" &&
    expYearInput.value !== "" &&
    cvvInput.value !== "" &&
    /^[0-9\s]+$/.test(cardHolderNumber.value)
  ) {
    cardSuccess.classList.add('success');
  } else {
    cardSuccess.classList.remove('success');
  }
}

function success() {
  cardSuccess.classList.remove('success');
}