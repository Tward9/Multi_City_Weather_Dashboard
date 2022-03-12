var APIKey = '306e5a39201f9a04bf59daf2b8544d8a';

//add moment.js for date

var todaysDate = moment().format("dddd, MMM Do YYYY");
var fdOneDate = moment().add(1, 'days').format("dddd, MMM Do YYYY");
fdTwoDate = moment().add(2, 'days').format("dddd, MMM Do YYYY");
fdThreeDate = moment().add(3, 'days').format("dddd, MMM Do YYYY");
fdFourDate = moment().add(4, 'days').format("dddd, MMM Do YYYY");
fdFiveDate = moment().add(5, 'days').format("dddd, MMM Do YYYY");
console.log(todaysDate);
console.log(fdOneDate);

$('#citySubmit').on('click', function (event) {
    city = 'Chicago'
    event.preventDefault();
    $('#currentWeatherList').empty();
    $('#currentWeather').empty();
    $('#forcastOne').empty();
    $('#forcastOneList').empty();
    $('#forcastTwo').empty();
    $('#forcastTwoList').empty();
    $('#forcastThree').empty();
    $('#forcastThreeList').empty();
    $('#forcastFour').empty();
    $('#forcastFourList').empty();
    $('#forcastFive').empty();
    $('#forcastFiveList').empty();
    var newCity = $('#cityChoice').val();
    city = newCity
    $('#searchHistory').append($('<li/>').append($('<button/>', { text: city }).addClass('city_btn')));
    getWeatherAPI();
    getForecastAPI();
    getUVIndex();
    $('.city_btn').on('click', function (event) {
        event.preventDefault();
        console.log('click');
        console.log(event.target.textContent);
        city = event.target.textContent;
        $('#currentWeatherList').empty();
        $('#currentWeather').empty();
        $('#forcastOne').empty();
        $('#forcastOneList').empty();
        $('#forcastTwo').empty();
        $('#forcastTwoList').empty();
        $('#forcastThree').empty();
        $('#forcastThreeList').empty();
        $('#forcastFour').empty();
        $('#forcastFourList').empty();
        $('#forcastFive').empty();
        $('#forcastFiveList').empty();
        event.stopImmediatePropagation();
        getWeatherAPI();
        getUVIndex();
        getForecastAPI();
    })
})
function getWeatherAPI() {
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (data.wind.deg <= 11 || data.wind.deg >= 349) {
                var direction = 'N';
            } else if (data.wind.deg >= 12 && data.wind.deg <= 33) {
                direction = 'NNE';
            } else if (data.wind.deg >= 34 && data.wind.deg <= 56) {
                direction = 'NE';
            } else if (data.wind.deg >= 57 && data.wind.deg <= 78) {
                direction = 'ENE';
            } else if (data.wind.deg >= 79 && data.wind.deg <= 101) {
                direction = 'E';
            } else if (data.wind.deg >= 102 && data.wind.deg <= 123) {
                direction = 'ESE';
            } else if (data.wind.deg >= 124 && data.wind.deg <= 146) {
                direction = 'SE';
            } else if (data.wind.deg >= 147 && data.wind.deg <= 168) {
                direction = 'SSE';
            } else if (data.wind.deg >= 169 && data.wind.deg <= 191) {
                direction = 'S';
            } else if (data.wind.deg >= 192 && data.wind.deg <= 213) {
                direction = 'SSW';
            } else if (data.wind.deg >= 214 && data.wind.deg <= 236) {
                direction = 'SW';
            } else if (data.wind.deg >= 237 && data.wind.deg <= 258) {
                direction = 'WSW';
            } else if (data.wind.deg >= 259 && data.wind.deg <= 281) {
                direction = 'W';
            } else if (data.wind.deg >= 282 && data.wind.deg <= 303) {
                direction = 'WNW';
            } else if (data.wind.deg >= 304 && data.wind.deg <= 326) {
                direction = 'NW';
            } else {
                direction = 'NNW'
            }
            console.log(data.weather[0].icon);
            $('#currentWeatherList').append($('<li/>').attr("id", "currentCity").text(city));
            $('#currentWeatherDate').text(todaysDate);
            $('#currentWeather').append($('<img/>').attr('src', 'http://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png'))
            $('#currentWeatherList').append($('<li/>').text('Temp: ' + ((data.main.temp - 273.15) * 9 / 5 + 32).toFixed(2) + ' Degrees F'));
            $('#currentWeatherList').append($('<li/>').text('Feels Like: ' + ((data.main.feels_like - 273.15) * 9 / 5 + 32).toFixed(2) + ' Degrees F'));
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
            // console.log(data.coord.lat);
            // console.log(data.coord.lon);

            var lat = data.coord.lat;
            var lon = data.coord.lon;

            var UVURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=minutely,hourly,daily,alerts&appid=' + APIKey;
            fetch(UVURL)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    // console.log(data);
                    // console.log(data.current.uvi);
                    $('#currentWeatherList').append($('<li/>').attr("id", "UVIndex").text('UV Index: ' + data.current.uvi));
                    if (data.current.uvi < 3) {
                        $('#UVIndex').css('background-color', 'green');
                    } else if (data.current.uvi < 8) {
                        $('#UVIndex').css('background-color', 'yellow');
                    } else {
                        $('#UVIndex').css('background-color', 'red');
                    }
                })
        })
}
function getForecastAPI() {
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
    // console.log(queryURL);
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // console.log(data);

            var lat = data.coord.lat;
            var lon = data.coord.lon;


            var dailyURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=current,minutely,hourly,alerts&appid=' + APIKey;
            fetch(dailyURL)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    // console.log('forcast', data);

                    var fdOne = data.daily[1];
                    var fdTwo = data.daily[2];
                    var fdThree = data.daily[3];
                    var fdFour = data.daily[4];
                    var fdFive = data.daily[5];
                    // console.log(fdOne);
                    // console.log(fdOne.weather[0]);

                    //add rows similar to current day function for getting elements
                    //add lists into table collums to display
                    $('#fdOneDate').text(fdOneDate);
                    $('#forcastOne').append($('<img/>').attr('src', 'http://openweathermap.org/img/wn/' + fdOne.weather[0].icon + '@2x.png'))
                    $('#forcastOneList').append($('<li/>').text('Temp: ' + ((fdOne.temp.day - 273.15) * 9 / 5 + 32).toFixed(2) + ' Degrees F'));
                    $('#forcastOneList').append($('<li/>').text('Feels Like: ' + ((fdOne.feels_like.day - 273.15) * 9 / 5 + 32).toFixed(2) + ' Degrees F'));
                    $('#forcastOneList').append($('<li/>').text('Wind: ' + fdOne.wind_speed + ' MPH'));

                    $('#fdTwoDate').text(fdTwoDate);
                    $('#forcastTwo').append($('<img/>').attr('src', 'http://openweathermap.org/img/wn/' + fdTwo.weather[0].icon + '@2x.png'))
                    $('#forcastTwoList').append($('<li/>').text('Temp: ' + ((fdTwo.temp.day - 273.15) * 9 / 5 + 32).toFixed(2) + ' Degrees F'));
                    $('#forcastTwoList').append($('<li/>').text('Feels Like: ' + ((fdTwo.feels_like.day - 273.15) * 9 / 5 + 32).toFixed(2) + ' Degrees F'));
                    $('#forcastTwoList').append($('<li/>').text('Wind: ' + fdTwo.wind_speed + ' MPH'));

                    $('#fdThreeDate').text(fdThreeDate);
                    $('#forcastThree').append($('<img/>').attr('src', 'http://openweathermap.org/img/wn/' + fdThree.weather[0].icon + '@2x.png'))
                    $('#forcastThreeList').append($('<li/>').text('Temp: ' + ((fdThree.temp.day - 273.15) * 9 / 5 + 32).toFixed(2) + ' Degrees F'));
                    $('#forcastThreeList').append($('<li/>').text('Feels Like: ' + ((fdThree.feels_like.day - 273.15) * 9 / 5 + 32).toFixed(2) + ' Degrees F'));
                    $('#forcastThreeList').append($('<li/>').text('Wind: ' + fdThree.wind_speed + ' MPH'));

                    $('#fdFourDate').text(fdFourDate);
                    $('#forcastFour').append($('<img/>').attr('src', 'http://openweathermap.org/img/wn/' + fdFour.weather[0].icon + '@2x.png'))
                    $('#forcastFourList').append($('<li/>').text('Temp: ' + ((fdFour.temp.day - 273.15) * 9 / 5 + 32).toFixed(2) + ' Degrees F'));
                    $('#forcastFourList').append($('<li/>').text('Feels Like: ' + ((fdFour.feels_like.day - 273.15) * 9 / 5 + 32).toFixed(2) + ' Degrees F'));
                    $('#forcastFourList').append($('<li/>').text('Wind: ' + fdFour.wind_speed + ' MPH'));

                    $('#fdFiveDate').text(fdFiveDate);
                    $('#forcastFive').append($('<img/>').attr('src', 'http://openweathermap.org/img/wn/' + fdFive.weather[0].icon + '@2x.png'))
                    $('#forcastFiveList').append($('<li/>').text('Temp: ' + ((fdFive.temp.day - 273.15) * 9 / 5 + 32).toFixed(2) + ' Degrees F'));
                    $('#forcastFiveList').append($('<li/>').text('Feels Like: ' + ((fdFive.feels_like.day - 273.15) * 9 / 5 + 32).toFixed(2) + ' Degrees F'));
                    $('#forcastFiveList').append($('<li/>').text('Wind: ' + fdFive.wind_speed + ' MPH'));

                })
        })
}
