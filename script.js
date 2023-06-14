// Sélection des éléments HTML
const cityInput = document.querySelector("#city-input"); // Champ de saisie pour la ville
const searchButton = document.querySelector("#search-btn"); // Bouton de recherche
const currentWeatherDiv = document.querySelector(".meteo-actuelle"); // Div pour afficher les données météo actuelles
const daysForecastDiv = document.querySelector(".days-forecast"); // Div pour afficher les prévisions sur 5 jours

const API_KEY = "0748bcc8f3e9acf712322438b43cfd41"; // Clé API OpenWeatherMap

// Fonction pour créer la carte météo en HTML basée sur les données météo
const createWeatherCard = (cityName, weatherItem, index) => {
  if (index === 0) {
    // Pour la carte de la météo actuelle
    return `
      <div class="mt-3 d-flex justify-content-between">
        <div>
          <h3 class="fw-bold">${cityName} (${weatherItem.dt_txt.split(" ")[0]})</h3>
          <h6 class="my-3 mt-3">Température : ${((weatherItem.main.temp - 273.15).toFixed(2))}°C</h6>
          <h6 class="my-3">Vent : ${weatherItem.wind.speed} M/S</h6>
          <h6 class="my-3">Humidité : ${weatherItem.main.humidity}%</h6>
        </div>
        <div class="text-center me-lg-5">
          <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="weather icon">
          <h6>${weatherItem.weather[0].description}</h6>
        </div>
      </div>`;
  } 
  else {
    // Pour les cartes de prévisions sur 5 jours
    return `
      <div class="col mb-3">
        <div class="card border-0 bg-secondary text-white">
          <div class="card-body p-3 text-white">
            <h5 class="card-title fw-semibold">(${weatherItem.dt_txt.split(" ")[0]})</h5>
            <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}.png" alt="weather icon">
            <h6 class="card-text my-3 mt-3">Température : ${((weatherItem.main.temp - 273.15).toFixed(2))}°C</h6>
            <h6 class="card-text my-3">Vent : ${weatherItem.wind.speed} M/S</h6>
            <h6 class="card-text my-3">Humidité : ${weatherItem.main.humidity}%</h6>
          </div>
        </div>
      </div>`;
  }
}

// Fonction pour obtenir les détails météo à partir des coordonnées de la ville
const getWeatherDetails = (cityName, latitude, longitude) => {
  const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;

  // Appel à l'API OpenWeatherMap pour récupérer les prévisions météo
  fetch(WEATHER_API_URL)
    .then(response => response.json())
    .then(data => {
      const forecastArray = data.list;
      const uniqueForecastDays = new Set();

      // Filtrage des prévisions pour obtenir uniquement celles des 5 prochains jours
      const fiveDaysForecast = forecastArray.filter(forecast => {
        const forecastDate = new Date(forecast.dt_txt).getDate();
        
        if (!uniqueForecastDays.has(forecastDate) && uniqueForecastDays.size < 6) {
          uniqueForecastDays.add(forecastDate);
          return true;
        }
        
        return false;
      });

      // Réinitialisation des éléments HTML
      cityInput.value = "";
      currentWeatherDiv.innerHTML = "";
      daysForecastDiv.innerHTML = "";

      // Création des cartes météo HTML et ajout dans les éléments HTML correspondants
      fiveDaysForecast.forEach((weatherItem, index) => {
        const html = createWeatherCard(cityName, weatherItem, index);
        if (index === 0) {
          currentWeatherDiv.insertAdjacentHTML("beforeend", html);
        }
        
        else {
          daysForecastDiv.insertAdjacentHTML("beforeend", html);
        }
      });
    })
    
    .catch(() => {
      alert("Une erreur s'est produite lors de la récupération des prévisions météo !");
    });
}

// Fonction pour obtenir les coordonnées de la ville saisie par l'utilisateur
const getCityCoordinates = () => {
  const cityName = cityInput.value.trim();
  
  if (cityName === "") return;
  const API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;

  // Appel à l'API OpenWeatherMap pour récupérer les coordonnées de la ville / Gestion Erreur
  fetch(API_URL)
    .then(response => response.json())
    .then(data => {
      if (!data.length) return alert(`Aucune coordonnée trouvée pour ${cityName}`);
      const { lat, lon, name } = data[0];
      getWeatherDetails(name, lat, lon);
    })
    .catch(() => {
      alert("Une erreur s'est produite lors de la récupération des coordonnées !");
    });
}

// Événement du bouton de recherche
searchButton.addEventListener("click", () => getCityCoordinates());
