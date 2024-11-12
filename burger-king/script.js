function getRandomTime() {
    return Math.floor(Math.random() * 500) + 200; // Random time between 2 to 7 sec
}

function getRandomOrderId() {
    return Math.floor(Math.random() * 1000) + 100; // Random ID between 100 and 1099
}

document.getElementById('btn').addEventListener('click', function() {
    const selecteditems = [];
    const checkBoxes = document.getElementsByName('foodItem');

    checkBoxes.forEach(function(checkbox) {
        if (checkbox.checked) {
            selecteditems.push(checkbox.value);
        }
    });

    if (selecteditems.length === 0) {
        alert("Please select at least one item");
        return;
    }

    const orderButton = document.getElementById('btn');
    orderButton.disabled = true;

    const foodImage = document.getElementById('foodImage');
    const orderIdElement = document.getElementById('orderId');
    const orderIdValueElement = document.getElementById('orderIdValue');
    const statusMessage = document.getElementById('statusMessage');

    orderIdElement.style.display = 'none';
    foodImage.style.display = 'none';
    statusMessage.textContent = "Your order is processing... please wait...!!";

    const promise = new Promise(function(resolve) {
        setTimeout(function() {
            resolve();
        }, getRandomTime());
    });

    promise.then(function() {
        const orderId = getRandomOrderId();
        orderIdValueElement.textContent = orderId;
        orderIdElement.style.display = 'block';


        if (selecteditems.includes('Burger') && selecteditems.includes('Fries') && !selecteditems.includes('Coke')) {
            foodImage.src = 'https://images.unsplash.com/photo-1615996001375-c7ef13294436?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnVyZ2VyJTIwYW5kJTIwZnJpZXN8ZW58MHx8MHx8fDA%3D';
        } else if (selecteditems.includes('Burger') && selecteditems.includes('Coke') && !selecteditems.includes('Fries')) {
            foodImage.src = 'https://imageio.forbes.com/specials-images/imageserve/188419805/960x0.jpg?height=471&width=711&fit=bounds';
        } else if (selecteditems.includes('Fries') && selecteditems.includes('Coke') && !selecteditems.includes('Burger')) {
            foodImage.src = 'https://img.freepik.com/premium-photo/french-fries-with-ketchup-glass-coke-wood-table_1077530-3197.jpg';
        } else if (selecteditems.length === 3) {
            foodImage.src = 'https://images.unsplash.com/photo-1700835880370-35e4910864ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZyaWVzJTIwY29rZSUyMGFuZCUyMGJ1cmdlcnxlbnwwfHwwfHx8MA%3D%3D';
        } else {
            const foodToShow = selecteditems[0];
            switch (foodToShow) {
                case 'Burger':
                    foodImage.src = 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnVyZ2VyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60';
                    break;
                case 'Fries':
                    foodImage.src = 'https://images.unsplash.com/photo-1576107232684-1279f390859f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZnJpZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60';
                    break;
                case 'Coke':
                    foodImage.src = 'https://images.unsplash.com/photo-1672094732705-b39d78da5bf8?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
                    break;
            }
        }

        foodImage.style.display = 'block';
        statusMessage.textContent = "Order delivered!";
        orderButton.disabled = false;
    });
});