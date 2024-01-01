$(document).ready(function () {

    function updateDateTime() {
        var now = new Date();
        var TimeCell = $("#time")[0];
        var dateCell = $("#date")[0];
        var options = {};
        var formattedDate = now.toLocaleDateString(undefined, options);
        var formattedTime = now.toLocaleTimeString();
        dateCell.textContent = formattedDate;
        TimeCell.textContent = formattedTime;
    }

    setInterval(updateDateTime, 1000);
    updateDateTime();

    var flag = true;
    var inputValue;
    

    $('#searchButton').on('click', searchit);
    function searchit() {
        inputValue = $('#searchid').val();
        console.log('i just click');
        console.log(inputValue);
        $(".card").removeClass("expanded");
    
        let URL = 'https://api.openweathermap.org/data/2.5/weather?q=' + inputValue + '&appid=7ed933e7ef2d42317a0493c7e4a05424';
        fetch(URL)
            .then(response => response.json())
            .then(data => {
                citycheck = data.cod;
                if (citycheck == "404") {
                    flag = false;
                    $('.temp').text('Enter Valid City').css("font-size", '70px');
                    $('.phrase').text('');
                    $('.humidity').text('');
                    $('.weather-icon').css('background-image', 'none');
                    $('.spaced-content').addClass('d-none');
                    $('#pressure').text('');
                    $('#windspeed').text('');
                    $('#sunrise').text('');
                    $('#sunset').text('');
                }
                else {
                    fiveDayForecast = data.main.temp;
                    weatherdesc = data.weather[0].description;
                    humidity = data.main.humidity;
                    icon = data.weather[0].icon;
                    const imgurl = 'http://openweathermap.org/img/wn/' + icon + '@2x.png';
                    temperature = Math.round((fiveDayForecast - 273.15) * 100) / 100;
                    console.log(humidity);
                    console.log(temperature);
                    $('.temp').text(temperature + '°c');
                    $('.phrase').text(weatherdesc.toUpperCase());
                    $('.humidity').text('Humidity ' + humidity);
                    $('.weather-icon').css('background-image', 'url(' + imgurl + ')');
                    pressure = data.main.pressure;
                    windspeed = data.wind.speed;
                    sunrise = data.sys.sunrise;
                    sunset = data.sys.sunset;
                    $('#pressure').text('Pressure : ' + pressure);
                    $('#windspeed').text('Windspeed : ' + windspeed);
                    $('#sunrise').text('Sunrise : ' + sunrise);
                    $('#sunset').text('Sunset : ' + sunset);
    
                    $('.spaced-content').removeClass('d-none');
                    $(".more-details").click(function () {
                        //$(".card-body").toggleClass("expanded");
                        console.log('Halo');
                    
                        $(".card").toggleClass("expanded");
                       
                        $(".hidden-details").toggle();                            
                    });
                }
            });
    }
    
    $("#searchid").keypress(function (event) {
        if (event.which === 13) {
            searchit();
        }
    });

});//api key 175ac3cf617c23e45d5a802a8347685f
// https://api.openweathermap.org/data/2.5/weather?lat=13.45&lon=80.16&appid=7ed933e7ef2d42317a0493c7e4a05424
//13°4′57″N 80°16′30″E
//http://openweathermap.org/img/wn/10d@2x.png