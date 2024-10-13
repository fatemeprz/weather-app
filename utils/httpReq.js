const API_KEY="8de96e03977a35091423bcb03881e99e";
const BASE_URL=`https://api.openweathermap.org/data/2.5`

const getWeatherData=async(type,data)=>{

    let url=null;
    const defaultCity="tehran"
    console.log(data);

    switch (type) {

        case "current":
            if(typeof data==="string"){

                url=`${BASE_URL}/weather?q=${data}&appid=${API_KEY}&units=metric`
            }else if(typeof data==="object"){
                url=`${BASE_URL}/weather?lat=${data.latitude}&lon=${data.longitude}&appid=${API_KEY}&units=metric`

            }
            break;
       
        case "forecast":
            if(typeof data==="string"){

                url=`${BASE_URL}/forecast?q=${data}&appid=${API_KEY}&units=metric`
            }else if(typeof data==="object"){
                url=`${BASE_URL}/forecast?lat=${data.latitude}&lon=${data.longitude}&appid=${API_KEY}&units=metric`

            }
            break;
    
        default:
            url=`${BASE_URL}/weather?q=${defaultCity}&appid=${API_KEY}&units=metric`

            break;
    }
     
    const response=await fetch(url)
    const json=await response.json()
    return json
}







export default getWeatherData