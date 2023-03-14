import axios from 'axios';

const WEATHER_API_KEY = 'ddb3f4f523554053da0c0f5cbef7c1eb';
const weatherMarkup = document.querySelector(`.weather`);
const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
const months = [
  `Jan`,
  `Feb`,
  `Mar`,
  `Apr`,
  `May`,
  `Jun`,
  `Jul`,
  `Aug`,
  `Sep`,
  `Oct`,
  `Nov`,
  `Dec`,
];
const date = new Date();

export async function getWeatherCoords() {
  try {
    const ip = await axios.get('https://ipapi.co/json/');
    // console.log(`your IP is -->`, ip.data.ip);
    const response = await axios.get(`https://ipapi.co/${ip.data.ip}/json/`);
    // console.log(`your geo is -->`, response.data.city);
    const weather = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?id=524901&appid=ddb3f4f523554053da0c0f5cbef7c1eb&q=${response.data.city}&units=metric`
    );

    document.querySelector(
      `.weather`
    ).innerHTML = `<div class="weather_wrapper"><p class="weather_temperature">${Math.round(
      weather.data.list[0].main.temp
    )}&deg</p>
      <div class="weather_info"><p class="weather_condition">${
        weather.data.list[0].weather[0].main
      }</p>
      <p class="weather_geolocation">${response.data.city}</p></div></div>
      <img class="weather_image" src="${`https://openweathermap.org/img/wn/${weather.data.list[0].weather[0].icon}@2x.png`}" alt="Weather condition" width=128 height=121 />
      <p class="weather_day">${days[date.getDay()]}</p>
      <p class="weather_date">${String(date.getDate()).padStart(2, '0')}-${
      months[date.getMonth()]
    }-${date.getFullYear()}</p>
    <a class="weather_forecast"
    href="https://openweathermap.org/city/${weather.data.city.id}"
    target="_blank"
    rel="noreferrer noopener"
    class="socials__link link"
    >Weather for week</a>`;
  } catch {
    const weather = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?id=524901&appid=ddb3f4f523554053da0c0f5cbef7c1eb&q=Kyiv&units=metric`
    );

    document.querySelector(
      `.weather`
    ).innerHTML = `<div class="weather_wrapper"><p class="weather_temperature">${Math.round(
      weather.data.list[0].main.temp
    )}&deg</p>
      <div class="weather_info"><p class="weather_condition">${
        weather.data.list[0].weather[0].main
      }</p>
      <p class="weather_geolocation">Kyiv</p></div></div>
      <img class="weather_image" src="${`https://openweathermap.org/img/wn/${weather.data.list[0].weather[0].icon}@2x.png`}" alt="Weather condition" width=128 height=121 />
      <p class="weather_day">${days[date.getDay()]}</p>
      <p class="weather_date">${String(date.getDate()).padStart(2, '0')}-${
      months[date.getMonth()]
    }-${date.getFullYear()}</p>
    <a class="weather_forecast"
    href="https://openweathermap.org/city/${weather.data.city.id}"
    target="_blank"
    rel="noreferrer noopener"
    class="socials__link link"
    >Weather for week</a>`;
  }
}
