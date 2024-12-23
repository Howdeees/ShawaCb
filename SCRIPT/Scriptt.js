document.addEventListener('DOMContentLoaded', () => {
	// Добавление в корзину
	function addToCart() {
		const title = document.getElementById('popupTitle').innerText
		const basePrice = parseInt(document.getElementById('popupPrice').innerText)
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
		alert(
			`Добавлено в корзину: ${title} с добавками ${
				addonDetails.join(', ') || 'Нет'
			} за ${totalPrice} ₽`
		)

		closePopup()
	}
	function openPopup(title, price) {
		document.getElementById('popupTitle').innerText = title
		document.getElementById('popupPrice').innerText = `${price} ₽`
		document.getElementById('popupImage').src = '../images1/stud.jpg' // Замените на нужное изображение

		document.querySelector('.popup').style.display = 'block'
		document.querySelector('.overlay').style.display = 'block'
	}

	// Закрытие попапа
	function closePopup() {
		document.querySelector('.popup').style.display = 'none'
		document.querySelector('.overlay').style.display = 'none'
	}
	// Экспорт функций
	window.addToCart = addToCart
	window.openPopup = openPopup
	window.closePopup = closePopup
})
