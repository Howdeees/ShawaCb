document.addEventListener('DOMContentLoaded', () => {
	// Загрузка корзины из localStorage
	function loadCart() {
		const cart = JSON.parse(localStorage.getItem('cart')) || []
		const cartItemsContainer = document.getElementById('cartItems')
		const cartTotalContainer = document.getElementById('cartTotal')

		cartItemsContainer.innerHTML = '' // Очистка перед обновлением
		let total = 0

		if (cart.length === 0) {
			cartItemsContainer.innerHTML = '<p>Корзина пуста.</p>'
			cartTotalContainer.innerHTML = ''
			return
		}

		cart.forEach((item, index) => {
			const cartItem = document.createElement('div')
			cartItem.className = 'cart-item'
			cartItem.innerHTML = `
                <h3>${item.title}</h3>
                <p>Добавки: ${item.addonDetails.join(', ') || 'Нет'}</p>
                <p>Цена: ${item.totalPrice} ₽</p>
                <button onclick="removeFromCart(${index})">Удалить</button>
            `
			cartItemsContainer.appendChild(cartItem)
			total += item.totalPrice
		})

		cartTotalContainer.innerHTML = `<h3> ${total} ₽</h3>`
	}

	// Удаление элемента из корзины
	window.removeFromCart = index => {
		const cart = JSON.parse(localStorage.getItem('cart')) || []
		cart.splice(index, 1) // Удалить элемент по индексу
		localStorage.setItem('cart', JSON.stringify(cart))
		loadCart() // Обновить отображение
	}

	// Загрузить корзину при загрузке страницы
	loadCart()
})
