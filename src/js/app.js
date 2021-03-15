let burger = document.querySelector(".hamburger");
let navList = document.querySelector('.nav__list')

document.addEventListener('click', e => {
    let fullBurger = e.target.closest(".hamburger");
    if (fullBurger) {
        navList.classList.toggle("visible");
        burger.classList.toggle("active");
    }
})