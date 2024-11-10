



// function createAdioList(audioList){
//     // rightBodyContainer.innerHTML = ""; 
//     audioList.forEach((category) => {
//         const categoryContainer = document.createElement("div");
//         categoryContainer.classList.add("category-container");

//         // Create and append the category title
//         const categoryTitle = document.createElement("h2");
//         categoryTitle.classList.add("head_of_all")
//         categoryTitle.textContent = category.list_name;
//         categoryContainer.appendChild(categoryTitle);

//         // Create a row for books in this category
//         const booksRow = document.createElement("div");
//         booksRow.classList.add("books-row"); 
//         category.books.forEach((book) => {
//             const bookCard = document.createElement("div");
//             bookCard.classList.add("card");
//             bookCard.innerHTML = `
//                 <img src="${book.book_image}" alt="${book.title} cover" />
//                 <h3>${book.title}</h3>
//                 <p>Author: ${book.author}</p>
//             `;
            
//             booksRow.appendChild(bookCard);
//         });

//         categoryContainer.appendChild(booksRow);
//         rightBodyContainer.appendChild(categoryContainer);
//     });
    
// }
// async function fetchAudioNotification(){
//     try{
//         const data = await fetch(`https://books-backend.p.goit.global/books/category?category=Audio+Nonfiction`);
//         const result = await data.json();
//         return result;
//     } catch(error){
//         console.error("Error fetching book list data:", error);
//     }
// }

// async function fetchAudioNotificationList(){
//     const audioList = await fetchAudioNotification();
//     console.log(audioList);
//     createAdioList(audioList);
// }

// fetchAudioNotificationList()



// Function to create audio list UI

const rightBodyContainer = document.querySelector(".right-body-container"); 
function createAdioList(audioList) {
   
    rightBodyContainer.innerHTML = ""; 

    audioList.forEach((category) => {
        const categoryContainer = document.createElement("div");
        categoryContainer.classList.add("category-container");

        // Create and append the category title
        const categoryTitle = document.createElement("h2");
        categoryTitle.classList.add("head_of_all");
        categoryTitle.textContent = category.list_name;
        categoryContainer.appendChild(categoryTitle);

        // Create a row for books in this category
        const booksRow = document.createElement("div");
        booksRow.classList.add("books-row"); 
        category.books.forEach((book) => {
            const bookCard = document.createElement("div");
            bookCard.classList.add("card");
            bookCard.innerHTML = `
                <img src="${book.book_image}" alt="${book.title} cover" />
                <h3>${book.title}</h3>
                <p>Author: ${book.author}</p>
            `;
            
            booksRow.appendChild(bookCard);
        });

        categoryContainer.appendChild(booksRow);
        rightBodyContainer.appendChild(categoryContainer);
    });
}

// Function to fetch audio notifications
async function fetchAudioNotification() {
    try {
        const data = await fetch(`https://books-backend.p.goit.global/books/category?category=Audio+Nonfiction`);
        const result = await data.json();
        return result;
    } catch (error) {
        console.error("Error fetching book list data:", error);
    }
}

// Function to fetch and display audio notifications
async function fetchAudioNotificationList() {
    const audioList = await fetchAudioNotification();
    createAdioList(audioList);
}

// Add event listener to an HTML element for fetching data on click
document.querySelector("#fetchButton").addEventListener("click", fetchAudioNotificationList);
