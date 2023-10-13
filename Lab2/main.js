const main = document.querySelector('main')
const slides = document.querySelector('.slides')

// jednorazowe wykonanie kodu po określonym czasie
const timeoutRef = setTimeout(
    () => {
        slides.style.transform = 'translate(-100px)'
        slides.classList.add('slide2')
        main.innerHTML = 'Msg from setTimeout'
    },
    2000
)

// wykonywanie kodu co określony czas
let licznik = 0
const intervalRef = setInterval(
    () => {
        main.innerHTML = `Msg from setInterval: ${licznik++}`
    },
    4000
)