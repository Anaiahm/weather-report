const BASE_URL = "https://ada-weather-report-proxy-server.onrender.com"
let state = {
    city: 'Seattle',
    lat: 47.6038321,
    long: -122.3300624,
    temp: 72
};

const convertKtoF = e => 1.8 * (e - 273.15) + 32;
const findLatAndLong = () => {
    axios.get(BASE_URL + '/location', {
    params: {
    q: state.city
    }
    }).then(e => (console.log(e.data),
    state.lat = e.data[0].lat,
    state.long = e.data[0].lon,
    getWeather())).catch(e => {
    console.log('Error finding the latitude and longitude:', e.response);
    }
    );
};

const getWeather = () => {
    axios.get(BASE_URL + '/weather', {
        params: {
        lat: state.lat,
        lon: state.long
    }
    }).then(e => {
    e = e.data;
    return state.temp = Math.round(convertKtoF(e.main.temp)),
    formatTempAndGarden();
    }
    ).catch(e => {
    console.log('Error getting the weather:', e);
    });
};

const updateSky = () => {
    let e = document.getElementById('skySelect').value;
    let t = document.getElementById('sky');
    let n = '';
    let a = '';
    'Cloudy' === e ? (n = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️',
    a = 'cloudy') : 'Sunny' === e ? (n = '☁️     ☁️   ☁️ ☀️ ☁️  ☁️',
    a = 'sunny') : 'Rainy' === e ? (n = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧',
    a = 'rainy') : 'Snowy' === e && (n = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨',
    a = 'snowy'),
    t.textContent = n,
    document.getElementById('gardenContent').classList = 'garden__content ' + a;
};

const updateCityName = () => {
    let e = document.getElementById('cityNameInput').value;
    let t = document.getElementById('headerCityName');
    state.city = e,
    t.textContent = state.city;
};

const resetCityName = () => {
    document.getElementById('cityNameInput').value = 'Seattle',
    updateCityName();
};

// change the background with temp ; replace emoji with images
// adds CSS and class name for background images

const formatTempAndBackground = () => {
    const currentTemp = state.temp;
    let tempBackground = '';

    if (currentTemp > 80){
        tempBackground = '';
    } else if (currentTemp >= 70){
        tempBackground = '';
    } else if (currentTemp >= 60){
        tempBackground ='';
    } else if (currentTemp >= 50){
        tempBackground = '';
    }
    document.body.className = tempBackground;
};

const increaseTemp = () => {
    state.temp += 1,
    formatTempAndBackground();
};

const decreaseTemp = () => {
    --state.temp,
    formatTempAndBackground();
};

const registerEventHandlers = () => {
    formatTempAndBackground(),
    document.getElementById('currentTempButton').addEventListener('click', findLatAndLong),
    document.getElementById('increaseTempControl').addEventListener('click', increaseTemp),
    document.getElementById('decreaseTempControl').addEventListener('click', decreaseTemp),
    updateCityName(),
    document.getElementById('cityNameInput').addEventListener('input', updateCityName),
    document.getElementById('cityNameReset').addEventListener('click', resetCityName),
    updateSky(),
    document.getElementById('skySelect').addEventListener('change', updateSky);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
