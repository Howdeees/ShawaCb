document.addEventListener('DOMContentLoaded', () => {
	// Загрузка корзины из localStorage
	function loadCart() {
		const cart = JSON.parse(localStorage.getItem('cart')) || []
		const cartItemsContainer = document.getElementById('cartItems')
		const cartTotalContainer = document.getElementById('cartTotal')
		const cartTotal2Container = document.getElementById('cartTotal2')

		cartItemsContainer.innerHTML = '' // Очистка перед обновлением
		let total = 0

		if (cart.length === 0) {
			cartItemsContainer.innerHTML = '<p>Корзина пуста.</p>'
			cartTotalContainer.innerHTML = ''
			return
			cartTotal2Container.innerHTML = ''
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
		cartTotal2Container.innerHTML = `<h3> ${total} ₽</h3>`
	}

	// Удаление элемента из корзины
	window.removeFromCart = index => {
		const cart = JSON.parse(localStorage.getItem('cart')) || []
		cart.splice(index, 1) // Удалить элемент по индексу
		localStorage.setItem('cart', JSON.stringify(cart))
		loadCart() // Обновить отображение
	}
	document
		.getElementById('pickupButton')
		.addEventListener('click', function () {
			document.getElementById('orderDetails').innerHTML = `
        <p>Ваш номер заказа: <span id="orderNumber">#12345</span></p>
    `
			toggleActiveButton('pickupButton')
		})

	document
		.getElementById('deliveryButton')
		.addEventListener('click', function () {
			document.getElementById('orderDetails').innerHTML = `
        <p>Введите адрес доставки:</p>
        <input type="text" placeholder="Адрес" />
        <p>Введите ваш телефон:</p>
        <input type="text" placeholder="Телефон" />
    `
			toggleActiveButton('deliveryButton')
		})

	function toggleActiveButton(activeId) {
		document.querySelectorAll('.toggle-buttons button').forEach(button => {
			button.classList.remove('active')
		})
		document.getElementById(activeId).classList.add('active')
	}

	let map, marker

	// Инициализация карты
	function initMap() {
		const initialPosition = { lat: 56.142435, lng: 40.366911 }

		map = new google.maps.Map(document.getElementById('map'), {
			center: initialPosition,
			zoom: 12,
		})

		marker = new google.maps.Marker({
			position: initialPosition,
			map: map,
			draggable: true, // Маркер можно перемещать
		})

		const geocoder = new google.maps.Geocoder()

		// Обновляем адрес при перемещении маркера
		google.maps.event.addListener(marker, 'dragend', () => {
			const position = marker.getPosition()
			geocoder.geocode({ location: position }, (results, status) => {
				if (status === 'OK' && results[0]) {
					document.getElementById('selectedAddress').textContent =
						results[0].formatted_address
				} else {
					document.getElementById('selectedAddress').textContent =
						'Не удалось определить адрес'
				}
			})
		})
	}

	document
		.getElementById('pickupButton')
		.addEventListener('click', function () {
			document.getElementById('orderDetails').innerHTML = `
        <p>Ваш номер заказа: <span id="orderNumber">#12345</span></p>
    `
			document.getElementById('mapContainer').style.display = 'none'
			toggleActiveButton('pickupButton')
		})

	document
		.getElementById('deliveryButton')
		.addEventListener('click', function () {
			document.getElementById('orderDetails').innerHTML = `
        <p>Введите ваш телефон:</p>
        <input type="text" placeholder="Телефон" />
    `
			document.getElementById('mapContainer').style.display = 'block'
			toggleActiveButton('deliveryButton')
			initMap() // Инициализируем карту только при выборе доставки
		})

	function toggleActiveButton(activeId) {
		document.querySelectorAll('.toggle-buttons button').forEach(button => {
			button.classList.remove('active')
		})
		document.getElementById(activeId).classList.add('active')
	}
	// Функции переключения способа получения заказа
	document
		.getElementById('pickupButton')
		.addEventListener('click', function () {
			document.getElementById('orderDetails').innerHTML = `
        <p>Ваш номер заказа: <span id="orderNumber">#12345</span></p>
    `
			document.getElementById('mapContainer').style.display = 'none'
			toggleActiveButton('pickupButton', '.toggle-buttons button')
		})

	document
		.getElementById('deliveryButton')
		.addEventListener('click', function () {
			document.getElementById('orderDetails').innerHTML = `
        <p>Введите ваш телефон:</p>
        <input type="text" placeholder="Телефон" />
    `
			document.getElementById('mapContainer').style.display = 'block'
			toggleActiveButton('deliveryButton', '.toggle-buttons button')
		})

	// Функции переключения способа оплаты
	document.getElementById('cashButton').addEventListener('click', function () {
		document.getElementById('paymentDetails').innerHTML = `
        <p>Оплата производится при получении. Подготовьте точную сумму.</p>
    `
		toggleActiveButton('cashButton', '.payment-options .toggle-buttons button')
	})

	document.getElementById('cardButton').addEventListener('click', function () {
		document.getElementById('paymentDetails').innerHTML = `
        <p>Выберите тип карты:</p>
        <select>
            <option value="visa">Visa</option>
            <option value="mastercard">MasterCard</option>
            <option value="mir">МИР</option>
        </select>
        <p>Введите данные карты:</p>
        <input type="text" placeholder="Номер карты" />
        <input type="text" placeholder="Срок действия" />
        <input type="text" placeholder="CVV" />
    `
		toggleActiveButton('cardButton', '.payment-options .toggle-buttons button')
	})

	document
		.getElementById('onlineButton')
		.addEventListener('click', function () {
			document.getElementById('paymentDetails').innerHTML = `
        <p>Сканируйте QR-код для оплаты:</p>
        <img src="https://via.placeholder.com/200" alt="QR-код" style="width: 200px; height: 200px;" />
    `
			toggleActiveButton(
				'onlineButton',
				'.payment-options .toggle-buttons button'
			)
		})

	// Общая функция переключения активного состояния
	function toggleActiveButton(activeId, buttonSelector) {
		document.querySelectorAll(buttonSelector).forEach(button => {
			button.classList.remove('active')
		})
		document.getElementById(activeId).classList.add('active')
	}

	// Загрузить корзину при загрузке страницы
	loadCart()
})
