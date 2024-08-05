let animationItems = document.querySelectorAll(".animation-item p");

animationItems.forEach(item => {
    item.textContent = getAnimationText();
})

function getAnimationText() {
    let randomChar = Math.floor(Math.random() * (45 - 170 + 1)) + 170;
    let text = "";

    // TODO: RETURN 5 RANDOM LETTERS TOGETHER WITH ARRAY
}