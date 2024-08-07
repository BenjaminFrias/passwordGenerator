let animationItems = document.querySelectorAll(".animation-item p");
let headerTitle = document.querySelector("header h1");
let header = document.querySelector("header");

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

	// Generate random lenght of random chars
	for (let i = 0; i < Math.floor(Math.random() * (3 - 9 + 1)) + 9; i++) {
		let randomChar = Math.floor(Math.random() * (35 - 120 + 1)) + 120;
		text += String.fromCharCode(randomChar);
	}

	return text;
}
