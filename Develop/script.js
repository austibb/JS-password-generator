// Assignment Code

// creates js variable for button
var generateBtn = document.querySelector("#generate");

// array of all of the four types of characters that could be included in the password (lowercases, uppercases, symbols and numerals)
var allChars = [
  ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
  ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
  ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "=", "+", "[", "]", "{", "}", ";", ":", "'", "/", "?", "<",">", ",", "."],
  ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
];

// creates a password, then displays it in the password area on the webpage
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
}

// creates and returns a password given the criteria provided from the user
function generatePassword() {
  var criteria = getCriteria(); // prompts user for their desired password criteria and stores in a variable
  let chosenChars = []; // initializes empty array for the final selection of characters to be included

  // determines the viable characters to be included in the password given the user's selected criteria
  for (let i = 0; i < 4; i++) {
    if (criteria[i] === true) {
      chosenChars = chosenChars.concat(allChars[i]); // appends the chosen character sets
    }
  }

  let password = "";  // initializes empty string for the password

  //creates password one char at a time, by randomly selecting a character from the array of all viable characters
  for (let i = 0; i < criteria[4]; i++) {
    password += chosenChars[Math.floor(Math.random() * chosenChars.length)];
  }
  return password;
}

// collects and returns user criteria and ensures at least one of the criteria is selected.
function getCriteria(){
  // prompts for character types to include in password, and ensures at least one type of character is chosen
  do {
    var conditions = charPrompt();
    if (!conditions.includes(true)) {
      alert("you must select at least one of the criteria.");
    }
  }   while (!conditions.includes(true));

  // prompts for password length, and ensures the password will contain between 8 - 128 characters
  let length;
  while (!(8 <= length && length <= 128)) {
    length = prompt("How many characters do you want your password to contain? (must be 8-128 characters)");
    if (!(8 <= length && length <= 128)) {
      alert("Your password must be between 8-128 characters. \n \n Please try again.");
    }
  }
  conditions.push(length); // adds on the password length requirement to the conditions array

  return conditions;
}

// helper function to run the prompt forloop for getCriteria, returns an array containing user response
function charPrompt() {
  let charConditions = ['lowercase characters', 'uppercase characters', 'special characters', 'numbers'];
  let conditions = [];
  for (let i = 0; i < 4; i++) {
    if (confirm(`Do you want your password to include ${charConditions[i]}?`)) {
      conditions.push(true);
    } else {
      conditions.push(false);
    }
  }
  return conditions;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);