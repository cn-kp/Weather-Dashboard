// Assigning variables
var ApiKey = "758c243ad8a3a169acb57039a5acda9a";
var InputLocation = document.querySelector(".SearchInput");
var WeatherCard = document.querySelector(".WeatherSummary");
var FiveDayWeather = document.querySelector(".DayForecast");
var CityLocation = document.querySelector(".SearchInput");
var SearchButton = document.querySelector(".searchBtn");
var DisplayBox = document.querySelector("#WeatherDisplay");
var CurrentTemp = document.querySelector(".temp");
var CurrentWind = document.querySelector(".windSpeed");
var Humidity = document.querySelector(".Humidity");
var UVIndex = document.querySelector(".UVIndex");
var cardrow = document.querySelector(".card-row");
var cityTitle=document.querySelector(".CityName")
var mainDate=document.querySelector(".CurrentDate")
var clearHistory=document.querySelector(".clear-history")
var historyListEl=document.querySelector(".CityHistory")

// fetching the first Api to get lat and lon for the searched city
var searchApi = function (CityName) {
  var UserApi =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    CityName +
    "&appid=" +
    ApiKey;
  console.log(UserApi);

  fetch(UserApi).then(function (response) {
    if (response.ok) {
      console.log(response);
      response.json().then(function (data) {
        console.log(data);
        var longitude = data.coord.lon;
        var latitude = data.coord.lat;
        gettingForecast(longitude, latitude);
        console.log(longitude);
      });
      //if no response , then the user will be alerted
    } else {
      alert("Error: " + response.statusText);
    }
  });
};

//use lats and lons into other api for weather forecast
var gettingForecast = function (longitude, latitude) {
  var OpenWeatherAPI =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    latitude +
    "&lon=" +
    longitude +
    "&appid=" +
    ApiKey;
  fetch(OpenWeatherAPI).then(function (response) {
    if (response.ok) {
      console.log(response);
      response.json().then(function (data) {
        console.log(data);
        //building display card for today's date, also the main display
        cityTitle.textContent= CityLocation.value
        mainDate.textContent="today's date: "+moment
        .unix(data.current.dt)
        .format("DD MM YYYY");
        CurrentTemp.textContent = "Temp: " + data.current.temp + " F";
        CurrentWind.textContent = "Wind Speed: " + data.current.wind_speed;
        Humidity.textContent = "Humdity: " + data.current.humidity;
        UVIndex.textContent = "UV Index: " + data.current.uvi;
        //getting the variables for the 5 day weather forecast
        var BuildForecastCard = function () {
          cardrow.textContent="";
          for (var i = 0; i < 5; i++) {
            var convertUnix = moment
              .unix(data.daily[i].dt)
              .format("DD MM YYYY");
            var weatherResults = {
              date: convertUnix,
              temp: data.daily[i].temp.day,
              windSpeed: data.daily[i].wind_speed,
              icon:data.daily[i].weather[0].icon
            };
            console.log(weatherResults);
            //calling the function to build the 5 day forecast based on the above variables
            displayForecast(weatherResults.date,weatherResults.temp,weatherResults.windSpeed,weatherResults.icon)
            console.log(weatherResults.date);
          }
        };
        BuildForecastCard();
      });
    }
  });
};

//When search button is clicked, it will remove the hidden section of the main card
var FormSubmit = function (event) {
  event.preventDefault();
  var LocationCity = CityLocation.value;
  if (LocationCity) {
    searchApi(LocationCity);
    DisplayBox.classList.remove("hide");
    FiveDayWeather.classList.remove("hide");
    saveHistory();
    displayHistory();
  }
  // else{
  //   window.location.reload
  // }
};
//Event listener for the above function
SearchButton.addEventListener("click", FormSubmit);

//function to create the 5 day forecast cards
var displayForecast = function (date, temp, wind,emoji) {
  var cardEl = document.createElement("div");
  var cardSectionEl = document.createElement("div");
  var Dates = document.createElement("h4");
  var TEMP = document.createElement("p");
  var WIND = document.createElement("p");
  var weatherIcon = document.createElement("img");

  cardEl.setAttribute("class", "card");
  cardEl.classList.add("col");
  cardEl.classList.add("m-2");
  // cardEl.setAttribute("class", "")
  // cardEl.setAttribute("style", "width: 18rem")
  cardSectionEl.setAttribute("class", "card-body");
  Dates.textContent = "Date: " + date;
  TEMP.textContent="Temp in F: " + temp
  WIND.textContent="Wind Speed: " + wind
  weatherIcon.setAttribute("src","http://openweathermap.org/img/wn/"+emoji+"@2x.png")
  weatherIcon.setAttribute("style","width: 50px")
  

  cardrow.appendChild(cardEl);
  cardEl.appendChild(cardSectionEl)
  cardSectionEl.appendChild(Dates)
  cardSectionEl.appendChild(TEMP);
  cardSectionEl.appendChild(WIND);
  cardSectionEl.appendChild(weatherIcon);
}

//empty array to store local history
var historyList=[]

// function to push all searched items into local storage
var saveHistory=function(){
  historyList.push(CityLocation.value)
  console.log(CityLocation.value)
  localStorage.setItem("history", JSON.stringify(historyList));
  // var testLocal = JSON.parse(localStorage.getItem("history"));
  // console.log(testLocal)
}

//function to clear local history
var clearAll = function () {
  console.log("hi")
  localStorage.clear();
  displayHistory()
};

clearHistory.addEventListener("click", clearAll);

//calls local history items and creates a button for each, which can be selected and for search
var displayHistory=function(){
  historyListEl.textContent="";
  var testLocal = JSON.parse(localStorage.getItem("history"));
  for (let i=0; i<testLocal.length;i++){
    let historyEl=document.createElement("button")
    historyListEl.appendChild(historyEl)
    historyEl.textContent=testLocal[i]
    historyEl.addEventListener("click",function(){
    
    searchApi(testLocal[i])
    DisplayBox.classList.remove("hide");
    FiveDayWeather.classList.remove("hide");
  })
  }}

  displayHistory();

