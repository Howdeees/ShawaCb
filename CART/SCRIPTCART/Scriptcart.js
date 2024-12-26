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
                <h3>Цена: ${item.totalPrice} ₽</h3>
                <button class='remove-button' onclick="removeFromCart(${index})">Удалить</button>
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
        <div class="card-payment">
            <label for="cardType">Тип карты:</label>
            <select id="cardType" class="styled-select">
                <option value="visa">Visa</option>
                <option value="mastercard">MasterCard</option>
                <option value="mir">МИР</option>
            </select>

            <div class="input-group">
                <label for="cardNumber">Номер карты:</label>
                <input type="text" id="cardNumber" placeholder="0000 0000 0000 0000" maxlength="19" />
            </div>

            <div class="input-row">
                <div class="input-group">
                    <label for="expiryDate">Срок действия:</label>
                    <input type="text" id="expiryDate" placeholder="MM/YY" maxlength="5" />
                </div>
                <div class="input-group">
                    <label for="cvv">CVV:</label>
                    <input type="password" id="cvv" placeholder="***" maxlength="3" />
                </div>
            </div>

            <button class="pay-button">Оплатить</button>
        </div>
    `
		toggleActiveButton('cardButton', '.payment-options .toggle-buttons button')
	})

	document
		.getElementById('onlineButton')
		.addEventListener('click', function () {
			document.getElementById('paymentDetails').innerHTML = `
        <p>Сканируйте QR-код для оплаты:</p>
        <img src="data:image/png;base64,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" alt="QR-код" style="width: 200px; height: 200px;" />
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
