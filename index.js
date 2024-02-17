const weatherForm = document.querySelector("#weatherForm");
const cityName = document.querySelector("#cityName");
const card = document.querySelector(".card");
const apikey = "d9702ec388a7c1a95af4b3d86766ff5d";


weatherForm.addEventListener("submit", async e =>{
    e.preventDefault();


    const city = cityName.value;

    if(city){
        try {

            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
            
        } catch (error) {
            console.error(error);
            displayError(error);
        }

    }
    else{
        displayError("Please enter a city");
    }
});

async function getWeatherData(city){

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

    const response = await fetch(apiUrl);

    if(!response.ok){
        throw new Error("Could not fetch weather data");
    }

    return await response.json();

}

function displayWeatherInfo(data){

    const {name: city,
           main: {temp, humidity},
           weather: [{description, id}]} = data;

            
    card.textContent = "";
    card.style.display = "flex";


    const cityDisplay = document.createElement("h1");
    const temperature = document.createElement("p");
    const humidityD = document.createElement("p");
    const desc = document.createElement("p");
    const weatherEmoji = document.createElement("p");


    cityDisplay.textContent = city;
    temperature.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    humidityD.textContent = `Humidity: ${humidity}%`;
    desc.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);


    card.appendChild(cityDisplay);
    card.appendChild(temperature);
    card.appendChild(humidityD);
    card.appendChild(desc);
    card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId){

    switch(true){
        case(weatherId >= 200 && weatherId < 300):
            return "🌩️";

        case(weatherId >= 300 && weatherId < 400):
            return "🌧️";

        case(weatherId >= 500 && weatherId < 600):
            return "🌧️";

        case(weatherId >= 600 && weatherId < 700):
            return "❄️";

        case(weatherId >= 700 && weatherId < 800):
            return "🌫️";

        case(weatherId === 800):
            return "🌞";

        case(weatherId >= 801 && weatherId < 810):
            return "☁️";

        default:
            return "?";
    }

}

function displayError(message){

    const error = document.createElement("p");
    error.textContent = message;
    error.classList.add("error");


    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(error);

}