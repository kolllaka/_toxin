// Custom Scripts
const constMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
	constWeek = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"],
	constNameOfMonth = ["январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь",]

class Calendar {
	constructor($selector, data) {
		this.$el = document.querySelector($selector);
		this.data = data;

		let time = new Date()
		this.year = time.getFullYear();
		this.month = time.getMonth();
		this.selectedValue = [];
		this.daysArray;

		this.#render();
		this.#update();

		this.#setup();
	}

	#render() {
		this.$el.querySelector('.datapicker').innerHTML = calenderTemplate();
	}

	#update() {
		// set title
		this.$el.querySelector('.datapicker__title').innerText = `${constNameOfMonth[this.month] ?? ""} ${this.year ?? ""}`;

		this.daysArray = this.#daysArray();
		this.$el.querySelector('.gridbody__web').innerHTML = this.daysArray.map((el) => {
			let day = new Date(el.value * 1000)
			let selected = ""
			if (el.value == this.selectedValue[0] && el.style == "gridbody__day") {
				selected = "gridbody__day-select"
			}

			if (this.selectedValue[1] && el.value == this.selectedValue[1] && el.style == "gridbody__day") {
				selected = "gridbody__day-select"
			}

			return `
			<div class="gridbody__cell ${selected} ${el.style}" data-value="${el.value}">${day.getDate()}</div>
			`
		}).join('')

		if (this.selectedValue[1]) {
			this.#drawDaysHover(this.selectedValue[0], this.selectedValue[1], true, true)
		}
	}

	#setup() {
		this.buttonClickHandler = this.buttonClickHandler.bind(this);
		this.$el.addEventListener('click', this.buttonClickHandler)

		this.buttonHoverHandler = this.buttonHoverHandler.bind(this);

	}

	#daysArray() {
		let arrayOfMonth = [];
		let time = new Date(this.year, this.month, 1);
		let day = getHumanDay(time.getDay());

		for (let index = day + 1; index > 1; index--) {
			arrayOfMonth.push({
				value: Math.floor(time / 1000) - (index - 1) * 86400,
				style: "gridbody__prev",
			})
		}

		let lenghtOfMonth = constMonth[this.month]
		if ((this.month == 1) && (this.year % 4 == 0)) {
			lenghtOfMonth++
		}


		for (let index = 0; index < lenghtOfMonth; index++) {
			arrayOfMonth.push({
				value: Math.floor(time / 1000) + index * 86400,
				style: "gridbody__day",
			})
		}

		time = new Date(this.year, this.month, lenghtOfMonth)
		day = getHumanDay(time.getDay())

		let k = 1
		if (day != 6) {
			for (let index = day + 1; index < 7; index++) {
				arrayOfMonth.push({
					value: Math.floor(time / 1000) + k * 86400,
					style: "gridbody__next",
				})

				k++
			}
		}

		return arrayOfMonth
	}

	buttonClickHandler(event) {

		// next button on Datapicker
		if (event.target.closest('.datapicker__next') || event.target.closest('.gridbody__next')) {
			event.preventDefault();
			if (this.month == 11) {
				this.month = 0
				this.year++
			} else {
				this.month++
			}

			this.#update()
			return
		}

		// prev button on Datapicker
		if (event.target.closest('.datapicker__prev') || event.target.closest('.gridbody__prev')) {
			event.preventDefault();
			if (this.month == 0) {
				this.month = 11
				this.year--
			} else {
				this.month--
			}

			this.#update()
			return
		}

		// day button on Datapicker
		if (event.target.closest('.gridbody__day')) {
			if (this.selectedValue[1]) {
				this.selectedValue = []
				this.#update()
				this.#markingDay()

				return
			}

			if (!this.selectedValue[0]) {
				this.$el.addEventListener('mouseover', this.buttonHoverHandler)
				this.selectedValue[0] = event.target.dataset.value
				this.#markingDay()

				this.#clearDaysHover()
				event.target.classList.add('gridbody__day-select')
			} else {
				this.$el.removeEventListener('mouseover', this.buttonHoverHandler)
				this.selectedValue[1] = event.target.dataset.value
				event.target.classList.add('gridbody__day-select')
				this.selectedValue = this.selectedValue.sort()
				this.#markingDay()

				this.#clearDaysHover()
				this.#drawDaysHover(this.selectedValue[0], this.selectedValue[1], true, true)
			}

			return
		}

		// clear button on Datapicker
		if (event.target.closest('.datapicker__clear')) {
			event.preventDefault()
			this.selectedValue = []
			this.#update()
			this.#markingDay()

			return
		}

		// submit button on Datapicker
		if (event.target.closest('.datapicker__submit')) {
			event.preventDefault()
			this.$el.querySelectorAll('.card__input').forEach((cardinput) => cardinput.classList.remove('show'))
			this.$el.querySelector('.datapicker').classList.remove('show')

			return
		}

		// show Datapicker
		if (event.target.closest('.card__input')) {
			this.$el.querySelectorAll('.card__input').forEach((cardinput) => cardinput.classList.toggle('show'))
			this.$el.querySelector('.datapicker').classList.toggle('show')
		}
	}

	buttonHoverHandler(event) {
		if (event.target.closest('.gridbody__day')) {
			this.#clearDaysHover()
			let currentValue = event.target.dataset.value

			switch (true) {
				case (currentValue < this.selectedValue[0]):
					this.#clearDaysHover()
					this.#drawDaysHover(currentValue, this.selectedValue[0], false, true)

					break
				case (currentValue > this.selectedValue[0]):
					this.#clearDaysHover()
					this.#drawDaysHover(this.selectedValue[0], currentValue, true, false)

					break
				case (currentValue == this.selectedValue[0]):
					this.#clearDaysHover()

					break
			}

			return
		}

		if (event.target.closest('.gridbody__prev')) {
			this.#clearDaysHover()
			this.#drawDaysHover(this.daysArray[0].value, this.selectedValue[0], false, true)

			return
		}

		if (event.target.closest('.gridbody__next')) {
			this.#clearDaysHover()
			this.#drawDaysHover(this.selectedValue[0], this.daysArray.at(-1).value, true, false)

			return
		}
	}

	#clearDaysHover() {
		this.$el.querySelectorAll('.gridbody__day').forEach((day) => {
			if (day.classList.contains('gridbody__day-hover')) {
				day.classList.remove('gridbody__day-hover')
			}
			if (day.classList.contains('gridbody__day-selectleft')) {
				day.classList.remove('gridbody__day-selectleft')
			}
			if (day.classList.contains('gridbody__day-selectright')) {
				day.classList.remove('gridbody__day-selectright')
			}
		})
	}

	#drawDaysHover(startVal, endVal, isSelectedStart, isSelectedEnd) {
		this.$el.querySelectorAll('.gridbody__day').forEach((day) => {
			let currentValue = day.dataset.value
			if (startVal == endVal && day.dataset.value == startVal) {
				day.classList.add('gridbody__day-select')

				return
			}

			switch (true) {
				case (isSelectedStart && currentValue == startVal):
					day.classList.add('gridbody__day-selectleft')

					break
				case (isSelectedEnd && currentValue == endVal):
					day.classList.add('gridbody__day-selectright')

					break
				case (startVal <= currentValue && endVal >= currentValue):
					day.classList.add('gridbody__day-hover')

					break
			}
		})
	}

	#markingDay() {
		const inputs = this.$el.querySelectorAll(`${this.data.class}`)

		switch (inputs.length) {
			case 1:
				switch (this.selectedValue.length) {
					case 1:
						inputs[0].innerHTML = `${getTimeFromUnixtime(this.selectedValue[0])}-`

						break
					case 2:
						inputs[0].innerHTML = `${getTimeFromUnixtime(this.selectedValue[0])}-${getTimeFromUnixtime(this.selectedValue[1])}`

						break
					default:
						inputs[0].innerHTML = `${this.data.placeholder}-${this.data.placeholder}`
				}

				break
			case 2:
				switch (this.selectedValue.length) {
					case 1:
						inputs[0].innerHTML = `${getTimeFromUnixtime(this.selectedValue[0])}`
						inputs[1].innerHTML = `${this.data.placeholder}`

						break
					case 2:
						inputs[0].innerHTML = `${getTimeFromUnixtime(this.selectedValue[0])}`
						inputs[1].innerHTML = `${getTimeFromUnixtime(this.selectedValue[1])}`

						break
					default:
						inputs[0].innerHTML = `${this.data.placeholder}`
						inputs[1].innerHTML = `${this.data.placeholder}`
				}

				break
			default:
		}
	}
}

