let text_area = document.querySelector("#text_area");
let btn = document.querySelector("#button");
let color = document.querySelector("#color");
let notes_container = document.querySelector("#notes_container");
let para = document.querySelector("#para");
let clearAll = document.querySelector("#clear_all");

function addNotes() {
    if (text_area.value === "") {
        alert("Please write a note");
        return;
    }

    // Remove the default paragraph if this is the first note being added
    isNotesPresent();

    // Create a new note container
    let div = document.createElement("div");
    let p = document.createElement("p");
    let cross_button = document.createElement("button");

    div.appendChild(p);
    div.appendChild(cross_button);

    cross_button.innerText = 'x';

    // Set note content and styles
    p.innerText = text_area.value;
    div.style.backgroundColor = color.value;
    div.style.width = "200px";
    div.style.height = "200px";
    div.style.borderRadius = "10px";
    div.style.padding = "10px";
    div.style.display = "flex";
    div.style.flexDirection = "row";
    div.style.justifyContent = "space-between";

    cross_button.style.width = "20px";
    cross_button.style.height = "20px";

    // Append the new note to the notes container
    notes_container.appendChild(div);
    text_area.value = "";

    // Add event listener to remove the note when the cross button is clicked
    cross_button.addEventListener("click", function () {
        div.remove();
        // Check if any notes are left after removing
        isNotesPresent();
    });

    // Re-check if notes are present
    isNotesPresent();
}

// Event listener to add a note when the button is clicked
btn.addEventListener('click', addNotes);

// Function to clear all notes
function clr() {
    notes_container.innerHTML = "";
    isNotesPresent();
}

clearAll.addEventListener('click', clr);

function isNotesPresent() {
    let notes = notes_container.childNodes;
    if (notes.length > 0) {
        para.style.display = "none";
    } else {
        para.style.display = "block";
    }
}

// Initial call to check if there are notes already present when the page loads
isNotesPresent();
