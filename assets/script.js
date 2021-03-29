var cityNames = document.getElementById("cityname")
var userForm = document.querySelector("#user-form")
const firstDayPlacement = document.getElementById("1date")
const secondDayPlacement = document.getElementById("2date")
const thirdDayPlacement = document.getElementById("3date")
const fourthDayPlacement = document.getElementById("4date")
const fifthDayPlacement = document.getElementById("5date")
const firstDayTempPlacement = document.getElementById("1temp")
const secondDayTempPlacement = document.getElementById("2temp")
const thirdDayTempPlacement = document.getElementById("3temp")
const fourthDayTempPlacement = document.getElementById("4temp")
const fifthDayTempPlacement = document.getElementById("5temp")
const firstDayHumiPlacement = document.getElementById("1humidity")
const secondDayHumiPlacement = document.getElementById("2humidity")
const thirdDayHumiPlacement = document.getElementById("3humidity")
const fourthDayHumiPlacement = document.getElementById("4humidity")
const fifthDayHumiPlacement = document.getElementById("5humidity")
const firstDay = document.getElementById("day1")
const createUVPlacement = document.getElementById("uvIndex")
const wordingForecast = document.getElementById("wording")
wordingForecast.style.display = "none";

var citySubmitHandler = function (event) {
  // prevent page from refreshing
  event.preventDefault();

  // get value from input element
  var cityNameValue = cityNames.value.trim();

  if (cityNameValue) {
    getCityInfo(cityNameValue);
    getCityInfoForecast(cityNameValue);
    weatherLocalStorage(cityNameValue);
    wordingForecast.style.display = "inline";
    clearContent();

  } else {
    alert("Please enter a city name");
  }
};

function clearContent() {
  cityName.textContent = "";
  cityTemp.textContent = "";
  cityHumidity.textContent = "";
  cityWindSpeed.textContent = "";
  firstDayPlacement.textContent = "";
  secondDayPlacement.textContent = "";
  thirdDayPlacement.textContent = "";
  fourthDayPlacement.textContent = "";
  fifthDayPlacement.textContent = "";
  firstDayTempPlacement.textContent = "";
  secondDayTempPlacement.textContent = "";
  thirdDayTempPlacement.textContent = "";
  fourthDayTempPlacement.textContent = "";
  fifthDayTempPlacement.textContent = "";
  firstDayHumiPlacement.textContent = "";
  secondDayHumiPlacement.textContent = "";
  thirdDayHumiPlacement.textContent = "";
  fourthDayHumiPlacement.textContent = "";
  fifthDayHumiPlacement.textContent = "";
  cityNames.value = "";
  createUVPlacement.textContent = "";
}

var getCityInfo = function (city) {

  var firstApi = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=7e3bdc387a1baa941f9800e8f1848262"

  fetch(firstApi)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("NETWORK RESPONSE NOT OK");
      }
    })
    .then(function (data) {
      displayCityDetails(data);
    })
}

var getCityInfoForecast = function (city) {

  var secondApi = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=7e3bdc387a1baa941f9800e8f1848262"

  fetch(secondApi)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("NETWORK RESPONSE NOT OK");
      }
    })
    .then(function (data) {
      displayFiveDayForecastDate(data);
    })
    .catch((error) => {
      console.error("FETCH ERROR:", error);
    });
}

function displayCityDetails(data) {
const city = data.name
const cityNamePlacement = document.getElementById("cityName")
const createCityNameElemn = document.createElement("span")
createCityNameElemn.innerHTML = "<span> " + city + "</span"
cityNamePlacement.appendChild(createCityNameElemn);

const cityTemp = data.main.temp;
const cityTempPlacement = document.getElementById("cityTemp")
const createCityTempElem = document.createElement("span")
createCityTempElem.innerHTML = "<span> Temperature: " + cityTemp + "</span>";
cityTempPlacement.appendChild(createCityTempElem);

const cityHumidity = data.main.humidity;
const cityHumidityPlacement = document.getElementById("cityHumidity")
const createCityHumidityElem = document.createElement("span")
createCityHumidityElem.innerHTML = "<span> City Humidity: " + cityHumidity + "</span>";
cityHumidityPlacement.appendChild(createCityHumidityElem);

const cityWindSpeed = data.wind.speed;
const cityWindPlacement = document.getElementById("cityWindSpeed")
const createCityWindSpeedElem = document.createElement("span")
createCityWindSpeedElem.innerHTML = "<span> City Wind Speed: " + cityWindSpeed + "</span>";
cityWindPlacement.appendChild(createCityWindSpeedElem);

const lon = data.coord.lon
const lat = data.coord.lat
const createUVElement = document.createElement("span")
const finalResult = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=7e3bdc387a1baa941f9800e8f1848262"
fetch(finalResult)
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("NETWORK RESPONSE NOT OK");
    }
  })
  .then(function (data) {
    const createLastUV = data.value
    createUVElement.innerHTML = "<span> UV: " + createLastUV + "</span>"
    createUVPlacement.appendChild(createUVElement)

    if (createLastUV <= 4) {
      createUVPlacement.style.backgroundColor = "green";
    }
    else if (createLastUV <= 10) {
      createUVPlacement.style.backgroundColor = "yellow";
    }
    else if (createLastUV <= 15) {
      createUVPlacement.style.backgroundColor = "red";
    }
  }
  )
  
}


function displayFiveDayForecastDate(data) {
  let newArr = [];
  for (let i = 0; i < data.list.length; i += 7) {
    newArr.push(data.list[i]);
  }

  for (let i = 0; i < 5; i++) {
    var dayIndex = i + 1
    const dayPlacement = document.getElementById(dayIndex + "date")
    var firstDayDate = newArr[i].dt_txt
    const createFirstDayDateElem = document.createElement("span")
    createFirstDayDateElem.innerHTML = "<span> Date: " + firstDayDate + "</span>";
    dayPlacement.appendChild(createFirstDayDateElem);

    const DayTempPlacement = document.getElementById(dayIndex + "temp")
    var firstDayTemp = newArr[i].main.temp
    const createFirstDayTempElem = document.createElement("span")
    createFirstDayTempElem.innerHTML = "<span> Temp: " + firstDayTemp + "</span>";
    DayTempPlacement.appendChild(createFirstDayTempElem);

    const DayIconPlacement = document.getElementById(dayIndex + "icon")
    var firstDayIcon = newArr[i].weather[0].icon
    DayIconPlacement.innerHTML = "<img src='http://openweathermap.org/img/wn/" + firstDayIcon + "@2x.png'>"

    const DayHumiPlacement = document.getElementById(dayIndex + "humidity")
    var firstDayHumi = newArr[i].main.humidity
    const createFirstDayHumiElem = document.createElement("span")
    createFirstDayHumiElem.innerHTML = "<span> Humidity: " + firstDayHumi + "</span>";
    DayHumiPlacement.appendChild(createFirstDayHumiElem);
  }

}

function weatherLocalStorage() {
  var cityNameValue = cityNames.value;
  const nameListsParent = document.getElementById("list")
  const cityNameValueList = document.createElement("li")
  cityNameValueList.innerHTML = cityNameValue;
  nameListsParent.appendChild(cityNameValueList);

  cityNameValueList.addEventListener("click", function () {
    getCityInfo(cityNameValue);
    getCityInfoForecast(cityNameValue);

    clearContent();
  }
  )
}
userForm.addEventListener("submit", citySubmitHandler);