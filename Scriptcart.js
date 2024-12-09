// Загружаем данные корзины из localStorage
const cartItemsContainer = document.getElementById("cartItems");
const cartTotalElement = document.getElementById("cartTotal");

const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

if (cartItems.length === 0) {
    cartItemsContainer.innerHTML = '<p class="empty-cart">Ваша корзина пуста.</p>';
} else {
    let total = 0;
    cartItems.forEach(item => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <p>${item.name}</p>
            <p>${item.price} ₽</p>
        `;
        total += item.price;
        cartItemsContainer.appendChild(cartItem);
    });

    cartTotalElement.textContent = `Итого: ${total} ₽`;
}