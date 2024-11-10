const rightBodyContainer = document.querySelector(".right_body_container");

function createBook(booksData) {
    // Clear previous book data
    rightBodyContainer.innerHTML = ""; 

    const topHeading = document.createElement("h1");
    topHeading.classList.add("top-heading"); // Add styling class if needed
    topHeading.textContent = "Best Sellers Books";
    rightBodyContainer.appendChild(topHeading);
    
    // Loop through each book category
    booksData.forEach((category) => {
        const categoryContainer = document.createElement("div");
        categoryContainer.classList.add("category-container");
        
        // Create and append the category title
        const categoryTitle = document.createElement("h2");
        categoryTitle.classList.add("head_of_all")
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

async function fetchBookAppData() {
    const data = await fetch(`https://books-backend.p.goit.global/books/top-books`);
    const result = await data.json();
    return result;
}

async function fetchbook() {
    const booksData = await fetchBookAppData();
    console.log(booksData); 
    createBook(booksData);
}

fetchbook();

async function fetchCategories() {
    try {
        const response = await fetch('https://books-backend.p.goit.global/books/category-list');
        const categories = await response.json();
        categories.sort((a, b) => a.list_name.localeCompare(b.list_name));

        const categoryListElement = document.getElementById('category-list');
        categoryListElement.innerHTML = ''; // Clear previous categories

        categories.forEach(category => {
            const listItem = document.createElement('li');
            listItem.textContent = category.list_name;
            listItem.classList.add('book-category');
            listItem.addEventListener('click', () => {
                fetchBooks(category.list_name);
                // Clear the previous top books section
                rightBodyContainer.innerHTML = '';
            });
            categoryListElement.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
}



async function fetchBooks(categoryName) {
    try {
        const formattedCategoryName = categoryName.split(' ').join('+');
        const response = await fetch(`https://books-backend.p.goit.global/books/category?category=${formattedCategoryName}`);
        const books = await response.json();

        // Clear previous books
        rightBodyContainer.innerHTML = ""; 

        // Add the book list name at the top
        const categoryHeader = document.createElement("h2");
        categoryHeader.classList.add("category-header"); // Add styling class if needed
        categoryHeader.textContent = categoryName; // Display category name
        rightBodyContainer.appendChild(categoryHeader);

        // Display books in rows of 5
        let rowContainer = document.createElement("div");
        rowContainer.classList.add("bookss-row"); // Row container for 5 books
        books.forEach((book, index) => {
            const bookCard = document.createElement("div");
            bookCard.classList.add("card");
            bookCard.innerHTML = `
                <img src="${book.book_image}" alt="${book.title} cover" />
                <h3>${book.title}</h3>
                <p>Author: ${book.author}</p>
            `;

            rowContainer.appendChild(bookCard);

            // After every 5th book, append the row to rightBodyContainer and start a new row
            if ((index + 1) % 5 === 0) {
                rightBodyContainer.appendChild(rowContainer);
                rowContainer = document.createElement("div");
                rowContainer.classList.add("bookss-row");
            }
        });

        // Append any remaining books if the last row has less than 5 books
        if (rowContainer.children.length > 0) {
            rightBodyContainer.appendChild(rowContainer);
        }
    } catch (error) {
        console.error(`Error fetching books for ${categoryName}:`, error);
    }
}




fetchCategories();













// const rightBodyContainer = document.querySelector(".right_body_container");
// // const sidebar = document.querySelector(".sidebar");



// function createBook(booksData) {
//     // Clear previous book data if needed
//     // rightBodyContainer.innerHTML = ""; 

//     // Loop through each book category
//     booksData.forEach((category) => {
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

// async function fetchBookAppData() {
//     const data = await fetch(`https://books-backend.p.goit.global/books/top-books`);
//     const result = await data.json();
//     return result;
// }

// async function fetchbook() {
//     const booksData = await fetchBookAppData();
//     console.log(booksData); 
//     createBook(booksData);
// }

// fetchbook();





//   // logic when we click booklist and fetch the data and show on ui whole book
//   async function fetchCategories() {
//     try {
//         const response = await fetch('https://books-backend.p.goit.global/books/category-list');
//         const categories = await response.json();

//         const categoryListElement = document.getElementById('category-list');
//         categoryListElement.innerHTML = ''; // Clear previous categories

//         categories.forEach(category => {
//             const listItem = document.createElement('li');
//             listItem.textContent = category.list_name;
//             listItem.classList.add('book-category');
//             listItem.addEventListener('click', () => fetchBooks(category.list_name));
//             categoryListElement.appendChild(listItem);
//         });
//     } catch (error) {
//         console.error('Error fetching categories:', error);
//     }
// }

// // Function to fetch books for the selected category
// async function fetchBooks(categoryName) {
//     try {
//         // Replace spaces with '+' for URL query parameters
//         const formattedCategoryName = categoryName.split(' ').join('+');;
        
//         // Fetching books from the API based on the category name
//         const response = await fetch(`https://books-backend.p.goit.global/books/category?category=${formattedCategoryName}`);
//         const books = await response.json();

//         const bookListElement = document.getElementById('book-list');
//         bookListElement.innerHTML = ''; // Clear previous books

//         // Display books for the selected category
//         books.forEach(book => {
//             const bookItem = document.createElement('li');
//             bookItem.textContent = book.title;
            
//             // Assuming 'title' is the property for book name
//             bookItem.classList.add('book-item');
//             bookListElement.appendChild(bookItem);
//         });
//     } catch (error) {
//         console.error(`Error fetching books for ${categoryName}:`, error);
//     }
// }
// fetchCategories();








//aside bar logic list name book category
// async function categoriesData() {
//     const response = await fetch(
//       "https://books-backend.p.goit.global/books/category-list"
//     );
//     const data = await response.json();
  
//     for (let i = 0; i < data.length; i++) {
//       const element = data[i];
//       const para = document.createElement("p");
//       para.innerText = element.list_name;
//       para.addEventListener("click", () => {
//           emptyBookSection();
//       });
//       sidebar.appendChild(para);
//     }
//     return data;
//   }

//   categoriesData()


