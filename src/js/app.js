const burger = document.querySelector(".btn--hamburger")
const navList = document.querySelector('.nav__list')

document.addEventListener('click', e => {
    const fullBurger = e.target.closest(".btn--hamburger")
    if (fullBurger) {
        navList.classList.toggle("visible")
        burger.classList.toggle("btn--hamburger-active")
    } else {
        navList.classList.remove("visible")
        burger.classList.remove("btn--hamburger-active")
    }
})