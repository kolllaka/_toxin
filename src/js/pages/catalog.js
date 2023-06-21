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