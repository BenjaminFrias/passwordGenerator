let animationItems = document.querySelectorAll(".animation-item p");

animationItems.forEach(item => {
    item.textContent = getAnimationText();
})

function getAnimationText() {
    let text = "";
    
    for (let i = 0; i < 7; i++) {
        let randomChar = Math.floor(Math.random() * (35 - 120 + 1)) + 120;
        text += String.fromCharCode(randomChar);
    }

    return text;
}