
const inputValue=document.querySelector("#search-input")
const searchButton=document.querySelector("#search-button")
const weatherBox=document.querySelector(".current-weather")
const locationIcon=document.getElementById("location")

const API_KEY="8de96e03977a35091423bcb03881e99e";
const BASE_URL=`https://api.openweathermap.org/data/2.5`



const searchHandler=()=>{

    if(!inputValue.value.trim()){
        alert("Invalid input")
        return
    }

        const cityName=inputValue.value.trim()
    

    if(!cityName){
        alert("Please enter city name!")
        return
    }
    getCurrentWeatherByName(cityName)
    
}
const renderCurrentWeather=async(data)=>{
    console.log(data);
    
    try{

        const {main:{temp,humidity},name,sys:{country},weather,wind:{speed}}=await data

        const weatherJSX=`
         <h1 id="name"><span id="city-name">${name}</span>, <span id="country-name">${country}</span></h1>
            <div class="temprature">
              <div id="temprature-icon">
                <img src="https://openweathermap.org/img/w/${weather[0].icon}.png" />
              </div>
              <span id="temprature-description">${weather[0].description}</span>
              <span id="temprature-degree">${Math.round(temp)} °C</span>
            </div>
            <div class="Weather-data">
              <div>Humidity: <span id="humidity">${humidity}%</span></div>
              <div>Wind Speed: <span id="wind-speed">${speed} m/s</span></div>
            </div>`
        weatherBox.innerHTML=weatherJSX
        
    }
    catch{
        
        alert(data.message)
    }
    

}
const getCurrentWeatherByName=async(cityName)=>{

    const url=`${BASE_URL}/weather?q=${cityName}&appid=${API_KEY}&units=metric`
    const response=await fetch(url)
    const data=await response.json()
    
    renderCurrentWeather(data)
          
}

const getCurrentWeatherByLocation=async(lat,lon)=>{
    const url=`${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`

    const response=await fetch(url)
    const data=await response.json()
    
    renderCurrentWeather(data)
}

const sucess=async (position)=>{
    console.log(position);
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    const currentData=await getCurrentWeatherByLocation(lat,lon)
  }
const error=(error)=>{
    alert(error.message)
} 
const locationHandler=()=>{
    if(!navigator.geolocation){
        alert("Geolocation is not supported by your browser")
    }else{

        navigator.geolocation.getCurrentPosition(sucess,error)
        

    }
}


searchButton.addEventListener("click",searchHandler)
locationIcon.addEventListener("click",locationHandler)