const getHumanDay = (day) => {
	day--
	if (day < 0) {
		day = 6
	}

	return day
}

const calenderTemplate = () => {
	return `
	<div class="datapicker__header">
		<div class="datapicker__btns">
			<a href="#" class="datapicker__btn datapicker__prev">
			</a>
		</div>
		<div class="datapicker__title">

		</div>
		<div class="datapicker__btns">
			<a href="#" class="datapicker__btn datapicker__next">
			</a>
		</div>
	</div>

	
	<div class="datapicker__body gridbody">
		<div class="gridbody__row">
			<div class="gridbody__cell gridbody__cellname">Пн</div>
			<div class="gridbody__cell gridbody__cellname">Вт</div>
			<div class="gridbody__cell gridbody__cellname">Ср</div>
			<div class="gridbody__cell gridbody__cellname">Чт</div>
			<div class="gridbody__cell gridbody__cellname">Пт</div>
			<div class="gridbody__cell gridbody__cellname">Сб</div>
			<div class="gridbody__cell gridbody__cellname">Вс</div>
		</div>
		<div class="gridbody__row gridbody__web">

		</div>
	</div>

	<div class="datapicker__footer">
		<div class="datapicker__btns">
			<a href="#" class="datapicker__btn datapicker__clear">
				очистить
			</a>
			<a href="#" class="datapicker__btn datapicker__submit">
				применить
			</a>
		</div>
	</div>
	`
}

