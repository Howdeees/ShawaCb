# ShawaCb
--шаваслева бургеры справа закуски(фритюр) снизу,  сделать названия блюд в цвет как на меню
.menu-left {
	float: left;
	width: 48%; /* Занимает половину экрана */
	text-align: left;
}
.menu-right {
	float: right;
	width: 48%; /* Занимает половину экрана */
	text-align: left;
}

.menu-center {
	clear: both; /* Отдельная строка */
	text-align: center;
	margin-top: 20px;
	gap: 20px 30px;
}

/* Общий стиль для элементов */
.menu-item {
	width: 180px; /* Фиксированная ширина */
	height: 100px; /* Фиксированная высота */
	margin: 10px; /* Универсальные отступы */
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	padding: 10px;
	background-color: #333;
	border-radius: 10px;
	margin: 10px;
	text-align: center;
	cursor: pointer;
	transition: transform 0.3s;
}

/* Контейнер для меню */
.menu-items {
	display: grid;
	grid-template-columns: repeat(2, 1fr); /* Два столбца */
	gap: 20px; /* Отступ между элементами */
	justify-items: center; /* Центрируем элементы */
	align-items: center;
}


5/12
.main-content {
	padding: 20px;
}



background-image: url(images1/FOB.jpg);




.menu-section {
	display: grid;
	grid-template-columns: 1fr 1fr; /* Два равных столбца */
	grid-template-rows: 1fr 1fr; /* Две равных строки */
	gap: 10px; /* Отступы между ячейками */
	height: 100vh; /* Занимает всю высоту окна */
	width: 100vw; /* Занимает всю ширину окна */
	box-sizing: border-box; /* Учитываем отступы */
}
.menu-section {
	margin: 250px ;
	max-width: 4000px;
}

/* Основной стиль секции меню */
.menu-section {
	background-image: url(images1/FOB.jpg);  /* Путь к твоей фотографии */
	background-size: cover; /* Растянуть изображение, чтобы оно покрывало всю секцию */
	background-position: center; /* Центрировать изображение */
	background-repeat: no-repeat; /* Отключить повторение */
	color: #fff; /* Контрастный цвет текста на фоне */
	padding: 40px 20px; /* Отступы */
	text-align: center;
}

.menu-section {
	background-image: url(images1/FOB.jpg);
	display: grid;
	grid-template-columns: 1fr 1fr; /* Два столбца */
	grid-template-rows: 1fr 1fr; /* Две строки */
	gap: 20px; /* Отступы между элементами */
	height: 100vh; /* Секция занимает всю высоту экрана */
	width: 100vw; /* Секция занимает всю ширину экрана */
	box-sizing: border-box; /* Учитываем отступы в расчёте размеров */
}
/* Позиционирование box1 в левом верхнем углу */
.menu-box1 {
	grid-column: 1 / 2; /* Первый столбец */
	grid-row: 1 / 2; /* Первая строка */
}

/* Позиционирование box2 в правом верхнем углу */
.menu-box2 {
	grid-column: 2 / 3; /* Второй столбец */
	grid-row: 1 / 2; /* Первая строка */
}

/* Позиционирование box3 в левом нижнем углу */
.menu-box3 {
	grid-column: 1 / 2; /* Первый столбец */
	grid-row: 2 / 3; /* Вторая строка */
}

/* Позиционирование box4 в правом нижнем углу */
.menu-box4 {
	grid-column: 2 / 3; /* Второй столбец */
	grid-row: 2 / 3; /* Вторая строка */
}
