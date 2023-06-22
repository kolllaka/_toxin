// Custom Scripts

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