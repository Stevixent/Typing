const typingText = document.querySelector(".typing-text");

function randomParagraph() {
    //getting random number and it'll always be less than the paragraphs length
    let randIndex = Math.floor(Math.random() * paragraphs.length);
    console.log(paragraphs[randIndex]);
}

randomParagraph();