const getTimeFromUnixtime = (unixTime) => {
	const date = new Date(unixTime * 1000)

	let day = date.getDate()
	let month = date.getMonth() + 1
	let year = date.getFullYear()

	if (day < 10) {
		day = `0${day}`
	}

	if (month < 10) {
		month = `0${month}`
	}

	return `${day}.${month}.${year}`
}
class MyCustomSelect {
	constructor($selector, data) {
		this.$el = document.getElementById($selector)
		this.data = data
		this.mapPlaceholder = new Map()

		this.#render()
		this.#setup()
	}

	#render() {
		this.#fillMap()
		this.$el.querySelector('.select__body').innerHTML = selectTemplate(this.data)

		this.$el.querySelector('.card__input').innerHTML = `<span>${this.#getSelectPlaceholder()}</span>`
	}

	#setup() {
		this.$el.addEventListener('click', (e) => {
			// show options
			if (e.target.closest(this.data.class)) {
				this.$el.querySelector('.select__body').classList.toggle('show')
				this.$el.querySelector(this.data.class).classList.toggle('show')

				return
			}

			// add or subtract count of the option
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
					this.$el.querySelector('.card__input').innerHTML = `<span>${this.#getSelectPlaceholder()}</span>`
				}
			}

			// done 
			if (e.target.closest('.done')) {
				this.$el.querySelector('.select__body').classList.remove('show')
				this.$el.querySelector('.card__input').classList.remove('show')
			}

			// clear 
			if (e.target.closest('.clear')) {
				this.data.options.forEach((option) => {
					option.value = 0
				})
				this.#update()
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

	#fillMap() {
		this.data.options.forEach((option) => {
			if (this.mapPlaceholder.has(option.placeholdername)) {
				this.mapPlaceholder.set(option.placeholdername, { value: this.mapPlaceholder.get(option.placeholdername).value + option.value, tails: option.tails })
			} else {
				this.mapPlaceholder.set(option.placeholdername, { value: +option.value, tails: option.tails })
			}
		});
	}

	#update() {
		this.$el.querySelectorAll('.quantity').forEach((quantity, index) => {
			quantity.querySelector('.quantity__value').innerHTML = `${this.data.options[index].value}`
		})
		this.mapPlaceholder.clear()
		this.#fillMap()
		this.$el.querySelector('.card__input').innerHTML = `<span>${this.#getSelectPlaceholder()}</span>`
	}
}

