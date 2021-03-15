let burger = document.querySelector(".hamburger");
let navList = document.querySelector('.nav__list')

document.addEventListener('click', e =>{
    if(e.target === burger){
        navList.classList.toggle("visible");
    }
})