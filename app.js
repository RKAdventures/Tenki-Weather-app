//Select elements
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");

//App data
const weather = {};

weather.temperature = {
    unit : "celsius"
}


//App consts and vars
const KELVIN = 273;
 //API KEY
 const key = "PUT YOUR OPENWEATHER API KEY";

 //Check if browser supports geolocation
if("geolocation" in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notificationElement.getElementsByClassName.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation.</p>";
}

//Set user's position
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}

//Show error when there is an issue
function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

//Get weather from API provider
function getWeather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        }).then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - KELVIN); // Celsius
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        }).then(function(){
            displayWeather();
        });
}

//Display weather to UI

function displayWeather(){
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

//C to F conversion
function celsiusToFahrenheit(temperature){
    return (temperature * 9/5) + 32;
}

//When the user clicks on the temperature element

// toggle fahrenheit ans celcius
tempElement.addEventListener("click", function(){
    if(weather.temperature.value === undefined) return;
    if(weather.temperature.unit === "celsius"){
        
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);
        
        tempElement.innerHTML = `${fahrenheit}° <span>F</span>`;
        weather.temperature.unit = "fahrenheit"
    }else{
        tempElement.innerHTML = `${weather.temperature.value}° <span>F</span>`;
        weather.temperature.unit = "celsius"
    }
});



const btn = document.querySelector(".btn-toggle");

const theme = document.querySelector("#theme-link");


btn.addEventListener("click", function(){
    if (theme.getAttribute("href") == "light-theme.css"){
        theme.href = "dark-theme.css";
    }else{
        theme.href = "light-theme.css"
    }
});
