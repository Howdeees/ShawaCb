let cart = []
let selectedItem = null

function addToCart(name, price) {
	cart.push({ name, price })
	updateCartCount()
}

function openCustomization(name, price) {
	selectedItem = { name, price }
	document.getElementById('customization-title').textContent = name
	document.getElementById('customization-modal').style.display = 'flex'
}

function addCustomizedToCart() {
	const options = Array.from(
		document.querySelectorAll('.customization-options input:checked')
	)
	const additions = options.map(opt => opt.value)
	const extraPrice = options.reduce(
		(sum, opt) => sum + parseInt(opt.value.match(/\d+/)),
		0
	)

	cart.push({
		name: `${selectedItem.name} (${additions.join(', ')})`,
		price: selectedItem.price + extraPrice,
	})

	closeModal()
	updateCartCount()
}

function closeModal() {
	document.getElementById('customization-modal').style.display = 'none'
}

function updateCartCount() {
	document.getElementById('cart-count').textContent = cart.length
}
