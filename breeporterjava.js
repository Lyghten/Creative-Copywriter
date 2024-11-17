document.addEventListener('DOMContentLoaded', () => {
  const browseBooksButton = document.getElementById('browse-books-button');
  const cartItems = document.getElementById('cart-items');
  const checkoutButton = document.getElementById('checkout-button');
  let cart = [];

  // Navigate to the browse books page
  browseBooksButton.addEventListener('click', () => {
    window.location.href = './browse-books.html';
  });

  // Add a book to the cart
  function addToCart(book) {
    const existingBook = cart.find((item) => item.title === book.title);
    if (existingBook) {
      existingBook.quantity += 1;
    } else {
      cart.push({ ...book, quantity: 1 });
    }
    updateCartUI();
  }

  // Remove a book from the cart
  function removeFromCart(bookTitle) {
    cart = cart.filter((item) => item.title !== bookTitle);
    updateCartUI();
  }

  // Update the cart UI
  function updateCartUI() {
    if (cart.length === 0) {
      cartItems.innerHTML = '<p>Your cart is empty.</p>';
      checkoutButton.classList.add('hidden');
    } else {
      cartItems.innerHTML = cart
        .map(
          (item) => `
        <div class="cart-item">
          <span>${item.title} (x${item.quantity})</span>
          <button onclick="removeFromCart('${item.title}')">Remove</button>
        </div>
      `
        )
        .join('');
      checkoutButton.classList.remove('hidden');
    }
  }

  // Checkout button
  checkoutButton.addEventListener('click', () => {
    alert('Thank you for your purchase!');
    cart = [];
    updateCartUI();
  });

  // Expose functions to the global scope for buttons
  window.addToCart = addToCart;
  window.removeFromCart = removeFromCart;

  // Newsletter form
  const newsletterForm = document.getElementById('newsletter-form');
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for signing up for our newsletter!');
    newsletterForm.reset();
  });
});
