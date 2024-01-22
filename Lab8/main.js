localStorage.clear();
const myApiKey = '402f1f92b89be591a87ce6340bf5b2dc';
const weatherArray = [];

let result = document.querySelector("#result");
let searchBtn = document.querySelector("#search-btn");
let cityRef = document.querySelector("#city");
let add = document.querySelector("#city-add");

let getWeather = data => {
    const { name } = data;
    let cityValue = cityRef.value;
    if (cityValue.length == 0) {
        alert("Podaj miejscowość")
    }
    else {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${myApiKey}&units=metric`;
        fetch(url).then((resp) => resp.json())

            .then((data) => {
                result.innerHTML = `
                <h2>${data.name}</h2>
                <h3 class="weather">${data.weather[0].description}</h3>
                <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png">
                <h1>${data.main.temp} &#176C</h1>
                <h4>Wilgotność: ${data.main.humidity}%</h4>`;
                add.addEventListener("click", () => {
                    weatherArray.push(`${data.name},${data.weather[0].description},${data.weather[0].icon},${data.main.temp},${data.main.humidity}`);
                    localStorage.setItem("weather", JSON.stringify(weatherArray));
                });
            })
            .catch(() => {
                alert("Nie znaleziono miejscowości");
            })

    }

}
searchBtn.addEventListener("click", getWeather);
window.addEventListener("load", getWeather);
