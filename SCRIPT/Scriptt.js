document.addEventListener('DOMContentLoaded', () => {
	updateCartTotal()
	// Функция открытия попапа
	function openPopup(title, price, info = '', image = '') {
		document.getElementById('Title').innerText = title // Заполнение заголовка
		document.getElementById('popupPrice').innerText = `${price} ₽` // Заполнение цены
		document.getElementById('pInfo').innerText = info // Заполнение информации
		document.getElementById('popupImage').src = image || '' // Установка изображения

		// Отображение попапа
		document.querySelector('.popup').style.display = 'block'
		document.querySelector('.overlay').style.display = 'block'
	}

	// Функция добавления в корзину
	function addToCart() {
		const title = document.getElementById('Title').innerText
		const basePrice = parseInt(
			document.getElementById('popupPrice').innerText.replace(' ₽', '')
		)
		const addons = [...document.querySelectorAll('input[name="addon"]:checked')]

		// Сбор добавок
		const addonDetails = addons.map(addon => addon.value)
		const addonPrice = addons.reduce((sum, addon) => {
			if (addon.value === 'Сыр') return sum + 20
			if (addon.value === 'Бекон') return sum + 30
			if (addon.value === 'Фри') return sum + 25
			return sum
		}, 0)

		const totalPrice = basePrice + addonPrice

		// Получение текущей корзины из localStorage
		const cart = JSON.parse(localStorage.getItem('cart')) || []

		// Добавление нового элемента
		cart.push({ title, addonDetails, totalPrice })

		// Сохранение корзины в localStorage
		localStorage.setItem('cart', JSON.stringify(cart))

		// Подтверждение
		showCustomAlert(
			`Добавлено в корзину: ${title} с добавками ${
				addonDetails.join(', ') || 'Нет'
			} за ${totalPrice} ₽`
		)
		updateCartTotal()
		closePopup()
	}

	// Функция закрытия попапа
	function closePopup() {
		document.querySelector('.popup').style.display = 'none'
		document.querySelector('.overlay').style.display = 'none'
	}
	function calculateTotal() {
		const cart = JSON.parse(localStorage.getItem('cart')) || []
		let total = 0

		cart.forEach(item => {
			total += item.totalPrice
		})

		return total
	}

	// Функция для обновления счетчика общего счета
	function updateCartTotal() {
		const total = calculateTotal()
		document.getElementById('cartTotal').innerHTML = `Итого: ${total} ₽`
	}
	function showCustomAlert(message) {
		const alertBox = document.getElementById('customAlert')
		const alertMessage = document.getElementById('customAlertMessage')

		alertMessage.innerText = message
		alertBox.style.display = 'flex'
	}

	function closeCustomAlert() {
		const alertBox = document.getElementById('customAlert')
		alertBox.style.display = 'none'
	}
	// Экспорт функций
	window.addToCart = addToCart
	window.openPopup = openPopup
	window.closePopup = closePopup
	window.closeCustomAlert = closeCustomAlert
})
