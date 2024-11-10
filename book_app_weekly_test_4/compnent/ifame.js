const book_list_name = document.querySelector(".list");
// const rightBodyContainer = document.querySelector(".right_body_container");

function createList(bookList) {
    bookList.forEach((lists_of_book) => {
        const categoryAncherContainer = document.createElement("a");
        categoryAncherContainer.classList.add("head_anchor");
        categoryAncherContainer.href = "#"; // Add a dummy href to make it clickable

        const categoryListTitle = document.createElement("h2");
        categoryListTitle.classList.add("haed_left_side"); // keeping as per your code
        categoryListTitle.textContent = lists_of_book.list_name;

        categoryAncherContainer.appendChild(categoryListTitle);
        book_list_name.appendChild(categoryAncherContainer);



    });
}

async function fetchBooklistData() {
    try {
        const data = await fetch(`https://books-backend.p.goit.global/books/category-list`);
        const result = await data.json();
        return result;
    } catch (error) {
        console.error("Error fetching book list data:", error);
    }
}

async function fetchList() {
    const bookList = await fetchBooklistData();
    bookList.sort((a, b) => a.list_name.localeCompare(b.list_name));
    console.log(bookList)
    createList(bookList);
}

fetchList();




