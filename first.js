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
  var rise = data.sys.sunrise;
  var zone = data.timezone;
  var set = data.sys.sunset;
  var icon = data.weather[0].icon;

  document.querySelector(".srise").innerText = timecalc(rise, zone);
  document.querySelector(".sset").innerText = timecalc(set, zone);

  document.querySelector(".temp").innerText = temprature + "°C";
  document.querySelector(".city").innerText = cityname;
  document.querySelector(".humidity").innerText = humidity + "%";
  document.querySelector(".wind").innerText = Math.round(windspeed) + " Km/h";
  document.querySelector(".imgdesc").innerText = desc;
  document.querySelector(".feelslike").innerText = feels + "°C";
  document.querySelector(".visibility").innerText = visib + " mi";
  document.querySelector(".pressure").innerText = press + " hPa";
  document.querySelector(
    ".weathericon"
  ).src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
}

const locsearch = () => {
  fetch(
    `https://api.geoapify.com/v1/ipinfo?apiKey=7f5ecd0663fa47ae965c8d8840e3e362`
  )
    .then((response) => response.json())
    .then((data) => sea(data.city.name));
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
  document.querySelector(".srise").innerText = "-:-- AM";
  document.querySelector(".sset").innerText = "-:-- PM";
}

function timecalc(sun, zone) {
  let sunriseDate = new Date(sun * 1000);
  sunriseDate.setSeconds(sunriseDate.getSeconds() + zone);
  const sunriseHours = sunriseDate.getUTCHours().toString().padStart(2, "0");
  const sunriseMinutes = sunriseDate
    .getUTCMinutes()
    .toString()
    .padStart(2, "0");
  const sunriseTime = `${sunriseHours}:${sunriseMinutes}`;
  var splitTime = sunriseTime.split(":");
  var hours = parseInt(splitTime[0]);
  var minutes = parseInt(splitTime[1]);
  var period = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  return hours + ":" + minutes + " " + period;
}

function keyboard(event) {
  if (event.key === "Enter") {
    searchwhe();
  }
}
