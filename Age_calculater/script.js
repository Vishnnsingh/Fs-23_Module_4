// let btn = document.getElementById("btn");
// let para = document.getElementById("para");

// function calculate(){
//     let birthDay = new Date(document.getElementById("myDate").value);
//     let today = new Date();
    
//     let current = {
//         date : today.getDate(),
//         month : today.getMonth() + 1,
//         year : today.getFullYear()
//     }

//     let birth = {
//         date : birthDay.getDate(),
//         month : birthDay.getMonth() + 1,
//         year : birthDay.getFullYear()
//     }

//     let year;

//     // logic
    
//    if (current.month < birth.month){
//     year = (current.year - birth.year) - 1;
//    }else {
//     year = current.year - birth.year;
//    }

//     para.innerHTML = `You Are ${year} Years Old`
// }

// btn.addEventListener("click", function () {
// calculate();
// });


let btn = document.getElementById("btn");
let para = document.getElementById("para");

function calculate() {
    let birthDay = new Date(document.getElementById("myDate").value);
    let today = new Date();

    // Extract the current date, month, and year
    let current = {
        date: today.getDate(),
        month: today.getMonth() + 1, // JavaScript months are zero-based
        year: today.getFullYear()
    };

    // Extract the birth date, month, and year
    let birth = {
        date: birthDay.getDate(),
        month: birthDay.getMonth() + 1,
        year: birthDay.getFullYear()
    };

    let years, months, days;

    // Calculate the year difference
    years = current.year - birth.year;

    // Adjust the month and day calculations
    if (current.month < birth.month || (current.month === birth.month && current.date < birth.date)) {
        years--; // Decrease the year by one if the birth month or date has not yet occurred this year
    }

    // Calculate months
    months = current.month - birth.month;
    if (current.date < birth.date) {
        months--;
    }

    // Correct negative months
    if (months < 0) {
        months += 12;
    }

    // Calculate days
    let monthDays = [31, (current.year % 4 === 0 && current.year % 100 !== 0) || (current.year % 400 === 0) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    days = current.date - birth.date;
    if (days < 0) {
        days += monthDays[(current.month - 2 + 12) % 12]; // Adjust to the previous month's days
    }

    // Display the result
    para.innerHTML = `You Are ${years} Years, ${months} Months, and ${days} Days Old`;
}

// Event listener for the button click
btn.addEventListener("click", function () {
    calculate();
});
