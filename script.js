const animationItems = document.querySelectorAll(".animation-item p");
const headerTitle = document.querySelector("header h1");
const header = document.querySelector("header");
const passwordResult = document.querySelector("#generator-result");

// Set range to 0%
const rangeInput = document.getElementById("pass-slider");
const rangeValueText = document.querySelector(".range-label p span");
rangeInput.value = 8;

// Change password when slider input change
rangeInput.addEventListener("input", () => {
	rangeValueText.textContent = rangeInput.value;

	// Generate password and show it when input
	passwordResult.textContent = generatePassword(rangeInput.value);
});

// GENERATE PASSWORD SECTION

// Password options
const options = document.querySelectorAll("input[type='checkbox']");

const lowercase = "abcdefghijklmnopqrstuvwxyz";
const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+";

function generatePassword(length) {
	let usableCharacters = "";

	// CHECK FOR OPTIONS

	// Lowercase option
	if (options[0].checked) {
		usableCharacters += lowercase;
	}
	// Uppercase option
	if (options[1].checked) {
		usableCharacters += uppercase;
	}
	// Numbers option
	if (options[2].checked) {
		usableCharacters += numbers;
	}
	// Symbols option
	if (options[3].checked) {
		usableCharacters += symbols;
	}

	// GENERATE PASSWORD

	let password = "";
	for (let i = 0; i < length; i++) {
		let randomChar =
			usableCharacters[
				Math.floor(Math.random() * usableCharacters.length)
			];
		password += randomChar;
	}

	return password;
}

passwordResult.textContent = generatePassword(rangeInput.value);

// Generate button
const generateBtn = document.querySelector("#generate-btn");
generateBtn.addEventListener("click", () => {
	passwordResult.textContent = generatePassword(rangeInput.value);
});

// Copy password
const copyButton = document.querySelector("#copy-btn");

copyButton.addEventListener("click", () => {
	navigator.clipboard.writeText(passwordResult.textContent);
	copyButton.textContent = "Copied!";
	copyButton.classList.add("copied");
	setTimeout(() => {
		copyButton.textContent = "Copy";
		copyButton.classList.remove("copied");
	}, 2000);
});

// ANIMATION SECTION

let intervals = [];
startAnimationPassword();
let isRunning = true;
function startAnimationPassword() {
	animationItems.forEach((item) => {
		const interval = setInterval(() => {
			item.textContent = getAnimationText();
		}, 200);
		intervals.push(interval);
	});
}

window.addEventListener("scroll", () => {
	let scrollY = this.scrollY;

	// Toogle passwords animation when user pass page
	tooglePasswordAnimation();

	// Toogle header title color with class
	if (scrollY > 550) {
		header.classList.add("colored");
	} else {
		header.classList.remove("colored");
	}
});

function tooglePasswordAnimation(positionY) {
	if (scrollY < 600 && !isRunning) {
		startAnimationPassword();
		isRunning = true;
	} else if (scrollY > 600 && scrollY < 650) {
		intervals.forEach((int) => {
			clearInterval(int);
		});
		isRunning = false;
	}
}

function getAnimationText() {
	let text = "";

	// Generate random length of random chars
	for (let i = 0; i < Math.floor(Math.random() * (3 - 9 + 1)) + 9; i++) {
		let randomChar = Math.floor(Math.random() * (35 - 120 + 1)) + 120;
		text += String.fromCharCode(randomChar);
	}

	return text;
}
