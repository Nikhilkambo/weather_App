const apiKey = "+epzSGgXh82rEPqOc8m8dA==PpghglvtWiRhheZm"
const secondapi_key = "fe8ba5f2e087b3420c06030a89b28662"
let searchbutton = document.querySelector(".search button");
let weatherIcon = document.querySelector(".weather-icon");
let errorMsg = document.querySelector(".error")
let viewWeather = document.querySelector(".weather")
let loader = document.querySelector(".loader");
searchbutton.addEventListener('click', () => {
    let cityName = document.querySelector(".search").firstElementChild.value
    console.log(typeof cityName)
    errorMsg.style.display = "none"
    if (cityName == "") {
        errorMsg.innerHTML = `Please enter city name`
        errorMsg.style.display = "block"
        viewWeather.style.display = "none"
        loader.style.display = "none"

    } else {
        show_Weather(cityName)
        loader.style.display = "block"
        viewWeather.style.display = "none"

    }
})

function show_Weather(cityName) {
    $.ajax({
        method: 'GET',
        url: 'https://api.api-ninjas.com/v1/city?name=' + cityName,
        headers: { 'X-Api-Key': apiKey },
        contentType: 'application/json',
        success: function(result) {
            console.log(result);
            try {
                var lat = result[0].latitude;
                var lon = result[0].longitude;
                checkWeather(lat, lon)
                errorMsg.style.display = "none"

            } catch (error) {
                errorMsg.innerHTML = `invalid city name`
                errorMsg.style.display = "block"
                loader.style.display = "none"
            }

        },
        error: function ajaxError(jqXHR) {
            errorMsg.innerHTML = `Please check your input value`
            errorMsg.style.display = "block"
            loader.style.display = "none"
            console.error('Error: ', jqXHR.responseText);
        }
    });
    async function checkWeather(lat, lon) {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=fe8ba5f2e087b3420c06030a89b28662`)
            let data = await response.json();
            console.log(data)
            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp - 273.15) + "°C";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
            if (data.weather[0].main == "Clouds") {
                weatherIcon.src = "images/clouds.png"
            } else if (data.weather[0].main == "Clear") {
                weatherIcon.src = "images/clear.png"
            } else if (data.weather[0].main == "Rain") {
                weatherIcon.src = "images/rain.png"
            } else if (data.weather[0].main == "Drizzle") {
                weatherIcon.src = "images/drizzle.png"
            } else if (data.weather[0].main == "Mist") {
                weatherIcon.src = "images/mist.png"
            }
            viewWeather.style.display = "block"
            loader.style.display = "none"

        } catch (error) {
            console.log(error)

        }

    }
}