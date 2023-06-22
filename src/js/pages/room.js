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