const selectTemplate = (data) => {
	return `
		${optionsTemplate(data.options)}
		<div class="select__buttons">
			<div class="select__btn clear">очистить</div>
			<div class="select__btn done">применить</div>
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
const MyRateOnCanvas = ($selector, data) => {
	const myCanvas = document.getElementById($selector)

	let ctx = myCanvas.getContext('2d');
	ctx.height = myCanvas.getAttribute('height') || 150;
	ctx.width = myCanvas.getAttribute('width') || 150;

	draw(ctx, data)
}

const draw = (ctx, data) => {
	let totalValue = totalCount(data.rates)
	let endAngle = -Math.PI / 2;
	let canvas = { start: ctx.height / 2, end: ctx.height / 2, radiusIn: ctx.height / 2 - 4, radiusOut: ctx.height / 2 }

	data.rates.forEach((rate) => {
		if (rate.value) {
			startAngle = endAngle;
			endAngle -= 2 * Math.PI / totalValue * rate.value;

			ctx.fillStyle = '#ffffff';
			ctx.beginPath();
			ctx.moveTo(canvas.start, canvas.end);
			ctx.arc(canvas.start, canvas.end, canvas.radiusOut, startAngle, startAngle - data.conva * Math.PI / 360, true);
			ctx.closePath();
			ctx.fill();

			let linerGradient = ctx.createLinearGradient(canvas.start, canvas.end - canvas.radiusOut, canvas.start, canvas.end + canvas.radiusOut);
			linerGradient.addColorStop(0, rate.colors1);
			linerGradient.addColorStop(1, rate.colors2);
			ctx.fillStyle = linerGradient;
			ctx.beginPath();
			ctx.moveTo(canvas.start, canvas.end);
			ctx.arc(canvas.start, canvas.end, canvas.radiusOut, startAngle - data.conva * Math.PI / 360, endAngle + data.conva * Math.PI / 360, true);
			ctx.closePath();
			ctx.fill();

			ctx.fillStyle = '#ffffff';
			ctx.beginPath();
			ctx.moveTo(canvas.start, canvas.end);
			ctx.arc(canvas.start, canvas.end, canvas.radiusOut, endAngle + data.conva * Math.PI / 360, endAngle, true);
			ctx.closePath();
			ctx.fill();
		}
	});

	ctx.fillStyle = '#ffffff';
	ctx.beginPath();
	ctx.moveTo(canvas.start, canvas.end);
	ctx.arc(canvas.start, canvas.end, canvas.radiusIn, 0, 2 * Math.PI);
	ctx.closePath();
	ctx.fill();
}

const totalCount = (arr) => arr.reduce((count, acc) => (+acc.value + count), 0);

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
		conva: 2
	}
	MyRateOnCanvas('MyCanvas', data)

	let totalValue = totalCount(data.rates)
	let tail = termOfNum(totalValue, ["гость", "гостя", "гостей"])
	myCanvas.querySelector('.impress__label').innerHTML = `<span>${totalValue} ${tail}</span>`

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