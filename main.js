const typingText = document.querySelector(".typing-text p"),
inpField = document.querySelector(".wrapper .input-field"),
timeTag = document.querySelector(".time span b")
mistakeTag = document.querySelector(".mistake span"),
wpmTag = document.querySelector(".wpm span"),
cpmTag = document.querySelector(".cpm span"),
tryAgainBtn = document.querySelector("button");

let timer,
maxTime = 60,
timeLeft = maxTime
let charIndex =mistakes = isTyping = 0;

function randomParagraph() {
    //getting random number and it'll always be less than the paragraphs length
    let randIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    // getting random item from the paragraphs array
    //splitting all characters of it , adding each character inside a span , then adding this span in a p tag
    paragraphs[randIndex].split("").forEach(span => {
        let spanTag = `<span>${span}</span>`;
        typingText.innerHTML += spanTag;
    });
    typingText.querySelectorAll("span")[0].classList.add("active");
    // focusing input field on keydown or click
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
}

function initTyping () {
    const characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
    if (charIndex < characters.length - 1 && timeLeft > 0) {
        if (!isTyping) {
            //once timer starts it wont restart again on every key clicked
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
        // if user pressed backspace
        if(typedChar == null) {
            //decrease charIndex
            charIndex--;
            // reduce mistakes only if the charIndex span contain incorrect class
            if (characters[charIndex].classList.contains("incorrect")) {
               mistakes--; 
            }
            characters[charIndex].classList.remove("correct","incorrect");
        } else{
    
            if (characters[charIndex].innerText === typedChar) {
            // if user typed character and it matches add the correct class else add the incorrect class
            //else increment the mistakes and add the incorrect class
            characters[charIndex].classList.add("correct");
        }else {
            mistakes++;
            characters[charIndex].classList.add("incorrect");
        }
        charIndex++; //increment charIndex either user typed correct or incorrect characters
        }
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");
    
        let wpm = Math.round((((charIndex - mistakes) /5) / (maxTime - timeLeft)) * 60);
        //if wpm value is 0, empty or infinity then set it's value to 0
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        mistakeTag.innerText = mistakes;
        wpmTag.innerText = wpm;
        cpmTag.innerText = charIndex - mistakes; // cpm won't count mistakes
    } else {
        inpField.value = "";
        clearInterval(timer);
    }
}

function initTimer(){
    //if timeLeft is greater than 0 then decrease the timeLeft else clear the time
    if (timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
    } else{
        clearInterval(timer)
    }
}

function resetGame() {
    // calling paragraph function and resetting each variable and element value to default
    randomParagraph();
    inpField.value = "";
    clearInterval(timer);
    timeLeft = maxTime,
    charIndex = mistakes = isTyping = 0;
    timeTag.innerText = timeLeft;
    mistakeTag.innerText = mistakes;
    wpmTag.innerText = 0;
    cpmTag.innerText = 0;
}

randomParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);