let round = document.querySelector(".round");
let btn = document.querySelectorAll("button");
let shape = document.querySelector("#square");

// To change the Color
btn[0].addEventListener("click", changeColor);

function randomColor() {
    let letters = '0123456789ABCDEF';
    let colorCodeLength = 6;
    let colorCode = "#";  // Start with '#' for hex color codes
    for (let i = 0; i < colorCodeLength; i++) {
        let randomNumber = Math.floor(Math.random() * letters.length);
        colorCode += letters.substring(randomNumber, randomNumber + 1);
    }
    return colorCode;
}

function changeColor() {
    let newColor = randomColor();
    round.style.backgroundColor = newColor;
}

// To change the Shape
btn[1].addEventListener("click", changeShape);


// for link through we add 
// let svgArray = [
//     `<svg width="100" height="100"><rect width="100" height="100" fill="lightblue"/></svg>`, // Square
//     `<svg width="100" height="100"><circle cx="50" cy="50" r="50" fill="lightblue"/></svg>`, // Circle
//     `<svg width="100" height="100"><polygon points="50,15 100,100 0,100" fill="lightblue"/></svg>`, // Triangle
//     `<svg width="100" height="100"><polygon points="50,0 100,100 0,100" fill="lightblue"/></svg>`, // Arrow
//     `<svg width="100" height="100"><path d="M 50 0 L 100 100 L 50 100 L 0 100 Z" fill="lightblue"/></svg>`, // Frame
//     // Add more SVG shapes here
// ];

// function randomShape() {
//     let index = Math.floor(Math.random() * svgArray.length);
//     return svgArray[index];
// }

// function changeShape() {
//     shape.innerHTML = randomShape();
// }



let arr = ["square", "round", "diamond", "triangle", "arrow", "frame", "star", "cross", "left-point", "right-point", "parallal", "cheg"];

function randomShape() {
    let idxx = Math.floor(Math.random() * arr.length);
    return arr[idxx];
}

function changeShape() {
    let idname = randomShape();
    shape.id = idname;
}
