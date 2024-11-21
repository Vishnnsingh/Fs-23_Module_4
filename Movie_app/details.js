const API_KEY = 'c8d793ca';
const API_URL = `http://www.omdbapi.com/?apikey=${API_KEY}`;

// Get IMDb ID from the URL query parameter
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('movieId');

// Fetch and display movie details
const fetchMovieDetails = async (id) => {
  const movieDetailsContainer = document.getElementById('movie-details');
//   movieDetailsContainer.innerHTML = '<p>Loading movie details...</p>';

  try {
    const res = await fetch(`${API_URL}&i=${id}`);
    const movie = await res.json();

    if (movie.Response === 'True') {
      movieDetailsContainer.innerHTML = `
        <div class="movie-details-card">
          <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'placeholder.jpg'}" alt="${movie.Title}">
          <div class="movie-details-info">
            <h2>${movie.Title}</h2>
            <p><strong>Year:</strong> ${movie.Year}</p>
            <p><strong>Genre:</strong> ${movie.Genre}</p>
            <p><strong>Director:</strong> ${movie.Director}</p>
            <p><strong>Actors:</strong> ${movie.Actors}</p>
            <p><strong>Plot:</strong> ${movie.Plot}</p>
            <p><strong>IMDb Rating:</strong> ${movie.imdbRating}</p>
          </div>
        </div>
      `;
    } else {
      movieDetailsContainer.innerHTML = '<p>Movie details not found.</p>';
    }
  } catch (error) {
    console.error('Error fetching movie details:', error);
    movieDetailsContainer.innerHTML = '<p>Error loading movie details. Please try again later.</p>';
  }
};

// Initialize details page
document.addEventListener('DOMContentLoaded', () => {
  if (movieId) {
    fetchMovieDetails(movieId);
  }
});
