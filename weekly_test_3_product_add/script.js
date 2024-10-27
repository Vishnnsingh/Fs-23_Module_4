const Products = [
  { id: 1, name: 'Product-1', price: 100 },
  { id: 2, name: 'Product-2', price: 200 },
  { id: 3, name: 'Product-3', price: 300 },
  
];

const cart = new Map();

document.addEventListener('DOMContentLoaded', () => {
  const productsList = document.getElementById('products');
  const cartItemsList = document.getElementById('cart-items');
  const totalPriceElement = document.getElementById('total-price');

  // Display products list
  Products.forEach(product => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
          <span>${product.name} - $${product.price}</span>
          <button onclick="addToCart(${product.id})">+</button>
          <span id="quantity-${product.id}">0</span>
          <button onclick="removeFromCart(${product.id})">-</button>
      `;
      productsList.appendChild(listItem);
  });

  function updateCart() {
      cartItemsList.innerHTML = '';
      let total = 0;

      if (cart.size === 0) {
          cartItemsList.innerHTML = '<li> No Product added to the cart</li>';
      } else {
          cart.forEach((quantity, id) => {
              const product = Products.find(p => p.id === id);
              total += product.price * quantity;

              const cartItem = document.createElement('li');
              cartItem.textContent = `${product.name} - Quantity: ${quantity} - $${product.price * quantity}`;
              cartItemsList.appendChild(cartItem);
          });
      }

      totalPriceElement.textContent = `Total Price: $${total}`;
  }

  window.addToCart = (id) => {
      if (cart.has(id)) {
          cart.set(id, cart.get(id) + 1);
      } else {
          cart.set(id, 1);
      }
      document.getElementById(`quantity-${id}`).textContent = cart.get(id);
      updateCart();
  };

  window.removeFromCart = (id) => {
      if (cart.has(id) && cart.get(id) > 0) {
          cart.set(id, cart.get(id) - 1);
          if (cart.get(id) === 0) {
              cart.delete(id);
          }
          document.getElementById(`quantity-${id}`).textContent = cart.has(id) ? cart.get(id) : 0;
          updateCart();
      }
  };

  updateCart();
});
