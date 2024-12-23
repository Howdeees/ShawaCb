document.addEventListener('DOMContentLoaded', () => {
	// Элементы
	const menuItems = document.querySelectorAll('.article-item') // Все элементы menu-item
	const menuPopup = document.getElementById('menuPopup')
	const popupTitle = document.getElementById('popupTitle')
	const popupDescription = document.getElementById('popupDescription')
	const closeMenuPopup = document.getElementById('closeMenuPopup')
	const addToCartButton = document.getElementById('addToCartButton')

	const cartButton = document.getElementById('cartButton')
	const popupCart = document.getElementById('popupCart')
	const closePopupCart = document.getElementById('closePopup')
	const cartItemsContainer = document.getElementById('cartItems')

	let selectedMenuItem = {} // Для хранения текущего элемента
	let cartItems = [] // Для хранения товаров в корзине

	// Открытие попапа с деталями товара
	menuItems.forEach(item => {
		item.addEventListener('click', () => {
			const itemName = item.querySelector('h3').textContent // Название из первого <p>
			const itemPrice = parseInt(
				item.querySelectorAll('p')[1].textContent.replace(/\D/g, '')
			) // Цена из второго <p>

			// Обновляем попап
			popupTitle.textContent = itemName // Название товара
			popupDescription.textContent = `Цена: ${itemPrice} ₽` // Цена товара

			// Сохраняем текущий товар
			selectedMenuItem = { name: itemName, price: itemPrice }

			menuPopup.style.display = 'flex' // Показываем попап
		})
	})

	// Закрытие попапа
	closeMenuPopup.addEventListener('click', () => {
		menuPopup.style.display = 'none' // Скрываем попап
	})

	// Добавление товара в корзину из попапа
	addToCartButton.addEventListener('click', () => {
		cartItems.push(selectedMenuItem) // Добавляем выбранный товар в корзину
		alert(`${selectedMenuItem.name} добавлен в корзину!`)

		menuPopup.style.display = 'none' // Закрываем попап
	})

	// Открытие корзины в новой вкладке
	cartButton.addEventListener('click', () => {
		// Сохраняем текущие данные корзины в localStorage
		localStorage.setItem('cartItems', JSON.stringify(cartItems))

		// Открываем новую вкладку с корзиной
		window.open('cart.html', '_blank')
	})
})
