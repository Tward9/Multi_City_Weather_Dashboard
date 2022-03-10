var APIKey = '306e5a39201f9a04bf59daf2b8544d8a';

$('#citySubmit').on('click', function (event) {
    city = 'Chicago'
    event.preventDefault();
    $('#currentWeatherList').empty();
    $('#currentWeather').empty();
    var newCity = $('#cityChoice').val();
    city = newCity
    console.log(city)
    // return city;
    getWeatherAPI();
    getForecastAPI();
    getUVIndex();
})
function getWeatherAPI() {
    console.log(city);
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
    console.log(queryURL);
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data.name);
            console.log(data);
            if (data.wind.deg <= 11 || data.wind.deg >= 349) {
                var direction = 'N';
            }else if (data.wind.deg >= 12 && data.wind.deg <= 33) {
                direction = 'NNE';
            }else if (data.wind.deg >= 34 && data.wind.deg <= 56) {
                direction = 'NE';
            }else if (data.wind.deg >= 57 && data.wind.deg <= 78) {
                direction = 'ENE';
            }else if (data.wind.deg >= 79 && data.wind.deg <= 101) {
                direction = 'E';
            }else if (data.wind.deg >= 102 && data.wind.deg <= 123) {
                direction = 'ESE';
            }else if (data.wind.deg >= 124 && data.wind.deg <= 146) {
                direction = 'SE';
            }else if (data.wind.deg >= 147 && data.wind.deg <= 168) {
                direction = 'SSE';
            }else if (data.wind.deg >= 169 && data.wind.deg <= 191) {
                direction = 'S';
            }else if (data.wind.deg >= 192 && data.wind.deg <= 213) {
                direction = 'SSW';
            }else if (data.wind.deg >= 214 && data.wind.deg <= 236) {
                direction = 'SW';
            }else if (data.wind.deg >= 237 && data.wind.deg <= 258) {
                direction = 'WSW';
            }else if (data.wind.deg >= 259 && data.wind.deg <= 281) {
                direction = 'W';
            }else if (data.wind.deg >= 282 && data.wind.deg <= 303) {
                direction = 'WNW';
            }else if (data.wind.deg >= 304 && data.wind.deg <= 326) {
                direction = 'NW';
            }else{
                direction = 'NNW'
            }
            //add moment.js for date
            console.log(data.weather[0].icon);
            $('#currentWeatherList').append($('<li/>').attr("id", "currentCity").text(city));
            $('#currentWeather').append($('<img/>').attr('src', 'http://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png'))
            $('#currentWeatherList').append($('<li/>').text('Temp: ' + ((data.main.temp - 273.15) * 9/5 + 32).toFixed(2) + ' Degrees F'));
            $('#currentWeatherList').append($('<li/>').text('Feels Like: ' + ((data.main.feels_like - 273.15) * 9/5 + 32).toFixed(2) + ' Degrees F'));
            $('#currentWeatherList').append($('<li/>').text('Wind: ' + data.wind.speed + ' MPH Direction: ' + direction));
            $('#currentWeatherList').append($('<li/>').text('Humidity: ' + data.main.humidity + ' %'));
        })
}
function getUVIndex() {
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data.coord.lat);
            console.log(data.coord.lon);

            var lat = data.coord.lat;
            var lon = data.coord.lon;

            var UVURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=minutely,hourly,daily,alerts&appid=' + APIKey;
            fetch(UVURL)
            .then(function (response) {
                return response.json();
            })
            .then(function (data){
                console.log(data);
                console.log(data.current.uvi);
                $('#currentWeatherList').append($('<li/>').attr("id", "UVIndex").text('UV Index: ' + data.current.uvi));
                if (data.current.uvi<3) {
                    $('#UVIndex').css('background-color', 'green');
                }else if (data.current.uvi<8) {
                    $('#UVIndex').css('background-color', 'yellow');
                }else{
                    $('#UVIndex').css('background-color', 'red');
                }
            })
        })
}
function getForecastAPI() {
    console.log(city);
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey;
    console.log(queryURL);
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            
        })
}
// $('#forecastBtn').on('click', getForecastAPI);
