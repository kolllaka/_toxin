// Custom Scripts
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

class MyCustomSelect {
	constructor($selector, data) {
		this.$el = document.querySelector($selector)
		this.data = data
		this.mapPlaceholder = new Map()

		this.#render()
		this.#setup()
	}

	#render() {
		this.data.options.forEach((option) => {
			if (this.mapPlaceholder.has(option.placeholdername)) {
				this.mapPlaceholder.set(option.placeholdername, { value: this.mapPlaceholder.get(option.placeholdername).value + option.value, tails: option.tails })
			} else {
				this.mapPlaceholder.set(option.placeholdername, { value: +option.value, tails: option.tails })
			}
		});
		console.log("map", this.mapPlaceholder);

		this.$el.innerHTML = selectTemplate(this.data)
	}

	#setup() {
		this.$el.addEventListener('click', (e) => {
			if (e.target.closest('.select__title')) {
				this.$el.querySelector('.select__body').classList.toggle('show')

				return
			}

			if (e.target.classList.contains('quantity__btn')) {
				const quantity = e.target.closest('.quantity'),
					index = quantity.dataset.index,
					option = this.data.options[index]

				let isChange = false,
					mapData

				if (e.target.classList.contains('quantity__minus')) {
					if (option.value > 0) {
						mapData = this.mapPlaceholder.get(option.placeholdername)
						this.data.options[index].value--
						mapData.value--
						isChange = true
					}
				}

				if (e.target.classList.contains('quantity__plus')) {
					if (this.data.options[index].value < this.data.options[index].maxvalue) {
						mapData = this.mapPlaceholder.get(option.placeholdername)
						this.data.options[index].value++
						mapData.value++
						isChange = true
					}
				}

				if (isChange) {
					quantity.querySelector('.quantity__value').innerHTML = `${this.data.options[index].value}`
					this.mapPlaceholder.set(option.placeholdername, mapData)
					this.$el.querySelector('.card__input').innerHTML = `${this.#getSelectPlaceholder()}`
				}
			}
		})
	}

	#getSelectPlaceholder() {
		let selectPlaceholder = []
		for (let key of this.mapPlaceholder.keys()) {
			if (this.mapPlaceholder.get(key).value > 0) {
				let value = this.mapPlaceholder.get(key).value
				let tail = termOfNum(this.mapPlaceholder.get(key).value, this.mapPlaceholder.get(key).tails)
				selectPlaceholder.push(`${value} ${tail}`)

				continue
			}
		}

		if (selectPlaceholder.length == 0) {
			return this.data.placeholder
		}

		return selectPlaceholder.join(', ')
	}

	#update() { }
}

const selectTemplate = (data) => {
	return `
	<label class="select__title">
		<div class="card__name">${data.title}</div>
		<div type="text" class="card__input">
			<span>${data.placeholder}</span >
		</div >
	</label >
	<div class="select__body">

		${optionsTemplate(data.options)}

		<div class="select__buttons">
			<div class="select__btn clear">очистить</div>
			<div class="select__btn done">применить</div>
		</div>
	</div>
`
}

const optionsTemplate = (options = []) => {
	return options.map((option, index) => {
		return `
		<div class="select__option">
			<div class="select__name">${option.name}</div>
			<div class="select__quantity quantity" data-index=${index}>
				<div class="quantity__btn quantity__minus"></div>
				<div class="quantity__value">${option.value}</div>
				<div class="quantity__btn quantity__plus"></div>
			</div>
		</div>
		`
	}).join('')
}

const termOfNum = (number, tails) => {
	cases = [2, 0, 1, 1, 1, 2];
	return tails[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}

const select = new MyCustomSelect(".select", {
	title: "гости",
	placeholder: "Сколько гостей",
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