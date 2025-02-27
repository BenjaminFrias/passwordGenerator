import {
	startAnimationPassword,
	tooglePasswordAnimation,
	getAnimationText,
} from "./animation.js";

const headerTitle = document.querySelector("header h1");
const header = document.querySelector("header");
const passwordResult = document.querySelector("#generator-result");
const passwordStrenghtSpan = document.querySelector("#check-password span");

// Set range to 0%
const rangeInput = document.getElementById("pass-slider");
const rangeValueText = document.querySelector(".range-label p span");
rangeInput.value = 6;

// GENERATE PASSWORD SECTION

const options = document.querySelectorAll("input[type='checkbox']");

const lowercase = "abcdefghijklmnopqrstuvwxyz";
const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+";
let current_password = "";

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

	passwordStrenghtSpan.textContent = checkPasswordStrength(password);

	current_password = password;
	return password;
}

current_password = generatePassword(rangeInput.value);

// Change password when slider input change
rangeInput.addEventListener("input", () => {
	rangeValueText.textContent = rangeInput.value;

	// Generate password and show it when input
	passwordResult.textContent = generatePassword(rangeInput.value);
});

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

// Have at least one checkbox active

// Create a array of checked options and call function
options.forEach((option) => {
	option.addEventListener("change", () => {
		checkOptions();
	});
});

function checkOptions() {
	let checkedOptions = [];
	options.forEach((option) => {
		if (option.checked) {
			checkedOptions.push(option);
		}
	});

	if (checkedOptions.length == 1) {
		checkedOptions[0].setAttribute("disabled", true);
	}
	if (checkedOptions.length > 1) {
		checkedOptions.forEach((opt) => {
			opt.removeAttribute("disabled");
		});
	}
}

// Check password security level

function checkPasswordStrength(current_password) {
	const passwordLength = current_password.length;
	const hasLowercase = /[a-z]/.test(current_password);
	const hasUppercase = /[A-Z]/.test(current_password);
	const hasNumber = /[0-9]/.test(current_password);
	const hasSpecialChar = /[!@#$%^&*()_+]/g.test(current_password);

	if (
		passwordLength >= 17 &&
		hasLowercase &&
		hasUppercase &&
		hasNumber &&
		hasSpecialChar
	) {
		return "Very strong password";
	} else if (
		passwordLength >= 10 &&
		hasLowercase &&
		hasUppercase &&
		hasNumber &&
		hasSpecialChar
	) {
		return "Strong password";
	} else if (
		passwordLength >= 8 &&
		(hasLowercase || hasUppercase || hasNumber)
	) {
		return "Medium password";
	} else {
		return "Weak password";
	}
}

// ANIMATION SECTION
export const animationItems = document.querySelectorAll(".animation-item p");
startAnimationPassword(animationItems);

window.addEventListener("scroll", () => {
	let scrollY = window.scrollY;

	// Toogle passwords animation when user pass page
	tooglePasswordAnimation(scrollY);

	// Toogle header title color with class
	if (scrollY > 550) {
		header.classList.add("colored");
	} else {
		header.classList.remove("colored");
	}
});
