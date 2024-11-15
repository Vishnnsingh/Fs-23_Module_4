



let apiKey = "_DDIVJSgdK-GI1wA3aHOtxC9YTt8tCY6-4jMk7guznY";
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=10`;

async function getPhots() {
  try {
    let response = await fetch(apiUrl);
    let data = await response.json();
    console.log(data); //array of photo onjects

    let box = document.querySelector(".box");
    data.forEach((photo) => {
      console.log(photo);
      let img = document.createElement("img");
      img.src = photo.urls.regular;
      img.style.height = "500px";
      img.style.width = "400px";
      box.appendChild(img);
    });
  } catch (error) {
    console.log(error);
  }
}

getPhots();

window.addEventListener("scroll", function(){
    console.log(window.scrollY, window.innerHeight + 50, document.body.offsetHeight);
    
    if(Math.ceil(window.scrollY + window.innerHeight) >= document.body.offsetHeight){
        getPhots();
    }
})