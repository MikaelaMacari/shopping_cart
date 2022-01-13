'usestrict';
// --------------------- DEFINE VARIABLES FOR SELECTING ELEMENTS --------------------

const productElement = document.querySelector('.book-list');
const cartElement = document.querySelector('.shopping-container');
let totalElement = document.querySelector('.total');

// renderProducts  function

const renderProducts = function () {
  products.forEach(product => {
    productElement.innerHTML += ` 
    <div class="book-item">
    <div class="book-item-cover">
      <img src="${product.imgSrc}" alt="${product.name}" />
    </div>
    <div class="book-item-info">
      <ul class="book-item-list">
        <li class="book-item-list-name"><a href="#">${product.name}!</a></li>
        <li class="book-item-list-author">${product.author}</li>
        <li class="book-item-list-price">$${product.price}</li>
        <li class="book-item-list-btn">
          <button class="addBtn" onclick="addProducts(${product.id})">Add to cart</button>
        </li>
      </ul>
    </div>
  </div>`;
  });
};
renderProducts();

let productList = JSON.parse(localStorage.getItem('CART')) || [];
updateCart();
// addProducts function

const addProducts = function (id) {
  //check if product/book already exist  in array
  if (productList.some(item => item.id === id)) {
    alert('This book is already in cart!');
  } else {
    const item = products.find(product => product.id === id);
    productList.push({
      ...item,
      quantity: 1,
    });
  }
  updateCart();
};

// updateCart function

function updateCart() {
  renderCartItems();
  renderTotalPrice();
  //save cart to local storage
  localStorage.setItem('CART', JSON.stringify(productList));
}

// renderCartItems function
function renderCartItems() {
  cartElement.innerHTML = '';
  productList.forEach(item => {
    cartElement.innerHTML += `
    <ul class="shopping-body">
    <li>${item.id}</li>
    <li class="title">${item.name}</li>
    <li class="cart-quantity">${item.quantity}</li>
    <li class="cart-price">$${item.price}</li>
    <li>
      <button class="btn btn-warning" onclick='changeQuantityOfItems("minus", ${item.id})'>
        <i class="fas fa-minus"></i>
      </button>
      <button class="btn btn-success" onclick='changeQuantityOfItems("plus", ${item.id})'>
        <i class="fas fa-plus"></i>
      </button>
      <button class="btn btn-danger" onclick = 'removeProducts(${item.id})'>
        <i class="fas fa-trash-alt"></i>
      </button>
    </li>
  </ul>`;
  });
}
// changeQuantityOfItems function
const changeQuantityOfItems = function (action, id) {
  productList = productList.map(item => {
    let quantity = item.quantity;
    if (item.id === id) {
      if (action === 'minus' && quantity > 1) {
        quantity--;
      } else if (action === 'plus') {
        quantity++;
      }
    }
    return {
      ...item,
      quantity,
    };
  });
  updateCart();
};

//renderTotalPrice function

function renderTotalPrice() {
  let totalPrice = 0;
  productList.forEach(item => {
    totalPrice += item.price * item.quantity;
  });
  totalElement.innerHTML = `Total: $ <span>${totalPrice}</span>`;
}

// removeProducts function

const removeProducts = function (id) {
  productList = productList.filter(item => item.id !== id);
  updateCart();
};
