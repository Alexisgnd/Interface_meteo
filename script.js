// Sélection des éléments HTML
const cityInput = document.querySelector("#city-input"); // Champ de saisie pour la ville
const searchButton = document.querySelector("#search-btn"); // Bouton de recherche
const currentWeatherDiv = document.querySelector(".meteo-actuelle"); // Div pour afficher les données météo actuelles
const daysForecastDiv = document.querySelector(".days-forecast"); // Div pour afficher les prévisions sur 5 jours

const API_KEY = "0748bcc8f3e9acf712322438b43cfd41"; // Clé API OpenWeatherMap