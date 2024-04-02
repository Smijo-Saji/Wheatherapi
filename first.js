var date = new Date();
const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

var date = `${weekday[date.getDay()].slice(0, 3)}, ${
  month[date.getMonth()]
}  ${date.getDate()}`;
p1.innerHTML = `<p class="m-0">${date}</p>`;

function searchwhe() {
  var city = i1.value;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5b4bee0ba241d092159faf007e166080`
  )
    .then((val) => val.json())
    .then((val) => {
      if (val.cod == 404) {
        errorpage();
      } else {
        disData(val);
      }
    });
}
function disData(data) {
  var cityname = data.name;
  var temprature = Math.round(data.main.temp - 273);
  var humidity = data.main.humidity;
  var windspeed = data.wind.speed;
  var type = data.weather[0].main;
  var desc =
    data.weather[0].description.charAt(0).toUpperCase() +
    data.weather[0].description.slice(1);
  var feels = Math.round(data.main.feels_like - 273);
  var visib = Math.round(data.visibility * 0.000621371);
  var press = data.main.pressure;

  document.querySelector(".temp").innerText = temprature + "°C";
  document.querySelector(".city").innerText = cityname;
  document.querySelector(".humidity").innerText = humidity + "%";
  document.querySelector(".wind").innerText = Math.round(windspeed) + " Km/h";
  document.querySelector(".imgdesc").innerText = desc;
  document.querySelector(".feelslike").innerText = feels + "°C";
  document.querySelector(".visibility").innerText = visib + " mi";
  document.querySelector(".pressure").innerText = press + " hPa";
  if (type === "Clouds") {
    document.querySelector(".weathericon").src = "images/clouds.png";
  } else if (type === "Clear") {
    document.querySelector(".weathericon").src = "images/clear.png";
  } else if (type === "Rain") {
    document.querySelector(".weathericon").src = "images/rain.png";
  } else if (type === "Drizzle") {
    document.querySelector(".weathericon").src = "images/drizzle.png";
  } else if (type === "Mist") {
    document.querySelector(".weathericon").src = "images/mist.png";
  } else if (type === "Snow") {
    document.querySelector(".weathericon").src = "images/snow.png";
  }
}

const locsearch = () => {
  const success = (position) => {
    const lat = position.coords.latitude;
    const log = position.coords.longitude;
    fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${log}&localityLanguage=en`
    )
      .then((loc) => loc.json())
      .then((loc) => sea(loc.city));
  };

  const error = () => {
    errorpage();
  };
  navigator.geolocation.getCurrentPosition(success, error);
};

function sea(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5b4bee0ba241d092159faf007e166080`
  )
    .then((val) => val.json())
    .then((val) => {
      if (val.cod == 404) {
        errorpage();
      } else {
        disData(val);
      }
    });
}

function errorpage() {
  document.querySelector(".weathericon").src = "images/404.png";
  document.querySelector(".temp").innerText = "--°C";
  document.querySelector(".city").innerText = "--";
  document.querySelector(".humidity").innerText = "--%";
  document.querySelector(".wind").innerText = "-- Km/h";
  document.querySelector(".imgdesc").innerText = "Oops !";
  document.querySelector(".feelslike").innerText = "--°C";
  document.querySelector(".visibility").innerText = "-- mi";
  document.querySelector(".pressure").innerText = "-- hPa";
}
