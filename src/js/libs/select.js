class MyCustomSelect {
	constructor($selector, data) {
		this.$el = document.querySelector($selector)
		this.data = data
		this.mapPlaceholder = new Map()

		this.#render()
		this.#setup()
	}

	#render() {
		this.#fillMap()
		this.$el.innerHTML = selectTemplate(this.data)
	}

	#setup() {
		this.$el.addEventListener('click', (e) => {
			// show options
			if (e.target.closest('.select__title')) {
				this.$el.querySelector('.select__body').classList.toggle('show')
				this.$el.querySelector('.card__input').classList.toggle('show')

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
					this.$el.querySelector('.card__input').innerHTML = `${this.#getSelectPlaceholder()}`
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
		this.$el.querySelector('.card__input').innerHTML = `${this.#getSelectPlaceholder()}`
	}
}

const selectTemplate = (data) => {
	return `
	<label class="select__title">
		<div class="card__name">${data.title}</div>
		<div type="text" class="card__input arrow arrow_d">
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