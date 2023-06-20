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