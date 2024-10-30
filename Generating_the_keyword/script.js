// script.js
const keyDisplay = document.getElementById('key');
const keyCodeDisplay = document.getElementById('keycode');
const keyHistoryList = document.getElementById('key-history');
const keySound = document.getElementById('key-sound');

// To store key history
let keyHistory = [];

document.addEventListener('keydown', (event) => {
    const key = event.key === ' ' ? 'Space' : event.key; // Display 'Space' for space key
    const keyCode = event.keyCode;

    // Update the key and key code display
    keyDisplay.textContent = `Key: ${key}`;
    keyCodeDisplay.textContent = `Key Code: ${keyCode}`;

    // Play sound
    keySound.currentTime = 0; // Reset sound if it's still playing
    keySound.play();

    // Handle key combinations
    let combination = key;
    if (event.ctrlKey || event.altKey || event.shiftKey || event.metaKey) {
        combination = `${event.ctrlKey ? 'Ctrl+' : ''}${event.altKey ? 'Alt+' : ''}${event.shiftKey ? 'Shift+' : ''}${event.metaKey ? 'Meta+' : ''}${key}`;
    }

    // Add to key history
    keyHistory.unshift({ combination, keyCode });
    if (keyHistory.length > 10) keyHistory.pop(); // Limit history to the last 10 entries

    // Update the key history list
    updateKeyHistory();
});

function updateKeyHistory() {
    keyHistoryList.innerHTML = ''; // Clear existing entries
    keyHistory.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.combination} - Key Code: ${item.keyCode}`;
        keyHistoryList.appendChild(li);
    });
}
