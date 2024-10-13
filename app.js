import getWeatherData from "./utils/httpReq.js"
const inputValue=document.querySelector("#search-input")
const searchButton=document.querySelector("#search-button")
const weatherBox=document.querySelector(".current-weather")
const locationIcon=document.getElementById("location")
const forecastData=document.querySelector(".forecast-Weather")



const searchHandler=async ()=>{

    if(!inputValue.value.trim()){
        alert("Invalid input")
        return
    }

        const cityName=inputValue.value.trim()
    

    if(!cityName){
        alert("Please enter city name!")
        return
    }
    const currentData=await getWeatherData("current",cityName)
    renderCurrentWeather(currentData)
    const forecastData=await getWeatherData("forecast",cityName)
    forecastfilter(forecastData)
    
}
const renderCurrentWeather=async(data)=>{
    
    
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

const forecastfilter=async(data)=>{
    console.log(data);
    const filteredTime=await data.list.filter(item=>item.dt_txt.includes("12:00:00"))
    filteredTime.map(item=>{
    createForecastJSX(item,item.dt_txt.split(" ")[0])
       
    })

}
const createForecastJSX=async(forecastfilter,filteredDate)=>{

    forecastData.innerHTML=" "
    const {main:{temp},weather}=await forecastfilter

    let date = new Date(filteredDate);
    let day = date.toLocaleString('en-us', {weekday: 'long'});

    const forecastJSX=`
    <div class="forecast-card"> 
        <div id="temprature-icon">
        <img src="https://openweathermap.org/img/w/${weather[0].icon}.png" />
        </div>
        <h4 id="forecast-day">${day}</h4>
        <div id="temprature-degree">${Math.round(temp)} °C</div>
        <div id="temprature-description">${weather[0].description}</div>
        
    </div>
`

    forecastData.innerHTML+=forecastJSX
}

const sucess=async (position)=>{
    

    const currentData=await getWeatherData("current",position.coords)
    renderCurrentWeather(currentData)
    const forecastData=await getWeatherData("forecast",position.coords)
    forecastfilter(forecastData)
    

    
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



