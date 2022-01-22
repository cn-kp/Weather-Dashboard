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
        // debugger
        var longitude = data.coord.lon;
        var latitude = data.coord.lat;
        gettingForecast(longitude, latitude);
        console.log(longitude);
        //call another function to generate weather forecast
      });
    } else {
      alert("Error: " + response.statusText);
    }
  });
};
//use lats and longs into other api for forecast

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
        CurrentTemp.textContent = "Temp: " + data.current.temp + " F";
        CurrentWind.textContent = "Wind Speed: " + data.current.wind_speed;
        Humidity.textContent = "Humdity: " + data.current.humidity;
        UVIndex.textContent = "UV Index: " + data.current.uvi;
        // debugger;
        var BuildForecastCard = function () {
          for (var i = 0; i < 5; i++) {
            // var TodaysForecast = document.createElement("div");
            // cardrow.appendChild(TodaysForecast);
            // var Date1 = TodaysForecast.createElement("div");
            // TodaysForecast.appendChild(Date1);
            // var Date = data.daily[i].dt;
            var convertUnix = moment
              .unix(data.daily[i].dt)
              .format("DD MM YYYY");
            var weatherResults = {
              date: convertUnix,
              temp: data.daily[i].temp.day,
              windSpeed: data.daily[i].wind_speed,
            };
            console.log(weatherResults);
            // displayforecast(
            //   weatherResults.date,
            //   weatherResults.temp,
            //   weatherResults.windSpeed
            // );
            console.log(weatherResults.date);
          }
        };
        BuildForecastCard();
      });
    }
  });
};

// displayforecast();

var FormSubmit = function (event) {
  event.preventDefault();
  var LocationCity = CityLocation.value;
  if (LocationCity) {
    searchApi(LocationCity);
    DisplayBox.classList.remove("hide");
    FiveDayWeather.classList.remove("hide");
  }
  // else{
  //   window.location.reload
  // }
};

SearchButton.addEventListener("click", FormSubmit);

//looping 5  times to create 5 cards, create the 5 boxes and then append data to it

// for (var i = 0; i < resultsInt; i++) {
//   var recipeResults = {
//     label: data.hits[i].recipe.label,
//     url: data.hits[i].recipe.url,
//     image: data.hits[i].recipe.images.REGULAR.url,
//   };
//   displayResults(
//     recipeResults.label,
//     recipeResults.url,
//     recipeResults.image
//   );
// }
// });
// }
// });
// };

// // display data on page in cards
// var displayResults = function (label, url, image) {
// var cardEl = document.createElement("div");
// var cardSectionEl = document.createElement("div");
// var subtitleEl = document.createElement("h4");
// var descriptionEl = document.createElement("p");
// var linkEl = document.createElement("a");
// var linkImageEl = document.createElement("a");
// var cardImageEl = document.createElement("img");
// var favButton = document.createElement("i");

// cardEl.setAttribute("class", "card");
// cardSectionEl.setAttribute("class", "card-section");
// subtitleEl.textContent = label;
// cardImageEl.src = image;
// linkEl.setAttribute("href", url);
// linkEl.setAttribute("target", "_blank");
// linkEl.setAttribute("class", "card-link");
// linkImageEl.setAttribute("href", url);
// linkImageEl.setAttribute("target", "_blank");
// descriptionEl.className = "description";
// favButton.setAttribute("class", "far fa-heart");

// searchResults.appendChild(cardEl);
// linkEl.appendChild(subtitleEl);
// cardEl.appendChild(cardSectionEl);
// cardSectionEl.appendChild(linkImageEl);
// linkImageEl.appendChild(cardImageEl);
// cardSectionEl.appendChild(descriptionEl);
// cardSectionEl.appendChild(linkEl);
// cardSectionEl.appendChild(favButton);
