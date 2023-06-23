document.addEventListener('click', (e) => {
	if (e.target.closest(".reviews__btn")) {
		const like = e.target.closest(".reviews__btn").querySelector('.reviews__like')
		let countOfLike = parseInt(like.querySelector('span').innerText)

		if (like.classList.contains('like') && countOfLike > 0) {
			countOfLike--
			like.innerHTML = `<span>${countOfLike}</span>`
			like.classList.remove('like')
		} else {
			countOfLike++
			like.innerHTML = `<span>${countOfLike}</span>`
			like.classList.add('like')
		}
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
				value: 2,
				maxvalue: 7,
				placeholdername: "гость",
				tails: ["гость", "гостя", "гостей"]
			},
			{
				name: "дети",
				value: 1,
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

// Calendar
if (document.querySelector('.calendar')) {
	const calendar = new Calendar('.calendar', {
		placeholder: 'ДД.ММ.ГГГГ',
		class: '.card__input'
	})
}

// Rate
const myCanvas = document.querySelector('.impress')
if (myCanvas) {
	data = {
		rates: [
			{
				name: "Великолепно",
				value: 130,
				colors1: "#FFE39C",
				colors2: "#FFBA9C"
			},
			{
				name: "Хорошо",
				value: 65,
				colors1: "#6FCF97",
				colors2: "#66D2EA"
			},
			{
				name: "Удовлетворительно",
				value: 65,
				colors1: "#BC9CFF",
				colors2: "#8BA4F9"
			},
			{
				name: "Разочарован",
				value: 0,
				colors1: "#909090",
				colors2: "#3D4975"
			},
		],
		desc: true,
		conva: 2,
		background: "#f6f6f6"
	}
	MyRateOnCanvas('MyCanvas', data)

	let totalValue = totalCount(data.rates)
	let tail = termOfNum(totalValue, ["гость", "гостя", "гостей"])
	myCanvas.querySelector('.impress__label').innerHTML = `<span>${totalValue}</span>${tail}`

	let rateList = myCanvas.querySelector('.impress__list')
	console.log(rateList);
	rateList.innerHTML = data.rates.map((rate) => {
		return `
		<li class="impress__item">
		<span class="impress__dott"
			style="background: linear-gradient(180deg, ${rate.colors1} 0%, ${rate.colors2} 100%);"></span>
		<span>${rate.name}</span>
	</li>
		`
	}).join(' ')
}