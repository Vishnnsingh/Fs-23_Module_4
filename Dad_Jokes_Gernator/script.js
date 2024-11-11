
let joke = document.querySelector('#joke_id');
let head = document.querySelector('#question');

getJoke();
async function getJoke() {
   await fetch('https://v2.jokeapi.dev/joke/Any')
      .then(response => response.json())
      .then(data => {
         if (data.type === 'twopart') {
            head.innerText = data.setup;
            joke.innerText = data.delivery;
         } else {
            joke.innerText = data.joke;
         }
         speakText();
      })
      .catch(error => console.error('Error fetching joke:', error));
}

document.querySelector('button').addEventListener('click', () => {
   getJoke();
})

let span = document.querySelector('span');
// speck sentance
function speakText() {
   const textToSpeak2 = document.getElementById('joke_id').innerText;
   const textToSpeak1 = document.getElementById('question').innerText;
   let textToSpeak = textToSpeak1 + textToSpeak2;
   const utterance = new SpeechSynthesisUtterance(textToSpeak);
   utterance.voice = speechSynthesis.getVoices()[0];
   
span.addEventListener('click', () => {
   if (span.innerText == "volume_up") {
      span.innerText = 'volume_off';
      speechSynthesis.speak(utterance);
   } else {
      span.innerText = 'volume_up';
   }

});
   
}


