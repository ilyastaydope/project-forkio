const burger = document.querySelector(".hamburger");
const navList = document.querySelector('.nav__list')

document.addEventListener('click', e => {
    const fullBurger = e.target.closest(".hamburger");
    if (fullBurger) {
        navList.classList.toggle("visible");
        burger.classList.toggle("active");
    }
    navList.classList.remove("visible");
    burger.classList.remove("active");
})
