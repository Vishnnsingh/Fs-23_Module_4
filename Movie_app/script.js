const API_KEY = 'c8d793ca';
const API_URL = `http://www.omdbapi.com/?apikey=${API_KEY}`;
const searchBar = document.getElementById('search-bar');
const resultsContainer = document.getElementById('results-container');
const paginationContainer = document.getElementById('pagination');

let currentPage = 1;
let totalResults = 0;

// intial movies on ui

const fetchTopMoviesLandingPage = async () => {
    const totalMoviesToShow = 100; // Total movies to display on the landing page
    const resultsPerPage = 10; // API fetches 10 movies per page
    const totalPages = Math.ceil(totalMoviesToShow / resultsPerPage);
    let moviesHTML = '';
  
    resultsContainer.innerHTML = '<p>Loading movies...</p>'; // Show a loading message
  
    try {
      for (let page = 1; page <= totalPages; page++) {
        const res = await fetch(`${API_URL}&s=top&page=${page}`);
        const data = await res.json();
  
        if (data.Response === 'True') {
          // Loop through the movies in the current response
          data.Search.forEach((movie) => {
            moviesHTML += `
              <div class="movie-card" onclick="fetchMovieDetails('${movie.imdbID}')">
                <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'placeholder.jpg'}" alt="${movie.Title}">
                <div class="movie-info">
                  <h3>${movie.Title}</h3>
                  <p>${movie.Year}</p>
                </div>
              </div>`;
          });
        } else {
          console.error(`No movies found on page ${page}`);
        }
      }
  
      // Add the "Top Movies" heading and display the movies
      resultsContainer.innerHTML = `
        <h1 class="top-movies-heading"></h1> <br>
        <div class="movies-container">${moviesHTML}</div>`;
    } catch (error) {
      console.error('Error fetching top movies:', error);
      resultsContainer.innerHTML = '<p>Error loading movies. Please try again later.</p>';
    }
  };
  
  
  
  document.addEventListener('DOMContentLoaded', () => {
    fetchTopMoviesLandingPage();
  });
  
  
// Debouncing function
let debounceTimer;
const debounce = (callback, delay) => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(callback, delay);
};

// Fetch movies
const fetchMovies = async (query, page = 1) => {
  try {
    const res = await fetch(`${API_URL}&s=${query}&page=${page}`);
    const data = await res.json();
    if (data.Response === 'True') {
      displayMovies(data.Search);
      totalResults = parseInt(data.totalResults);
      renderPagination(query, totalResults, page);
    } else {
      resultsContainer.innerHTML = `<p>No results found</p>`;
      paginationContainer.innerHTML = '';
    }
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
};




// Display movies
const displayMovies = (movies) => {
  resultsContainer.innerHTML = movies
    .map(
      (movie) => `
      <div class="movie-card" onclick="fetchMovieDetails('${movie.imdbID}')">
        <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'placeholder.jpg'}" alt="${movie.Title}">
        <div class="movie-info">
          <h3>${movie.Title}</h3>
          <p>${movie.Year}</p>
        </div>
      </div>`
    )
    .join('');
};

// Pagination
const renderPagination = (query, total, currentPage) => {
    const totalPages = Math.ceil(total / 10);
    const maxButtonsToShow = 10; // Show only 10 buttons per group
    let startPage = Math.floor((currentPage - 1) / maxButtonsToShow) * maxButtonsToShow + 1;
    let endPage = Math.min(startPage + maxButtonsToShow - 1, totalPages);
  
    let paginationHTML = '';
  
    // Add "Previous" button
    if (startPage > 1) {
      paginationHTML += `<button class="pagination-btn" onclick="renderPagination('${query}', ${total}, ${
        startPage - 1
      }); fetchMovies('${query}', ${startPage - 1})">Previous</button>`;
    }
  
    // Add page number buttons
    for (let i = startPage; i <= endPage; i++) {
      paginationHTML += `<button class="pagination-btn" ${
        i === currentPage ? 'disabled' : ''
      } onclick="fetchMovies('${query}', ${i})">${i}</button>`;
    }
  
    // Add "Next" button
    if (endPage < totalPages) {
      paginationHTML += `<button class="pagination-btn" onclick="renderPagination('${query}', ${total}, ${
        endPage + 1
      }); fetchMovies('${query}', ${endPage + 1})">Next</button>`;
    }
  
    paginationContainer.innerHTML = paginationHTML;
  };
  
// Movie details
// const fetchMovieDetails = async (id) => {
//   try {
//     const res = await fetch(`${API_URL}&i=${id}`);
//     const movie = await res.json();
//     alert(`
//       Title: ${movie.Title}
//       Year: ${movie.Year}
//       Plot: ${movie.Plot}
//       Rating: ${movie.imdbRating}
//     `);
//   } catch (error) {
//     console.error('Error fetching movie details:', error);
//   }
// };

// Redirect to details page on movie card click
const fetchMovieDetails = (id) => {
    window.location.href = `details.html?movieId=${id}`;
  };

// // Event listener for search
// searchBar.addEventListener('input', () => {
//   const query = searchBar.value.trim();
//   if (query) {
//     debounce(() => fetchMovies(query, 1), 300);
//   } else {
//     resultsContainer.innerHTML = '';
//     paginationContainer.innerHTML = '';
//   }
// });

// Event listener for search button click
document.getElementById('search-button').addEventListener('click', () => {
    const query = searchBar.value.trim(); // Get the search query
    if (query) {
      fetchMovies(query, 1); // Fetch movies based on the query
    } else {
      resultsContainer.innerHTML = '<p>Please enter a search term.</p>';
      paginationContainer.innerHTML = '';
    }
  });
  
  // Event listener for "Enter" key
searchBar.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      const query = searchBar.value.trim();
      if (query) {
        debounce(() => fetchMovies(query, 1), 300);
      } else {
        resultsContainer.innerHTML = '<p>Please enter a search term.</p>';
        paginationContainer.innerHTML = '';
      }
    }
  });
  
  // Event listener for "Clear" button
document.getElementById('clear-button').addEventListener('click', () => {
    searchBar.value = ''; 
    resultsContainer.innerHTML = ''; 
    paginationContainer.innerHTML = ''; 
    fetchTopMoviesLandingPage(); 
  });
  

  // Add "Scroll to Top" Button
const scrollToTopButton = document.createElement('button');
scrollToTopButton.textContent = "↑ Top";
scrollToTopButton.id = "scroll-to-top";
document.body.appendChild(scrollToTopButton);

scrollToTopButton.style.cssText = `
  position: fixed;
  bottom: 30px;
  right: 30px;
  background-color: #ffcc00;
  color: #222;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 18px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: none;
`;

// Show/Hide the button on scroll
window.addEventListener('scroll', () => {
  scrollToTopButton.style.display = window.scrollY > 200 ? 'block' : 'none';
});

// Scroll to top when the button is clicked
scrollToTopButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
