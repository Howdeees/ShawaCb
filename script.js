// Данные меню
const items = {
  Шаурма: [
      { name: 'Шаурма классическая', image: 'classic-shaurma.jpg' },
      { name: 'Шаурма с говядиной', image: 'beef-shaurma.jpg' },
      { name: 'Шаурма с курицей и сыром', image: 'chicken-cheese-shaurma.jpg' },
      { name: 'Вегетарианская шаурма', image: 'veggie-shaurma.jpg' }
  ],
  Бургеры: [
      { name: 'Чизбургер', image: 'cheeseburger.jpg' },
      { name: 'Сырный бургер', image: 'cheese-burger.jpg' },
      { name: 'Двойной чизбургер', image: 'double-cheeseburger.jpg' }
  ],
  Фритюр: [
      { name: 'Картофель фри', image: 'fries.jpg' },
      { name: 'Стрипсы', image: 'strips.jpg' }
  ]
};

// Выбранные товары
let selectedItems = {};

// Функция для изменения фона при скроллинге
document.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('.scroll-section');
  const scrollTop = window.scrollY;

  sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
          sections.forEach(sec => sec.style.opacity = '0.5');
          section.style.opacity = '1';
      }
  });
});

// Открытие модального окна
function openModal(itemName) {
  const modal = document.getElementById('orderModal');
  const header = document.getElementById('modal-header');
  const iconContainer = document.getElementById('icon-container');
  header.innerText = `Выберите ${itemName}`;
  iconContainer.innerHTML = '';

  if (items[itemName]) {
      items[itemName].forEach(item => {
          const iconDiv = document.createElement('div');
          iconDiv.className = 'icon';
          iconDiv.onclick = () => selectItem(item.name);

          const img = document.createElement('img');
          img.src = item.image;
          img.alt = item.name;

          const itemLabel = document.createElement('p');
          itemLabel.innerText = item.name;

          iconDiv.appendChild(img);
          iconDiv.appendChild(itemLabel);
          iconContainer.appendChild(iconDiv);
      });
  }

  modal.style.display = 'block';
}

// Закрытие модального окна
function closeModal() {
  document.getElementById('orderModal').style.display = 'none';
}

// Подтверждение заказа
function confirmOrder() {
  if (Object.keys(selectedItems).length === 0) {
      alert('Пожалуйста, выберите хотя бы одно блюдо.');
      return;
  }

  let summary = 'Ваш заказ:\n';
  for (const [key, value] of Object.entries(selectedItems)) {
      summary += `${key}: ${value} шт.\n`;
  }
  alert(summary + 'Спасибо за заказ!');
  closeModal();
}

// Выбор элемента
function selectItem(itemName) {
  selectedItems[itemName] = (selectedItems[itemName] || 0) + 1;
  console.log(selectedItems);

  // Добавление в список выбранных товаров
  const selectedItemsContainer = document.getElementById('selected-items');
  const existingItem = document.querySelector(`[data-item-name="${itemName}"]`);

  if (existingItem) {
      const countSpan = existingItem.querySelector('.item-count');
      countSpan.innerText = selectedItems[itemName];
  } else {
      const itemDiv = document.createElement('div');
      itemDiv.className = 'selected-item';
      itemDiv.setAttribute('data-item-name', itemName);

      const itemNameSpan = document.createElement('span');
      itemNameSpan.innerText = itemName;

      const countSpan = document.createElement('span');
      countSpan.className = 'item-count';
      countSpan.innerText = selectedItems[itemName];

      const removeButton = document.createElement('button');
      removeButton.innerText = 'Удалить';
      removeButton.onclick = () => removeItem(itemName);

      itemDiv.appendChild(itemNameSpan);
      itemDiv.appendChild(countSpan);
      itemDiv.appendChild(removeButton);

      selectedItemsContainer.appendChild(itemDiv);
  }
}

// Удаление элемента из заказа
function removeItem(itemName) {
  if (selectedItems[itemName]) {
      selectedItems[itemName]--;
      if (selectedItems[itemName] === 0) {
          delete selectedItems[itemName];
          const itemDiv = document.querySelector(`[data-item-name="${itemName}"]`);
          itemDiv.remove();
      } else {
          const countSpan = document.querySelector(`[data-item-name="${itemName}"] .item-count`);
          countSpan.innerText = selectedItems[itemName];
      }
  }
}
