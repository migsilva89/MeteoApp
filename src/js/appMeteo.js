var btn = document.getElementById('btn')
var cityInput = document.getElementById('cityInput')

btn.addEventListener('click', function(){
  fetch('http://api.openweathermap.org/geo/1.0/direct?q='+cityInput.value+'&limit=1&appid=50a43fe55fd35b0c8a61757d1020e061')
    .then(response => response.json())
    .then(data => {
        var longitude = data[0].lon
        var latitude = data[0].lat
        getWeatherInfo(longitude, latitude)
    })
    .catch(err => alert("Wrong City Name"))
})

function getWeatherInfo(longitude, latitude){
  fetch('https://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&lang=pt&appid=50a43fe55fd35b0c8a61757d1020e061')
    .then(response => response.json())
    .then(data => {

      // console.log(data)
      var description = data.weather[0].description
      var icon = data.weather[0].icon
      var temperatura = parseInt(data.main.temp - 273.15)
      var humidade = parseInt(data.main.humidity)
      var ventoVelocidade = parseInt(data.wind.speed)
      var directionWind = Math.floor(data.wind.deg);
      var finalDirectionWind = getWindDirection(directionWind)
      var visibilidade = data.visibility / 1000
      var sunRise = getHumanTime(data.sys.sunrise)
      var sunSet = getHumanTime(data.sys.sunset)
      var date = new Date();
      var options = { weekday: 'long', month: 'numeric', day: 'numeric' };
      var diaDeHoje = date.toLocaleDateString('pt-PT', options);
      var cityName = data.name
      
      var weatherInfo = {
        description: description,
        icon: icon,
        temperatura: temperatura,
        humidade:humidade,
        ventoVelocidade: ventoVelocidade,
        finalDirectionWind: finalDirectionWind,
        visibilidade: visibilidade,
        sunRise: sunRise,
        sunSet: sunSet,
        diaDeHoje: diaDeHoje,
        cityName: cityName,
      }

      displayData(weatherInfo)
  })
}

function getHumanTime(value) {
    var humanTime = new Date(value * 1000);
        var hours = humanTime.getHours();
        var minutes = "0" + humanTime.getMinutes();
        // var seconds = "0" + humanTime.getSeconds();

        return hours + ':' + minutes.substr(-2); // + ':' + seconds.substr(-2);
}

function getWindDirection(directionWind) {
    switch (true) {
        case directionWind >= 360 && directionWind <= 21:
          directionWind = "N";
          break;
        case directionWind >= 22 && directionWind <= 44:
          directionWind = "NNE";
          break;
        case directionWind >= 45 && directionWind <= 66:
          directionWind = "NE";
          break;
        case directionWind >= 67 && directionWind <= 89:
          directionWind = "ENE";
          break;
        case directionWind >= 90 && directionWind <= 111:
          directionWind = "E";
          break;
        case directionWind >= 112 && directionWind <= 134:
          directionWind = "ESE";
          break;
        case directionWind >= 135 && directionWind <= 156:
          directionWind = "SE";
          break;
        case directionWind >= 157 && directionWind <= 179:
          directionWind = "SSE";
          break;
        case directionWind >= 180 && directionWind <= 201:
          directionWind = "S";
          break;
        case directionWind >= 202 && directionWind <= 224:
          directionWind = "SSW";
          break;
        case directionWind >= 225 && directionWind <= 246:
          directionWind = "SW";
          break;
        case directionWind >= 247 && directionWind <= 269:
          directionWind = "WSW";
          break;
        case directionWind >= 270 && directionWind <= 291:
          directionWind = "W";
          break;
        case directionWind >= 292 && directionWind <= 314:
          directionWind = "WNW";
          break;
        case directionWind >= 315 && directionWind <= 336:
          directionWind = "NW";
          break;
        case directionWind >= 337 && directionWind <= 359:
          directionWind = "NNW";
          break;
        default:
          directionWind = "No Data";
    }
    return directionWind 
}

function displayData(weatherInfo) {
    console.log(weatherInfo)
    document.getElementById('description').innerHTML = weatherInfo.description
    document.getElementById('temperatura').innerHTML = `${weatherInfo.temperatura} ºC`
    document.getElementById('humidade').innerHTML = weatherInfo.humidade
    document.getElementById('vento').innerHTML = weatherInfo.ventoVelocidade
    document.getElementById('vento-dir').innerHTML = weatherInfo.finalDirectionWind
    document.getElementById('visibilidade').innerHTML = weatherInfo.visibilidade
    document.getElementById('sunrise').innerHTML = weatherInfo.sunRise
    document.getElementById('sunset').innerHTML = weatherInfo.sunSet
    document.getElementById('date').innerHTML = weatherInfo.diaDeHoje
    document.getElementById('city-name').innerHTML = weatherInfo.cityName
    document.getElementById('icon').src = `https://openweathermap.org/img/wn/${weatherInfo.icon}@2x.png`
    document.getElementById('frase').innerHTML = "Nao sei o que parece, mas esta otimo!"
}




