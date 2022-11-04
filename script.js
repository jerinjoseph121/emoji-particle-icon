var reactBtn = document.getElementById("react-button");
var emojiSection = document.getElementsByClassName("emoji-section")[0];
var emojiBtnList = document.getElementsByClassName("emoji-button");

var reactLabel = reactBtn.getElementsByTagName("div")[0];
var reactImg = reactBtn.firstElementChild;

var isEmojiSectionActive = false;

let isSpeaker = document.getElementById("ah-script").getAttribute("isSpeakerParam");

if(isSpeaker == "true"){
    reactImg.src = "./imgs/gift_box.png";
    reactImg.style.width = "75%";
    reactLabel.style.display = "none";
    reactBtn.disabled = true;

    window.addEventListener('storage', () => {
        // When local storage changes, dump the list to
        // the console.
        let emoji = window.localStorage.getItem('emojiParticle')
        console.log(emoji);
        if(emoji)
            generateParticle(emoji);
    });

}

function generateParticle(emoji) {
    console.log(emoji);
    let targetHeight = reactBtn.offsetHeight;
    let targetWidth = reactBtn.offsetWidth;
    // const particle = document.createElement("div");
    // particle.classList.add("emoji-particle");
    // particle.innerHTML = emoji;
    // reactBtn.appendChild(particle);
    for(let i = 0; i < 5; i++) {
        setTimeout(() => {
            const particle = document.createElement("div");
            particle.classList.add("particle");
            particle.innerHTML = emoji;
            particle.style.fontSize = "50px"
            particle.style.zIndex = "-1";
            reactBtn.appendChild(particle);
            setTimeout(() => {
                particle.style.top = `${(Math.random() * targetHeight) / 2}px`;
                particle.style.left = `${(Math.random() * targetWidth)}px`;
                particle.style.transform = `translate(0px, -${450+Math.random()*100}px) scale(${0.3+Math.random()*0.5})`;
                particle.style.opacity = 1;
            }, 20);

            setTimeout(() => {
                particle.style.opacity = 0;
            }, 200);

            setTimeout(() => {
                particle.remove();
            }, 2500)
        }, i * 200);
    }
}

reactBtn.addEventListener("click", () => {
    isEmojiSectionActive = !isEmojiSectionActive;
    if(isEmojiSectionActive) {
        emojiSection.style.visibility = "visible";
        reactBtn.firstElementChild.style.display = "none";
        reactLabel.innerHTML = "X";
        reactLabel.style.fontSize = "50px";
    }
    else {
        emojiSection.style.visibility = "hidden";
        reactBtn.firstElementChild.style.display = "inline-block";
        reactLabel.innerHTML = "React!";
        reactLabel.style.fontSize = "25px";
    }
});

Array.from(emojiBtnList).forEach(function(emojiBtn) {
    emojiBtn.addEventListener("click", (e) => {
        isEmojiSectionActive = false;
        emojiSection.style.visibility = "hidden";
        reactBtn.firstElementChild.style.display = "inline-block";
        reactLabel.innerHTML = "React!";
        reactLabel.style.fontSize = "25px";
        let emoji = emojiBtn.textContent;
        localStorage.setItem('emojiParticle', emoji);
        generateParticle(emoji);
    });
  });