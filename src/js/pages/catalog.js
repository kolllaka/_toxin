// tab
document.addEventListener('click', (e) => {
	if (e.target.closest(".tab__btn")) {
		console.log(e.target.closest(".tab").querySelector(".tab__body"));
		e.target.closest(".tab").querySelector(".tab__body").classList.toggle('show')
	}
})

// Select guests
if (document.getElementById('guests')) {
	const select = new MyCustomSelect("guests", {
		placeholder: "Сколько гостей",
		class: '.card__input',
		options: [
			{
				name: "взрослыe",
				value: 0,
				maxvalue: 7,
				placeholdername: "гость",
				tails: ["гость", "гостя", "гостей"]
			},
			{
				name: "дети",
				value: 0,
				maxvalue: 7,
				placeholdername: "гость",
				tails: ["гость", "гостя", "гостей"]
			},
			{
				name: "младенцы",
				value: 0,
				maxvalue: 7,
				placeholdername: "младенец",
				tails: ["младенец", "младенца", "младенцев"]
			}
		]
	})
}

// Select comfort
if (document.getElementById('comfort')) {
	const select = new MyCustomSelect("comfort", {
		placeholder: "удобства номера",
		class: '.card__input',
		options: [
			{
				name: "спальни",
				value: 2,
				maxvalue: 3,
				placeholdername: "спальни",
				tails: ["спальня", "спальни", "спален"]
			},
			{
				name: "кровати",
				value: 2,
				maxvalue: 4,
				placeholdername: "кровати",
				tails: ["кровать", "кровати", "кроватей"]
			},
			{
				name: "ванные комнаты",
				value: 0,
				maxvalue: 2,
				placeholdername: "ванные комнаты",
				tails: ["ванная комната", "ванные комнаты", "ванных комнат"]
			}
		]
	})
}

// Calendar
if (document.querySelector('.calendar')) {
	const calendar = new Calendar('.calendar', {
		placeholder: 'ДД.ММ.ГГГГ',
		class: '.card__input'
	})
}

// Swiper
// BildSlider
let sliders = document.querySelectorAll('._swiper');
if (sliders) {
	for (let index = 0; index < sliders.length; index++) {
		let slider = sliders[index];
		if (!slider.classList.contains('swiper-bild')) {
			let slider_items = slider.children;
			if (slider_items) {
				for (let index = 0; index < slider_items.length; index++) {
					let el = slider_items[index];
					el.classList.add('swiper-slide');
				}
			}
			let slider_content = slider.innerHTML;
			let slider_wrapper = document.createElement('div');
			slider_wrapper.classList.add('swiper-wrapper');
			slider_wrapper.innerHTML = slider_content;
			slider.innerHTML = '';
			slider.appendChild(slider_wrapper);
			slider.classList.add('swiper-bild');
		}
		if (slider.classList.contains('_gallery')) {
			//slider.data('lightGallery').destroy(true);
		}
	}
	sliders_bild_callback();
}

function sliders_bild_callback(params) { };

if (document.querySelector('.slider')) {
	let sliders = document.querySelectorAll('.slider');
	for (let index = 0; index < sliders.length; index++) {
		let slider = sliders[index],
			sliderBody = slider.querySelector('.slider__body'),
			sliderNext = slider.querySelector('.slider__arrow-next'),
			sliderPrev = slider.querySelector('.slider__arrow-prev'),
			sliderDotts = slider.querySelector('.slider__dotts');

		let itemSlider = new Swiper(sliderBody, {
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 0,
			autoHeight: true,
			speed: 800,
			loop: true,
			// Dotts
			pagination: {
				el: sliderDotts,
			},
			// Arrows
			navigation: {
				nextEl: sliderNext,
				prevEl: sliderPrev,
			},
		});
	}
}

// Rating
const ratings = document.querySelectorAll('.grade');

if (ratings.length > 0) {
	initRatings();
}

function initRatings() {
	let ratingActive, ratingValue;
	// Перебор по всем рейтингам
	for (let index = 0; index < ratings.length; index++) {
		const rating = ratings[index];
		initRating(rating);
	}
	// Инициализация конкретного рейтинга
	function initRating(rating) {
		initRatingVars(rating);
		setRatingActiveWidth();

		// ЕСли есть модификатор grade_set то даёт возможность собирать рейтинг
		if (rating.classList.contains('grade_set')) {
			setRating(rating);
		}
	}
	// Инициализация переменных
	function initRatingVars(rating) {
		ratingActive = rating.querySelector('.grade__active');
		ratingValue = rating.querySelector('.grade__active').getAttribute('data-rate');
		//ratingValue = rating.querySelector('.grade__active').dataset.value;
	}
	// Изменяет ширину звёзд
	function setRatingActiveWidth(index = ratingValue) {
		const ratingActiveWidth = index / 0.05;
		ratingActive.style.width = `${ratingActiveWidth}%`;
	}
	// Даёт возможность устанавливать оценку
	function setRating(rating) {
		const ratingItems = rating.querySelectorAll('.grade__item');
		for (let index = 0; index < ratingItems.length; index++) {
			const ratingItem = ratingItems[index];
			ratingItem.addEventListener('mouseenter', function (e) {
				// Обновление переменных
				initRatingVars(rating);
				// Обновление активных звёзд
				setRatingActiveWidth(ratingItem.value);
			});
			ratingItem.addEventListener('mouseleave', function (e) {
				// Обновление активных звёзд
				setRatingActiveWidth();
			});
			ratingItem.addEventListener('click', function (e) {
				// Обновление переменных
				initRatingVars(rating);

				if (rating.dataset.ajax) {
					// "Отправить" на сервер
					setRatingVars(ratingItem.value, rating);
				} else {
					// Отобразить указанную оценку
					ratingValue = index + 1;
					setRatingActiveWidth();
				}
			});
		}
	}

	async function setRatingVars(values, rating) {
		if (!rating.classList.contains('rating_sending')) {
			rating.classList.add('rating_sending');

			// Отправка данных (value) на сервер
			let response = await fetch('rating.json', {
				method: 'GET',

				// Код для отправки на сервер
				// body: JSON.stringify({
				// 	userRating: value
				// }),
				// headers: {
				// 	'content-type': 'application/json'
				// }

			});
			if (response.ok) {
				const result = await response.json();

				// Получение нового рейтинга
				const newRating = result.newRating;

				// Вывод нового среднего рейтинга
				rating.querySelector('.grade__active').setAttribute('data-rate', newRating);

				// Обновление активных звёзд
				setRatingActiveWidth();

				rating.classList.remove('rating_sending');
			} else {
				// Ошибка O_o
				alert("Ошибка");

				rating.classList.remove('rating_sending');
			}
		}
	}
};