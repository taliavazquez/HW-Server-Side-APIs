function showCity() {
    if (JSON.parse(localStorage.getItem("cities"))) {
        var storedCities = JSON.parse(localStorage.getItem("cities"));
        var cities = document.getElementById("cities-ul");
        cities.innerHTML = "";
        console.log(storedCities);
        for (let index = 0; index < storedCities.length; index++) {
            var city = document.createElement("li");
            city.setAttribute("id", index);
            city.textContent = storedCities[index];
            cities.prepend(city);
        }
    }
    else
        console.log("storage issue");
}
function setCities(city) {
    if (JSON.parse(localStorage.getItem("cities")))
        var cities = JSON.parse(localStorage.getItem("cities"));
    else
        var cities = [];
    cities.push(city);
    localStorage.setItem("cities", JSON.stringify(cities));
    showCity();
}
/* set uv index and change the color */
function loadUVindex(uv) {
    $("#city-uv").text(uv);
    uv = parseInt(uv);
    if (uv <= 2)
        document.getElementById("city-uv").setAttribute("style");
    else if (uv >= 3 && uv <= 5)
        document.getElementById("city-uv").setAttribute("style");
    else if (uv >= 6 && uv <= 7)
        document.getElementById("city-uv").setAttribute("style");
    else if (uv >= 8 && uv <= 10)
        document.getElementById("city-uv").setAttribute("style");
    else if (uv >= 11)
        document.getElementById("city-uv").setAttribute("style");
}
/* display the 5 days info  */
function loadForecast(fore1, fore2, fore3, fore4, fore5) {
    var date = moment().format("/MM/YYYY");
    var day = moment().format("DD");
    $("#date1").text((day) + date);
    $("#date2").text((parseInt(day) + 1) + date);
    $("#date3").text((parseInt(day) + 2) + date);
    $("#date4").text((parseInt(day) + 3) + date);
    $("#date5").text((parseInt(day) + 4) + date);
    $("#temp1").text(KelvintoFar(fore1.main.temp) + " F");
    $("#temp2").text(KelvintoFar(fore2.main.temp) + " F");
    $("#temp3").text(KelvintoFar(fore3.main.temp) + " F");
    $("#temp4").text(KelvintoFar(fore4.main.temp) + " F");
    $("#temp5").text(KelvintoFar(fore5.main.temp) + " F");
    $("#humi1").text(fore1.main.humidity + " %");
    $("#humi2").text(fore2.main.humidity + " %");
    $("#humi3").text(fore3.main.humidity + " %");
    $("#humi4").text(fore4.main.humidity + " %");
    $("#humi5").text(fore5.main.humidity + " %");
}
// convert k to f 
function KelvintoFar(kelvin) {
    var farenheit = (kelvin - 273.15) * 9 / 5 + 32
    return Math.round(farenheit * 100) / 100;
}
showCity();
$("#cities-ul").click(function (event) {
    var element = event.target;
    var textBoxCity = document.getElementById(element.id);
    $("#city-text").val(textBoxCity.textContent);
});
$("#city-button").click(function (event) {
    setCities($("#city-text").val());
    var nameCity = $("#city-text").val();
    $("#city-text").val("");
    var lat, lon;
    var APIKey = "25af112d7ac67cfaab371ad2152e3789";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + nameCity + ",Burundi&appid=" + APIKey;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        lat = response.coord.lat;
        lon = response.coord.lon;
        loadInfo(response.name, response.main.temp, response.main.humidity, response.wind.speed);
        var queryURL2 = "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + lat + "&lon=" + lon;
        $.ajax({
            url: queryURL2,
            method: "GET",
        }).then(function (res) {
            var uvI = res.value;
            loadUVindex(uvI);
        });
    });
    queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + nameCity + "&appid=" + APIKey;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        loadForecast(response.list[0], response.list[1], response.list[2], response.list[3], response.list[4]);
    });
});