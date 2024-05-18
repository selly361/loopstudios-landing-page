const hamburger = document.querySelector('[data-hamburger]')
const nav = document.querySelector('.header__nav')
const navLinks = nav.querySelectorAll('.nav__anchor')
let isNavOpened = false

const toggleNav = () => {
	isNavOpened = !isNavOpened
	nav.style.display = isNavOpened ? 'flex' : 'none'
	hamburger.classList.toggle('header__hamburger--opened', isNavOpened)
	hamburger.classList.toggle('header__hamburger--closed', !isNavOpened)

	if (isNavOpened) {
		document.body.style.overflowY = 'hidden'
		navLinks[0].focus()
	} else {
		document.body.style.overflowY = 'auto'
		hamburger.focus()
	}
}

const checkScreenWidth = () => {
	if (window.innerWidth > 768) {
		isNavOpened = false
		nav.style.display = 'flex'
		hamburger.classList.remove('header__hamburger--opened')
		hamburger.classList.add('header__hamburger--closed')
		document.body.style.overflowY = 'auto'
	} else {
		nav.style.display = isNavOpened ? 'block' : 'none'
		document.body.style.overflowY = isNavOpened ? 'hidden' : 'auto'
	}
}

const handleTabKey = (e) => {
	if (!isNavOpened) return

	const isTabPressed = e.key === 'Tab' || e.keyCode === 9
	if (!isTabPressed) return

	const focusableElements = [hamburger, ...navLinks]
	const firstFocusableElement = focusableElements[0]
	const lastFocusableElement = focusableElements[focusableElements.length - 1]

	if (e.shiftKey) {
		if (document.activeElement === firstFocusableElement) {
			e.preventDefault()
			lastFocusableElement.focus()
		}
	} else {
		if (document.activeElement === lastFocusableElement) {
			e.preventDefault()
			firstFocusableElement.focus()
		}
	}
}

const handleKeydown = (e) => {
	if (isNavOpened && e.key === 'Escape') {
		toggleNav()
	}
}

hamburger.addEventListener('click', toggleNav)
window.addEventListener('resize', checkScreenWidth)
document.addEventListener('keydown', handleTabKey)
document.addEventListener('keydown', handleKeydown)

checkScreenWidth()
