// Смена фона при скроллинге
function handleScroll() {
  const sections = document.querySelectorAll('.section');
  const scrollPosition = window.scrollY + window.innerHeight / 2;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      // Устанавливаем активный фон для текущей секции
      document.body.style.backgroundImage = window.getComputedStyle(section).backgroundImage;
    }
  });
}

// Привязываем обработчик к событию скролла
window.addEventListener('scroll', handleScroll);

// Устанавливаем фон для первой секции при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  const firstSection = document.querySelector('.section');
  if (firstSection) {
    document.body.style.backgroundImage = window.getComputedStyle(firstSection).backgroundImage;
  }
});

// Логика для работы с модальным окном и выбором блюд
const items = {
  Шаурма: [
    { name: 'Шаурма классическая', image: 'classic-shaurma.jpg' },
    { name: 'Шаурма с говядиной', image: 'beef-shaurma.jpg' },
    { name: 'Шаурма с курицей и сыром', image: 'chicken-cheese-shaurma.jpg' },
    { name: 'Вегетарианская шаурма', image: 'veggie-shaurma.jpg' },
  ],
  Бургеры: [
    { name: 'Чизбургер', image: 'cheeseburger.jpg' },
    { name: 'Сырный бургер', image: 'cheese-burger.jpg' },
    { name: 'Двойной чизбургер', image: 'double-cheeseburger.jpg' },
  ],
  Фритюр: [
    { name: 'Картофель фри', image: 'fries.jpg' },
    { name: 'Стрипсы', image: 'strips.jpg' },
  ],
};

let selectedItems = {}; // Хранение выбранных товаров и их количества

// Открытие попапа с иконками выбора
function openModal(itemName) {
  document.getElementById('modal-header').innerText = 'Выберите ' + itemName;

  const iconContainer = document.getElementById('icon-container');
  iconContainer.innerHTML = ''; // Очищаем контейнер с иконками

  if (items[itemName]) {
    items[itemName].forEach(item => {
      const iconDiv = document.createElement('div');
      iconDiv.className = 'icon';
      iconDiv.onclick = () => selectItem(item.name);

      const img = document.createElement('img');
      img.src = item.image; // Здесь будут изображения для каждого варианта
      img.alt = item.name;

      const itemNameLabel = document.createElement('p');
      itemNameLabel.innerText = item.name;

      iconDiv.appendChild(img);
      iconDiv.appendChild(itemNameLabel);
      iconContainer.appendChild(iconDiv);
    });
  }

  document.getElementById('orderModal').style.display = 'block';
}

// Выбор пункта меню и добавление его в список выбранных товаров
function selectItem(itemName) {
  if (selectedItems[itemName]) {
    selectedItems[itemName] += 1; // Увеличиваем количество выбранного товара
  } else {
    selectedItems[itemName] = 1; // Добавляем товар в список
  }
  updateSelectedItems();
}

// Обновление списка выбранных товаров
function updateSelectedItems() {
  const selectedItemsContainer = document.getElementById('selected-items');
  selectedItemsContainer.innerHTML = ''; // Очищаем список перед обновлением

  Object.keys(selectedItems).forEach(itemName => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'selected-item';

    const itemLabel = document.createElement('span');
    itemLabel.innerText = `${itemName} (${selectedItems[itemName]} шт.)`;

    const increaseButton = document.createElement('button');
    increaseButton.innerText = '+';
    increaseButton.onclick = () => changeQuantity(itemName, 1);

    const decreaseButton = document.createElement('button');
    decreaseButton.innerText = '-';
    decreaseButton.onclick = () => changeQuantity(itemName, -1);

    itemDiv.appendChild(itemLabel);
    itemDiv.appendChild(increaseButton);
    itemDiv.appendChild(decreaseButton);

    selectedItemsContainer.appendChild(itemDiv);
  });
}

// Изменение количества выбранных товаров
function changeQuantity(itemName, change) {
  selectedItems[itemName] += change;
  if (selectedItems[itemName] <= 0) {
    delete selectedItems[itemName]; // Удаляем товар, если количество становится 0
  }
  updateSelectedItems();
}

// Закрытие попапа
function closeModal() {
  document.getElementById('orderModal').style.display = 'none';
  selectedItems = {}; // Очищаем выбранные товары при закрытии
  updateSelectedItems(); // Обновляем список
}

// Подтверждение заказа
function confirmOrder() {
  if (Object.keys(selectedItems).length === 0) {
    alert('Пожалуйста, выберите хотя бы одно блюдо.');
    return;
  }

  let orderSummary = 'Ваш заказ:\n';
  Object.keys(selectedItems).forEach(itemName => {
    orderSummary += `${itemName}: ${selectedItems[itemName]} шт.\n`;
  });

  alert(orderSummary + 'Спасибо за заказ!');
  closeModal();
}

// Закрытие попапа при клике вне области
window.onclick = function (event) {
  const modal = document.getElementById('orderModal');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};
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
}
