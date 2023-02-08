const typingText = document.querySelector(".typing-text p");
inpField = document.querySelector(".wrapper .input-field");

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

randomParagraph();