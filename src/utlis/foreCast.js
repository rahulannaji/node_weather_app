
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

 

//CREATING FUNCTION FOR WEATHER_STACK FORECAST

const request=require('request');

const foreCast=(latitude,longitude,callback)=>{
    
    const url='https://api.weatherstack.com/current?access_key=c10b0e6773fbbd2bf22884475ef5b86b&query='+latitude+','+longitude;
    request({url,json:true},(error,{body})=>{
        if(error)
        {
            callback('Check your Internet & Network',undefined);
        }
        else if(body.error)
        {
            callback('Invalid Coordinates',undefined);
        }
        else
        {
            callback(undefined,body.current.weather_descriptions[0]+". It is currently "+body.current.temperature+ " degrees out , but feels like "+body.current.feelslike+" degree.");
        }
    })
    
}

module.exports=foreCast;




