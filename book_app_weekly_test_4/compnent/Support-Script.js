var flag = false;

const arrowSelector = document.querySelector(".support-arrow p");
const supportContentSelector = document.querySelector(".support-content");

arrowSelector.addEventListener("click",doit);

function doit(){

    if(!flag)
    {
        // supportContentSelector.classList.add("niche-Khisko");
        supportContentSelector.className="niche-Khisko";
        flag=true;
    }
    else{
        // supportContentSelector.classList.remove("niche-khisko");
        supportContentSelector.className="support-content";
        flag=false;
    }
}