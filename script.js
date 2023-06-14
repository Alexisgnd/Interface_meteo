// Sélection des éléments HTML
const cityInput = document.querySelector("#city-input"); // Champ de saisie pour la ville
const searchButton = document.querySelector("#search-btn"); // Bouton de recherche
const currentWeatherDiv = document.querySelector(".meteo-actuelle"); // Div pour afficher les données météo actuelles
const daysForecastDiv = document.querySelector(".days-forecast"); // Div pour afficher les prévisions sur 5 jours

const API_KEY = "0748bcc8f3e9acf712322438b43cfd41"; // Clé API OpenWeatherMap

// Fonction pour obtenir les coordonnées de la ville saisie par l'utilisateur
const getCityCoordinates = () => {
  const cityName = cityInput.value.trim();
  if (cityName === "") return;
  const API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;

  // Appel à l'API OpenWeatherMap pour récupérer les coordonnées de la ville
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
