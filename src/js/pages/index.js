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


