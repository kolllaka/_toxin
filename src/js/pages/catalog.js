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