// script.js
const toggleSwitch = document.getElementById('toggle-switch');
const body = document.body;

toggleSwitch.addEventListener('change', () => {
    body.classList.toggle('dark-mode');
});
