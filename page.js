const apikey = "don't share your api key";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const icon = document.querySelector(".weather-icon"); // Déclaré ici pour éviter l'erreur

async function checkWeather(city) {
    const response = await fetch(apiurl + city + `&appid=${apikey}`);
    const data = await response.json();

    if (response.status === 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        // Mise à jour des informations météo
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        // Affichage de l'icône météo
        switch (data.weather[0].main) {
            case "Clouds":
                icon.src = "images/clouds.png";
                break;
            case "Clear":
                icon.src = "images/clear.png";
                break;
            case "Rain":
                icon.src = "images/rain.png";
                break;
            case "Snow":
                icon.src = "images/snow.png";
                break;
            case "Drizzle":
                icon.src = "images/drizzle.png";
                break;
            case "Mist":
            case "Fog":
                icon.src = "images/mist.png";
                break;
            default:
                icon.src = "images/wind.png"; // Image par défaut
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
};

// Lancer la recherche au clic
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
