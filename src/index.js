const BASE_URL = "https://ada-weather-report-proxy-server.onrender.com"
let state = {
    city: 'Seattle',
    lat: 47.6038321,
    long: -122.3300624,
    temp: 72
};

const convertKtoF = kelvinTemp => 1.8 * (kelvinTemp - 273.15) + 32;
const findLatAndLong = () => {
    axios.get(BASE_URL + '/location', {
    params: {
    q: state.city
    }
    }).then(kelvinTemp => (console.log(kelvinTemp.data),
    state.lat = kelvinTemp.data[0].lat,
    state.long = kelvinTemp.data[0].lon,
    getWeather())).catch(kelvinTemp => {
    console.log('Error finding the latitude and longitude:', kelvinTemp.response);
    }
    );
};

const getWeather = () => {
    axios.get(BASE_URL + '/weather', {
        params: {
        lat: state.lat,
        lon: state.long
    }
    }).then(kelvinTemp => {
    kelvinTemp = kelvinTemp.data;
    return state.temp = Math.round(convertKtoF(kelvinTemp.main.temp)),
    formatTempAndBackground();
    }
    ).catch(kelvinTemp => {
    console.log('Error getting the weather:', kelvinTemp);
    });
};

// const updateSky = () => {
//     let e = document.getElementById('skySelect').value;
//     let t = document.getElementById('sky');
//     let n = '';
//     let a = '';
//     'Cloudy' === e ? (n = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️',
//     a = 'cloudy') : 'Sunny' === e ? (n = '☁️     ☁️   ☁️ ☀️ ☁️  ☁️',
//     a = 'sunny') : 'Rainy' === e ? (n = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧',
//     a = 'rainy') : 'Snowy' === e && (n = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨',
//     a = 'snowy'),
//     t.textContent = n,
//     document.getElementById('gardenContent').classList = 'garden__content ' + a;
// };

const updateCityName = () => {
    let cityNameInput = document.getElementById('cityNameInput').value;
    let headerCityName = document.getElementById('headerCityName');
    state.city = cityNameInput,
    headerCityName.textContent = state.city;
};

const resetCityName = () => {
    document.getElementById('cityNameInput').value = 'Seattle',
    updateCityName();
};

const formatTempAndBackground = () => {
    const currentTemp = state.temp;
    let tempBackground = '';

    if (currentTemp > 80){
        tempBackground = 'summer-weather';
        tempClass = 'hot-weather';
    } else if (currentTemp >= 70){
        tempBackground = 'spring-weather';
        tempClass = 'warm-weather';
    } else if (currentTemp >= 60){
        tempBackground ='fall-weather';
        tempClass = 'cool-weather';
    } else if (currentTemp >= 50){
        tempBackground = 'winter-weather';
        tempClass = 'chilly-weather';
    } else if (currentTemp < 50){
        tempBackground = 'winter-weather';
        tempClass = 'freezing-weather';
    }
    document.body.className = tempBackground;
    document.getElementById('temp-value').className = tempClass;
    document.getElementById('temp-value').textContent = `${currentTemp} °F`;
};

const increaseTemp = () => {
    state.temp += 1,
    formatTempAndBackground();
};

const decreaseTemp = () => {
    state.temp -= 1,
    formatTempAndBackground();
};

const registerEventHandlers = () => {
    formatTempAndBackground(),
    document.getElementById('getRealTemp').addEventListener('click', findLatAndLong),
    document.getElementById('increaseTempControl').addEventListener('click', increaseTemp),
    document.getElementById('decreaseTempControl').addEventListener('click', decreaseTemp),
    updateCityName(),
    document.getElementById('cityNameInput').addEventListener('input', updateCityName),
    document.getElementById('cityNameReset').addEventListener('click', resetCityName);
    // updateSky(),
    // document.getElementById('skySelect').addEventListener('change', updateSky);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
