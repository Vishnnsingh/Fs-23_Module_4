let btn = document.getElementById("btn");
let para = document.getElementById("para");

function calculate(){
    let birthDay = new Date(document.getElementById("myDate").value);
    let today = new Date();
    
    let current = {
        date : today.getDate(),
        month : today.getMonth() + 1,
        year : today.getFullYear()
    }

    let birth = {
        date : birthDay.getDate(),
        month : birthDay.getMonth() + 1,
        year : birthDay.getFullYear()
    }

    let year;

    // logic
    
   if (current.month < birth.month){
    year = (current.year - birth.year) - 1;
   }else {
    year = current.year - birth.year;
   }

    para.innerHTML = `You Are ${year} Years Old`
}

btn.addEventListener("click", function () {
calculate();
});