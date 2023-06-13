// Custom Scripts
// Burger menu
const burger = document.querySelector('.burger'),
	body = document.querySelector('body');

function burgerMenuFunc() {
	const burgerMenu = burger.querySelector('.burger__menu'),
		burgerBtn = burger.querySelector('.burger__btn');

	burgerBtn.addEventListener('click', () => {
		if (!burgerMenu.classList.contains('active')) {
			burgerMenu.classList.add('active')
			burgerBtn.classList.add('active-burger')
			body.classList.add('locked')
		} else {
			burgerMenu.classList.remove('active')
			burgerBtn.classList.remove('active-burger')
			body.classList.remove('locked')
		}
	})

	// navbar breakpoints
	window.addEventListener('resize', () => {
		if (window.innerWidth > 991.98) {
			burgerMenu.classList.remove('active')
			burgerBtn.classList.remove('active-burger')
			body.classList.remove('locked')
		}
	})
}
if (burger) {
	burgerMenuFunc()
}

// Fixed menu when scroll
function fixedNav() {
	const nav = document.querySelector('nav')

	// 
	const breakpoints = 1
	if (window.scrollY >= breakpoints) {
		nav.classList.add('fixed__nav')
	} else {
		nav.classList.remove('fixed__nav')
	}
}
window.addEventListener('scroll', fixedNav)


// Select
// const selects = document.querySelectorAll('.select')
// let selectMap = new Map();
// if (selects) {
// 	selects.forEach((select, index) => {
// 		const quantityValues = select.querySelectorAll('options')
// 		let data = new Map();
// 		quantityValues.forEach((quantityValue) => {
// 			data.set(quantityValue.dataset.name, parseInt(quantityValue.dataset.value))
// 		})

// 		selectMap.set(index, data)
// 	})
// }

// console.log("selectMap:", selectMap);
// if (selects) {
// 	selects.forEach((select, index) => {
// 		select.addEventListener('click', (e) => {
// 			if (e.target.closest('.select__title')) {
// 				select.querySelector('.select__body').classList.toggle('show')

// 				return
// 			}

// 			if (e.target.classList.contains('quantity__btn')) {
// 				const quantityOption = e.target.closest('options')
// 				let quantityValueView = quantityOption.querySelector('.quantity__value')
// 				let quantityValue = parseInt(quantityOption.dataset.value)
// 				let quantityName = quantityOption.dataset.name
// 				let selectInput = select.querySelector('.card__input')
// 				let data = selectMap.get(index)

// 				if (e.target.classList.contains('quantity__minus')) {
// 					if (quantityValue > 0) {
// 						quantityValue--

// 						quantityValueView.innerText = quantityValue
// 						quantityOption.dataset.value = quantityValue
// 						data.set(quantityName, quantityValue)
// 						selectMap.set(index, data)
// 						selectInput.innerText = getSelectTitle(data)
// 					}

// 					return
// 				}

// 				if (e.target.classList.contains('quantity__plus')) {
// 					if (quantityValue < 7) {
// 						quantityValue++

// 						quantityValueView.innerText = quantityValue
// 						quantityOption.dataset.value = quantityValue
// 						data.set(quantityName, quantityValue)
// 						selectMap.set(index, data)
// 						selectInput.innerText = getSelectTitle(data)
// 					}


// 					return
// 				}
// 			}
// 		})
// 	})
// }
// const termList = new Map([
// 	["гость", ["гость", "гостя", "гостей"]],
// 	["младенец", ["младенец", "младенца", "младенцев"]],
// 	["спальня", ["спальня", "спальни", "спален"]],
// 	["кровать", ["кровать", "кровати", "кроватей"]],
// 	["ванная комната", ["ванная комната", "ванные комнаты", "ванных комнат"]],
// ]);
// function termOfNum(number, word) {
// 	if (termList.has(word)) {
// 		let titles = termList.get(word);

// 		cases = [2, 0, 1, 1, 1, 2];
// 		return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
// 	} else {
// 		return word;
// 	}
// }

// const getSelectTitle = (data) => {
// 	let strMap = new Map()
// 	console.log("data", data);


// 	for (let name of data.keys()) {
// 		if (name == 'взрослый' || name == 'ребёнок') {
// 			console.log(name);
// 			if (strMap.has('гость')) {
// 				strMap.set('гость', strMap.get('гость') + data.get(name))
// 			} else {
// 				console.log(+data.get(name));
// 				strMap.set('гость', +data.get(name))
// 			}
// 			continue
// 		}

// 		strMap.set(name, data.get(name))
// 	}
// 	console.log("map", strMap);

// 	return strMap
// }

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
		let slider = sliders[index];
		let sliderBody = slider.querySelector('.slider__body');
		let itemSlider = new Swiper(sliderBody, {
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 0,
			autoHeight: true,
			speed: 800,
			loop: true,
		});
	}
}
