console.log("hello world!!");
let container = document.querySelector(".container");

// For creating the divs and appending them to our HTML document
for (let i = 1; i <= 8; i++) {
    let div = document.createElement("div");
    div.classList.add("color-container");

    // Create a paragraph to display the color code
    let colorCode = document.createElement("p");
    colorCode.classList.add("color-code");

    div.appendChild(colorCode);
    
    // Create a "Copy" button inside each color container
    let button = document.createElement("button");
    button.classList.add("copy-button");
    button.innerText = "Copy";
    div.appendChild(button);
    
    container.appendChild(div);
}

// For creating the colors and appending them to our divs
let colorContainerDiv = document.querySelectorAll(".color-container");
console.log(colorContainerDiv);

generateColors();

// For generating colors
function generateColors() {
    colorContainerDiv.forEach((element) => {
        let newColor = randomColor();
        let colorCode = element.querySelector(".color-code");

        element.style.background = '#' + newColor;
        colorCode.innerText = "#" + newColor;

        // Add event listener to the "Copy" button to copy the color code
        let copyButton = element.querySelector(".copy-button");
        copyButton.addEventListener("click", (e) => {
            e.stopPropagation(); // Prevent triggering other events
            copyToClipboard(newColor);
            alert("Copied: #" + newColor);
        });
    });
}

// Random colors are generated here
function randomColor() {
    let letters = '0123456789ABCDEF';
    let colorCodeLength = 6;
    let colorCode = "";
    for (let i = 0; i < colorCodeLength; i++) {
        let randomNumber = Math.floor(Math.random() * letters.length);
        colorCode += letters.substring(randomNumber, randomNumber + 1);
    }
    return colorCode;
}

// Function to copy color code to clipboard
function copyToClipboard(color) {
    navigator.clipboard.writeText("#" + color);
}

// Event listener for space key press to refresh colors
document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        generateColors();
    }
});
