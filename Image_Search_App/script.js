let page = 1;
let query = '';

async function fetchImages() {
    const url = `https://api.unsplash.com/search/photos?query=${query}&page=${page}&per_page=10&client_id=83tPpT6H9HmA22KCsw2I3f5a_hW0U1RP2YIaeZI0l3Q`;
    document.getElementById('loading-indicator').style.display = 'block';

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (page === 1) document.getElementById('image-gallery').innerHTML = ''; // Clear previous images on a new search
        displayImages(data.results);
        document.getElementById('loading-indicator').style.display = 'none';
        document.getElementById('show-more').style.display = data.results.length > 0 ? 'block' : 'none';
    } catch (error) {
        console.error("Error fetching images:", error);
        document.getElementById('loading-indicator').innerHTML = 'Failed to load images. Try again.';
    }
}

function displayImages(images) {
    const gallery = document.getElementById('image-gallery');
    images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image.urls.small;
        imgElement.alt = image.alt_description || 'Unsplash Image';
        imgElement.addEventListener('click', () => showModal(image.urls.regular));
        gallery.appendChild(imgElement);
    });
}

function showModal(imageUrl) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <img src="${imageUrl}" alt="Large Image">
        </div>`;
    document.body.appendChild(modal);

    modal.querySelector('.close').addEventListener('click', () => modal.remove());
}

document.getElementById('search-button').addEventListener('click', () => {
    query = document.getElementById('search-input').value.trim();
    if (query) {
        page = 1;
        fetchImages();
    }
});

document.getElementById('show-more').addEventListener('click', () => {
    page++;
    fetchImages();
});
