const myApiKey = '402f1f92b89be591a87ce6340bf5b2dc';
let weatherArray = JSON.parse(localStorage.getItem('weather')) || [];

let result = document.querySelector("#result");
let searchBtn = document.querySelector("#search-btn");
let cityRef = document.querySelector("#city");
let add = document.querySelector("#city-add");
let remove = document.querySelector("#city-remove");
let cityList = document.querySelector("#city-list");

let getWeather = (cityValue) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${myApiKey}&units=metric`;
    fetch(url)
        .then((resp) => resp.json())
        .then((data) => {
            result.innerHTML = `
            <h2>${data.name}</h2>
            <h3 class="weather">${data.weather[0].description}</h3>
            <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png">
            <h1>${data.main.temp} &#176C</h1>
            <h4>Wilgotność: ${data.main.humidity}%</h4>`;
        })
        .catch(() => {
            alert("Nie znaleziono miejscowości");
        });
};

add.addEventListener("click", () => {
    let cityValue = cityRef.value;
    if (cityValue.length == 0) {
        alert("Podaj miejscowość");
    } else {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${myApiKey}&units=metric`;
        fetch(url)
            .then((resp) => resp.json())
            .then((data) => {
                weatherArray.push(`${data.name},${data.weather[0].description},${data.weather[0].icon},${data.main.temp},${data.main.humidity}`);
                localStorage.setItem("weather", JSON.stringify(weatherArray));
                populateCityList();
            })
            .catch(() => {
                alert("Nie znaleziono miejscowości");
            });
    }
});

remove.addEventListener("click", () => {
    let selectedCity = cityList.value;
    if (selectedCity) {
        let index = weatherArray.findIndex(cityData => cityData.startsWith(selectedCity));
        if (index !== -1) {
            weatherArray.splice(index, 1);
            localStorage.setItem("weather", JSON.stringify(weatherArray));
            populateCityList();
        } else {
            alert("Wybrany miasto nie jest w liście.");
        }
    } else {
        alert("Wybierz miasto, które chcesz usunąć.");
    }
});

function populateCityList() {
    cityList.innerHTML = `<option value="" disabled selected>Wybierz miasto</option>`;
    weatherArray.forEach(cityData => {
        let [name] = cityData.split(",");
        let option = document.createElement("option");
        option.textContent = name;
        option.value = name;
        cityList.appendChild(option);
    });
}

searchBtn.addEventListener("click", () => {
    let cityValue = cityRef.value;
    if (cityValue.length == 0) {
        alert("Podaj miejscowość");
    } else {
        getWeather(cityValue);
    }
});

cityList.addEventListener("change", () => {
    let cityValue = cityList.value;
    if (cityValue.length != 0) {
        getWeather(cityValue);
    }
});

window.addEventListener("load", populateCityList);
