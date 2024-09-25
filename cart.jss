
const products = [
  { id: 1, name: "Product Name", price: 500, rating: 4.5, image: "https://images.meesho.com/images/products/370187336/pklia_512.webp" },
  { id: 2, name: "Product Name", price: 500, rating: 4.5, image: "https://images.meesho.com/images/products/370187336/pklia_512.webp" },
  { id: 3, name: "Product Name", price: 500, rating: 4.5, image: "https://images.meesho.com/images/products/370187336/pklia_512.webp" },
  { id: 4, name: "Product Name", price: 500, rating: 4.5, image: "https://images.meesho.com/images/products/370187336/pklia_512.webp" }
];

let cart = [];


function displayProducts() {
  const productContainer = document.querySelector('.products');
  products.forEach(product => {
      productContainer.innerHTML += `
          <div class="cards">
              <img src="${product.image}" alt="${product.name}">
              <h2>${product.name}</h2>
              <p>★ ${product.rating}</p>
              <p>₹${product.price}</p>
              <button onclick="addToCart(${product.id})">Add to Cart</button>
          </div>
      `;
  });
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const cartItem = cart.find(item => item.id === productId);

  if (cartItem) {
      cartItem.quantity += 1;  
  } else {
      cart.push({ ...product, quantity: 1 });  
  }

  displayCart();
}

// Function to remove a product from the cart
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);  // Remove item from the cart
  displayCart();
}

// Function to increase or decrease item quantity in the cart
function updateQuantity(productId, amount) {
  const cartItem = cart.find(item => item.id === productId);
  if (cartItem) {
      cartItem.quantity += amount;
      if (cartItem.quantity <= 0) {
          removeFromCart(productId);  // If quantity is 0 or less, remove item from cart
      }
  }
  displayCart();
}

// Function to display cart items on the page
function displayCart() {
  const cartContainer = document.querySelector('.cart');
  const totalMRPElement = document.getElementById('total-mrp');
  const totalAmountElement = document.getElementById('total-amount');

  cartContainer.innerHTML = '<h2>Cart</h2>';  // Reset cart display
  let totalPrice = 0;

  cart.forEach(item => {
      totalPrice += item.price * item.quantity;

      cartContainer.innerHTML += `
          <div class="cart-item">
              <img src="${item.image}" alt="${item.name}">
              <div class="cart-item-details">
                  <h3>${item.name}</h3>
                  <p>₹${item.price}</p>
                  <div class="control">
                      <button onclick="updateQuantity(${item.id}, -1)">-</button>
                      <span>${item.quantity}</span>
                      <button onclick="updateQuantity(${item.id}, 1)">+</button>
                  </div>
              </div>
              <button class="remove" onclick="removeFromCart(${item.id})">X</button>
          </div>
      `;
  });

  
  const couponDiscount = 50;
  const platformFee = 10;
  const shippingCharges = 20;
  const totalAmount = totalPrice + shippingCharges - couponDiscount + platformFee;

  totalMRPElement.innerText = totalPrice;
  totalAmountElement.innerText = totalAmount;
}
displayProducts();
