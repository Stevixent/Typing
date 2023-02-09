const typingText = document.querySelector(".typing-text p"),
inpField = document.querySelector(".wrapper .input-field"),
mistakeTag = document.querySelector(".mistake span");

let charIndex =mistakes = 0;

function randomParagraph() {
    //getting random number and it'll always be less than the paragraphs length
    let randIndex = Math.floor(Math.random() * paragraphs.length);
    // getting random item from the paragraphs array
    //splitting all characters of it , adding each character inside a span , then adding this span in a p tag
    paragraphs[randIndex].split("").forEach(span => {
        let spanTag = `<span>${span}</span>`;
        typingText.innerHTML += spanTag;
    });
    // focusing input field on keydown or click
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
}

function initTyping () {
    const characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
    // if user pressed backspace
    if(typedChar == null) {
        charIndex--;
        characters[charIndex].classList.remove("correct","incorrect");
    } else{

        if (characters[charIndex].innerText === typedChar) {
        // if user typed character and it matches add the correct class else add the incorrect class
        characters[charIndex].classList.add("correct");
    }else {
        characters[charIndex].classList.add("incorrect");
    }
    charIndex++; //increment charIndex either user typed correct or incorrect characters
    }
    characters.forEach(span => span.classList.remove("active"));
    characters[charIndex].classList.add("active");
}

randomParagraph();
inpField.addEventListener("input", initTyping);