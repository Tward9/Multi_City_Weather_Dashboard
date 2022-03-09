var APIKey = '306e5a39201f9a04bf59daf2b8544d8a';

$('#citySubmit').on('click', function(event){
    city = 'Chicago'
    event.preventDefault();
    var newCity = $('#cityChoice').val();
    city = newCity
    console.log(city)
    return city;
})

function getWeatherAPI(){
    console.log(city);
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
    console.log(queryURL);
    fetch(queryURL)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
    })
}
$('#weatherBtn').on('click', getWeatherAPI);
function getForecastAPI(){
    console.log(city);
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey;
    console.log(queryURL);
    fetch(queryURL)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
    })
}
$('#forecastBtn').on('click', getForecastAPI);
