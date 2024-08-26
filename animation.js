export { startAnimationPassword, tooglePasswordAnimation, getAnimationText };
import { animationItems } from "./main.js";

let intervals = [];
let isRunning = true;

function tooglePasswordAnimation(positionY) {
	if (positionY < 600 && !isRunning) {
		startAnimationPassword(animationItems);
		isRunning = true;
	} else if (positionY > 600 && positionY < 650) {
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

function startAnimationPassword(animationItems) {
	animationItems.forEach((item) => {
		const interval = setInterval(() => {
			item.textContent = getAnimationText();
		}, 200);
		intervals.push(interval);
	});
}
